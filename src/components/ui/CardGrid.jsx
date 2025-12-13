'use client';

import React from 'react';

/**
 * Reusable Card Grid Component
 * @param {React.ReactNode} children - Card items
 * @param {string} className - Additional CSS classes
 * @param {object} style - Inline styles
 */
const CardGrid = ({ 
  children, 
  className = '',
  style = {}
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        ...style
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default CardGrid;

