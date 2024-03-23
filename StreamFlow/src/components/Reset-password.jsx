import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../styles/Reset-password.css";

const ResetPassword = ({ match }) => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setMessage("Passwords do not match");
        setIsSuccessMessage(false);
        return;
    }

    try {
      const response = await axios.post(`https://streamflow-backend.onrender.com/reset-password`, { token, newPassword: password });
      setMessage(response.data.message);
      setIsSuccessMessage(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
      setIsSuccessMessage(false);
    }
  };

  useEffect(() => {
    document.body.classList.add('body-reset-password');
    return () => {
        document.body.classList.remove('body-reset-password');
    };
}, []);

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {message && <div className={isSuccessMessage ? "success-message" : "error-message"}>{message}</div>}
        <button type="submit" className="submit-btn">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
