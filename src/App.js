import './App.css';
import UploadVideo from './component/uploadVideo';
import TextToGesture from './component/TextToGesture';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/upload-video" element={<UploadVideo />} />
        <Route path="/text-to-gesture" element={<TextToGesture />} />
      </Routes>
    </Router>
  );
}

export default App;
