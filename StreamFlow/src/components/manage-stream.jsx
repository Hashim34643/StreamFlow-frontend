import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import useWebRTC from '../hooks/useWebRTC';
import useWebSocket from '../hooks/useWebSocket';

const ManageStream = () => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [userId, setUserId] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);

    const { startStream } = useWebRTC(videoRef);
    const { sendMessage, isConnected } = useWebSocket(`wss://streamflow-backend.onrender.com/${stream?.id}`, handleMessage);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token available');
            return;
        }

        // Fetch the user profile to get the user ID
        axios.get('https://streamflow-backend.onrender.com/profile', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            const userId = response.data.user._id;
            setUserId(userId);

            // Fetch all streams for the user
            return axios.get(`https://streamflow-backend.onrender.com/${userId}/streams`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        }).then(response => {
            const liveStream = response.data.streams.find(stream => stream.liveStatus === true);
            if (liveStream) {
                setStream(liveStream);
            } else {
                console.error('No active live stream found');
            }
        }).catch(error => {
            console.error('Failed to fetch user or streams:', error);
        });
    }, []);

    const handleMessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.type === 'chat') {
            setChatMessages(prevMessages => [...prevMessages, data.message]);
        }
    };

    if (!stream) {
        return <div>Loading or no active stream found...</div>;
    }

    return (
        <div className="manage-stream-container">
            <h1>Manage Your Stream</h1>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />
            <div className="stream-details">
                <h2>Stream Title: {stream.title}</h2>
                <p>Duration: {stream.duration}</p>
                <p>Viewers: {stream.viewersCount}</p>
            </div>
            <div className="chat">
                <h3>Chat</h3>
                {chatMessages.map((msg, index) => (
                    <div key={index}>{msg.sender}: {msg.text}</div>
                ))}
            </div>
        </div>
    );
};

export default ManageStream;
