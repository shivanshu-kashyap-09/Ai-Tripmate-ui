import React, { useState } from "react";
import axios from "axios";

const PexelsGallery = () => {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchImages = async () => {
        if (!query) return;
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/ai/image-search?query=${query}`);
            setImages(response.data.photos);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
        setLoading(false);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Pexels Image Search</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for images..."
                style={{ padding: "10px", width: "300px", marginRight: "10px" }}
            />
            <button onClick={searchImages} style={{ padding: "10px" }}>
                Search
            </button>

            {loading && <p>Loading images...</p>}

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
                {images.map((photo) => (
                    <img
                        key={photo.id}
                        src={photo.src.medium}
                        alt={photo.photographer}
                        style={{ width: "300px", height: "200px", margin: "10px", borderRadius: "10px" }}
                    />
                ))}
            </div>
        </div>
    );
};

export default PexelsGallery;
