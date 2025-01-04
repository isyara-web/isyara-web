import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Isyara</h1>
      <div style={styles.cardContainer}>
        <Link to="/upload-video" style={styles.card}>
          <h3>Upload Video</h3>
          <p>Convert your videos to gestures</p>
        </Link>
        <Link to="/text-to-gesture" style={styles.card}>
          <h3>Text to Gesture</h3>
          <p>Convert text to gesture animations</p>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    marginBottom: '20px',
    fontSize: '28px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  card: {
    display: 'block',
    width: '200px',
    padding: '15px',
    textAlign: 'center',
    border: '1px solid #ddd',
    borderRadius: '8px',
    textDecoration: 'none',
    backgroundColor: '#f8f9fa',
    color: '#333',
    transition: 'all 0.3s',
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

export default Home;
