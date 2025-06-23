import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Experience from './pages/Experiences';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Coursework from './pages/Coursework';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from './components/settings/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/coursework" element={<Coursework />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;