// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Features from './components/Features';
import WhyChoose from './components/WhyChoose';
import About from './components/About';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './components/HomePage';
import TextToGesture from './components/TextToGesture';
import UploadVideo from './components/uploadVideo';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
              <WhyChoose />
              <About />
              <FAQ />
              <CallToAction />
            </>
          }
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/text-to-gesture" element={<TextToGesture />} />
        <Route path="/upload-video" element={<UploadVideo />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
