'use client';

import { useState, useCallback } from 'react';

/**
 * Custom hook for speech recognition
 * @returns {object} - { isListening, startListening, stopListening, error }
 */
const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  const startListening = useCallback((onResult, language = 'id-ID') => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      const errorMsg = 'Your browser does not support voice input.';
      setError(errorMsg);
      alert(errorMsg);
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onResult) {
        onResult(transcript);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      const errorMsg = `Voice recognition error: ${event.error}`;
      setError(errorMsg);
      alert(errorMsg);
    };

    try {
      recognition.start();
      return recognition;
    } catch (err) {
      setError(err.message);
      setIsListening(false);
      return null;
    }
  }, []);

  const stopListening = useCallback((recognition) => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, []);

  return {
    isListening,
    error,
    startListening,
    stopListening
  };
};

export default useSpeechRecognition;

