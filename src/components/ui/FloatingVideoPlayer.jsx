'use client';

import React from 'react';
import VideoPlayer from './VideoPlayer';
import VideoControls from './VideoControls';

/**
 * Floating Video Player Component
 * @param {string} videoPath - Current video path
 * @param {object} currentGesture - Current gesture object
 * @param {number} currentIndex - Current gesture index
 * @param {function} onPause - Pause handler
 * @param {function} onResume - Resume handler
 * @param {function} onReset - Reset handler
 */
const FloatingVideoPlayer = ({
  videoPath,
  currentGesture,
  currentIndex,
  onPause,
  onResume,
  onReset
}) => {
  if (!videoPath) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        width: '400px',
      }}
    >
      <h3>Current Preview</h3>
      {currentGesture && (
        <p>
          Sedang Memutar: <strong>
            {currentIndex !== undefined ? `${currentIndex + 1}. ${currentGesture.word}` : currentGesture.word}
          </strong>
        </p>
      )}
      <VideoPlayer
        src={videoPath}
        width={400}
        height={300}
        autoPlay
      />
      <VideoControls
        onPause={onPause}
        onResume={onResume}
        onReset={onReset}
        onPlayAll={null}
        className="mt-3"
      />
    </div>
  );
};

export default FloatingVideoPlayer;

