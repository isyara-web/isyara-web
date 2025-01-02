import React, { useState } from 'react';

function TextToGesture() {
  const [inputText, setInputText] = useState('');
  const [gestures, setGestures] = useState([]);
  const [error, setError] = useState(null);

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

    const words = inputText.split(' ').filter(Boolean); // Pisahkan kata-kata
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/text-to-gesture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      const paths = data.paths || [];

      // Gabungkan kata dengan gesture
      const mappedGestures = words.map((word, index) => ({
        word,
        path: paths[index] || 'Gesture not found', // Jika gesture tidak ada
      }));

      setGestures(mappedGestures);
    } catch (err) {
      setError(err.message || 'An error occurred while processing the request.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Text to Sign Language Gesture</h1>
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
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Translate
        </button>
      </form>

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
              {row.map(({ word, path }, index) => (
                <div key={index} style={{ textAlign: 'center', flex: '0 0 auto' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>{word}</p>
                  {path.startsWith('http') ? (
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
                      {path}
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
