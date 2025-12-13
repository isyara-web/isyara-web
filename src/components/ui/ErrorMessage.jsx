'use client';

import React from 'react';

/**
 * Reusable Error Message Component
 * @param {string} message - Error message
 * @param {string} className - Additional CSS classes
 */
const ErrorMessage = ({ message, className = '' }) => {
  if (!message) return null;

  return (
    <div 
      className={`alert alert-danger ${className}`}
      role="alert"
    >
      <strong>Error:</strong> {message}
    </div>
  );
};

export default ErrorMessage;

