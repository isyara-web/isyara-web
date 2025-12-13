'use client';

import React from 'react';

/**
 * Reusable Info Box Component
 * @param {string} title - Info box title
 * @param {React.ReactNode} children - Info box content
 * @param {string} variant - Variant (info, warning, success, error)
 * @param {string} className - Additional CSS classes
 */
const InfoBox = ({ 
  title, 
  children, 
  variant = 'info',
  className = '' 
}) => {
  const variantStyles = {
    info: {
      backgroundColor: '#e8f4fc',
      borderColor: '#007bff',
      titleColor: '#007bff',
      textColor: '#004085'
    },
    warning: {
      backgroundColor: '#fff3cd',
      borderColor: '#ffc107',
      titleColor: '#856404',
      textColor: '#856404'
    },
    success: {
      backgroundColor: '#d4edda',
      borderColor: '#28a745',
      titleColor: '#155724',
      textColor: '#155724'
    },
    error: {
      backgroundColor: '#f8d7da',
      borderColor: '#dc3545',
      titleColor: '#721c24',
      textColor: '#721c24'
    }
  };

  const style = variantStyles[variant] || variantStyles.info;

  return (
    <div
      style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: style.backgroundColor,
        border: `2px dashed ${style.borderColor}`,
        borderRadius: '8px',
      }}
      className={className}
    >
      {title && (
        <h3 style={{ marginTop: 0, color: style.titleColor, marginBottom: '10px' }}>
          {title}
        </h3>
      )}
      <div style={{ 
        margin: 0, 
        fontSize: '14px', 
        lineHeight: '1.5', 
        color: style.textColor 
      }}>
        {children}
      </div>
    </div>
  );
};

export default InfoBox;

