'use client';

import React from 'react';

/**
 * Reusable Section Header Component
 * @param {string} title - Section title
 * @param {string} subtitle - Section subtitle/description
 * @param {string} className - Additional CSS classes
 */
const SectionHeader = ({ title, subtitle, className = '' }) => {
  return (
    <div className={className}>
      {title && (
        <h2 className="text-center mb-2 fw-bold">{title}</h2>
      )}
      {subtitle && (
        <p className="text-center text-muted mb-5">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeader;

