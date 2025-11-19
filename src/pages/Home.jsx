import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import myPhoto from '../assets/images/myPhoto2.PNG';
import Settings from '../components/settings/Settings';
import '../App.css';
import '../components/Header.css';
import '../pages/Home.css';
import '../components/Footer.css';
import NationalParks from '../components/NationalParks';

// import all park images
// const importAll = (r) => {
//   let images = {};
//   r.keys().forEach((fileName) => {
//     const key = fileName.replace('./', '').replace(/\.(png|jpe?g)$/, '');
//     images[key] = r(fileName);
//   });
//   return images;
// };

// const parkImages = importAll(
//   require.context('../assets/images/parkimages/DefaultImages', false, /\.(png|jpe?g)$/)
// );


// Constants for typing animation
const FULL_NAME = "Tyler Layton";
const TITLES = [
  "Software Developer",
  "Computer Scientist",
  "Computer Systems Engineer",
  // "Skiier",
  "Masters Student",
  "Cum Laude",
  "L3Harris Intern",
  "Full-Stack Engineer",
  "Skiier",
  "Hiker"
  // "Outdoors-Man"
];

const VISITED_PARKS = ["Acadia", "Badlands", "Congaree", "Cuyahoga_Valley", "Grand_Canyon", "Great_Smoky_Mountains", "Haleakalā",
  "Indiana_Dunes", "Isle_Royale", "Voyageurs", "Mammoth_Cave", "New_River_Gorge", "Shenandoah", "Theodore_Roosevelt", "Voyagers", "Wind_Cave"
];

const Home = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const navBar = [
    {
      title: 'Experience',
      path: '/experience',
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
      title: 'Extras',
      path: '/extras',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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


  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [location.state]);
  
  const [parkImages, setParkImages] = useState({});

  // get the default photo for each national park from the database, not really necessary, but doesnt matter
  useEffect(() => {
    const fetchParkImages = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/park-images/?default=true');
        
        if (!response.ok) {
          throw new Error('Failed to fetch park images');
        }
        
        const imagesData = await response.json();
        console.log('Received images data:', imagesData);
        
        // Create a mapping of park codes to default image URLs
        const imagesMap = {};
        imagesData.forEach(image => {
          // Use the park_code field from the serializer
          if (image.park_code && image.image_url) {
            imagesMap[image.park_code] = image.image_url;
          }
        });
        
        setParkImages(imagesMap);
      } catch (err) {
        console.error('Error fetching park images:', err);
      }
    };

    fetchParkImages();
  }, []);


  // const getParkImage = (imageKey) => {
  //   const code = imageKey.toLowerCase().replace(/\s+/g, '_');
  //   return parkImages[code]; 
  // };

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
              I am currently a graduate student at Rensselaer Polytechnic Institute pursuing a Master's degree in
              Computer Science, with a Bachelor's degree in Computer Science and Computer Systems Engineering. I have experience
              with a wide range of programming languages and frameworks, and I’m passionate about continually learning how technology
              works and evolves.
            </p>
            <p>
              My academic journey is complemented by practical experience in both industry and research
              settings, where I've developed skills in full-stack development, algorithm optimization, and
              embedded systems control.
            </p>
            <p>
              When I'm not coding, you can find me exploring the outdoors, skiing, or traveling the country.
            </p>
            <p>
              This website is an accumulation of all my hard work throughout my time at RPI, as well as
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

      <div className="park-section">
        <div className="park-container">
          <div className="park-text">
            <h2>Visited National Parks</h2>
              <div className="park-grid">
              {NationalParks.map((park, index) => {
                // Convert park name to code format (matches your database)
                const parkCode = park.name.toLowerCase().replace(/\s+/g, '_');
                
                return (
                  <div
                    key={index}
                    id={park.image_key}
                    className="park-button-container"
                    onClick={() =>
                      navigate(`/park/${park.name.toLowerCase().replace(/\s+/g, '-')}`, {
                        state: { 
                          parkKey: park.image_key,
                          parkCode: parkCode 
                        }
                      })
                    }
                  >
                    <div
                      className="park-button"
                      style={{
                        backgroundImage: `url(${parkImages[park.image_key]})`,
                        filter: VISITED_PARKS.includes(park.image_key) ? "none" : "grayscale(100%)"
                      }}
                    >
                      <div className="park-button-overlay"></div>
                      <span className="park-button-text">
                        {park.name === "Black Canyon of the Gunnison" 
                          ? "Black Canyon of\nthe Gunnison" 
                          : park.name === "Theodore Roosevelt" 
                          ? "Theodore\nRoosevelt" 
                          : park.name}
                      </span>                  
                    </div>
                  </div>
                );
              })}
            </div>
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