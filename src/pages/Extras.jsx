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
// require("dotenv").config();


const Extras = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [apodData, setApodData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fallbackUsed, setFallbackUsed] = useState(false);

    useEffect(() => {
        fetchAPOD();
    }, []);

    const fetchAPOD = async () => {
        try {
            setLoading(true);
            setError(null);
            setFallbackUsed(false);

            console.log("API Key exists:", !!process.env.REACT_APP_NASA_API_KEY);
            console.log("API Key (first 5 chars):", process.env.REACT_APP_NASA_API_KEY?.substring(0, 5));
            

            let date = new Date();
            date.setDate(date.getDate()-5);
            let data = null;
            let attempts = 0;
            const maxAttempts = 20; 


            while (attempts < maxAttempts) {
                attempts++;
                const dateStr = date.toISOString().split("T")[0];
                const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&thumbs=true&date=${dateStr}`;
                
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        // If we get an error, just try the previous day
                        date.setDate(date.getDate() - 1);
                        continue;
                    }

                    data = await response.json();
                    
                    console.log(data);

                    if (data.error) {
                        date.setDate(date.getDate() - 1);
                        continue;
                    }

                    // if no copyright, we're done
                    if (data.media_type === 'image') {
                        if (dateStr !== new Date().toISOString().split("T")[0]) {
                            setFallbackUsed(true);
                        }
                        break;
                    }

                    // otherwise go back 1 day
                    date.setDate(date.getDate() - 1);
                } catch (err) {
                    // If there's an error fetching for this date, try previous day
                    date.setDate(date.getDate() - 1);
                }

            }

            if (attempts >= maxAttempts && !data) {
                throw new Error("Failed to fetch APOD after multiple attempts");
            }

            setApodData(data);
        } catch (err) {
            console.error("Error fetching APOD:", err);
            setError(`API temporarily unavailable. Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const navBar = [
        {
            title: 'Random Image Generator',
            path: '/extras/random_image',
        }
    ];

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
                                        onError={() => {
                                            if (!apodData.error) {
                                                setError("Image failed to load. Using fallback image.");
                                            }
                                        }}
                                    />
                                ) : apodData.media_type === 'video' ? (
                                    apodData.url.includes("youtube.com") || apodData.url.includes("vimeo.com") ? (
                                        <iframe
                                            src={apodData.url}
                                            title={apodData.title}
                                            className="apod-video"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <video
                                            src={apodData.url}
                                            controls
                                            className="apod-video"
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    )
                                ) : (
                                    <p>Unsupported media type: {apodData.media_type}</p>
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
                                {fallbackUsed && (
                                    <p className="apod-date">
                                        Today's picture is copyrighted. Showing last non-copyrighted photo
                                    </p>
                                )}
                            </div>
                            <div className="explanation-container">
                                <p className="apod-explanation">{apodData.explanation}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="other-section">
                <ParticleBackground contentSection="true" />
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
