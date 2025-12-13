'use client';

import { useState, useRef, useCallback } from 'react';

/**
 * Custom hook for video player controls
 * @param {array} videos - Array of video objects with { path, word, gestureName }
 * @returns {object} - Video player controls and state
 */
const useVideoPlayer = (videos = []) => {
  const videoRefs = useRef([]);
  const [currentVideoPath, setCurrentVideoPath] = useState(null);
  const [currentGesture, setCurrentGesture] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const videoIndexRef = useRef(0);

  const playNext = useCallback(() => {
    if (isPaused) return;

    // Skip invalid videos
    while (
      videoIndexRef.current < videoRefs.current.length &&
      (!videoRefs.current[videoIndexRef.current] || 
       !videos[videoIndexRef.current] ||
       videos[videoIndexRef.current].path?.startsWith('SKIPPED:'))
    ) {
      videoIndexRef.current++;
    }

    if (videoIndexRef.current < videoRefs.current.length) {
      const currentVideo = videoRefs.current[videoIndexRef.current];
      const gesture = videos[videoIndexRef.current];

      if (currentVideo && gesture) {
        setCurrentVideoPath(gesture.path);
        setCurrentGesture(gesture);

        const onError = () => {
          currentVideo.onerror = null;
          currentVideo.onended = null;
          videoIndexRef.current++;
          playNext();
        };

        const onEnded = () => {
          currentVideo.onerror = null;
          currentVideo.onended = null;
          videoIndexRef.current++;
          playNext();
        };

        currentVideo.onerror = onError;
        currentVideo.onended = onEnded;

        const playPromise = currentVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Video tidak bisa diputar secara otomatis:', err);
            onError();
          });
        }
      }
    } else {
      setCurrentVideoPath(null);
      setCurrentGesture(null);
    }
  }, [videos, isPaused]);

  const playAll = useCallback(() => {
    setIsPaused(false);
    videoIndexRef.current = 0;
    pauseAll();
    playNext();
  }, [playNext]);

  const pauseAll = useCallback(() => {
    videoRefs.current.forEach((video) => {
      if (video && !video.paused) {
        video.pause();
      }
    });
    setIsPaused(true);
  }, []);

  const resumeAll = useCallback(() => {
    setIsPaused(false);
    if (videoRefs.current[videoIndexRef.current]) {
      videoRefs.current[videoIndexRef.current].play().catch((err) => {
        console.warn('Tidak dapat melanjutkan video:', err);
      });
    }
    playNext();
  }, [playNext]);

  const resetAll = useCallback(() => {
    setIsPaused(false);
    setCurrentVideoPath(null);
    setCurrentGesture(null);
    videoIndexRef.current = 0;
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, []);

  return {
    videoRefs,
    currentVideoPath,
    currentGesture,
    isPaused,
    playAll,
    pauseAll,
    resumeAll,
    resetAll
  };
};

export default useVideoPlayer;

