import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div>
        <NavLink to="/" style={styles.brand}>Isyara</NavLink>
      </div>
      <div>
        <NavLink 
          to="/upload-video" 
          style={({ isActive }) => (isActive ? { ...styles.link, ...styles.active } : styles.link)}
        >
          Upload Video
        </NavLink>
        <NavLink 
          to="/text-to-gesture" 
          style={({ isActive }) => (isActive ? { ...styles.link, ...styles.active } : styles.link)}
        >
          Text to Gesture
        </NavLink>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  brand: {
    fontSize: '20px',
    textDecoration: 'none',
    color: '#fff',
  },
  link: {
    marginLeft: '15px',
    textDecoration: 'none',
    color: '#fff',
  },
  active: {
    fontWeight: 'bold',
    borderBottom: '2px solid #fff',
  },
};

export default Navbar;
