import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Profile.css';
import "../styles/View-profile.css";
import Header from './Header';

const ViewProfile = () => {
    const { userId, streamerId } = useParams();
    const [user, setUser] = useState({ followers: [], following: [], avatar: '', username: '', recentStreams: [] });
    const [isFollowing, setIsFollowing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('view-profile-page-background');
        const fetchUserProfileAndStreams = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                };

                const userProfileResponse = await axios.get(`https://streamflow-backend.onrender.com/user/${streamerId}`, config);
                setUser(userProfileResponse.data.user);

                const isFollowingResponse = await axios.get(`https://streamflow-backend.onrender.com/${userId}/isFollowing/${streamerId}`, config);
                setIsFollowing(isFollowingResponse.data.isFollowing);
            } catch (error) {
                console.error("Error fetching user profile or streams", error);
            }
        };

        fetchUserProfileAndStreams();
        return () => {
            document.body.classList.remove('view-profile-page-background');
        };
    }, [userId, streamerId]);

    const handleFollowUnfollow = async () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        };
        try {
            if (isFollowing) {
                await axios.post(`https://streamflow-backend.onrender.com/${userId}/unfollow/${streamerId}`, {}, config);
            } else {
                await axios.post(`https://streamflow-backend.onrender.com/${userId}/follow/${streamerId}`, {}, config);
            }
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error("Error following/unfollowing user:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="view-profile-page">
                <div className="view-profile-content">
                    <div className="view-profile-avatar-container">
                        <img src={user.avatar} alt={`${user.username}'s avatar`} className="view-profile-user-avatar" />
                    </div>
                    <h2 className="view-profile-username">{user.username || 'Username'}'s Profile</h2>
                    <div className="view-profile-stats">
                        <p className="view-profile-followers">Followers: {user.followers?.length || 0}</p>
                        <p className="view-profile-following">Following: {user.following?.length || 0}</p>
                    </div>
                    <button onClick={handleFollowUnfollow} className="view-profile-follow-unfollow-btn">
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ViewProfile;


