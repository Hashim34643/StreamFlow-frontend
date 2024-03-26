import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import "../styles/Forgot-password.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://streamflow-backend.onrender.com/forgot-password', { email });
            setMessage(response.data.message);
            setTimeout(() => navigate('/login'), 2000);
            setIsSuccessMessage(true);
        } catch (error) {
            setMessage(error.response?.data?.message || "An error occurred.");
            setIsSuccessMessage(false);
        }
    };

    useEffect(() => {
        document.body.classList.add('body-forgot-password');
        return () => {
            document.body.classList.remove('body-forgot-password');
        };
    }, []);

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {message && <div className={isSuccessMessage ? "success-message" : "error-message"}>{message}</div>}
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default ForgotPassword;

