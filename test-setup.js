const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Highway Delite Setup...\n');

const tests = [
  {
    name: 'Check Node.js version',
    test: () => {
      const version = execSync('node --version', { encoding: 'utf8' }).trim();
      const majorVersion = parseInt(version.slice(1).split('.')[0]);
      if (majorVersion >= 16) {
        return { success: true, message: `Node.js ${version} ✅` };
      } else {
        return { success: false, message: `Node.js ${version} - Need v16+ ❌` };
      }
    }
  },
  {
    name: 'Check if dependencies are installed',
    test: () => {
      const checkDir = (dir) => {
        const nodeModulesPath = path.join(dir, 'node_modules');
        return fs.existsSync(nodeModulesPath);
      };
      
      const rootInstalled = checkDir('.');
      const backendInstalled = checkDir('backend');
      const frontendInstalled = checkDir('frontend');
      
      if (rootInstalled && backendInstalled && frontendInstalled) {
        return { success: true, message: 'All dependencies installed ✅' };
      } else {
        return { success: false, message: 'Some dependencies missing ❌' };
      }
    }
  },
  {
    name: 'Check if .env file exists',
    test: () => {
      const envPath = path.join('backend', '.env');
      if (fs.existsSync(envPath)) {
        return { success: true, message: '.env file exists ✅' };
      } else {
        return { success: false, message: '.env file missing ❌' };
      }
    }
  },
  {
    name: 'Check if MongoDB is accessible',
    test: () => {
      try {
        execSync('mongosh --eval "db.runCommand({ping: 1})"', { 
          encoding: 'utf8', 
          stdio: 'pipe' 
        });
        return { success: true, message: 'MongoDB is accessible ✅' };
      } catch (error) {
        return { success: false, message: 'MongoDB not accessible ❌' };
      }
    }
  },
  {
    name: 'Check if backend can start',
    test: () => {
      try {
        // Just check if the server file can be loaded
        require('./backend/server.js');
        return { success: true, message: 'Backend server file loads ✅' };
      } catch (error) {
        return { success: false, message: `Backend error: ${error.message} ❌` };
      }
    }
  }
];

let passedTests = 0;
let totalTests = tests.length;

console.log('Running tests...\n');

tests.forEach((test, index) => {
  try {
    const result = test.test();
    console.log(`${index + 1}. ${test.name}: ${result.message}`);
    if (result.success) passedTests++;
  } catch (error) {
    console.log(`${index + 1}. ${test.name}: Error - ${error.message} ❌`);
  }
});

console.log(`\n📊 Test Results: ${passedTests}/${totalTests} tests passed`);

if (passedTests === totalTests) {
  console.log('🎉 All tests passed! Your setup is ready.');
  console.log('\nTo start the application:');
  console.log('  npm run dev');
} else {
  console.log('⚠️  Some tests failed. Please check the issues above.');
  console.log('\nTo fix common issues:');
  console.log('  1. Install dependencies: npm run install-all');
  console.log('  2. Start MongoDB: mongod');
  console.log('  3. Create .env file: cp backend/.env.example backend/.env');
}
