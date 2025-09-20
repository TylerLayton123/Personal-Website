import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Settings from '../components/settings/Settings';
import ParticleBackground from '../components/ParticleBackground';
import '../App.css';
import '../components/Header.css';
import '../pages/Home.css';
import '../components/Footer.css';
import './Extras.css';

const Extras = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [apodData, setApodData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAPOD();
    }, []);

    const fetchAPOD = async () => {
        try {
            setLoading(true);
            setError(null);

            // Use your API key
            let url = 'https://api.nasa.gov/planetary/apod?api_key=tBLA2cnk8LMOBfuXGGGey1BBGZSe9d1sIwFehRaM&thumbs=true';

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Check if the response contains an error code from NASA API
            if (data.error) {
                throw new Error(data.error.message || 'NASA API error');
            }
            //   console.log(response.explanation);
            setApodData(data);
        } catch (err) {
            console.error('Error fetching APOD:', err);

            setError(`API temporarily unavailable. Showing sample image. Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const navBar = [
    {
      title: 'Random Image Generator',
      path: '/extras/random_image',
      // description: "sdlfgwoingowinfow",
    }];

    return (
        <div className="extras-page">
            <Header setSettingsOpen={setSettingsOpen} />

            <Settings
                isOpen={settingsOpen}
                onClose={() => setSettingsOpen(false)}
            />

            <div className="extras-container">
                <h1 className="extras-title">NASA Astronomy Picture of the Day</h1>

                {loading && (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading space imagery...</p>
                    </div>
                )}

                {error && (
                    <div className="error-container">
                        <h2>Notice: API Limitations</h2>
                        <p>{error}</p>
                        <button onClick={() => fetchAPOD()} className="retry-btn">
                            Try Again
                        </button>
                    </div>
                )}

                {apodData && !loading && (
                    <div className="apod-content">


                        <div className="apod-media-background">
                            <div className="media-container">
                                {apodData.media_type === 'image' ? (
                                    <img
                                        src={apodData.url}
                                        alt={apodData.title}
                                        className="apod-image"
                                        onError={(e) => {
                                            if (!apodData.error) {
                                                setError("Image failed to load. Using fallback image.");
                                            }
                                        }}
                                    />
                                ) : (
                                    <iframe
                                        src={apodData.url}
                                        title={apodData.title}
                                        className="apod-video"
                                        allowFullScreen
                                    />
                                )}
                            </div>
                            <div className="gradient-overlay"></div>
                        </div>

                        <div className="apod-details">
                            <div className="apod-header">
                                <h2 className="apod-title">{apodData.title}</h2>
                                <p className="apod-date">
                                    {new Date(apodData.date + 'T12:00:00Z').toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        timeZone: 'UTC'
                                    })}
                                </p>
                            </div>
                            <div className="explanation-container">
                                <p className="apod-explanation">{apodData.explanation}</p>
                            </div>

                            {apodData.copyright && (
                                <p className="apod-copyright">Copyright: {apodData.copyright}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="other-section">
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


            <Footer />
        </div>
    );
};

export default Extras;