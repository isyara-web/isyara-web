import React, { useState, useRef } from 'react';

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const [transcription, setTranscription] = useState('');
  const [gesturePaths, setGesturePaths] = useState([]); // Array untuk menyimpan gesture path
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFileUpload, setIsFileUpload] = useState(true);

  const fileInputRef = useRef(null);

  const resetInputs = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setVideoLink('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleToggle = (isFile) => {
    resetInputs();
    setIsFileUpload(isFile);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      if (file.size > 50 * 1024 * 1024) {
        alert('Ukuran file tidak boleh lebih dari 50MB.');
        return;
      }
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setVideoLink('');
    } else {
      alert('Harap pilih file video yang valid.');
    }
  };

  const handleLinkChange = (e) => {
    const link = e.target.value;
    setVideoLink(link);
    setVideoFile(null);
  };

  const isValidYouTubeURL = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
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

    setIsProcessing(true);

    try {
      let response;
      if (isFileUpload) {
        const formData = new FormData();
        formData.append('video', videoFile);
        response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ videoLink }),
        });
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      setTranscription(result.transcription || 'Tidak ada hasil transkripsi.');
      setGesturePaths(result.gesture_paths || []); // Ambil gesture paths
    } catch (error) {
      console.error('Error:', error);
      setTranscription('Terjadi kesalahan saat memproses video.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="title">Upload Video atau Masukkan Link</h2>

        <div className="toggle-container">
          <button
            className={`toggle-button ${isFileUpload ? 'active' : ''}`}
            onClick={() => handleToggle(true)}
          >
            Upload File
          </button>
          <button
            className={`toggle-button ${!isFileUpload ? 'active' : ''}`}
            onClick={() => handleToggle(false)}
          >
            Input Link
          </button>
        </div>

        <div className="input-container">
          {isFileUpload ? (
            <div className="file-upload-container">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="input file-input"
              />
              {videoPreview && (
                <video
                  width="320"
                  height="240"
                  controls
                  src={videoPreview}
                  className="video-preview"
                />
              )}
            </div>
          ) : (
            <div className="link-input-container">
              <label htmlFor="videoLink" className="input-label">
                Masukkan link YouTube
              </label>
              <input
                id="videoLink"
                type="url"
                placeholder="Contoh: https://www.youtube.com/watch?v=12345"
                value={videoLink}
                onChange={handleLinkChange}
                className="input link-input"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleUpload}
          className="button upload-button"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Upload dan Transkripsi'}
        </button>

        {isProcessing && (
          <p className="processing-info">Memproses video, mohon tunggu...</p>
        )}
      </div>

      {transcription && (
        <div className="transcription-card">
          <h3 className="transcription-title">Hasil Transkripsi</h3>
          <div className="transcription-content">
            <p>{transcription}</p>
          </div>

          <h3 className="gesture-title">Terjemahan Bahasa Isyarat</h3>
          <div className="gesture-container">
            {gesturePaths.map((gesture, index) => (
              <div key={index} className="gesture-item">
                <p className="gesture-label">{gesture.text}</p> {/* Tampilkan teks di atas video */}
                <video
                  width="160"
                  height="120"
                  controls
                  src={gesture.path}
                  className="gesture-video"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
