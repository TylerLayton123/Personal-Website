import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import myPhoto from '../assets/images/myPhoto2.PNG';
import Settings from '../components/settings/Settings';
import '../App.css';
import '../components/Header.css';
import '../pages/Home.css';
import '../components/Footer.css';

// Constants for typing animation
const FULL_NAME = "Tyler Layton";
const TITLES = [
  "Software Developer",
  "Computer Scientist",
  "Computer Systems Engineer",
  // "Skiier",
  "Masters Student"
  // "Outdoors-Man"
];

const Home = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const navBar = [
    {
      title: 'Experience',
      path: '/experience',
      // description: "sdlfgwoingowinfow",
    },
    {
      title: 'Projects',
      path: '/projects',
    },
    {
      title: 'Skills',
      path: '/skills',
    },
    {
      title: 'Course Work',
      path: '/coursework',
    },
    {
      title: 'Universal Picture',
      path: '/universal_picture',
    }
  ];

  // State for typing animation
  const [nameText, setNameText] = useState('');
  const [titleText, setTitleText] = useState('');

  // Refs for animation control
  const nameAnimationRef = useRef(null);
  const titleAnimationRef = useRef(null);
  const currentTitleIndexRef = useRef(0);
  const isNameCompleteRef = useRef(false);
  const isTitleCompleteRef = useRef(false);
  const isDeletingRef = useRef(false);

  useEffect(() => {
    // Clear any existing animations
    clearTimeout(nameAnimationRef.current);
    clearTimeout(titleAnimationRef.current);

    // Reset states
    setNameText('');
    setTitleText('');
    // setShowCursor(true);
    currentTitleIndexRef.current = 0;
    isNameCompleteRef.current = false;
    isTitleCompleteRef.current = false;
    isDeletingRef.current = false;

    // Start the typing animation
    nameAnimationRef.current = setTimeout(typeName, 1000); // Initial delay

    return () => {
      clearTimeout(nameAnimationRef.current);
      clearTimeout(titleAnimationRef.current);
    };
  }, []);

  // Typing animation functions
  const typeName = () => {
    let nameIndex = 0;

    const typeChar = () => {
      if (nameIndex < FULL_NAME.length) {
        setNameText(FULL_NAME.substring(0, nameIndex + 1));
        nameIndex++;
        nameAnimationRef.current = setTimeout(typeChar, 100);
      } else {
        isNameCompleteRef.current = true;
        setTimeout(startTitle, 1500);
      }
    };

    typeChar();
  };

  const startTitle = () => {
    let titleIndex = 0;
    const currentTitle = TITLES[currentTitleIndexRef.current];
    isTitleCompleteRef.current = false;
    isDeletingRef.current = false;

    const typeChar = () => {
      if (titleIndex < currentTitle.length) {
        setTitleText(currentTitle.substring(0, titleIndex + 1));
        titleIndex++;
        titleAnimationRef.current = setTimeout(typeChar, 70);
      } else {
        isTitleCompleteRef.current = true;
        // Start cycling titles after a pause
        setTimeout(startTitleCycling, 4000);
      }
    };

    typeChar();
  };

  const startTitleCycling = () => {
    let titleIndex = TITLES[currentTitleIndexRef.current].length;
    isDeletingRef.current = true;

    const deleteTitle = () => {
      if (titleIndex > 0) {
        setTitleText(TITLES[currentTitleIndexRef.current].substring(0, titleIndex - 1));
        titleIndex--;
        titleAnimationRef.current = setTimeout(deleteTitle, 40); // Faster deletion
      } else {
        // Move to next title after deletion
        currentTitleIndexRef.current = (currentTitleIndexRef.current + 1) % TITLES.length;
        isDeletingRef.current = false;
        setTimeout(startTitle, 200);
      }
    };

    // Start deleting
    deleteTitle();
  };


  return (
    <div className="home-page">
      <Header setSettingsOpen={setSettingsOpen} />
      {/* particle background with name */}
      <div className="hero-section">
        <ParticleBackground />
        <div className="name-overlay">
          <div className="typing-container">
            <h1 className="typing-text">
              <span className="text-content">{nameText}</span>
              {!isNameCompleteRef.current && <span className="cursor">|</span>}
            </h1>
            <p className="typing-subtext">
              <span className="text-content">
                {titleText || '\u00A0'}
                {isNameCompleteRef.current && <span className="cursor">|</span>}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* about section */}
      <div className="about-section">
        <div className="about-container">
          <div className="about-image">
            <img src={myPhoto} alt="Tyler Layton" />
          </div>
          <div className="about-text">
            <h2>About Me</h2>
            <p>
              I am currently graduate student at Rensselaer Polytechnic Institute with a BS in Computer
              Science and Computer Systems Engineering. I have knowledge in many different programming languages
              and frameworks, I am passionate about learning as much as I can about technology and how it works.
            </p>
            <p>
              My academic journey is complemented by practical experience in both industry and research
              settings, where I've developed skills in full-stack development, algorithm optimization, and
              embedded systems controls.
            </p>
            <p>
              When I'm not coding, you can find me exploring the outdoors, skiing, or travelling the country.
            </p>
            <p>
              This website is an accumulation of all my hard work throughtout my time at RPI as well as
              other things I am passionate about. Please explore my projects, class work, and journey below. Thank you!
            </p>
          </div>
        </div>
      </div>

      {/* content section */}
      <div className="content-section">
        <ParticleBackground contentSection='true' />
        <div className="button-section">
          <div className="alternating-cards-container">
            {navBar.map((card, index) => (
              <div
                key={index}
                className={`alternating-card ${index % 2 === 0 ? 'left-aligned' : 'right-aligned'}`}
              >
                <a href={card.path} className="nav-card">
                  <div className="card-content">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-description">{card.description}</p>
                  </div>
                  <div className="fade-overlay"></div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Settings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default Home;