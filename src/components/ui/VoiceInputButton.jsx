'use client';

import React from 'react';
import Image from 'next/image';
import { useSpeechRecognition } from '../../hooks';

/**
 * Voice Input Button Component
 * @param {function} onResult - Callback when voice input is received
 * @param {string} language - Speech recognition language
 */
const VoiceInputButton = ({ onResult, language = 'id-ID' }) => {
  const { isListening, startListening, error } = useSpeechRecognition();

  const handleClick = () => {
    startListening((transcript) => {
      if (onResult) {
        onResult(transcript);
      }
    }, language);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={handleClick}
        style={{
          backgroundColor: isListening ? '#e9ecef' : '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        title="Input Voice"
        disabled={isListening}
      >
        <Image
          src={isListening ? '/icons/wave-sound.png' : '/icons/mic.png'}
          alt="Mic Icon"
          width={24}
          height={24}
        />
      </button>
      {isListening && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: 'calc(100% - 100px)',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
            zIndex: 10,
          }}
        >
          <p style={{ margin: 0, fontSize: '14px', color: '#007bff' }}>Speak now</p>
        </div>
      )}
      {error && (
        <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default VoiceInputButton;

