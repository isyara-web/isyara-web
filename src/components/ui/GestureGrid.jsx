'use client';

import React from 'react';
import VideoPlayer from './VideoPlayer';
import { chunkArray, extractGestureName, isSupportedVideo } from '../../utils/helpers';
import { GESTURES_PER_ROW, GESTURE_VIDEO_WIDTH, GESTURE_VIDEO_HEIGHT } from '../../constants';

/**
 * Reusable Gesture Grid Component
 * @param {array} gestures - Array of gesture objects
 * @param {array} videoRefs - Array of video refs
 * @param {function} onVideoPlay - Handler when video plays
 * @param {number} itemsPerRow - Number of items per row
 */
const GestureGrid = ({ 
  gestures, 
  videoRefs, 
  onVideoPlay,
  itemsPerRow = GESTURES_PER_ROW 
}) => {
  const renderGestureItem = (gesture, index, globalIndex) => {
    const { word, gestureName, path } = gesture;
    const isSkipped = path?.startsWith('SKIPPED:');
    const isValidVideo = path && !isSkipped && isSupportedVideo(path);
    const displayName = extractGestureName(path);

    return (
      <div key={index} style={{ textAlign: 'center' }}>
        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
          {`${index + 1}. ${displayName}`}
        </p>

        {isValidVideo ? (
          <VideoPlayer
            ref={(el) => (videoRefs.current[globalIndex] = el)}
            src={path}
            width={GESTURE_VIDEO_WIDTH}
            height={GESTURE_VIDEO_HEIGHT}
            onPlay={() => onVideoPlay && onVideoPlay(gesture)}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div
            style={{
              width: `${GESTURE_VIDEO_WIDTH}px`,
              height: `${GESTURE_VIDEO_HEIGHT}px`,
              backgroundColor: isSkipped ? '#f0f0f0' : '#f8d7da',
              color: isSkipped ? '#6c757d' : '#721c24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              border: `1px dashed ${isSkipped ? '#ccc' : '#f5c6cb'}`,
              padding: '10px',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            {isSkipped ? displayName : 'Video tidak tersedia'}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {chunkArray(gestures, itemsPerRow).map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}
        >
          {row.map((gesture, index) => {
            const globalIndex = rowIndex * itemsPerRow + index;
            return renderGestureItem(gesture, index, globalIndex);
          })}
        </div>
      ))}
    </div>
  );
};

export default GestureGrid;

