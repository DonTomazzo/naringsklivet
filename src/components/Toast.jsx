// src/components/Toast.jsx
import React from 'react'; // Ingen useState eller useEffect behövs längre

const Toast = ({ message, type = 'info', color = 'bg-blue-500', isBlinking = false, position = 'top-right' }) => {

  const getPositionClasses = (pos) => {
    switch (pos) {
      case 'top-left':
        return 'top-4 left-48'; 
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'top-right':
      default:
        return 'top-4 right-4';
    }
  };

  return (
    <div
      className={`fixed ${getPositionClasses(position)} p-4 rounded-lg shadow-xl text-sm z-[200] transition-transform duration-500 transform ${color} ${isBlinking ? 'animate-pulse' : ''}`}
    >
      {message}
    </div>
  );
};

export default Toast;