import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Profile.css";

const Profile = () => {
    const [user, setUser] = useState({ followers: [], following: [] });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get('https://streamflow-backend.onrender.com/profile', config);
                setUser(response.data.user);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };

        fetchUserData();

        document.body.classList.add('body-profile');
        
        return () => {
            document.body.classList.remove('body-profile');
        };
    }, []);

    return (
        <div className="profile-container">
            <div className="avatar-container">
                <img src={user.avatar || 'default_avatar.png'} alt="User Avatar" className="avatar"/>
            </div>
            <div className="user-info">
                <h2>{user.username}</h2>
                <p>Followers: {user.followers.length}</p>
                <p>Following: {user.following.length}</p>
                <a href="/edit-profile" className="edit-profile-link">Edit Profile</a>
            </div>
        </div>
    );
};

export default Profile;
