# Environment Variables Setup

This project requires environment variables for both backend and frontend. Here's what you need to create:

## Backend Environment File

Create a file named `.env` in the `backend` directory with the following content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/highway-delite
JWT_SECRET=your_jwt_secret_key_here_123456789
NODE_ENV=development
```

### Backend Environment Variables Explained:

- **PORT**: The port number for the backend server (default: 5000)
- **MONGODB_URI**: MongoDB connection string
  - Local: `mongodb://localhost:27017/highway-delite`
  - Cloud (MongoDB Atlas): `mongodb+srv://username:password@cluster.mongodb.net/highway-delite`
- **JWT_SECRET**: Secret key for JWT token generation (use a strong, random string)
- **NODE_ENV**: Environment mode (`development` or `production`)

## Frontend Environment File

Create a file named `.env` in the `frontend` directory with the following content:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Frontend Environment Variables Explained:

- **VITE_API_BASE_URL**: Base URL for API calls
  - Development: `http://localhost:5000/api`
  - Production: `https://your-backend-domain.com/api`

## Production Environment Variables

### Backend Production (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/highway-delite
JWT_SECRET=your_very_strong_production_secret_key_here
NODE_ENV=production
```

### Frontend Production (.env)
```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

## How to Create These Files

### Method 1: Manual Creation
1. Navigate to the `backend` directory
2. Create a new file named `.env`
3. Copy and paste the backend environment variables
4. Navigate to the `frontend` directory
5. Create a new file named `.env`
6. Copy and paste the frontend environment variables

### Method 2: Using Command Line
```bash
# Backend .env
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/highway-delite
JWT_SECRET=your_jwt_secret_key_here_123456789
NODE_ENV=development" > backend/.env

# Frontend .env
echo "VITE_API_BASE_URL=http://localhost:5000/api" > frontend/.env
```

### Method 3: Using the Setup Script
The project includes a setup script that will create the backend .env file automatically:
```bash
npm run setup
```

## Important Security Notes

1. **Never commit .env files to version control**
2. **Use strong, unique JWT secrets**
3. **Keep database credentials secure**
4. **Use different secrets for development and production**

## MongoDB Setup Options

### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use: `mongodb://localhost:27017/highway-delite`

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://cloud.mongodb.com
2. Create a new cluster
3. Create database user
4. Get connection string
5. Use: `mongodb+srv://username:password@cluster.mongodb.net/highway-delite`

## Verification

After creating the environment files, you can verify the setup by running:
```bash
npm run test-setup
```

This will check if all required files and configurations are in place.
