#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Highway Delite Fullstack Application...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 16) {
  console.error('❌ Node.js version 16 or higher is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('✅ Node.js version check passed:', nodeVersion);

// Create .env file for backend if it doesn't exist
const backendEnvPath = path.join(__dirname, 'backend', '.env');
if (!fs.existsSync(backendEnvPath)) {
  const envContent = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/highway-delite
JWT_SECRET=your_jwt_secret_key_here_${Date.now()}
NODE_ENV=development
`;
  fs.writeFileSync(backendEnvPath, envContent);
  console.log('✅ Created backend/.env file');
} else {
  console.log('✅ Backend .env file already exists');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');

try {
  console.log('Installing root dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('Installing backend dependencies...');
  execSync('cd backend && npm install', { stdio: 'inherit' });
  
  console.log('Installing frontend dependencies...');
  execSync('cd frontend && npm install', { stdio: 'inherit' });
  
  console.log('✅ All dependencies installed successfully');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

// Check if MongoDB is running
console.log('\n🗄️ Checking MongoDB connection...');
try {
  execSync('mongosh --eval "db.runCommand({ping: 1})" --quiet', { stdio: 'pipe' });
  console.log('✅ MongoDB is running');
} catch (error) {
  console.log('⚠️  MongoDB is not running. Please start MongoDB before running the application.');
  console.log('   On macOS: brew services start mongodb-community');
  console.log('   On Ubuntu: sudo systemctl start mongod');
  console.log('   On Windows: net start MongoDB');
}

// Seed the database
console.log('\n🌱 Seeding database...');
try {
  execSync('cd backend && node seed.js', { stdio: 'inherit' });
  console.log('✅ Database seeded successfully');
} catch (error) {
  console.log('⚠️  Could not seed database. Make sure MongoDB is running and try again.');
  console.log('   You can manually seed the database later with: npm run seed');
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Make sure MongoDB is running');
console.log('2. Start the development servers: npm run dev');
console.log('3. Open http://localhost:3000 in your browser');
console.log('\n🔧 Available commands:');
console.log('  npm run dev          - Start both frontend and backend');
console.log('  npm run server       - Start backend only');
console.log('  npm run client       - Start frontend only');
console.log('  npm run seed         - Seed the database');
console.log('  npm run build        - Build for production');
console.log('\n📚 For more information, check the README.md file');
