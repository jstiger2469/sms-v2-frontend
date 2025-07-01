// Script to update admin Auth0 ID
// Run this with: node update-admin-auth0id.js

const mongoose = require('mongoose');
const Admin = require('./sms-v2-backend/server/models/Admin');
require('./sms-v2-backend/server/db/connection');

// Replace this with your actual Auth0 ID from the debug info
const NEW_AUTH0_ID = 'YOUR_AUTH0_ID_HERE'; // Replace this!

async function updateAdminAuth0Id() {
  try {
    console.log('Current admins in database:');
    const currentAdmins = await Admin.find();
    currentAdmins.forEach(admin => {
      console.log('Auth0 ID:', admin.auth0Id, 'Name:', admin.name, 'MongoDB ID:', admin._id);
    });

    if (NEW_AUTH0_ID === 'YOUR_AUTH0_ID_HERE') {
      console.log('\n❌ ERROR: Please replace YOUR_AUTH0_ID_HERE with your actual Auth0 ID');
      console.log('Get your Auth0 ID from the Send Message page debug info');
      process.exit(1);
    }

    console.log('\nUpdating admin Auth0 ID to:', NEW_AUTH0_ID);
    
    const result = await Admin.findOneAndUpdate(
      { auth0Id: 'auth0|6854cc9a327a8fb3e9f0054c' },
      { auth0Id: NEW_AUTH0_ID },
      { new: true }
    );

    if (result) {
      console.log('✅ Successfully updated admin:');
      console.log('New Auth0 ID:', result.auth0Id);
      console.log('Name:', result.name);
      console.log('MongoDB ID:', result._id);
    } else {
      console.log('❌ No admin found to update');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating admin:', error);
    process.exit(1);
  }
}

updateAdminAuth0Id(); 