'use client';

import React from 'react';

/**
 * Reusable Form Group Component
 * @param {string} label - Label text
 * @param {string} labelFor - Label for attribute
 * @param {React.ReactNode} children - Form input
 * @param {string} className - Additional CSS classes
 * @param {object} style - Inline styles
 */
const FormGroup = ({ 
  label, 
  labelFor, 
  children, 
  className = '',
  style = {}
}) => {
  return (
    <div
      style={{
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        ...style
      }}
      className={className}
    >
      {label && (
        <label
          htmlFor={labelFor}
          style={{
            marginRight: '10px',
            minWidth: '100px',
          }}
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
};

export default FormGroup;

