'use client';

import React from 'react';
import Button from './Button';

/**
 * Reusable Video Controls Component
 * @param {function} onPlayAll - Play all handler
 * @param {function} onPause - Pause handler
 * @param {function} onResume - Resume handler
 * @param {function} onReset - Reset handler
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional CSS classes
 */
const VideoControls = ({
  onPlayAll,
  onPause,
  onResume,
  onReset,
  disabled = false,
  className = ''
}) => {
  return (
    <div 
      style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}
      className={className}
    >
      <Button
        onClick={onPlayAll}
        variant="primary"
        disabled={disabled}
        className="button play-all-button"
      >
        Play All
      </Button>
      <Button
        onClick={onPause}
        variant="secondary"
        disabled={disabled}
        className="button-pause"
      >
        Pause
      </Button>
      <Button
        onClick={onResume}
        variant="success"
        disabled={disabled}
        className="button-resume"
      >
        Resume
      </Button>
      <Button
        onClick={onReset}
        variant="warning"
        disabled={disabled}
        className="button-reset"
      >
        Reset
      </Button>
    </div>
  );
};

export default VideoControls;

