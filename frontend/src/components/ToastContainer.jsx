import React from 'react';
import { useNotification } from '../context/NotificationContext';
import Toast from './Toast';

const ToastContainer = () => {
  const { toasts, removeToast } = useNotification();

  return (
    <div
      className="fixed z-50 space-y-2
                 w-full px-3 sm:px-4
                 bottom-4 left-1/2 -translate-x-1/2
                 sm:bottom-6
                 md:top-4 md:right-4 md:left-auto md:translate-x-0 md:w-auto"
      role="region"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
