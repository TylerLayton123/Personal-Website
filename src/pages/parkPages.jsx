import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Settings from '../components/settings/Settings';
import './ParkPages.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ParkPages = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [parkImages, setParkImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [parkInfo, setParkInfo] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);

  const { parkName } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParkImages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let allParks = [];
        let nextUrl = `${API_BASE_URL}/parks`;
        
        // Iterate through all pages
        while (nextUrl) {
          const response = await fetch(nextUrl);
          if (!response.ok) {
            throw new Error(`Failed to fetch parks: ${response.status}`);
          }
          
          const data = await response.json();
          allParks = allParks.concat(data.results);
          nextUrl = data.next; // Get next page URL, will be null when no more pages
        }

        console.log('Total parks found:', allParks.length);

        // Find the specific park
        const specificPark = allParks.find(park => park.image_key === parkName);

        if (!specificPark) {
          throw new Error(`Park "${parkName}" not found in the results`);
        }

        setParkInfo(specificPark);
        
        // Set park images
        const imageUrls = specificPark.featured_images 
          ? specificPark.featured_images.map(image => image.image_path)
          : [];        
        
        setParkImages(imageUrls);
        setImagesLoaded(imageUrls.length > 0);
        
      } catch (err) {
        console.error('Error fetching park images:', err);
        setError(err.message || 'Failed to load images');
        setParkImages([]);
        setImagesLoaded(false);
      } finally {
        setLoading(false);
      }
    };

    fetchParkImages();
  }, [parkName]);

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

      {/* Back arrow */}
      <button
        className="back-button"
        onClick={() => navigate("/", { state: { scrollTo: parkInfo.image_key } })}
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

      <h1 className="park-title">{parkInfo.display_name}</h1>

      {/* Image container */}
      <div className="image-container">
        {loading ? (
          <div className="loading-container">
            <p>Loading images...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>Error loading images</p>
          </div>
        ) : imagesLoaded && parkImages.length > 0 ? (
          <div className="visited-container">
            <a
              href={`/${parkImages[currentImage]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`/${parkImages[currentImage]}`}
                alt={`${parkName} - ${currentImage + 1} of ${parkImages.length}`}
                className={`park-image ${imageLoading ? 'loading' : 'loaded'}`}
                onError={(e) => {
                  console.error('Error loading image:', parkImages[currentImage]);
                  e.target.style.display = 'none';
                  setImageLoading(false);
                }}
                onLoad={() => {
                  setImageLoading(false);
                  // console.log('Image loaded:', parkImages[currentImage]);
                }}
              />
              {imageLoading && <div className="image-loading">Loading image...</div>}
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
        <p><strong>Park Name:</strong> {parkInfo.display_name}</p>
        <p><strong>Location:</strong> {parkInfo.state}</p>
        <p><strong>Coordinates:</strong> {parkInfo.coordinates}</p>
        <p><strong>Established:</strong> {parkInfo.date_established}</p>
        <p><strong>Area:</strong> {parkInfo.area}</p>
        <p><strong>Annual Visitors:</strong> {parkInfo.visitors}</p>
        <p><strong>Description:</strong> {parkInfo.description}</p>
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