import React, { useState, useEffect, useRef, useCallback } from 'react';

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const [transcription, setTranscription] = useState('');
  const [gesturePaths, setGesturePaths] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFileUpload, setIsFileUpload] = useState(true);
  const fileInputRef = useRef(null);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
  const videoElement = useRef(document.createElement('video'));
  const videoRefs = useRef([]);
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState(null); // { url, name }

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

  const isSupportedVideo = (url) => {
    if (!url || typeof url !== 'string') return false;
  
    const validExtensions = ['.mp4', '.webm', '.ogg'];
    return validExtensions.some(ext => url.toLowerCase().endsWith(ext));
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

  const handlePlayAll = () => {
    let index = 0;

    const playNext = () => {
      while (index < videoRefs.current.length && !videoRefs.current[index]) {
        index++;
      }
      if (index < videoRefs.current.length) {
        const currentVideo = videoRefs.current[index];
        const gestureUrl = gesturePaths[index];
        const filename = gestureUrl.split('/').pop() || '';
        let displayName = filename;

        if (gestureUrl.includes('/uploads/') && filename.includes('_')) {
          displayName = filename.split('_')[0];
        } else {
          displayName = filename.replace('.mp4', '');
        }

        setCurrentPlayingVideo({ url: gestureUrl, name: displayName });

        const onError = () => {
          console.warn(`Video gagal dimuat (skip): ${gestureUrl}`);
          currentVideo.onerror = null;
          index++;
          playNext(); 
        };
  
        const onEnded = () => {
          currentVideo.onerror = null;
          currentVideo.onended = null;
          index++;
          playNext();
        };
  
        currentVideo.onerror = onError;
        currentVideo.onended = onEnded;

        const playPromise = currentVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Video tidak bisa diputar secara otomatis:', err);
            onError(); // Treat as failed, skip to next
          });
        }
      } else {
        setCurrentPlayingVideo(null); // Semua video selesai
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
              {gesturePaths.map((gestureUrl, index) => {
                const path = gestureUrl;
                const filename = path?.split('/').pop() || '';
                let displayName = filename;

                if (path.includes('/uploads/') && filename.includes('_')) {
                  displayName = filename.split('_')[0];
                } else {
                  displayName = filename.replace('.mp4', '');
                }
                const isValidVideo = isSupportedVideo(path);
                return (
                  <div key={index} className="gesture-item">
                    <p className="gesture-label">{displayName}</p>
                    {isValidVideo ? (
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        width="160"
                        height="120"
                        controls
                        src={path}
                        className="gesture-video"
                        onError={() => console.warn(`Video gagal dimuat: ${path}`)}
                      />
                      ) : (
                        <div style={{ width: '160px', height: '120px', border: '1px dashed red', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <p style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>
                            Video tidak tersedia
                          </p>
                        </div>
                      )}
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      )}
      {currentPlayingVideo && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          backgroundColor: '#fff',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          width: '400px',
        }}>
          <p style={{
            margin: '0 0 8px 0',
            fontWeight: 'bold',
            fontSize: '14px',
            textAlign: 'center',
          }}>
            Sedang Memutar: {currentPlayingVideo.name}
          </p>
          <video
            src={currentPlayingVideo.url}
            width="380"
            height="300"
            controls
            autoPlay
            muted
          />
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
