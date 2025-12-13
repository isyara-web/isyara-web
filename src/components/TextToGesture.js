'use client';

import React, { useState } from 'react';
import { 
  Button, 
  InfoBox, 
  LoadingSpinner, 
  ErrorMessage, 
  VideoControls, 
  GestureGrid, 
  FloatingVideoPlayer, 
  VoiceInputButton,
  PageContainer,
  FormGroup,
  TextInput
} from './ui';
import { useApi, useVideoPlayer } from '../hooks';
import { extractGestureName } from '../utils/helpers';

function TextToGesture() {
  const [inputText, setInputText] = useState('');
  const [gestures, setGestures] = useState([]);
  const { loading, error, callApi } = useApi();
  
  const {
    videoRefs,
    currentVideoPath,
    currentGesture,
    playAll,
    pauseAll,
    resumeAll,
    resetAll
  } = useVideoPlayer(gestures);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGestures([]);
    resetAll();

    const cleanedText = inputText.replace(/%20/g, ' ').trim();
    const words = cleanedText.split(' ').filter(Boolean);

    const { data, error: apiError } = await callApi('/api/v1/text-to-gesture', {
      method: 'POST',
      body: JSON.stringify({ text: cleanedText }),
    });

    if (apiError) {
      return;
    }

    const paths = data?.paths || [];
    const mappedGestures = words.map((word, index) => {
      const path = paths[index] || '';
      const gestureName = extractGestureName(path);
      
      return {
        word,
        gestureName,
        path,
      };
    }).filter(gesture => gesture.gestureName !== 'Gesture not found');

    setGestures(mappedGestures);
    videoRefs.current = [];
  };

  const handleVoiceResult = (transcript) => {
    setInputText((prevText) => `${prevText} ${transcript}`.trim());
  };

  const handleVideoPlay = (gesture) => {
    // This is handled by useVideoPlayer hook
  };

  const currentIndex = currentGesture 
    ? gestures.findIndex(
        (g) => g.word === currentGesture.word && g.path === currentGesture.path
      )
    : -1;

  return (
    <PageContainer>
      <h1>Text to Sign Language Gesture</h1>

      <InfoBox title="Informasi" variant="info">
        Aplikasi ini memungkinkan Anda untuk menerjemahkan teks menjadi video bahasa isyarat BISINDO dengan mudah.
        Masukkan teks ke dalam kolom yang tersedia di bawah label "Enter Text," lalu klik tombol "Translate" untuk memulai proses terjemahan.
      </InfoBox>

      <form onSubmit={handleSubmit}>
        <FormGroup label="Enter Text:" labelFor="text">
          <TextInput
            id="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            required
          />
          <VoiceInputButton onResult={handleVoiceResult} />
        </FormGroup>
        <Button
          type="submit"
          variant="primary"
          isLoading={loading}
          disabled={loading}
        >
          {loading ? 'Translating...' : 'Translate'}
        </Button>
      </form>

      {loading && <LoadingSpinner message="Loading, please wait..." className="mt-3" />}
      {error && <ErrorMessage message={error} className="mt-3" />}

      {gestures.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Translated Gestures</h2>
          <VideoControls
            onPlayAll={playAll}
            onPause={pauseAll}
            onResume={resumeAll}
            onReset={resetAll}
            disabled={gestures.length === 0}
          />
          <GestureGrid
            gestures={gestures}
            videoRefs={videoRefs}
            onVideoPlay={handleVideoPlay}
          />
        </div>
      )}

      <FloatingVideoPlayer
        videoPath={currentVideoPath}
        currentGesture={currentGesture}
        currentIndex={currentIndex}
        onPause={pauseAll}
        onResume={resumeAll}
        onReset={resetAll}
      />
    </PageContainer>
  );
}

export default TextToGesture;
