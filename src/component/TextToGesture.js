import React, { useState } from 'react';

function TextToGesture() {
  const [inputText, setInputText] = useState('');
  const [gestures, setGestures] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
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
          Jika memasukkan nama, maka dipisahkan spasi per hurufnya. Sebagai contoh: <strong>jaja haryono</strong> menjadi <strong>j a j a h a r y o n o</strong>.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="text" style={{ display: 'block', marginBottom: '5px' }}>
            Enter Text:
          </label>
          <input
            type="text"
            id="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
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
          {chunkArray(gestures, 5).map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '20px',
                justifyContent: 'left',
              }}
            >
              {row.map(({ word, gestureName, path }, index) => (
                <div key={index} style={{ textAlign: 'center', flex: '0 0 auto' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>{gestureName}</p>
                  {path ? (
                    <video
                      controls
                      style={{ width: '200px', height: 'auto', borderRadius: '8px' }}
                    >
                      <source src={path} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div
                      style={{
                        width: '200px',
                        height: '100px',
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        border: '1px solid #f5c6cb',
                      }}
                    >
                      Gesture not found
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TextToGesture;
