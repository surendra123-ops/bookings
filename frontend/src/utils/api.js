import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL:import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
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
