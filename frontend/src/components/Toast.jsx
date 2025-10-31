import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ 
  id, 
  type = 'info', 
  title, 
  message, 
  duration = 5000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose(id);
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`max-w-sm md:max-w-md w-full rounded-lg border shadow-lg backdrop-blur bg-white/90 ${getBackgroundColor()} transform transition-all duration-300 ${isLeaving ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
    >
      <div className="p-3 sm:p-4 flex items-start">
        <div className="mt-0.5 mr-3">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          {title && <div className="font-medium text-gray-900 text-sm sm:text-base truncate">{title}</div>}
          {message && <div className="text-gray-700 text-xs sm:text-sm mt-0.5 break-words">{message}</div>}
        </div>
        <button
          onClick={handleClose}
          aria-label="Close notification"
          className="ml-3 text-gray-500 hover:text-gray-700 focus:outline-none rounded p-1"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {duration > 0 && (
        <div className="h-1 overflow-hidden rounded-b-lg">
          <div
            ref={progressRef}
            className={`h-full ${
              type === 'success' ? 'bg-green-400' : type === 'error' ? 'bg-red-400' : type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
            }`}
            style={{ width: '100%', animation: `toastbar ${Math.max(duration - 200, 300)}ms linear forwards` }}
          />
        </div>
      )}
    </div>
  );
};

export default Toast;
