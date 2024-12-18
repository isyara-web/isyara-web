import React, { useState, useRef } from 'react';

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const [transcription, setTranscription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFileUpload, setIsFileUpload] = useState(true); // Toggle file or link

  const fileInputRef = useRef(null); // Refs for file input

  // Fungsi untuk reset input
  const resetInputs = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setVideoLink('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Fungsi toggle upload file / link
  const handleToggle = (isFile) => {
    resetInputs();
    setIsFileUpload(isFile);
  };

  // Fungsi untuk menangani perubahan file video
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

  // Fungsi untuk menangani perubahan URL video
  const handleLinkChange = (e) => {
    const link = e.target.value;
    setVideoLink(link);
    setVideoFile(null);
  };

  // Validasi format link YouTube
  const isValidYouTubeURL = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  // Fungsi upload dan transkripsi
  const handleUpload = async () => {
    const endpoint = isFileUpload ? '/upload-file' : '/upload-link';
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
        // Jika upload file
        const formData = new FormData();
        formData.append('video', videoFile);
        response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
          method: 'POST',
          body: formData,
        });
      } else {
        // Jika upload link
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
            aria-pressed={isFileUpload}
          >
            Upload File
          </button>
          <button
            className={`toggle-button ${!isFileUpload ? 'active' : ''}`}
            onClick={() => handleToggle(false)}
            aria-pressed={!isFileUpload}
          >
            Input Link
          </button>
        </div>

        {/* Input File atau Link */}
        {isFileUpload ? (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="input"
              aria-label="Upload file video"
            />
            {videoPreview && (
              <video
                width="320"
                height="240"
                controls
                src={videoPreview}
                className="video-preview"
                aria-label="Pratinjau video"
              />
            )}
          </div>
        ) : (
          <input
            type="url"
            placeholder="Masukkan link YouTube"
            value={videoLink}
            onChange={handleLinkChange}
            className="input"
            aria-label="Input link YouTube"
          />
        )}

        {/* Tombol Upload */}
        <button
          onClick={handleUpload}
          className="button"
          disabled={isProcessing}
          aria-busy={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Upload dan Transkripsi'}
        </button>

        {isProcessing && <p className="processing-info">Memproses video, mohon tunggu...</p>}
      </div>

      {/* Hasil Transkripsi */}
      {transcription && (
        <div className="transcription-card">
          <h3 className="transcription-title">Hasil Transkripsi</h3>
          <div className="transcription-content">
            <p>{transcription}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
