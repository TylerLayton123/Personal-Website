import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Settings from '../components/settings/Settings';
import '../App.css';
import '../components/Header.css';
import '../pages/Home.css';
import '../components/Footer.css';
import './Skills.css';

const Skills = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const skills = {
    Languages: ['Python', 'Java', 'C++', 'C', 'C#', 'JavaScript', 'TypeScript', 'RStudio', 'MIPS', 'Haskel'],
    ToolsFrameworks: ['HTML/CSS','VS Code', 'GitHub', 'Git', 'Eclipse', 'Matlab', 'NX', 'LTspice', 'Microsoft Applications',
       'Photoshop', 'Jenkins', 'Unity', 'Node.js', 'React', 'Windows Form Applications']
  };

  return (
    <div className="skills-page">
      <Header setSettingsOpen={setSettingsOpen} />

      <Settings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <main className="skills-container">
        <h1 className="skills-title">Skillset</h1>

        {Object.entries(skills).map(([category, items], index) => (
          <section key={index} className="skill-category">
            <h2 className="category-title">{category === "ToolsFrameworks" ? `Tools & Frameworks` : category}</h2>
            <div className="skill-grid">
              {items.map((skill, i) => (
                <div key={i} className="skill-box">
                  {skill}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default Skills;
