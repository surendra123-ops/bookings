# Highway Delite - Travel Experience Booking Platform

A complete fullstack web application for booking travel experiences with real-time slot availability, promo code validation, and seamless booking flow. Built with modern technologies and best practices.

## 🚀 Features

### Frontend
- **React + Vite** - Modern, fast development experience
- **TailwindCSS** - Utility-first CSS framework for responsive design
- **React Router** - Client-side routing
- **Context API** - State management with notifications
- **Axios** - HTTP client with comprehensive error handling
- **Toast Notifications** - Real-time user feedback
- **Skeleton Loading** - Enhanced loading states
- **Form Validation** - Real-time validation with error messages

### Backend
- **Node.js + Express** - RESTful API server
- **MongoDB + Mongoose** - Database and ODM
- **Express Validator** - Input validation and sanitization
- **CORS** - Cross-origin resource sharing
- **Error Handling** - Comprehensive error handling middleware

### Key Features
- 🔍 **Advanced Search & Filters** - Search by name, location, price, duration
- 📅 **Real-time Slot Availability** - Live availability updates
- 🎫 **Promo Code System** - Percentage and fixed discount support
- 📱 **Fully Responsive** - Perfect on all devices
- 🎨 **Modern UI/UX** - Beautiful animations and interactions
- ✅ **Form Validation** - Real-time validation with user-friendly messages
- 🔔 **Toast Notifications** - Success, error, and warning notifications
- 🎯 **Error Handling** - Comprehensive error handling throughout
- 💳 **Complete Booking Flow** - From browsing to confirmation
- 🖨️ **Print & Share** - Print confirmation and share booking details

## 📁 Project Structure

```
highway-delite-fullstack/
├── backend/
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── config.js         # Configuration
│   ├── server.js         # Express server
│   ├── seed.js           # Database seeding
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context
│   │   └── App.jsx       # Main app component
│   ├── public/           # Static assets
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Quick Start (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd highway-delite-fullstack

# Run the automated setup
npm run setup-dev

# Start the application
npm run dev
```

### Manual Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd highway-delite-fullstack
```

#### 2. Install Dependencies
```bash
# Install all dependencies
npm run install-all
```

#### 3. Environment Setup
The setup script creates a `.env` file automatically, or you can create it manually in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/highway-delite
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

#### 4. Database Setup
Make sure MongoDB is running on your system, then seed the database:
```bash
npm run seed
```

#### 5. Start the Application
```bash
# Start both backend and frontend concurrently
npm run dev

# Or start them separately:
# Backend (Terminal 1)
npm run server

# Frontend (Terminal 2)
npm run client
```

## 🌐 API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences (with optional search)
- `GET /api/experiences/:id` - Get experience details
- `GET /api/experiences/:id/availability` - Get availability for specific date

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:referenceId` - Get booking by reference ID

### Promo Codes
- `POST /api/promo/validate` - Validate promo code
- `GET /api/promo` - Get all active promo codes

## 🎨 Design System

### Colors
- Primary: Yellow (#facc15)
- Gray: Various shades for text and backgrounds
- Success: Green for confirmations
- Error: Red for error states

### Typography
- Font Family: Inter (Google Fonts)
- Responsive text sizes using Tailwind classes

### Components
- Cards with subtle shadows and rounded corners
- Consistent button styles (primary/secondary)
- Form inputs with focus states
- Loading spinners and error states

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both backend and frontend
- `npm run setup-dev` - Automated setup with dependency installation and database seeding
- `npm run install-all` - Install all dependencies
- `npm run build` - Build frontend for production
- `npm run seed` - Seed the database with sample data

### Backend
- `npm run server` - Start backend server
- `npm run dev` - Start backend with nodemon

### Frontend
- `npm run dev` - Start frontend development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🗄️ Database Schema

### Experience
```javascript
{
  title: String,
  location: String,
  description: String,
  price: Number,
  image: String,
  availableDates: [{
    date: String,
    timeSlots: [{
      time: String,
      availableSlots: Number,
      maxSlots: Number
    }]
  }],
  about: String,
  minimumAge: Number,
  duration: String,
  includes: [String],
  requirements: [String]
}
```

### Booking
```javascript
{
  experienceId: ObjectId,
  customerName: String,
  customerEmail: String,
  selectedDate: String,
  selectedTime: String,
  quantity: Number,
  basePrice: Number,
  subtotal: Number,
  taxes: Number,
  discount: Number,
  promoCode: String,
  total: Number,
  referenceId: String,
  status: String,
  paymentStatus: String
}
```

### PromoCode
```javascript
{
  code: String,
  description: String,
  discountType: String, // 'percentage' or 'fixed'
  discountValue: Number,
  minOrderValue: Number,
  maxDiscount: Number,
  validFrom: Date,
  validUntil: Date,
  usageLimit: Number,
  usedCount: Number,
  isActive: Boolean
}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update API base URL in production

### Backend (Railway/Heroku)
1. Set environment variables
2. Deploy the backend folder
3. Update MongoDB connection string

## ✨ Recent Improvements

### Enhanced User Experience
- **Toast Notifications** - Real-time feedback for all user actions
- **Skeleton Loading** - Beautiful loading states while data loads
- **Advanced Search & Filters** - Filter by location, price range, and duration
- **Form Validation** - Real-time validation with clear error messages
- **Responsive Design** - Perfect experience on all devices

### Better Error Handling
- **Comprehensive API Error Handling** - User-friendly error messages
- **Network Error Recovery** - Graceful handling of connection issues
- **Input Validation** - Both client-side and server-side validation
- **Error Boundaries** - Prevents app crashes from component errors

### Modern UI/UX
- **Smooth Animations** - Hover effects and transitions
- **Interactive Components** - Enhanced buttons and form elements
- **Visual Feedback** - Loading states, success indicators, and error states
- **Mobile-First Design** - Optimized for mobile devices

## 🧪 Testing

The application includes:
- Form validation on both frontend and backend
- Error handling for API calls
- Loading states for better UX
- Responsive design testing
- Toast notification system
- Comprehensive error boundaries

## 📝 Sample Data

The application comes with pre-seeded data including:
- 5 different travel experiences
- Multiple date and time slots
- Sample promo codes (SAVE10, FLAT100, WELCOME20)
- Realistic pricing and descriptions

## 🔒 Security Features

- Input validation and sanitization
- CORS configuration
- Environment variable protection
- MongoDB injection prevention
- Error handling without sensitive data exposure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please open an issue in the repository.

---

**Built with ❤️ using React, Node.js, and MongoDB**
#   b o o i n g s  
 #   b o o i n g s  
 