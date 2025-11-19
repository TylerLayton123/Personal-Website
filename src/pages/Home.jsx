import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
// import myPhoto from '../assets/images/myPhoto2.PNG';
import Settings from '../components/settings/Settings';
import '../App.css';
import '../components/Header.css';
import '../pages/Home.css';
import '../components/Footer.css';
// import NationalParks from '../components/NationalParks';

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

  // get the default photo path for each national park useing the api
  useEffect(() => {
    const fetchParkImages = async () => {
      try {
        let nextUrl = 'http://localhost:8000/api/park-images/?default=true';
        const allImages = [];
        
        // Fetch all pages
        while (nextUrl) {
          const response = await fetch(nextUrl);
          
          if (!response.ok) {
            throw new Error('Failed to fetch park images');
          }
          
          const pageData = await response.json();
          // console.log('Received page data:', pageData);
          
          // Add the results from this page to our collection
          if (pageData.results && Array.isArray(pageData.results)) {
            allImages.push(...pageData.results);
          }
          
          // Check if there's a next page
          nextUrl = pageData.next;
          
          // If we're making multiple requests, add a small delay to be nice to the server
          if (nextUrl) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
        
        console.log('All images collected:', allImages);
        console.log('Total images count:', allImages.length);
        console.log(allImages[0].image_path);

        const reversedImages = allImages.reverse();

        setParkImages(reversedImages);
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
            <img src={'/images/myPhoto2.PNG'} alt="Tyler Layton" />
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
              {Object.entries(parkImages).map(([index, parkData]) => {                
                return (
                  <div
                    key={index}
                    className="park-button-container"
                    onClick={() =>
                      navigate(`/park/${parkData.display_name}`, {
                        // state: { 
                        //   parkKey: parkData.id,
                        //   parkCode: parkCode 
                        // }
                      })
                    }
                  >
                    <div
                      className="park-button"
                      style={{
                        backgroundImage: `url(${parkData.image_path})`,
                        filter: VISITED_PARKS.includes(parkData.display_name) ? "none" : "grayscale(100%)"
                      }}
                    >
                      <div className="park-button-overlay"></div>
                      <span className="park-button-text">
                        {parkData.display_name === "Black Canyon of the Gunnison" 
                          ? "Black Canyon of\nthe Gunnison" 
                          : parkData.display_name === "Theodore Roosevelt" 
                          ? "Theodore\nRoosevelt" 
                          : parkData.display_name}
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