import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NationalParks from '../components/NationalParks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Settings from '../components/settings/Settings';
import './ParkPages.css';

// Pre-import all park images at build time
// This helps Webpack bundle them correctly
const importAllParkImages = (r) => {
  return r.keys().map(r);
};

// Get all images from all park folders at build time
let allParkImages = [];
try {
  const imageContext = require.context(
    '../assets/images/parkimages',
    true,
    /\.(png|jpe?g|webp|svg)$/i
  );
  allParkImages = importAllParkImages(imageContext);
} catch (error) {
  console.warn('Error loading park images:', error);
}

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
      // Filter images for this specific park using the pre-loaded images
      const filteredImages = allParkImages.filter(imgPath => {
        // Check if the image path includes the park's folder name
        const path = typeof imgPath === 'string' ? imgPath : imgPath.default || '';
        return path.includes(`/${park.image_key}/`) || path.includes(`\\${park.image_key}\\`);
      });
      
      setParkImages(filteredImages);
      setImagesLoaded(true);
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

      {/* Back arrow */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="back-arrow-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <h1 className="park-title">{park.name}</h1>

      {/* Image carousel */}
      <div className="image-carousel">
        {imagesLoaded && parkImages.length > 0 ? (
          <>
            <button className="carousel-arrow left" onClick={prevImage}>
              ‹
            </button>
            <img
              src={parkImages[currentImage]}
              alt={`${park.name} ${currentImage + 1}`}
              className="park-image"
            />
            <button className="carousel-arrow right" onClick={nextImage}>
              ›
            </button>
            

          </>
        ) : (
          <div className="no-images-container">
            <p className="unvisited">Unvisited Park</p>
            <p className="unvisited-subtext">No images available yet</p>
          </div>
        )}
      </div>

      {/* Park information */}
      <div className="park-info">
        <p>
          <strong>Location:</strong> {park.state}
        </p>
        <p>
          <strong>Coordinates:</strong> {park.coordinates}
        </p>
        <p>
          <strong>Established:</strong> {park.date_established}
        </p>
        <p>
          <strong>Area:</strong> {park.area}
        </p>
        <p>
          <strong>Annual Visitors:</strong> {park.visitors}
        </p>
        <p>{park.details}</p>
      </div>

      <Footer />
    </div>
  );
};

export default ParkPages;