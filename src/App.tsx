import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Search from './pages/Search';
import Live from './pages/Live';
import Upload from './pages/Upload';
import Navigation from './components/Navigation';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/live" element={<Live />} />
            <Route path="/profile/:username?" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Navigation />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
