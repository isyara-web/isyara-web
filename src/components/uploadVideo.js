'use client';

import React, { useState } from 'react';
import { 
  Button, 
  InfoBox, 
  LoadingSpinner, 
  ToggleButton, 
  FileUpload, 
  LinkInput, 
  VideoControls, 
  GestureGrid, 
  FloatingVideoPlayer,
  PageContainer
} from './ui';
import { useApi, useVideoPlayer } from '../hooks';
import { isValidYouTubeURL, extractGestureName } from '../utils/helpers';

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const [transcription, setTranscription] = useState('');
  const [isFileUpload, setIsFileUpload] = useState(true);
  const { loading, error, callApi } = useApi();

  const [gesturePaths, setGesturePaths] = useState([]);

  // Convert gesturePaths to gesture objects for useVideoPlayer
  const gestureObjects = gesturePaths.map((path, index) => {
    const words = transcription ? transcription.split(' ') : [];
    return {
      word: words[index] || '',
      gestureName: extractGestureName(path),
      path
    };
  });

  const {
    videoRefs,
    currentVideoPath,
    currentGesture,
    playAll,
    pauseAll,
    resumeAll,
    resetAll
  } = useVideoPlayer(gestureObjects);

  const resetInputs = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setVideoLink('');
    setTranscription('');
    setGesturePaths([]);
    resetAll();
  };

  const handleToggle = (value) => {
    resetInputs();
    setIsFileUpload(value === 'file');
  };

  const handleFileSelect = (file) => {
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setVideoLink('');
  };

  const handleLinkChange = (e) => {
    setVideoLink(e.target.value);
    setVideoFile(null);
    setVideoPreview(null);
  };

  const handleUpload = async () => {
    const endpoint = isFileUpload ? '/api/v1/upload-file' : '/api/v1/upload-link';
    
    if (isFileUpload && !videoFile) {
      alert('Harap unggah file video terlebih dahulu.');
      return;
    }

    if (!isFileUpload && (!videoLink || !isValidYouTubeURL(videoLink))) {
      alert('Harap masukkan link YouTube yang valid.');
      return;
    }

    let result;
    if (isFileUpload) {
      const formData = new FormData();
      formData.append('video', videoFile);
      result = await callApi(endpoint, {
        method: 'POST',
        headers: {},
        body: formData,
      });
    } else {
      result = await callApi(endpoint, {
        method: 'POST',
        body: JSON.stringify({ videoLink }),
      });
    }

    if (result.error) {
      setTranscription('Terjadi kesalahan saat memproses video.');
      return;
    }

    const data = result.data;
    setTranscription(data.transcription || 'Tidak ada hasil transkripsi.');
    setGesturePaths(data.gesture_paths || []);
  };

  // Convert gesturePaths to gesture objects for GestureGrid
  const gestures = gesturePaths.map((path, index) => ({
    word: transcription.split(' ')[index] || '',
    gestureName: extractGestureName(path),
    path
  }));

  const currentIndex = currentGesture 
    ? gesturePaths.findIndex(p => p === currentGesture.path)
    : -1;

  return (
    <PageContainer>
      <div className="container-fitur">
        <h2 className="title">Upload Video atau Masukkan Link</h2>

        <InfoBox title="Informasi" variant="info">
          Aplikasi ini memungkinkan Anda untuk menerjemahkan video atau tautan YouTube menjadi video bahasa isyarat per kata.
          Anda dapat mengunggah video melalui tombol "Upload File" atau memasukkan tautan YouTube dengan memilih opsi "Input Link."
          Setelah video dipilih, klik tombol "Upload dan Transkripsi" untuk memulai proses.
          Sistem akan mengekstraksi teks dari video, memprosesnya, dan menerjemahkan setiap kata ke dalam bahasa isyarat.
          Hasil terjemahan akan ditampilkan dalam bentuk video bahasa isyarat per kata, memungkinkan Anda untuk memahami setiap kata dalam bahasa isyarat secara terpisah.
        </InfoBox>

        <ToggleButton
          options={[
            { label: 'Upload File', value: 'file' },
            { label: 'Input Link', value: 'link' }
          ]}
          activeValue={isFileUpload ? 'file' : 'link'}
          onChange={handleToggle}
          className="toggle-container-fitur"
        />

        <div className="input-container-fitur">
          {isFileUpload ? (
            <FileUpload
              onFileSelect={handleFileSelect}
              selectedFile={videoFile}
              previewUrl={videoPreview}
            />
          ) : (
            <LinkInput
              value={videoLink}
              onChange={handleLinkChange}
            />
          )}
        </div>

        <Button
          onClick={handleUpload}
          variant="primary"
          isLoading={loading}
          disabled={loading}
          className="button upload-button"
        >
          {loading ? 'Processing...' : 'Upload dan Transkripsi'}
        </Button>

        {loading && (
          <LoadingSpinner message="Memproses video, mohon tunggu..." className="mt-3" />
        )}
        {error && (
          <div className="mt-3">
            <p className="text-danger">{error}</p>
          </div>
        )}
      </div>

      {transcription && (
        <div className="transcription-card">
          <h3 className="transcription-title">Hasil Transkripsi</h3>
          <div className="transcription-content">
            <p>{transcription}</p>
          </div>

          <h3 className="gesture-title">Terjemahan Bahasa Isyarat</h3>
          <VideoControls
            onPlayAll={playAll}
            onPause={pauseAll}
            onResume={resumeAll}
            onReset={resetAll}
            disabled={gestures.length === 0}
          />

          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div
              className="gesture-container-fitur"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'flex-start',
              }}
            >
              <GestureGrid
                gestures={gestures}
                videoRefs={videoRefs}
                itemsPerRow={5}
              />
            </div>
          </div>
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
};

export default UploadVideo;
