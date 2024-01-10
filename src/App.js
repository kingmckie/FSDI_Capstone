import React, { useState } from 'react';
import Home from './pages/home';
import Group from './pages/group';
import About from './pages/about';
import LiveStream from './pages/livestream';
import Navbar from './components/navbar';
import Footer from './components/footer';
import CreateBlog from './pages/createblog';
import Admin from './pages/admin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import BlogFeed from './components/blogfeed';
import { FirebaseProvider } from './FirebaseContext';
import ChatDetail from './components/ChatDetail';

function App() {
  const [currentVideo, setCurrentVideo] = useState({
    id: 'nT8aBQx8OS4',
    name: 'Del Mar California',
  });

  const toggleVideo = () => {
    setCurrentVideo((prevVideo) =>
      prevVideo.id === 'nT8aBQx8OS4'
        ? { id: '8G_YfR-lcIA?si=Jx-xAV61O4FAmIGg', name: 'wikiki Hawaii' }
        : { id: 'nT8aBQx8OS4', name: 'Del Mar California' }
    );
  };

  return (
    <Router>
      <FirebaseProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/group" element={<Group />} />
            <Route path="/about" element={<About />} />
            <Route path="/createblog" element={<CreateBlog />} />
            <Route path="/livestream" element={<LiveStream />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/chat/:categoryId" element={<ChatDetail />} />
          </Routes>
          <Footer />
        </div>
      </FirebaseProvider>
    </Router>
  );
}

export default App;
