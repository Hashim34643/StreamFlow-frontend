import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
    const [user, setUser] = useState({ followers: [], following: [] });
    const [recentStreams, setRecentStreams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('body-profile');

        const fetchUserData = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };

            try {
                const userResponse = await axios.get('https://streamflow-backend.onrender.com/profile', config);
                setUser(userResponse.data.user);

                const streamsResponse = await axios.get(`https://streamflow-backend.onrender.com/${userResponse.data.user._id}/streams`, config);
                setRecentStreams(streamsResponse.data.streams);
            } catch (error) {
                console.error("Failed to fetch user data or streams", error);
            }
        };

        fetchUserData();
        return () => {
            document.body.classList.remove('body-profile');
        };
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="profile-page">
            <div className="profile-nav">
                <Link to="/" className="home-link">Home</Link>
                <Link to="/" className="streamflow-title">StreamFlow</Link>
                <div className="avatar-container">
                    <img src={user.avatar} alt="User Avatar" className="user-avatar" />
                </div>
            </div>
            <div className="profile-content">
                <h2>{user.username}'s Profile</h2>
                <div className="profile-stats">
                    <p>Followers: {user.followers.length}</p>
                    <p>Following: {user.following.length}</p>
                    <Link to="/edit-profile" className="edit-profile-link">Edit Profile</Link>
                </div>
                {recentStreams.length > 0 ? recentStreams.map((stream, index) => (
                    <div key={index} className="recent-streams">
                        <h3>Recent streams:</h3>
                        <h4 className="stream-title">{stream.streamTitle}</h4>
                        <p className="stream-description">{stream.streamDescription}</p>
                        <p className="stream-category">Category: {stream.category}</p>
                        <p className="stream-start-time">Date: {new Date(stream.startTime).toLocaleDateString()}</p>
                        <p className="stream-duration">Duration: {stream.streamDuration}</p>
                    </div>
                )) : <p>No recent streams...</p>}
                <button onClick={handleLogout} className="logout-btn">Log Out</button>
            </div>
        </div>
    );
};

export default Profile;


