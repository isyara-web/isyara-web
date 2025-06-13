import React, { useState, useEffect, useRef, useCallback } from 'react';

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const [transcription, setTranscription] = useState('');
  const [gesturePaths, setGesturePaths] = useState([]); // Array untuk menyimpan gesture path
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFileUpload, setIsFileUpload] = useState(true);
  const fileInputRef = useRef(null);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0); // Untuk melanjutkan waktu yang tersisa
  const videoElement = useRef(document.createElement('video'));
  let playTimeout = useRef(null);
  const videoRefs = useRef([]);

  const handleVideoEnd = useCallback(() => {
    if (currentPlayingIndex < gesturePaths.length - 1) {
      setCurrentPlayingIndex(currentPlayingIndex + 1);
    } else {
      setCurrentPlayingIndex(null); // All videos finished
    }
  }, [currentPlayingIndex, gesturePaths.length]);

  useEffect(() => {
    const videoEl = videoElement.current;
    videoEl.onended = handleVideoEnd; // Attach event listener for when video ends
  }, [handleVideoEnd]);

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
      console.log(result.gesture_paths)
    } catch (error) {
      console.error('Error:', error);
      setTranscription('Terjadi kesalahan saat memproses video.');
    } finally {
      setIsProcessing(false);
    }
  };

  const playAllVideos = useCallback(() => {
    if (!gesturePaths.length) return;
  
    let startIndex = currentPlayingIndex !== null ? currentPlayingIndex : 0;
    setIsPaused(false);
  
    const play = (index) => {
      if (index >= gesturePaths.length) {
        setCurrentPlayingIndex(null);
        return;
      }
  
      const video = videoElement.current;
      const path = gesturePaths[index].path;
      setCurrentPlayingIndex(index);
      video.src = path;
  
      video.onloadedmetadata = () => {
        const duration = remainingTime || video.duration * 1000;
  
        video.play();
        playTimeout.current = setTimeout(() => {
          setRemainingTime(0);
          play(index + 1);
        }, duration);
      };
  
      video.load();
    };
  
    play(startIndex);
  }, [gesturePaths, currentPlayingIndex, remainingTime]);
  
  const pauseVideos = () => {
    setIsPaused(true);
    clearTimeout(playTimeout.current);
  
    const video = videoElement.current;
    if (video.readyState >= 1) {
      const remaining = (video.duration - video.currentTime) * 1000;
      setRemainingTime(remaining);
    }
    video.pause();
  };
  
  const resumeVideos = () => {
    setIsPaused(false);
    if (currentPlayingIndex !== null) {
      playAllVideos();
    }
  };
  

  const resetVideos = () => {
    setIsPaused(false);
    setCurrentPlayingIndex(null);
    setRemainingTime(0);
    clearTimeout(playTimeout.current);
  
    const video = videoElement.current;
    video.pause();
    video.currentTime = 0;
    video.src = '';
  };
  

  const handlePlayAll = () => {
    let index = 0;

    const playNext = () => {
      if (index < videoRefs.current.length) {
        const currentVideo = videoRefs.current[index];
        currentVideo.play();
        currentVideo.onended = () => {
          index += 1;
          playNext();
        };
      }
    };

    playNext();
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="title">Upload Video atau Masukkan Link</h2>

        <div
          style={{
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: '#e8f4fc',
            border: '2px dashed #007bff',
            borderRadius: '8px',
          }}
        >
          <h3 style={{ marginTop: 0, color: '#007bff' }}>Informasi</h3>
          <p style={{
            margin: 0,
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#004085',
            textAlign: 'justify'
          }}>
            Aplikasi ini memungkinkan Anda untuk menerjemahkan video atau tautan YouTube menjadi video bahasa isyarat per kata.
            Anda dapat mengunggah video melalui tombol "Upload File" atau memasukkan tautan YouTube dengan memilih opsi "Input Link."
            Setelah video dipilih, klik tombol "Upload dan Transkripsi" untuk memulai proses.
            Sistem akan mengekstraksi teks dari video, memprosesnya, dan menerjemahkan setiap kata ke dalam bahasa isyarat.
            Hasil terjemahan akan ditampilkan dalam bentuk video bahasa isyarat per kata, memungkinkan Anda untuk memahami setiap kata dalam bahasa isyarat secara terpisah.
          </p>
        </div>

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
          <button onClick={handlePlayAll} className="button play-all-button">
            Play All
          </button>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div className="gesture-container" style={{ flex: 1 }}>
              {gesturePaths.map((gestureUrl, index) => (
                <div key={index} className="gesture-item">
                  <p className="gesture-label">Gesture {index + 1}</p>
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    width="160"
                    height="120"
                    controls
                    src={gestureUrl}
                    className="gesture-video"
                  />
                </div>
              ))}
            </div>
            <div style={{ flex: 1, marginLeft: '20px' }}>
              <h4>Preview Video</h4>
              <div className="control-buttons">
                <button onClick={playAllVideos} disabled={!isPaused && currentPlayingIndex !== null}>
                  Play
                </button>
                <button onClick={pauseVideos} disabled={isPaused || currentPlayingIndex === null}>
                  Pause
                </button>
                <button onClick={resumeVideos} disabled={!isPaused || currentPlayingIndex === null}>
                  Resume
                </button>
                <button onClick={resetVideos}>
                  Reset
                </button>
              </div>
              {currentPlayingIndex !== null ? (
                <>
                  <p>
                    Sedang Memutar:{" "}
                    <strong>
                      {gesturePaths[currentPlayingIndex]?.text || "Tidak ada"}
                    </strong>
                  </p>
                  <video
                    width="320"
                    height="240"
                    controls
                    autoPlay
                    src={gesturePaths[currentPlayingIndex]?.path}
                    className="gesture-preview"
                  />
                </>
              ) : (
                <p>Pilih "Play All" untuk memulai.</p>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default UploadVideo;
