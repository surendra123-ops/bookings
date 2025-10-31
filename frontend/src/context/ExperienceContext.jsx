import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { useNotification } from './NotificationContext';
import { apiCall, experiencesAPI, bookingsAPI, promoAPI } from '../utils/api';

const ExperienceContext = createContext();

const initialState = {
  experiences: [],
  selectedExperience: null,
  selectedDate: '',
  selectedTime: '',
  quantity: 1,
  promoCode: '',
  discount: 0,
  booking: null,
  loading: false,
  error: null,
  searchQuery: '',
};

function experienceReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_EXPERIENCES':
      return { ...state, experiences: action.payload, loading: false };
    case 'SET_SELECTED_EXPERIENCE':
      return { ...state, selectedExperience: action.payload, loading: false };
    case 'SET_SELECTED_DATE':
      return { ...state, selectedDate: action.payload };
    case 'SET_SELECTED_TIME':
      return { ...state, selectedTime: action.payload };
    case 'SET_QUANTITY':
      return { ...state, quantity: action.payload };
    case 'SET_PROMO_CODE':
      return { ...state, promoCode: action.payload };
    case 'SET_DISCOUNT':
      return { ...state, discount: action.payload };
    case 'SET_BOOKING':
      return { ...state, booking: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedExperience: null,
        selectedDate: '',
        selectedTime: '',
        quantity: 1,
        promoCode: '',
        discount: 0,
        booking: null,
      };
    default:
      return state;
  }
}

const ExperienceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(experienceReducer, initialState);
  const { showError, showSuccess, showWarning } = useNotification();

  // Fetch experiences
  const fetchExperiences = async (searchQuery = '') => {
    dispatch({ type: 'SET_LOADING', payload: true });
    console.log('Fetching experiences with search:', searchQuery);
    const result = await apiCall(experiencesAPI.getAll, searchQuery);
    
    console.log('Fetch experiences result:', result);
    
    if (result.success) {
      console.log('Experiences loaded:', result.data?.length || 0);
      dispatch({ type: 'SET_EXPERIENCES', payload: result.data });
      
      if (searchQuery && result.data.length === 0) {
        showWarning('No experiences found for your search');
      }
    } else {
      console.error('Failed to fetch experiences:', result.error, result.status, result.details);
      dispatch({ type: 'SET_ERROR', payload: result.error });
      showError(result.error);
    }
  };

  // Fetch experience details
  const fetchExperienceDetails = useCallback(async (id) => {
    if (!id) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    const result = await apiCall(experiencesAPI.getById, id);
    
    if (result.success) {
      dispatch({ type: 'SET_SELECTED_EXPERIENCE', payload: result.data });
    } else {
      dispatch({ type: 'SET_ERROR', payload: result.error });
      showError(result.error);
    }
  }, [dispatch, showError]);

  // Validate promo code
  const validatePromoCode = async (code, orderValue) => {
    const result = await apiCall(promoAPI.validate, code, orderValue);
    
    if (result.success) {
      if (result.data.valid) {
        dispatch({ type: 'SET_DISCOUNT', payload: result.data.discount });
        showSuccess(`Promo code applied! You saved ₹${result.data.discount}`);
        return { valid: true, discount: result.data.discount };
      } else {
        showError(result.data.message);
        return { valid: false, message: result.data.message };
      }
    } else {
      showError(result.error);
      return { valid: false, message: result.error };
    }
  };

  // Create booking
  const createBooking = async (bookingData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const result = await apiCall(bookingsAPI.create, bookingData);
    
    if (result.success) {
      dispatch({ type: 'SET_BOOKING', payload: result.data.booking });
      dispatch({ type: 'SET_LOADING', payload: false });
      showSuccess('Booking confirmed! Redirecting to confirmation page...');
      return { success: true, booking: result.data.booking };
    } else {
      dispatch({ type: 'SET_ERROR', payload: result.error });
      dispatch({ type: 'SET_LOADING', payload: false });
      showError(result.error);
      return { success: false, error: result.error };
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!state.selectedExperience) return 0;
    
    const subtotal = state.selectedExperience.price * state.quantity;
    const taxes = Math.round(subtotal * 0.05); // 5% tax
    const total = subtotal + taxes - state.discount;
    
    return {
      subtotal,
      taxes,
      discount: state.discount,
      total: Math.max(0, total),
    };
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const value = {
    ...state,
    fetchExperiences,
    fetchExperienceDetails,
    validatePromoCode,
    createBooking,
    calculateTotal,
    dispatch,
  };

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return context;
};

export { ExperienceProvider, useExperience };
