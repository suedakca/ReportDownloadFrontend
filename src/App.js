import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DownloadPage from './pages/DownloadPage';


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LoginPage />}></Route>
              <Route path="/download" element={<DownloadPage/>}></Route>
          </Routes>
      </Router>
  );
}

export default App;
