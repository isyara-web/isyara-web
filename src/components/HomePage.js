import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cardStyle = (index) => ({
    ...styles.card,
    ...(hoveredCard === index ? styles.cardHover : {}),
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Selamat Datang di <span style={{ color: '#dc3545' }}>Isyara</span>
      </h1>
      <p style={styles.subtitle}>
        Pilih layanan di bawah ini untuk mulai menerjemahkan ke Bahasa Isyarat
      </p>

      <div style={styles.cardContainer}>
        <Link
          to="/upload-video"
          style={cardStyle(0)}
          onMouseEnter={() => setHoveredCard(0)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h3>Upload Video</h3>
          <p>Ubah video menjadi gerakan isyarat</p>
        </Link>

        <Link
          to="/text-to-gesture"
          style={cardStyle(1)}
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h3>Text to Gesture</h3>
          <p>Konversi teks ke animasi isyarat</p>
        </Link>
      </div>

      <div style={{ marginTop: '40px' }}>
        <a href="/#home" className="btn btn-danger">
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '200px 20px 50px', // top:100px agar tidak tertutup header, bottom:80px agar tidak nempel ke footer
    minHeight: '100vh', // pastikan halaman penuh
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: '30px',
    color: '#666',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  card: {
    width: '220px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    textDecoration: 'none',
    backgroundColor: '#ffffff',
    color: '#333',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
  },
};

export default HomePage;
