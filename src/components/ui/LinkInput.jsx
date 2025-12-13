'use client';

import React from 'react';
import { isValidYouTubeURL } from '../../utils/helpers';

/**
 * Link Input Component
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {string} label - Label text
 */
const LinkInput = ({ 
  value, 
  onChange, 
  placeholder = 'Contoh: https://www.youtube.com/watch?v=12345',
  label = 'Masukkan link YouTube'
}) => {
  return (
    <div className="link-input-container-fitur">
      <label htmlFor="videoLink" className="input-label">
        {label}
      </label>
      <input
        id="videoLink"
        type="url"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input link-input"
      />
    </div>
  );
};

export { isValidYouTubeURL };
export default LinkInput;

