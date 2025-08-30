// ParkDetail.js
import { useParams } from 'react-router-dom';
import NationalParks from '../components/NationalParks';

const ParkDetail = () => {
  const { parkName } = useParams();
  const park = NationalParks.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === parkName);
  
  if (!park) return <div>Park not found</div>;
  
  return (
    <div className="park-detail">
      <h1>{park.name}</h1>
      <img src={park.image} alt={park.name} />
      <p><strong>Location:</strong> {park.state}</p>
      <p><strong>Coordinates:</strong> {park.coordinates}</p>
      <p><strong>Established:</strong> {park.established}</p>
      <p><strong>Area:</strong> {park.area}</p>
      <p><strong>Annual Visitors:</strong> {park.visitors}</p>
      <p>{park.details}</p>
    </div>
  );
};

export default ParkDetail;