# Deployment Guide

This guide covers deploying the Highway Delite application to various platforms.

## Prerequisites

- Node.js 16+ installed
- MongoDB database (local or cloud)
- Git repository access
- Platform-specific accounts (Vercel, Railway, etc.)

## Backend Deployment (Railway/Heroku)

### 1. Prepare Backend for Production

1. Update `backend/package.json` scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

2. Set environment variables in your platform:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/highway-delite
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production
```

### 2. Deploy to Railway

1. Connect your GitHub repository to Railway
2. Select the `backend` folder as the root directory
3. Set environment variables in Railway dashboard
4. Deploy

### 3. Deploy to Heroku

1. Install Heroku CLI
2. Create Heroku app: `heroku create your-app-name`
3. Set environment variables: `heroku config:set KEY=value`
4. Deploy: `git push heroku main`

## Frontend Deployment (Vercel/Netlify)

### 1. Prepare Frontend for Production

1. Update `frontend/vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  define: {
    'process.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL)
  }
})
```

2. Create `frontend/.env.production`:
```
VITE_API_BASE_URL=https://your-backend-url.com/api
```

### 2. Deploy to Vercel

1. Connect GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `frontend/dist`
4. Set environment variables
5. Deploy

### 3. Deploy to Netlify

1. Connect GitHub repository to Netlify
2. Set build command: `cd frontend && npm run build`
3. Set publish directory: `frontend/dist`
4. Set environment variables
5. Deploy

## Database Setup

### MongoDB Atlas (Recommended)

1. Create MongoDB Atlas account
2. Create a new cluster
3. Create database user
4. Whitelist your IP addresses
5. Get connection string
6. Update `MONGODB_URI` in environment variables

### Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/highway-delite`

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/highway-delite
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Post-Deployment Steps

1. **Seed the database:**
   ```bash
   cd backend
   node seed.js
   ```

2. **Test the application:**
   - Visit frontend URL
   - Test all features
   - Check API endpoints

3. **Monitor logs:**
   - Check application logs
   - Monitor database connections
   - Set up error tracking

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Update CORS settings in backend
   - Check frontend API base URL

2. **Database Connection:**
   - Verify MongoDB URI
   - Check network connectivity
   - Verify database credentials

3. **Build Failures:**
   - Check Node.js version
   - Verify all dependencies installed
   - Check for TypeScript errors

### Health Checks

1. **Backend Health:**
   ```bash
   curl https://your-backend-url.com/api/experiences
   ```

2. **Frontend Health:**
   - Visit the application URL
   - Check browser console for errors

## Security Considerations

1. **Environment Variables:**
   - Never commit `.env` files
   - Use strong JWT secrets
   - Rotate secrets regularly

2. **Database Security:**
   - Use strong passwords
   - Enable authentication
   - Restrict IP access

3. **API Security:**
   - Implement rate limiting
   - Add input validation
   - Use HTTPS in production

## Monitoring

1. **Application Monitoring:**
   - Set up error tracking (Sentry)
   - Monitor response times
   - Track user metrics

2. **Database Monitoring:**
   - Monitor connection pool
   - Track query performance
   - Set up alerts

## Scaling

1. **Backend Scaling:**
   - Use PM2 for process management
   - Implement load balancing
   - Add caching (Redis)

2. **Database Scaling:**
   - Use MongoDB replica sets
   - Implement read replicas
   - Add database sharding

## Backup Strategy

1. **Database Backups:**
   - Enable MongoDB Atlas backups
   - Set up automated backups
   - Test restore procedures

2. **Code Backups:**
   - Use Git for version control
   - Tag releases
   - Keep deployment logs

---

For additional support, please refer to the main README.md file or open an issue in the repository.
