import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Experience from './pages/Experiences';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Coursework from './pages/CourseWork';
import UniversalImage from './pages/UniversalImage';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from './components/settings/ThemeContext';
import Loader from './components/Loader';
import './App.css';
import ParkPages from './pages/ParkPages'; 

function AppRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    setLoading(true);
  }, [location]);

  // loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/coursework" element={<Coursework />} />
            <Route path="/random_image" element={<UniversalImage />} />
            <Route path="/park/:parkName" element={<ParkPages />} />
          </Routes>
        </>
      )}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
