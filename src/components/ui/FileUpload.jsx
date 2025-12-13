'use client';

import React, { useRef } from 'react';
import VideoPlayer from './VideoPlayer';
import { MAX_FILE_SIZE } from '../../constants';

/**
 * File Upload Component
 * @param {function} onFileSelect - Callback when file is selected
 * @param {File} selectedFile - Currently selected file
 * @param {string} previewUrl - Preview URL for selected file
 * @param {string} accept - Accepted file types
 */
const FileUpload = ({ 
  onFileSelect, 
  selectedFile, 
  previewUrl,
  accept = 'video/*',
  maxSize = MAX_FILE_SIZE
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('Harap pilih file video yang valid.');
      return;
    }

    if (file.size > maxSize) {
      alert(`Ukuran file tidak boleh lebih dari ${(maxSize / 1024 / 1024).toFixed(0)}MB.`);
      return;
    }

    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className="file-upload-container-fitur">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="input file-input"
      />
      {previewUrl && (
        <VideoPlayer
          src={previewUrl}
          width={320}
          height={240}
          className="video-preview mt-3"
        />
      )}
    </div>
  );
};

export default FileUpload;

