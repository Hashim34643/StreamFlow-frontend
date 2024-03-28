import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
    const [user, setUser] = useState({ followers: [], following: [], avatar: '' });
    const [recentStreams, setRecentStreams] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [streamsPerPage] = useState(4);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('body-profile');

        const fetchUserDataAndStreams = async () => {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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

        fetchUserDataAndStreams();

        return () => {
            document.body.classList.remove('body-profile');
        };
    }, []);

    const indexOfLastStream = currentPage * streamsPerPage;
    const indexOfFirstStream = indexOfLastStream - streamsPerPage;
    const currentStreams = recentStreams.slice(indexOfFirstStream, indexOfLastStream);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const Pagination = ({ streamsPerPage, totalStreams, paginate }) => {
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalStreams / streamsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <a onClick={() => paginate(number)} href='!#' className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    };

    return (
        <div className="profile-page">
            <div className="profile-nav">
                <Link to="/" className="home-link">Home</Link>
                <Link to="/" className="streamflow-title">StreamFlow</Link>
                <div className="avatar-container">
                    <img src={user.avatar} alt="User Avatar" className="user-avatar"/>
                </div>
            </div>
            <div className="profile-content">
                <h2>{user.username}'s Profile</h2>
                <div className="profile-stats">
                    <p>Followers: {user.followers.length}</p>
                    <p>Following: {user.following.length}</p>
                    <Link to="/edit-profile" className="edit-profile-link">Edit Profile</Link>
                </div>
                <div className="recent-streams-section">
                    <h3>Recent Streams</h3>
                    <div className="recent-streams-grid">
                        {currentStreams.map((stream, index) => (
                            <div key={index} className="stream-detail">
                                <h4 className="stream-title">{stream.streamTitle}</h4>
                                <p className="stream-category">Category: {stream.category}</p>
                                <p className="stream-start-time">Date: {new Date(stream.startTime).toLocaleDateString()}</p>
                                <p className="stream-duration">Duration: {stream.streamDuration} minutes</p>
                            </div>
                        ))}
                    </div>
                    <Pagination streamsPerPage={streamsPerPage} totalStreams={recentStreams.length} paginate={paginate} />
                </div>
                <button onClick={handleLogout} className="logout-btn">Log Out</button>
            </div>
        </div>
    );
};

export default Profile;
