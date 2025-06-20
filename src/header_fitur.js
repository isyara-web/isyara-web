import './App.css';
import UploadVideo from './component/uploadVideo';
import TextToGesture from './component/TextToGesture';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './component/Home';
import Navbar from './component/Navbar';

function App() {
  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/upload-video" element={<UploadVideo />} />
        <Route path="/text-to-gesture" element={<TextToGesture />} />
      </Routes>
    </Router>
  );
}

const ConditionalNavbar = () => {
  const location = useLocation();
  return location.pathname !== '/' ? <Navbar /> : null;
};

export default App;
