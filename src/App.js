import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
    const [photos, setPhotos] = useState([]);
    const fetchPhotos = async () => {
        const response = await axios.get("https://api.unsplash.com/photos", {
            headers: {
                Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
            }
        });

        setPhotos(response.data);
    };
    const renderPhotos = () => {
        return photos.map((photo) => {
            const { id, description, alt_description, urls } = photo;
            return (
                <div>
                    <img src={urls.regular} alt={alt_description} />
                    <p> {description || "No caption provided"}</p>
                </div>
            );
        });
    };
    useEffect(() => {
        fetchPhotos();
    }, []);
    return (
        <div className="App">
            <div className="container">{renderPhotos()}</div>
        </div>
    );
};

export default App;
