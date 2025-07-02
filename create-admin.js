// Script to create a new admin
// Run this with: MONGODB_URL='your-mongodb-connection-string' node create-admin.js

const mongoose = require('mongoose');
const Admin = require('../sms-v2-backend/server/models/Admin');
require('../sms-v2-backend/server/db/connection');

// Your Auth0 ID from the debug info
const AUTH0_ID = 'auth0|6864c18ea8d6c3e41bc89571';

async function createAdmin() {
  try {
    console.log('Creating new admin with Auth0 ID:', AUTH0_ID);
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ auth0Id: AUTH0_ID });
    if (existingAdmin) {
      console.log('✅ Admin already exists:');
      console.log('Auth0 ID:', existingAdmin.auth0Id);
      console.log('Name:', existingAdmin.name);
      console.log('MongoDB ID:', existingAdmin._id);
      process.exit(0);
    }

    // Create new admin
    const newAdmin = new Admin({
      auth0Id: AUTH0_ID,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin'
    });

    const result = await newAdmin.save();

    console.log('✅ Successfully created new admin:');
    console.log('Auth0 ID:', result.auth0Id);
    console.log('Name:', result.name);
    console.log('Email:', result.email);
    console.log('MongoDB ID:', result._id);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin(); 