import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Forgot-password.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://streamflow-backend.onrender.com/forgot-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "An error occurred.");
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
                {message && <p className="message">{message}</p>}
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
