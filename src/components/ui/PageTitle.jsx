'use client';

import React from 'react';

/**
 * Reusable Page Title Component
 * @param {string} title - Title text
 * @param {string} highlightText - Text to highlight (optional)
 * @param {string} highlightColor - Highlight color
 * @param {string} className - Additional CSS classes
 */
const PageTitle = ({ 
  title, 
  highlightText, 
  highlightColor = '#dc3545',
  className = '' 
}) => {
  const renderTitle = () => {
    if (!highlightText) {
      return title;
    }

    const parts = title.split(highlightText);
    if (parts.length === 1) {
      return title;
    }

    return (
      <>
        {parts[0]}
        <span style={{ color: highlightColor }}>{highlightText}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <h1
      style={{
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '10px',
      }}
      className={className}
    >
      {renderTitle()}
    </h1>
  );
};

export default PageTitle;

