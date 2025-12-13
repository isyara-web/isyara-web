'use client';

import React from 'react';

/**
 * Reusable Loading Spinner Component
 * @param {string} message - Loading message
 * @param {string} size - Spinner size (sm, lg)
 * @param {string} className - Additional CSS classes
 */
const LoadingSpinner = ({ 
  message = 'Loading, please wait...', 
  size = '',
  className = '' 
}) => {
  return (
    <div className={`d-flex align-items-center ${className}`}>
      <div className={`spinner-border ${size} text-primary me-2`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {message && <span>{message}</span>}
    </div>
  );
};

export default LoadingSpinner;

