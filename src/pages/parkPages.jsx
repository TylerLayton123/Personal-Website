import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NationalParks from '../components/NationalParks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Settings from '../components/settings/Settings';
import './ParkPages.css';

const imageContext = require.context(
  '../assets/images/parkimages',
  true,
  /\.(png|jpg|JPG|webp|svg)$/i
);

const ParkPages = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [parkImages, setParkImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);


  const { parkName } = useParams(); 
  const navigate = useNavigate();

  const park = NationalParks.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, '-') === parkName
  );

  useEffect(() => {
    if (park) {
      try {
        // Filter images only for this park
        const images = imageContext
          .keys()
          .filter((key) => key.includes(`/${park.image_key}/`)) // only that folder
          .map(imageContext);

        setParkImages(images);
        setImagesLoaded(images.length > 0);
      } catch (err) {
        console.warn(`No images found for ${park.image_key}:`, err);
        setParkImages([]);
        setImagesLoaded(false);
      }
    }
  }, [park]);


  if (!park) return <div>Park not found</div>;

  const nextImage = () => {
    if (parkImages.length > 0) {
      setCurrentImage((prev) => (prev + 1) % parkImages.length);
    }
  };

  const prevImage = () => {
    if (parkImages.length > 0) {
      setCurrentImage((prev) => (prev - 1 + parkImages.length) % parkImages.length);
    }
  };

  return (
    <div className="park-pages">
      <Header setSettingsOpen={setSettingsOpen} />

      <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

      <div className="header-container">
        <button
          className="back-button"
          onClick={() => navigate("/", { state: { scrollTo: park.image_key } })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="back-arrow-icon"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="park-title">{park.name}</h1>
      </div>

      {/* Image container */}
      <div className="image-container">
        {imagesLoaded && parkImages.length > 0 ? (
          <div className="visited-container">
            <a
              href={parkImages[currentImage]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={parkImages[currentImage]}
                alt={`${park.name} ${currentImage + 1}`}
                className="park-image"
              />
            </a>
          </div>
        ) : (
          <div className="unvisited-container">
            <p className="unvisited">Unvisited Park</p>
            <p className="unvisited-subtext">No images available yet</p>
          </div>
        )}
      </div>

      <div className="image-controls">
        <button className="image-arrow left" onClick={prevImage} aria-label="Previous image">
          <svg
            className="arrow-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M15.75 19.5 8.25 12l7.5-7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="image-counter">
          {parkImages.length > 0 ? currentImage + 1 : 0} / {parkImages.length}
        </div>

        <button className="image-arrow right" onClick={nextImage} aria-label="Next image">
          <svg
            className="arrow-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M8.25 4.5 15.75 12 8.25 19.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Park information */}
      <div className="park-info">
        <p><strong>Park Name:</strong> {park.name}</p>
        <p><strong>Location:</strong> {park.state}</p>
        <p><strong>Coordinates:</strong> {park.coordinates}</p>
        <p><strong>Established:</strong> {park.date_established}</p>
        <p><strong>Area:</strong> {park.area}</p>
        <p><strong>Annual Visitors:</strong> {park.visitors}</p>
        <p><strong>Description:</strong> {park.description}</p>
      </div>

      <div className="disclaimer">
        <p>All park info was scraped from <a href="https://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States" 
          target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(var(--theme-color4))', textDecoration: 'underline' }}>
          Wikipedia</a>, all pictures were taken by Tyler Layton.
        </p>      
      </div>

      <Footer />
    </div>
  );
};

export default ParkPages;