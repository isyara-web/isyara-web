import React, { useState } from 'react';

function TextToGesture() {
  const [inputText, setInputText] = useState('');
  const [gestures, setGestures] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setGestures([]);
  
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
      setGestures(data.paths || []);
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
          <ul>
            {gestures.map((gesture, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                {gesture.startsWith('http') ? (
                  <a href={gesture} target="_blank" rel="noopener noreferrer">
                    {gesture}
                  </a>
                ) : (
                  <span>{gesture}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TextToGesture;
