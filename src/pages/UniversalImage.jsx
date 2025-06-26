import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Settings from '../components/settings/Settings';
import '../App.css';
import '../components/Header.css';
import '../pages/Home.css';
import '../components/Footer.css';
import './UniversalImage.css';

const UniversalPicture = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [seed, setSeed] = useState('1');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isCropping, setIsCropping] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationProgress, setGenerationProgress] = useState(0);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const imageRef = useRef(null);
    const seedBufferRef = useRef(null);
    const [seedType, setSeedType] = useState('string');
    const [seedDisplay, setSeedDisplay] = useState('1');
    const [needsGeneration, setNeedsGeneration] = useState(false);
    const cancelledRef = useRef(false);
    const [isFindingSeed, setIsFindingSeed] = useState(false);
    const [seedFindingProgress, setSeedFindingProgress] = useState(0);

    // Optimized PRNG with chunked processing
    const createPrng = (seedInput) => {
        let seedBytes;
        if (seedInput instanceof ArrayBuffer) {
            seedBytes = new Uint8Array(seedInput);
        } else if (typeof seedInput === 'string') {
            seedBytes = new TextEncoder().encode(seedInput);
        } else {
            seedBytes = new Uint8Array(0);
        }

        const stateSize = Math.max(1, Math.ceil(seedBytes.length / 4));
        const state = new Uint32Array(stateSize);

        for (let i = 0; i < seedBytes.length; i++) {
            const index = i % stateSize;
            state[index] = (state[index] << 8) | seedBytes[i];
        }

        let counter = 0;
        return {
            next: () => {
                const idx = counter % stateSize;
                state[idx] = (state[idx] + 0x6D2B79F5) | 0;
                let t = Math.imul(state[idx] ^ (state[idx] >>> 15), 1 | state[idx]);
                t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
                state[idx] = (t ^ (t >>> 14)) >>> 0;

                counter = (counter + 1) % stateSize;

                let result = 0;
                for (let i = 0; i < stateSize; i++) {
                    result = (result ^ state[i]) >>> 0;
                }

                return result / 4294967296;
            },
            // Add a method to check if seed is small
            isSmall: () => seedBytes.length < 1000
        };
    };

    // Generate image in chunks to prevent blocking
    const generateImage = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        cancelledRef.current = false;
        // setIsGenerating(true);
        setGenerationProgress(0);
        setNeedsGeneration(false);

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const imageData = ctx.createImageData(width, height);

        // Determine seed input
        const seedInput = seedType === 'buffer' && seedBufferRef.current
            ? seedBufferRef.current
            : seed;

        const prng = createPrng(seedInput);

        const totalPixels = width * height;
        let generatedPixels = 0;

        // Optimize for small seeds by using larger chunks
        const isSmallSeed = prng.isSmall && prng.isSmall();
        const chunkSize = isSmallSeed ? 10000 : 1000;

        const generateChunk = () => {
            const startTime = performance.now();
            let pixelsProcessed = 0;

            while (pixelsProcessed < chunkSize && generatedPixels < totalPixels) {
                if (cancelledRef.current) {
                    setIsGenerating(false);
                    return;
                }

                const y = Math.floor(generatedPixels / width);
                const x = generatedPixels % width;
                const index = (y * width + x) * 4;

                imageData.data[index] = Math.floor(prng.next() * 256);     // R
                imageData.data[index + 1] = Math.floor(prng.next() * 256); // G
                imageData.data[index + 2] = Math.floor(prng.next() * 256); // B
                imageData.data[index + 3] = 255;                      // Alpha

                generatedPixels++;
                pixelsProcessed++;

                // Only update progress for large seeds to reduce overhead
                if (!isSmallSeed && generatedPixels % 100 === 0) {
                    setGenerationProgress(Math.round((generatedPixels / totalPixels) * 100));
                }

                // Don't block the main thread for more than 50ms
                if (performance.now() - startTime > 50) {
                    break;
                }
            }

            if (!isSmallSeed) {
                setGenerationProgress(Math.round((generatedPixels / totalPixels) * 100));
            }

            if (generatedPixels < totalPixels) {
                requestAnimationFrame(generateChunk);
            } else {
                ctx.putImageData(imageData, 0, 0);
                setIsGenerating(false);
            }
        };

        requestAnimationFrame(generateChunk);
    };

    // Save image as PNG
    const saveImage = () => {
        if (isGenerating) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        let safeSeed = seedDisplay;
        if (seedType === 'buffer') {
            safeSeed = 'image-seed';
        } else if (seedDisplay.length > 20) {
            safeSeed = seedDisplay.substring(0, 20) + '...';
        }

        const link = document.createElement('a');
        link.download = `universal-image-${safeSeed.replace(/[^\w]/g, '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                setUploadedImage(img);
                setIsCropping(true);

                // Center image by default
                const x = img.width > 500 ? (500 - img.width) / 2 : (500 - img.width) / 2;
                const y = img.height > 500 ? (500 - img.height) / 2 : (500 - img.height) / 2;
                setOffset({ x, y });
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    // Handle drag start
    const handleDragStart = (e) => {
        if (!isCropping || !uploadedImage) return;
        setIsDragging(true);
        setDragStart({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y
        });
    };

    // Handle dragging
    const handleDragging = (e) => {
        if (!isDragging || !uploadedImage) return;

        // Calculate new offset with boundaries
        let newX = e.clientX - dragStart.x;
        let newY = e.clientY - dragStart.y;

        // Calculate boundaries to keep image within view
        const minX = Math.min(0, 500 - uploadedImage.width);
        const minY = Math.min(0, 500 - uploadedImage.height);
        const maxX = 0;
        const maxY = 0;

        // Clamp values to boundaries
        newX = Math.max(minX, Math.min(maxX, newX));
        newY = Math.max(minY, Math.min(maxY, newY));

        setOffset({
            x: newX,
            y: newY
        });
    };

    // Handle drag end
    const handleDragEnd = () => {
        setIsDragging(false);
    };

    // Convert ArrayBuffer to Base64
    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };

    // State update function for seed finding
    const nextState = (s) => {
        s = (s + 0x6D2B79F5) >>> 0;
        let t0 = s ^ (s >>> 15);
        let t1 = Math.imul(t0, 1 | s);
        let t = t1;
        let u = t ^ (t >>> 7);
        let v = 61 | t;
        let w = Math.imul(u, v);
        t = (t + w) ^ t;
        t = t ^ (t >>> 14);
        return t >>> 0;
    };

    // Find seed from pixel data (only works for state size 1 seeds)
    const findSeedFromPixels = (pixelData) => {
        setIsFindingSeed(true);
        setSeedFindingProgress(0);

        // We only need the RGB values (ignore alpha)
        const rgbData = [];
        for (let i = 0; i < pixelData.length; i += 4) {
            rgbData.push(pixelData[i]);      // R
            rgbData.push(pixelData[i + 1]);  // G
            rgbData.push(pixelData[i + 2]);  // B
        }

        const intervals = rgbData.map(v => {
            const low = v * 0x1000000;      // v * 2^24
            const high = (v + 1) * 0x1000000 - 1;
            return { low, high };
        });

        // Brute-force range for the first pixel value
        const start = rgbData[0] * 0x1000000;
        const end = (rgbData[0] + 1) * 0x1000000 - 1;
        const total = end - start + 1;
        let count = 0;
        let foundSeed = null;

        // Check only the first 100 values for demonstration
        // In a real scenario, you'd need to check the entire range
        const sampleEnd = Math.min(start + 100, end);

        for (let s0 = start; s0 <= sampleEnd; s0++) {
            count++;
            if (count % 1000 === 0) {
                const percent = ((s0 - start) / total * 100).toFixed(2);
                setSeedFindingProgress(Math.min(100, parseFloat(percent)));
            }

            let state = s0 >>> 0;
            let valid = true;

            // Only check first 3 pixels (R, G, B) to make it feasible
            for (let i = 0; i < Math.min(3, intervals.length); i++) {
                if (state < intervals[i].low || state > intervals[i].high) {
                    valid = false;
                    break;
                }
                if (i < intervals.length - 1) {
                    state = nextState(state);
                }
            }

            if (valid) {
                foundSeed = s0;
                break;
            }
        }

        setIsFindingSeed(false);
        return foundSeed;
    };

    // Finalize crop and generate seed
    const finalizeCrop = async () => {
        if (!uploadedImage) return;

        const canvas = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');

        // Fill background with black
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 500, 500);

        // Draw the image at the current offset
        ctx.drawImage(uploadedImage, offset.x, offset.y);

        // Get image data
        const imageData = ctx.getImageData(0, 0, 500, 500);

        // Try to find a short seed from the pixel data
        const foundSeed = findSeedFromPixels(imageData.data);

        if (foundSeed !== null) {
            // Convert found seed to ArrayBuffer
            const buffer = new ArrayBuffer(4);
            const view = new DataView(buffer);
            view.setUint32(0, foundSeed, false);

            seedBufferRef.current = buffer;
            setSeedType('buffer');
            setSeed(foundSeed.toString());
            setSeedDisplay(`Found Seed: 0x${foundSeed.toString(16)}`);
            setNeedsGeneration(true);
        } else {
            setSeedDisplay("none found");
            setNeedsGeneration(true);
        }

        // Reset states
        setUploadedImage(null);
        setIsCropping(false);
    };

    // Cancel cropping
    const cancelCrop = () => {
        setUploadedImage(null);
        setIsCropping(false);
    };

    // Generate random seed
    const generateRandomSeed = () => {
        // Generate 39 random bytes (312 bits)
        const bytes = new Uint8Array(Math.floor(Math.random() * 416));
        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
            crypto.getRandomValues(bytes);
        } else {
            // Fallback for environments without crypto
            for (let i = 0; i < bytes.length; i++) {
                bytes[i] = Math.floor(Math.random() * 256);
            }
        }

        // Convert to decimal string without BigInt
        let decimalStr = '0';
        for (let i = 0; i < bytes.length; i++) {
            let carry = bytes[i];
            let newDecimal = '';

            // Multiply current decimal string by 256
            for (let j = decimalStr.length - 1; j >= 0; j--) {
                const digit = parseInt(decimalStr[j], 10);
                const product = digit * 256 + carry;
                carry = Math.floor(product / 10);
                newDecimal = (product % 10) + newDecimal;
            }

            // Add remaining carry
            while (carry > 0) {
                newDecimal = (carry % 10) + newDecimal;
                carry = Math.floor(carry / 10);
            }

            decimalStr = newDecimal;
        }

        // Ensure seed doesn't exceed 1000 characters
        if (decimalStr.length > 1000) {
            decimalStr = decimalStr.substring(0, 1000);
        }

        setSeed(decimalStr);
        setSeedDisplay(decimalStr);
        seedBufferRef.current = null;
        setNeedsGeneration(true);
    };

    // Trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // Handle manual seed change
    const handleSeedChange = (e) => {
        const input = e.target.value;
        if (input.length <= 1000) {
            setSeedDisplay(input);
        }
    };

    // Add event listeners for dragging
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleDragging);
            window.addEventListener('mouseup', handleDragEnd);
            return () => {
                window.removeEventListener('mousemove', handleDragging);
                window.removeEventListener('mouseup', handleDragEnd);
            };
        }
    }, [isDragging]);

    // Generate initial image on mount
    useEffect(() => {
        generateImage();
    }, []);

    return (
        <div className="universal-picture-page">
            <Header setSettingsOpen={setSettingsOpen} />

            <Settings
                isOpen={settingsOpen}
                onClose={() => setSettingsOpen(false)}
            />

            <div className="universal-image-container">
                <h1 className="universal-image-title">Universal Image</h1>

                {isCropping && uploadedImage && (
                    <div className="crop-modal">
                        <div className="crop-content">
                            <h2>Position Your Image</h2>
                            <p>Drag to position your image within the 500×500 frame</p>

                            <div
                                className="crop-viewport"
                                onMouseDown={handleDragStart}
                                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                            >
                                <img
                                    ref={imageRef}
                                    src={uploadedImage.src}
                                    alt="Uploaded preview"
                                    style={{
                                        transform: `translate(${offset.x}px, ${offset.y}px)`,
                                        width: uploadedImage.width,
                                        height: uploadedImage.height
                                    }}
                                    className="crop-source-image"
                                />
                                <div className="viewport-frame"></div>
                            </div>

                            <div className="image-size-info">
                                Image: {uploadedImage.width}×{uploadedImage.height}px
                            </div>

                            <div className="crop-controls">
                                <button onClick={cancelCrop} className="cancel-crop-btn">
                                    Cancel
                                </button>
                                <button
                                    onClick={finalizeCrop}
                                    className="confirm-crop-btn"
                                    disabled={isFindingSeed}
                                >
                                    {isFindingSeed ? (
                                        `Finding Seed... ${seedFindingProgress.toFixed(1)}%`
                                    ) : (
                                        "Confirm & Generate Seed"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="image-wrapper">
                    <canvas
                        ref={canvasRef}
                        width={500}
                        height={500}
                        className="universal-image-canvas"
                    />

                    {isGenerating && (
                        <div className="generation-overlay">
                            <div className="progress-container">
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${generationProgress}%` }}
                                    ></div>
                                </div>
                                <div className="progress-text">
                                    Generating image: {generationProgress}%
                                </div>
                                {generationProgress < 100 && (
                                    <div className="progress-note">
                                        This may take a moment for large seeds...
                                    </div>
                                )}

                                <button
                                    className="cancel-generation-btn"
                                    onClick={() => {
                                        cancelledRef.current = true;
                                        setIsGenerating(false);
                                    }}                                >
                                    Cancel Generation
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="seed-controls">
                    <div className="seed-input-group">
                        <label htmlFor="seed-input">Seed:</label>
                        <div className="seed-textarea-wrapper">
                            <textarea
                                id="seed-input"
                                value={seedDisplay}
                                onChange={handleSeedChange}
                                placeholder="Enter seed value"
                                className="seed-textarea"
                                disabled={isGenerating || seedType === 'buffer'}
                                maxLength={1000}
                            />
                            <div className="character-counter">
                                {seedDisplay.length}/1000
                            </div>
                        </div>
                    </div>


                    <div className="control-buttons">

                        <button
                            className="generate-image-btn"
                            onClick={() => generateImage()}
                            disabled={isGenerating}
                        >
                            Generate Image
                        </button>
                        <button
                            className="random-seed-btn"
                            onClick={() => {
                                generateRandomSeed(); // Runs first
                                generateImage();      // Runs immediately after
                            }} 
                            disabled={isGenerating}
                        >
                            Random Generation
                        </button>
                        {/* 
                        <button
                            className="upload-image-btn"
                            onClick={triggerFileInput}
                            disabled={isGenerating}
                        >
                            Upload Image
                        </button> */}



                        <button
                            className="save-image-btn"
                            onClick={saveImage}
                            disabled={isGenerating}
                        >
                            Save Image
                        </button>
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        style={{ display: 'none' }}
                        disabled={isGenerating}
                    />
                </div>

                <div className="image-info">
                    <p>This "Universal Image" is a 500x500 randomly generated image.
                        Each pixel is generated from the seed using a Pseudo Random Number Generator.
                        In theory, every image ever taken and will be taken exists within this frame
                        given the right seed. Each pixel has an RGB value ranging from 0-255,
                        which means that there are 16,777,216 unique colors per pixel (256x256x256). Within
                        this 500x500 frame there are 250,000 total pixels which makes 2^(6,000,000) unique images!
                        16,777,216^(250,000) = (2^(24))^(250,000) = 2^(6,000,000)</p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default UniversalPicture;