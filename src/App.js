import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import TermsAndConditions from "./components/TermsAndConditions";
import GeoSpatial from './components/GeoSpatial';
import Home from "./pages/home";
import Group from "./pages/group";
import About from "./pages/about";
import LiveStream from "./pages/livestream";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import CreateBlog from "./pages/createblog";
import Admin from "./pages/admin";
import BlogFeed from "./components/blogfeed";
import { FirebaseProvider } from "./FirebaseContext";
import ChatDetail from "./components/ChatDetail";
import Login from "./components/login";
import GlobalProvider from "./state/globalProvider";
import "./components/styles.css";

function App() {
  const [currentVideo, setCurrentVideo] = useState({
    id: "nT8aBQx8OS4",
    name: "Del Mar California",
  });

  const toggleVideo = () => {
    setCurrentVideo((prevVideo) =>
      prevVideo.id === "nT8aBQx8OS4"
        ? { id: "8G_YfR-lcIA?si=Jx-xAV61O4FAmIGg", name: "wikiki Hawaii" }
        : { id: "nT8aBQx8OS4", name: "Del Mar California" }
    );
  };

  return (
    <Router>
      <GlobalProvider>
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
              <Route path="/login" element={<Login />} />
              <Route path="/blogfeed" element={<BlogFeed />} />
              <Route path="/geospatial" element={<GeoSpatial />} />
            </Routes>
            
            <Footer />
          </div>
      </GlobalProvider>
    </Router>
  );
}

export default App;
