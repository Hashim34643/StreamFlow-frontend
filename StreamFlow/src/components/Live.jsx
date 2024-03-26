import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { Link } from 'react-router-dom';

const Live = () => {
    const [liveStreams, setLiveStreams] = useState([]);

    useEffect(() => {
        axios.get('https://streamflow-backend.onrender.com/streams')
            .then(response => {
                setLiveStreams(response.data.streams.sort((a, b) => b.currentViewers - a.currentViewers));
            })
            .catch(error => console.error("Error fetching live streams:", error));
    }, []);

    return (
        <div>
            <Header />
            <div className="live-streams-container">
                <h1 className="live-streams-title">Live Streams</h1>
                <div className="stream-grid">
                    {liveStreams.map((stream, index) => (
                        <div key={stream.id || index} className="stream-card">
                            <img src={stream.thumbnail} alt={`${stream.title} thumbnail`} className="stream-thumbnail" />
                            <div className="stream-info">
                                <h2 className="stream-title">{stream.title}</h2>
                                <p className="stream-viewer-count">{stream.currentViewers} viewers</p>
                                <Link to={`/stream/${stream.id}`} className="watch-stream-link">Watch Stream</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Live;

