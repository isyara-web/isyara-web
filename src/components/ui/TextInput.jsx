'use client';

import React from 'react';

/**
 * Reusable Text Input Component
 * @param {string} id - Input id
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Required field
 * @param {string} className - Additional CSS classes
 * @param {object} style - Inline styles
 */
const TextInput = ({
  id,
  value,
  onChange,
  placeholder = '',
  required = false,
  className = '',
  style = {},
  ...props
}) => {
  return (
    <input
      type="text"
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={className}
      style={{
        flex: 1,
        padding: '8px',
        ...style
      }}
      {...props}
    />
  );
};

export default TextInput;

