import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Photos from "./Photos";
import "./App.css";

const App = () => {
    const [page, setPage] = useState(1);
    const [photos, setPhotos] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const fetchPhotos = async () => {
        setPage((page) => page + 1);
        const response = await axios.get(
            `https://api.unsplash.com/photos?page=${page}&per_page=10&order_by=popular`,
            {
                headers: {
                    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
                }
            }
        );

        setPhotos([...photos, ...response.data]);
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        fetchPhotos();
        setIsFetching(false);
    });

    function handleScroll() {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
        )
            return;
        else {
            setIsFetching(true);
        }
    }

    return (
        <div className="App">
            <div className="container">
                <Photos photos={photos} />
            </div>
        </div>
    );
};

export default App;
