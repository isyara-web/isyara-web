'use client';

import React, { forwardRef } from 'react';

/**
 * Reusable Video Player Component
 * @param {string} src - Video source URL
 * @param {string} alt - Alt text
 * @param {number} width - Video width
 * @param {number} height - Video height
 * @param {boolean} controls - Show controls
 * @param {function} onPlay - Play handler
 * @param {function} onError - Error handler
 * @param {string} className - Additional CSS classes
 * @param {object} style - Inline styles
 */
const VideoPlayer = forwardRef(({
  src,
  alt = 'Video',
  width = 200,
  height = 150,
  controls = true,
  onPlay,
  onError,
  className = '',
  style = {},
  ...props
}, ref) => {
  const defaultStyle = {
    width: `${width}px`,
    height: `${height}px`,
    objectFit: 'cover',
    borderRadius: '8px',
    ...style
  };

  return (
    <video
      ref={ref}
      controls={controls}
      style={defaultStyle}
      className={className}
      onPlay={onPlay}
      onError={onError}
      {...props}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;

