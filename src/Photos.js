import React from "react";
import "./App.css";

const Photos = ({ photos }) => {
    if (photos.length) {
        return photos.map((photo) => {
            const { id, description, alt_description, urls } = photo;
            return (
                <div key={id}>
                    <img src={urls.regular} alt={alt_description} />
                    <p> {description || null}</p>
                </div>
            );
        });
    }

    return null;
};

export default Photos;
