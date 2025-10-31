import React, { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext();

const initialState = {
  toasts: []
};

function notificationReducer(state, action) {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      };
    case 'CLEAR_ALL_TOASTS':
      return {
        ...state,
        toasts: []
      };
    default:
      return state;
  }
}

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    const defaultDurations = {
      success: 3500,
      info: 4500,
      warning: 6000,
      error: 10000,
    };
    const duration = toast.duration ?? defaultDurations[toast.type || 'info'];
    dispatch({
      type: 'ADD_TOAST',
      payload: { ...toast, id, duration }
    });
  };

  const removeToast = (id) => {
    dispatch({
      type: 'REMOVE_TOAST',
      payload: id
    });
  };

  const clearAllToasts = () => {
    dispatch({
      type: 'CLEAR_ALL_TOASTS'
    });
  };

  // Convenience methods
  const showSuccess = (message, title = 'Success') => {
    addToast({ type: 'success', title, message });
  };

  const showError = (message, title = 'Error') => {
    addToast({ type: 'error', title, message });
  };

  const showWarning = (message, title = 'Warning') => {
    addToast({ type: 'warning', title, message });
  };

  const showInfo = (message, title = 'Info') => {
    addToast({ type: 'info', title, message });
  };

  const value = {
    ...state,
    addToast,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export { NotificationProvider, useNotification };
