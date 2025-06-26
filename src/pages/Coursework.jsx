import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Settings from '../components/settings/Settings';
import '../App.css';
import '../components/Header.css';
import '../pages/Home.css';
import '../components/Footer.css';
import './CourseWork.css';


const CourseWork = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);


  return (
    <div className="course-work-page">
      <Header setSettingsOpen={setSettingsOpen}/>

      <Settings 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
      />

      <Footer />
    </div>
  );
};

export default CourseWork;