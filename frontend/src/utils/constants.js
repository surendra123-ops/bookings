export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const ROUTES = {
  HOME: '/',
  EXPERIENCE: '/experience/:id',
  CHECKOUT: '/checkout',
  RESULT: '/result',
};

export const PROMO_CODES = {
  SAVE10: { code: 'SAVE10', description: '10% off on all experiences' },
  FLAT100: { code: 'FLAT100', description: 'Flat ₹100 off' },
  WELCOME20: { code: 'WELCOME20', description: '20% off for new users' },
};

export const TAX_RATE = 0.05; // 5% tax

export const CURRENCY = '₹';

export const TIMEZONE = 'IST (GMT +5:30)';
