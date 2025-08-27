import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import models
import Student from './models/Student.js';
import Mentor from './models/Mentor.js';
import Match from './models/Match.js';
import Message from './models/Message.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sms-v2');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Utility functions
const normalizePhone = (phone) => {
  if (!phone) return null;
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  // Ensure it's at least 10 digits
  return digits.length >= 10 ? digits : null;
};

const validateEmail = (email) => {
  if (!email) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? email : null;
};

const parseDate = (dateString) => {
  if (!dateString) return new Date();
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date() : date;
};

// Data transformation functions
const transformStudent = (data) => {
  return {
    firstName: data.firstName || data.first_name || data.studentfirst || data.studentFirst || '',
    lastName: data.lastName || data.last_name || data.studentlast || data.studentLast || '',
    email: validateEmail(data.email || data.studentemail || data.studentEmail),
    phone: normalizePhone(data.phone || data.studentphone || data.studentPhone),
  };
};

const transformMentor = (data) => {
  return {
    firstName: data.firstName || data.first_name || data.mentorfirst || data.mentorFirst || '',
    lastName: data.lastName || data.last_name || data.mentorlast || data.mentorLast || '',
    email: validateEmail(data.email || data.mentoremail || data.mentorEmail),
    phone: normalizePhone(data.phone || data.mentorphone || data.mentorPhone),
  };
};

const transformMessage = (data, studentId, mentorId, matchId) => {
  // Determine sender and recipient based on phone numbers
  const senderPhone = normalizePhone(data.sender || data.senderPhone);
  const recipientPhone = normalizePhone(data.recipient || data.recipientPhone);
  
  // Get student and mentor phones to determine sender/recipient
  const studentPhone = data.studentPhone || data.studentphone;
  const mentorPhone = data.mentorPhone || data.mentorphone;
  
  let senderId, recipientId, senderModel, recipientModel;
  
  if (senderPhone === normalizePhone(studentPhone)) {
    senderId = studentId;
    senderModel = 'Student';
  } else if (senderPhone === normalizePhone(mentorPhone)) {
    senderId = mentorId;
    senderModel = 'Mentor';
  } else {
    return null; // Invalid sender
  }
  
  if (recipientPhone === normalizePhone(studentPhone)) {
    recipientId = studentId;
    recipientModel = 'Student';
  } else if (recipientPhone === normalizePhone(mentorPhone)) {
    recipientId = mentorId;
    recipientModel = 'Mentor';
  } else {
    return null; // Invalid recipient
  }
  
  return {
    content: data.content || data.message || data.text || '',
    sender: senderId,
    recipient: recipientId,
    senderModel,
    recipientModel,
    match: matchId,
    timestamp: parseDate(data.timestamp || data.created_at || data.createdAt),
  };
};

// Main transformation function
const transformData = async (inputData, options = {}) => {
  const {
    clearExisting = false,
    skipDuplicates = true,
    validateOnly = false,
  } = options;

  console.log('🔄 Starting data transformation...');
  
  if (clearExisting && !validateOnly) {
    console.log('🗑️  Clearing existing data...');
    await Message.deleteMany({});
    await Match.deleteMany({});
    await Student.deleteMany({});
    await Mentor.deleteMany({});
  }

  const results = {
    students: { created: 0, skipped: 0, errors: 0 },
    mentors: { created: 0, skipped: 0, errors: 0 },
    matches: { created: 0, skipped: 0, errors: 0 },
    messages: { created: 0, skipped: 0, errors: 0 },
  };

  // Process each record
  for (const record of inputData) {
    try {
      // Transform and create/find student
      const studentData = transformStudent(record);
      let student = null;
      
      if (studentData.phone) {
        student = await Student.findOne({ phone: studentData.phone });
        if (!student && !validateOnly) {
          student = await Student.create(studentData);
          results.students.created++;
        } else if (student) {
          results.students.skipped++;
        }
      }

      // Transform and create/find mentor
      const mentorData = transformMentor(record);
      let mentor = null;
      
      if (mentorData.phone) {
        mentor = await Mentor.findOne({ phone: mentorData.phone });
        if (!mentor && !validateOnly) {
          mentor = await Mentor.create(mentorData);
          results.mentors.created++;
        } else if (mentor) {
          results.mentors.skipped++;
        }
      }

      // Create match if both student and mentor exist
      if (student && mentor) {
        let match = null;
        
        if (skipDuplicates) {
          match = await Match.findOne({
            student: student._id,
            mentor: mentor._id,
          });
        }
        
        if (!match && !validateOnly) {
          match = await Match.create({
            student: student._id,
            mentor: mentor._id,
            status: record.status || 'active',
            mentorOptIn: record.mentorOptIn || false,
            studentOptIn: record.studentOptIn || false,
          });
          results.matches.created++;
        } else if (match) {
          results.matches.skipped++;
        }

        // Process messages if they exist
        if (match && record.messages && Array.isArray(record.messages)) {
          for (const messageData of record.messages) {
            const message = transformMessage(
              messageData,
              student._id,
              mentor._id,
              match._id
            );
            
            if (message && !validateOnly) {
              await Message.create(message);
              results.messages.created++;
            } else if (!message) {
              results.messages.errors++;
            }
          }
        }
      } else {
        results.matches.errors++;
      }
    } catch (error) {
      console.error('❌ Error processing record:', error);
      results.students.errors++;
    }
  }

  return results;
};

// Load data from different sources
const loadData = async (source) => {
  if (typeof source === 'string') {
    // Load from file
    const filePath = path.resolve(__dirname, source);
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const extension = path.extname(filePath).toLowerCase();
    
    switch (extension) {
      case '.json':
        return JSON.parse(fileContent);
      case '.csv':
        // Basic CSV parsing - you might want to use a library like 'csv-parser'
        const lines = fileContent.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        return lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          return headers.reduce((obj, header, index) => {
            obj[header] = values[index] || '';
            return obj;
          }, {});
        });
      default:
        throw new Error(`Unsupported file format: ${extension}`);
    }
  } else if (Array.isArray(source)) {
    return source;
  } else {
    throw new Error('Invalid data source');
  }
};

// Main execution function
const main = async () => {
  try {
    await connectDB();
    
    // Configuration
    const config = {
      dataSource: process.argv[2] || 'outputFile.json', // Default to the existing file
      clearExisting: process.argv.includes('--clear'),
      skipDuplicates: !process.argv.includes('--force'),
      validateOnly: process.argv.includes('--validate'),
    };
    
    console.log('📊 Configuration:', config);
    
    // Load data
    const inputData = await loadData(config.dataSource);
    console.log(`📁 Loaded ${inputData.length} records from ${config.dataSource}`);
    
    // Transform and seed data
    const results = await transformData(inputData, {
      clearExisting: config.clearExisting,
      skipDuplicates: config.skipDuplicates,
      validateOnly: config.validateOnly,
    });
    
    // Print results
    console.log('\n📈 Transformation Results:');
    console.log('Students:', results.students);
    console.log('Mentors:', results.mentors);
    console.log('Matches:', results.matches);
    console.log('Messages:', results.messages);
    
    console.log('\n✅ Data transformation completed successfully!');
    
  } catch (error) {
    console.error('❌ Transformation failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { transformData, loadData, connectDB }; 