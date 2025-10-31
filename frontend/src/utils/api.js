import axios from 'axios';

// Get API base URL - Vite env vars are available at build time
const getBaseURL = () => {
  const envURL = import.meta.env.VITE_API_BASE_URL;
  
  // If environment variable is set, use it
  if (envURL) {
    console.log('API Base URL from env:', envURL);
    return envURL;
  }
  
  // Fallback: In production on Render, try to detect backend URL
  // This is a fallback if env var isn't set
  if (import.meta.env.PROD) {
    // If on Render static site, you need to set VITE_API_BASE_URL
    console.warn('VITE_API_BASE_URL not set! Using /api fallback (will not work with separate deployments)');
    return '/api';
  }
  
  // Development fallback
  console.log('Using development API base URL: /api');
  return '/api';
};

const baseURL = getBaseURL();

// Create axios instance with default config
const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log the configured base URL for debugging
console.log('Axios configured with baseURL:', baseURL);

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Log request URL for debugging
    const fullURL = `${config.baseURL}${config.url}`;
    console.log('API Request:', config.method?.toUpperCase(), fullURL);
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    // Log the error for debugging
    console.error('API Error:', {
      message: error.message,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      fullURL: `${error.config?.baseURL || ''}${error.config?.url || ''}`,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      request: error.request ? 'Network error - no response received' : null
    });
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          error.userMessage = data.message || 'Invalid request. Please check your input.';
          break;
        case 401:
          error.userMessage = 'You are not authorized. Please log in again.';
          break;
        case 403:
          error.userMessage = 'Access denied. You do not have permission to perform this action.';
          break;
        case 404:
          error.userMessage = 'The requested resource was not found.';
          break;
        case 409:
          error.userMessage = data.message || 'Conflict. This action cannot be completed.';
          break;
        case 422:
          error.userMessage = data.message || 'Validation error. Please check your input.';
          break;
        case 429:
          error.userMessage = 'Too many requests. Please try again later.';
          break;
        case 500:
          error.userMessage = 'Server error. Please try again later.';
          break;
        case 502:
        case 503:
        case 504:
          error.userMessage = 'Service temporarily unavailable. Please try again later.';
          break;
        default:
          error.userMessage = data.message || 'An unexpected error occurred.';
      }
    } else if (error.request) {
      // Network error
      error.userMessage = 'Network error. Please check your internet connection.';
    } else {
      // Something else happened
      error.userMessage = 'An unexpected error occurred. Please try again.';
    }
    
    return Promise.reject(error);
  }
);

// Helper function to handle API calls with better error messages
export const apiCall = async (apiFunction, ...args) => {
  try {
    const response = await apiFunction(...args);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.userMessage || error.message || 'An unexpected error occurred',
      status: error.response?.status,
      details: error.response?.data
    };
  }
};

// API functions
export const experiencesAPI = {
  getAll: (searchQuery = '') => api.get(`/experiences?search=${searchQuery}`),
  getById: (id) => api.get(`/experiences/${id}`),
  getAvailability: (id, date) => api.get(`/experiences/${id}/availability?date=${date}`),
};

export const bookingsAPI = {
  create: (bookingData) => api.post('/bookings', bookingData),
  getByReference: (referenceId) => api.get(`/bookings/${referenceId}`),
};

export const promoAPI = {
  validate: (code, orderValue) => api.post('/promo/validate', { code, orderValue }),
  getAll: () => api.get('/promo'),
};

export default api;
