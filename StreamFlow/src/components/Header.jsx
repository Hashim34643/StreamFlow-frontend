import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Header.css';

const Header = () => {
    const [userAvatar, setUserAvatar] = useState('');

    useEffect(() => {
        const fetchUserAvatar = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };

            try {
                const response = await axios.get('https://streamflow-backend.onrender.com/profile', config);
                if (response.data.user.avatar) {
                    setUserAvatar(response.data.user.avatar);
                }
            } catch (error) {
                console.error("Error fetching user's avatar:", error);
            }
        };

        fetchUserAvatar();
    }, []);

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">StreamFlow</Link>
            </div>
            <nav className="navbar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/live">Live</Link></li>
                    <li><Link to="/categories">Categories</Link></li>
                </ul>
            </nav>
            <div className="profile">
                <Link to="/profile">
                    <img src={userAvatar} alt="Profile" className="user-avatar" />
                </Link>
            </div>
        </header>
    );
};

export default Header;


