import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/Login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://streamflow-backend.onrender.com/login", formData);
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                navigate("/");
            } else {
                throw new Error("Login failed");
            }
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Login failed. Please try again.";
            setErrorMessage(message);
        }
    };
    useEffect(() => {
        document.body.classList.add('body-login');
        return () => {
            document.body.classList.remove('body-login');
        };
    }, []);


    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <div className="password-container">
                    <input
                        type={formData.showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <FontAwesomeIcon
                        icon={formData.showPassword ? faEyeSlash : faEye}
                        onClick={togglePasswordVisibility}
                        className="toggle-password-visibility"
                    />
                    </div>
                    <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                </div>
                <button type="submit" className="submit-btn">Log In</button>
            </form>
        </div>
    );
};

export default LoginForm;
