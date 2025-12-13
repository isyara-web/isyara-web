'use client';

import React from 'react';

/**
 * Reusable Page Subtitle Component
 * @param {string} subtitle - Subtitle text
 * @param {string} className - Additional CSS classes
 */
const PageSubtitle = ({ subtitle, className = '' }) => {
  return (
    <p
      style={{
        fontSize: '16px',
        marginBottom: '30px',
        color: '#666',
      }}
      className={className}
    >
      {subtitle}
    </p>
  );
};

export default PageSubtitle;

