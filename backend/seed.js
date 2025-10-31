const mongoose = require('mongoose');
const Experience = require('./models/Experience');
const PromoCode = require('./models/PromoCode');
const config = require('./config');

const experiences = [
  {
    title: "Kayaking",
    location: "Udupi",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.",
    price: 999,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    about: "Scenic routes, trained guides, and safety briefing. Minimum age 10.",
    minimumAge: 10,
    duration: "2-3 hours",
    includes: ["Kayak", "Paddle", "Life jacket", "Helmet", "Certified guide"],
    requirements: ["Swimming ability", "Physical fitness"],
    availableDates: [
      {
        date: "2025-10-22",
        timeSlots: [
          { time: "07:00 am", availableSlots: 4, maxSlots: 8 },
          { time: "09:00 am", availableSlots: 2, maxSlots: 8 },
          { time: "11:00 am", availableSlots: 5, maxSlots: 8 },
          { time: "01:00 pm", availableSlots: 0, maxSlots: 8 }
        ]
      },
      {
        date: "2025-10-23",
        timeSlots: [
          { time: "07:00 am", availableSlots: 6, maxSlots: 8 },
          { time: "09:00 am", availableSlots: 3, maxSlots: 8 },
          { time: "11:00 am", availableSlots: 7, maxSlots: 8 },
          { time: "01:00 pm", availableSlots: 2, maxSlots: 8 }
        ]
      },
      {
        date: "2025-10-24",
        timeSlots: [
          { time: "07:00 am", availableSlots: 8, maxSlots: 8 },
          { time: "09:00 am", availableSlots: 5, maxSlots: 8 },
          { time: "11:00 am", availableSlots: 6, maxSlots: 8 },
          { time: "01:00 pm", availableSlots: 4, maxSlots: 8 }
        ]
      },
      {
        date: "2025-10-25",
        timeSlots: [
          { time: "07:00 am", availableSlots: 3, maxSlots: 8 },
          { time: "09:00 am", availableSlots: 1, maxSlots: 8 },
          { time: "11:00 am", availableSlots: 8, maxSlots: 8 },
          { time: "01:00 pm", availableSlots: 6, maxSlots: 8 }
        ]
      },
      {
        date: "2025-10-26",
        timeSlots: [
          { time: "07:00 am", availableSlots: 7, maxSlots: 8 },
          { time: "09:00 am", availableSlots: 4, maxSlots: 8 },
          { time: "11:00 am", availableSlots: 3, maxSlots: 8 },
          { time: "01:00 pm", availableSlots: 5, maxSlots: 8 }
        ]
      }
    ]
  },
  {
    title: "Nandi Hills Sunrise",
    location: "Bangalore",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Witness breathtaking sunrise from the historic Nandi Hills.",
    price: 899,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    about: "Early morning trek to witness spectacular sunrise. Professional photography included. Minimum age 8.",
    minimumAge: 8,
    duration: "4-5 hours",
    includes: ["Transportation", "Breakfast", "Professional guide", "Photography"],
    requirements: ["Comfortable walking shoes", "Water bottle"],
    availableDates: [
      {
        date: "2025-10-22",
        timeSlots: [
          { time: "05:00 am", availableSlots: 6, maxSlots: 10 },
          { time: "05:30 am", availableSlots: 4, maxSlots: 10 },
          { time: "06:00 am", availableSlots: 8, maxSlots: 10 }
        ]
      },
      {
        date: "2025-10-23",
        timeSlots: [
          { time: "05:00 am", availableSlots: 3, maxSlots: 10 },
          { time: "05:30 am", availableSlots: 7, maxSlots: 10 },
          { time: "06:00 am", availableSlots: 5, maxSlots: 10 }
        ]
      },
      {
        date: "2025-10-24",
        timeSlots: [
          { time: "05:00 am", availableSlots: 9, maxSlots: 10 },
          { time: "05:30 am", availableSlots: 2, maxSlots: 10 },
          { time: "06:00 am", availableSlots: 6, maxSlots: 10 }
        ]
      },
      {
        date: "2025-10-25",
        timeSlots: [
          { time: "05:00 am", availableSlots: 1, maxSlots: 10 },
          { time: "05:30 am", availableSlots: 8, maxSlots: 10 },
          { time: "06:00 am", availableSlots: 4, maxSlots: 10 }
        ]
      },
      {
        date: "2025-10-26",
        timeSlots: [
          { time: "05:00 am", availableSlots: 5, maxSlots: 10 },
          { time: "05:30 am", availableSlots: 3, maxSlots: 10 },
          { time: "06:00 am", availableSlots: 7, maxSlots: 10 }
        ]
      }
    ]
  },
  {
    title: "Coffee Trail",
    location: "Coorg",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Explore the aromatic coffee plantations of Coorg.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    about: "Guided tour through coffee estates with tasting sessions. Learn about coffee processing. Minimum age 12.",
    minimumAge: 12,
    duration: "3-4 hours",
    includes: ["Coffee tasting", "Estate tour", "Lunch", "Guide"],
    requirements: ["Comfortable clothes", "Camera"],
    availableDates: [
      {
        date: "2025-10-22",
        timeSlots: [
          { time: "09:00 am", availableSlots: 5, maxSlots: 12 },
          { time: "11:00 am", availableSlots: 3, maxSlots: 12 },
          { time: "02:00 pm", availableSlots: 7, maxSlots: 12 }
        ]
      },
      {
        date: "2025-10-23",
        timeSlots: [
          { time: "09:00 am", availableSlots: 8, maxSlots: 12 },
          { time: "11:00 am", availableSlots: 4, maxSlots: 12 },
          { time: "02:00 pm", availableSlots: 6, maxSlots: 12 }
        ]
      },
      {
        date: "2025-10-24",
        timeSlots: [
          { time: "09:00 am", availableSlots: 2, maxSlots: 12 },
          { time: "11:00 am", availableSlots: 9, maxSlots: 12 },
          { time: "02:00 pm", availableSlots: 5, maxSlots: 12 }
        ]
      },
      {
        date: "2025-10-25",
        timeSlots: [
          { time: "09:00 am", availableSlots: 6, maxSlots: 12 },
          { time: "11:00 am", availableSlots: 1, maxSlots: 12 },
          { time: "02:00 pm", availableSlots: 8, maxSlots: 12 }
        ]
      },
      {
        date: "2025-10-26",
        timeSlots: [
          { time: "09:00 am", availableSlots: 4, maxSlots: 12 },
          { time: "11:00 am", availableSlots: 7, maxSlots: 12 },
          { time: "02:00 pm", availableSlots: 3, maxSlots: 12 }
        ]
      }
    ]
  },
  {
    title: "Boat Cruise",
    location: "Sunderban",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Explore the mangrove forests and spot wildlife.",
    price: 999,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    about: "Wildlife spotting cruise through mangrove forests. Binoculars provided. Minimum age 8.",
    minimumAge: 8,
    duration: "2-3 hours",
    includes: ["Boat ride", "Binoculars", "Guide", "Refreshments"],
    requirements: ["Comfortable clothes", "Camera"],
    availableDates: [
      {
        date: "2025-10-22",
        timeSlots: [
          { time: "08:00 am", availableSlots: 6, maxSlots: 15 },
          { time: "10:00 am", availableSlots: 4, maxSlots: 15 },
          { time: "02:00 pm", availableSlots: 8, maxSlots: 15 }
        ]
      },
      {
        date: "2025-10-23",
        timeSlots: [
          { time: "08:00 am", availableSlots: 3, maxSlots: 15 },
          { time: "10:00 am", availableSlots: 7, maxSlots: 15 },
          { time: "02:00 pm", availableSlots: 5, maxSlots: 15 }
        ]
      },
      {
        date: "2025-10-24",
        timeSlots: [
          { time: "08:00 am", availableSlots: 9, maxSlots: 15 },
          { time: "10:00 am", availableSlots: 2, maxSlots: 15 },
          { time: "02:00 pm", availableSlots: 6, maxSlots: 15 }
        ]
      },
      {
        date: "2025-10-25",
        timeSlots: [
          { time: "08:00 am", availableSlots: 1, maxSlots: 15 },
          { time: "10:00 am", availableSlots: 8, maxSlots: 15 },
          { time: "02:00 pm", availableSlots: 4, maxSlots: 15 }
        ]
      },
      {
        date: "2025-10-26",
        timeSlots: [
          { time: "08:00 am", availableSlots: 5, maxSlots: 15 },
          { time: "10:00 am", availableSlots: 3, maxSlots: 15 },
          { time: "02:00 pm", availableSlots: 7, maxSlots: 15 }
        ]
      }
    ]
  },
  {
    title: "Bunjee Jumping",
    location: "Manali",
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Experience the ultimate adrenaline rush with professional safety equipment.",
    price: 999,
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    about: "Professional bungee jumping with certified instructors. Safety briefing and equipment provided. Minimum age 16.",
    minimumAge: 16,
    duration: "1-2 hours",
    includes: ["Safety equipment", "Instructor", "Certificate", "Video recording"],
    requirements: ["Medical fitness certificate", "Comfortable clothes"],
    availableDates: [
      {
        date: "2025-10-22",
        timeSlots: [
          { time: "09:00 am", availableSlots: 3, maxSlots: 6 },
          { time: "11:00 am", availableSlots: 1, maxSlots: 6 },
          { time: "02:00 pm", availableSlots: 4, maxSlots: 6 }
        ]
      },
      {
        date: "2025-10-23",
        timeSlots: [
          { time: "09:00 am", availableSlots: 5, maxSlots: 6 },
          { time: "11:00 am", availableSlots: 2, maxSlots: 6 },
          { time: "02:00 pm", availableSlots: 3, maxSlots: 6 }
        ]
      },
      {
        date: "2025-10-24",
        timeSlots: [
          { time: "09:00 am", availableSlots: 1, maxSlots: 6 },
          { time: "11:00 am", availableSlots: 6, maxSlots: 6 },
          { time: "02:00 pm", availableSlots: 2, maxSlots: 6 }
        ]
      },
      {
        date: "2025-10-25",
        timeSlots: [
          { time: "09:00 am", availableSlots: 4, maxSlots: 6 },
          { time: "11:00 am", availableSlots: 0, maxSlots: 6 },
          { time: "02:00 pm", availableSlots: 5, maxSlots: 6 }
        ]
      },
      {
        date: "2025-10-26",
        timeSlots: [
          { time: "09:00 am", availableSlots: 2, maxSlots: 6 },
          { time: "11:00 am", availableSlots: 3, maxSlots: 6 },
          { time: "02:00 pm", availableSlots: 1, maxSlots: 6 }
        ]
      }
    ]
  }
];

const promoCodes = [
  {
    code: "SAVE10",
    description: "10% off on all experiences",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 500,
    maxDiscount: 200,
    validUntil: new Date('2025-12-31'),
    usageLimit: 100
  },
  {
    code: "FLAT100",
    description: "Flat ₹100 off",
    discountType: "fixed",
    discountValue: 100,
    minOrderValue: 1000,
    validUntil: new Date('2025-12-31'),
    usageLimit: 50
  },
  {
    code: "WELCOME20",
    description: "20% off for new users",
    discountType: "percentage",
    discountValue: 20,
    minOrderValue: 800,
    maxDiscount: 500,
    validUntil: new Date('2025-11-30'),
    usageLimit: 25
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Experience.deleteMany({});
    await PromoCode.deleteMany({});
    console.log('Cleared existing data');

    // Insert experiences
    await Experience.insertMany(experiences);
    console.log('Inserted experiences');

    // Insert promo codes
    await PromoCode.insertMany(promoCodes);
    console.log('Inserted promo codes');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
