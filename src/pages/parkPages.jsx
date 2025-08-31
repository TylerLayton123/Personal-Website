import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import NationalParks from '../components/NationalParks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Settings from '../components/settings/Settings';
import './ParkPages.css';

const ParkPages = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { parkName } = useParams();
  const park = NationalParks.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === parkName);

  if (!park) return <div>Park not found</div>;

  return (
    <div className="park-pages">
      <Header setSettingsOpen={setSettingsOpen} />

      <Settings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <h1>{park.name}</h1>
      <p><strong>Location:</strong> {park.state}</p>
      <p><strong>Coordinates:</strong> {park.coordinates}</p>
      <p><strong>Established:</strong> {park.date_established}</p>
      <p><strong>Area:</strong> {park.area}</p>
      <p><strong>Annual Visitors:</strong> {park.visitors}</p>
      <p>{park.details}</p>

      <Footer />
    </div>
  );
};

export default ParkPages;