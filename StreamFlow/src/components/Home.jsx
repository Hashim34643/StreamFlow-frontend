import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import SearchComponent from './Search';
import StartStream from './Start-stream';

const Home = () => {
    const [showStartStream, setShowStartStream] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const startStreaming = queryParams.get('startStreaming') === 'true';
        setShowStartStream(startStreaming);
    }, [location]);

    return (
        <div>
            <Header />
            <SearchComponent />
            {showStartStream && <StartStream />}
        </div>
    );
};

export default Home;


