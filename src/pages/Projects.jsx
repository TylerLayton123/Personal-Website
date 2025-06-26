import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Settings from '../components/settings/Settings';
import '../App.css';
import '../components/Header.css';
import '../pages/Home.css';
import '../components/Footer.css';
import './Projects.css';


const Projects = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);


  return (
    <div className="projects-page">
      <Header setSettingsOpen={setSettingsOpen}/>

      <Settings 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
      />

      <Footer />
    </div>
  );
};

export default Projects;