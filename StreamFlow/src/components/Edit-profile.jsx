import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Edit-profile.css";

const EditProfile = () => {
    const [userId, setUserId] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        bio: '',
        isStreamer: false,
    });
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        document.body.classList.add('body-edit-profile');
        const fetchUserData = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };
            try {
                const response = await axios.get('https://streamflow-backend.onrender.com/profile', config);
                const { _id, firstName, lastName, bio, isStreamer } = response.data.user;
                setUserId(_id);
                setFormData({ firstName, lastName, bio, isStreamer });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        fetchUserData();

        return () => {
            document.body.classList.remove('body-edit-profile');
        };
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        try {
            const response = await axios.patch(`https://streamflow-backend.onrender.com/update-user/${userId}`, formData, config);
            setSuccessMessage('Profile updated successfully!');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Failed to update profile. Please try again.');
            setSuccessMessage('');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='edit-profile-container'>
            <form className='edit-profile-form' onSubmit={handleSubmit}>
                <h2>Edit Profile</h2>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange}></textarea>
                </div>
                <div className="form-group switch-container">
                    <span>Streamer?</span>
                    <label className="switch">
                        <input type="checkbox" id="isStreamer" name="isStreamer" checked={formData.isStreamer} onChange={handleChange} />
                        <span className="slider round"></span>
                    </label>
                </div>
                <button type='submit' className='profile-submit-btn'>Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;

