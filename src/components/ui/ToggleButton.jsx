'use client';

import React from 'react';

/**
 * Reusable Toggle Button Component
 * @param {array} options - Array of { label, value } objects
 * @param {string|number} activeValue - Currently active value
 * @param {function} onChange - Change handler
 * @param {string} className - Additional CSS classes
 */
const ToggleButton = ({ 
  options, 
  activeValue, 
  onChange, 
  className = '' 
}) => {
  return (
    <div className={`toggle-container ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`toggle-button ${activeValue === option.value ? 'active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleButton;

