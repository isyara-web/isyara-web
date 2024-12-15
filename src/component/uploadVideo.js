import React, { useState } from 'react';

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  // Fungsi untuk menangani perubahan file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file)); // Buat URL untuk pratinjau video
    } else {
      alert('Harap pilih file video.');
    }
  };

  // Fungsi untuk menangani pengunggahan
  const handleUpload = () => {
    if (!videoFile) {
      alert('Tidak ada video yang dipilih!');
      return;
    }

    // Buat form data untuk mengirimkan file ke server
    const formData = new FormData();
    formData.append('video', videoFile);

    // Contoh pengiriman data ke server menggunakan fetch
    fetch('https://your-server-api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Video berhasil diunggah!');
        console.log('Response:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Gagal mengunggah video.');
      });
  };

  return (
    <div style={styles.container}>
      <h2>Upload Video</h2>

      {/* Input untuk memilih video */}
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={styles.input}
      />

      {/* Pratinjau video */}
      {videoPreview && (
        <div style={styles.preview}>
          <video
            src={videoPreview}
            controls
            style={styles.video}
          />
        </div>
      )}

      {/* Tombol unggah */}
      <button onClick={handleUpload} style={styles.button}>
        Upload Video
      </button>
    </div>
  );
};

// CSS in JS
const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  input: {
    margin: '20px 0',
    padding: '10px',
    fontSize: '16px',
  },
  preview: {
    margin: '20px 0',
  },
  video: {
    width: '100%',
    maxHeight: '300px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default UploadVideo;
