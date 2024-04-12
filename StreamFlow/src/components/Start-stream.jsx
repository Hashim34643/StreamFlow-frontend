import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/Start-stream.css";
import useWebRTC from '../hooks/useWebRTC';
import useWebSocket from '../hooks/useWebSocket';


const StartStream = () => {
    const [streamTitle, setStreamTitle] = useState('');
    const [category, setCategory] = useState('Fortnite');
    const [description, setDescription] = useState('');
    const [isStreamer, setIsStreamer] = useState(false);
    const [userId, setUserId] = useState("");
    const videoRef = useRef(null);
    const navigate = useNavigate();

    const { startStream } = useWebRTC(videoRef);
    const { sendMessage, isConnected } = useWebSocket('wss://streamflow-backend.onrender.com', handleMessage);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to start a stream.');
            navigate('/login');
            return;
        }

        axios.get('https://streamflow-backend.onrender.com/profile', {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
            setIsStreamer(response.data.user.isStreamer);
            setUserId(response.data.user._id);
            if (response.data.user.isStreamer) {
                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    startStream(stream);
                })
                .catch((err) => {
                    console.error('Error accessing the camera:', err);
                });
            }
        })
        .catch(error => {
            console.error('Failed to fetch user data:', error);
            navigate('/login');
        });
    }, [navigate, startStream]);

    const handleStartStream = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.post(`https://streamflow-backend.onrender.com/${userId}/start-stream`, {
            streamTitle,
            category,
            description,
        }, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
            alert('Stream started successfully!');
            navigate(`/stream/${response.data.streamId}`);
        })
        .catch(error => {
            console.error('Error starting stream:', error.message);
            alert('Failed to start stream. Please try again.');
        });
    };

    const handleCancel = () => {
        navigate("/");
    };

    if (!isStreamer) {
        return (
            <div className="not-streamer-message">
                <p>You need to select "Streamer" in your profile settings to start a stream.</p>
                <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
            </div>
        );
    }

    return (
        <div className="start-stream-container">
            <h2>Start Your Stream</h2>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />
            <form onSubmit={handleStartStream}>
                <div>
                    <label>Stream Title:</label>
                    <input type="text" value={streamTitle} onChange={(e) => setStreamTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Select Category</option>
                        <option value="Fortnite">Fortnite</option>
                        <option value="Minecraft">Minecraft</option>
                        <option value="League of Legends">League of Legends</option>
                        <option value="Chatting">Chatting</option>
                        <option value="In Real Life">In Real Life</option>
                        <option value="Grand Theft Auto V">Grand Theft Auto V</option>
                        <option value="EA Sports FC 24">EA Sports FC 24</option>
                        <option value="Among Us">Among Us</option>
                        <option value="Tom Clancys Rainbow Six Siege">Tom Clancy's Rainbow Six Siege</option>
                        <option value="Call Of Duty: Modern Warfare III">Call Of Duty: Modern Warfare III</option>
                        <option value="Education">Education</option>
                    </select>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit">Start Streaming</button>
                <button type="button" onClick={handleCancel} className='cancel-button'>Cancel</button>
            </form>
        </div>
    );
};

export default StartStream;

