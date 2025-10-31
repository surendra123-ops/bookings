const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Highway Delite Fullstack Application...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js v16 or higher.');
  process.exit(1);
}

// Check if MongoDB is running
try {
  execSync('mongosh --eval "db.runCommand({ping: 1})"', { encoding: 'utf8', stdio: 'pipe' });
  console.log('✅ MongoDB is running');
} catch (error) {
  console.log('⚠️  MongoDB might not be running. Please start MongoDB before running the application.');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Root dependencies installed');
  
  execSync('cd backend && npm install', { stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
  
  execSync('cd frontend && npm install', { stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, 'backend', '.env');
if (!fs.existsSync(envPath)) {
  const envContent = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/highway-delite
JWT_SECRET=your_jwt_secret_key_here_${Date.now()}
NODE_ENV=development`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file in backend directory');
}

// Seed the database
console.log('\n🌱 Seeding database...');
try {
  execSync('cd backend && node seed.js', { stdio: 'inherit' });
  console.log('✅ Database seeded successfully');
} catch (error) {
  console.log('⚠️  Error seeding database. You may need to run "cd backend && node seed.js" manually.');
}

console.log('\n🎉 Setup complete!');
console.log('\nTo start the application:');
console.log('  npm run dev');
console.log('\nOr start them separately:');
console.log('  Backend:  npm run server');
console.log('  Frontend: npm run client');
console.log('\nThe application will be available at:');
console.log('  Frontend: http://localhost:3000');
console.log('  Backend:  http://localhost:5000');
