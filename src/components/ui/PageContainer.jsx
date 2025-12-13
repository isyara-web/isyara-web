'use client';

import React from 'react';

/**
 * Reusable Page Container Component
 * @param {React.ReactNode} children - Page content
 * @param {string} className - Additional CSS classes
 * @param {object} style - Inline styles
 */
const PageContainer = ({ 
  children, 
  className = '', 
  style = {},
  padding = '200px 20px 50px'
}) => {
  const defaultStyle = {
    textAlign: 'center',
    padding,
    minHeight: '100vh',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
    ...style
  };

  return (
    <div className={className} style={defaultStyle}>
      {children}
    </div>
  );
};

export default PageContainer;

