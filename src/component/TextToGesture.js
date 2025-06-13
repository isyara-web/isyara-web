import React, { useState, useRef } from 'react';

function TextToGesture() {
  const [inputText, setInputText] = useState('');
  const [gestures, setGestures] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentVideoPath, setCurrentVideoPath] = useState(null);
  const [currentGesture, setCurrentGesture] = useState(null);
  const videoRefs = useRef([]);

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setGestures([]);
    setCurrentVideoPath(null);
    setCurrentGesture(null);
    setIsLoading(true);

    const cleanedText = inputText.replace(/%20/g, ' ').trim();
    const words = cleanedText.split(' ').filter(Boolean);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/text-to-gesture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: cleanedText }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to fetch gestures.');
      }

      const data = await response.json();
      const paths = data.paths || [];

      const mappedGestures = words.map((word, index) => {
        const path = paths[index];
        const gestureName = path ? decodeURIComponent(path.split('/').pop().split('.')[0]) : 'Gesture not found';

        return {
          word,
          gestureName,
          path: path || '',
        };
      }).filter(gesture => gesture.gestureName !== 'Gesture not found');

      setGestures(mappedGestures);
      videoRefs.current = [];
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice input.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setInputText((prevText) => `${prevText} ${voiceText}`.trim());
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      alert('Voice recognition error: ' + event.error);
    };

    recognition.start();
  };

  const playAllVideos = () => {
    if (!videoRefs.current.length) return;

    let index = 0;

    const playNext = () => {
      if (index >= videoRefs.current.length) return;

      const currentVideo = videoRefs.current[index];
      const gesture = gestures[index];

      if (currentVideo && gesture) {
        setCurrentVideoPath(currentVideo.currentSrc || currentVideo.src);
        setCurrentGesture(gesture);
        currentVideo.play();
        currentVideo.onended = () => {
          index++;
          playNext();
        };
      }
    };

    playNext();
  };

  return (
    <div style={{ padding: '80px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Text to Sign Language Gesture</h1>

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
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: '#004085' }}>
          Aplikasi ini memungkinkan Anda untuk menerjemahkan teks menjadi video bahasa isyarat BISINDO dengan mudah.
          Masukkan teks ke dalam kolom yang tersedia di bawah label "Enter Text," lalu klik tombol "Translate" untuk memulai proses terjemahan.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', position: 'relative' }}>
          <label htmlFor="text" style={{ marginRight: '10px' }}>Enter Text:</label>
          <input
            type="text"
            id="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ flex: 1, padding: '8px', marginRight: '10px' }}
            required
          />
          <button
            type="button"
            onClick={handleVoiceInput}
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
          >
            <img
              src={isListening ? '/icons/wave-sound.png' : '/icons/mic.png'}
              alt="Mic Icon"
              style={{ width: '24px', height: '24px' }}
            />
          </button>
          {isListening && (
            <div style={{
              position: 'absolute',
              top: '50px',
              left: 'calc(100% - 100px)',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
              zIndex: 10,
            }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#007bff' }}>Speak now</p>
            </div>
          )}
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            backgroundColor: isLoading ? '#ccc' : '#007bff',
            color: isLoading ? '#666' : '#fff',
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Translating...' : 'Translate'}
        </button>
      </form>

      {isLoading && <p style={{ marginTop: '20px', color: '#007bff' }}>Loading, please wait...</p>}
      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {gestures.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Translated Gestures</h2>
          <button
            onClick={playAllVideos}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
          >
            ▶️ Play All
          </button>

          {chunkArray(gestures, 5).map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              {row.map(({ word, gestureName, path }, index) => {
                const globalIndex = rowIndex * 5 + index;
                return (
                  <div key={index} style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>{gestureName}</p>
                    {path ? (
                      <video
                        ref={(el) => (videoRefs.current[globalIndex] = el)}
                        controls
                        style={{ width: '200px', height: 'auto', borderRadius: '8px' }}
                        onPlay={() => {
                          setCurrentVideoPath(path);
                          setCurrentGesture({ word, gestureName, path });
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          alert('Video gagal dimuat!');
                        }}
                      >
                        <source src={path} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div style={{
                        width: '200px',
                        height: '100px',
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        border: '1px solid #f5c6cb',
                      }}>
                        Gesture not found
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {currentVideoPath && (
        <div style={{ marginTop: '40px' }}>
          <h3>Current Preview</h3>
          {currentGesture && (
            <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
              Token: <span style={{ color: '#007bff' }}>{currentGesture.word}</span> &nbsp;
              Gesture: <span style={{ color: '#28a745' }}>{currentGesture.gestureName}</span>
            </p>
          )}
          <video
            src={currentVideoPath}
            controls
            autoPlay
            style={{ width: '400px', borderRadius: '8px', marginBottom: '20px' }}
          />
        </div>
      )}
    </div>
  );
}

export default TextToGesture;
