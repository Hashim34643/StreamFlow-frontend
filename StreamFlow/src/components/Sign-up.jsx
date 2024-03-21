import { useState, useEffect } from 'react';
import "../styles/Sign-up.css";
import axios from 'axios';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        isStreamer: false,
        showPassword: false
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const togglePasswordVisibility = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password || formData.password !== formData.confirmPassword) {
            setErrorMessage('Please fill all required fields and make sure passwords match.');
            return;
        }

        try {
            const response = await axios.post('https://streamflow-backend.onrender.com/create-user', formData);
            if (response.data.success === true) {
                setSuccessMessage('Account created successfully! Please login.');
                setErrorMessage('');
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'Failed to create account. Please try again.';
            setErrorMessage(message);
            setSuccessMessage('');
        }
    };

    useEffect(() => {
        document.body.classList.add('body-sign-up');
        return () => {
            document.body.classList.remove('body-sign-up');
        };
    }, []);


    return (
        <div className='signup-form-container'>
            <form className='signup-form' onSubmit={handleSubmit}>
                <h2>Sign-Up</h2>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="form-group">
                    <label htmlFor='username'>Username:<span className="required-asterisk">*</span></label>
                    <input type="text" id='username' name='username' value={formData.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor='firstName'>First Name:<span className="required-asterisk">*</span></label>
                    <input type="text" id='firstName' name='firstName' value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor='lastName'>Last Name:<span className="required-asterisk">*</span></label>
                    <input type="text" id='lastName' name='lastName' value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor='email'>Email:<span className="required-asterisk">*</span></label>
                    <input type="email" id='email' name='email' value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Password:<span className="required-asterisk">*</span></label>
                    <input type={formData.showPassword ? 'text' : 'password'} id='password' name='password' value={formData.password} onChange={handleChange} required />
                    <button onClick={togglePasswordVisibility} type="button">{formData.showPassword ? 'Hide' : 'Show'}</button>
                </div>
                <div className="form-group">
                    <label htmlFor='confirmPassword'>Confirm Password:<span className="required-asterisk">*</span></label>
                    <input type={formData.showPassword ? 'text' : 'password'} id='confirmPassword' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} required />
                    <button onClick={togglePasswordVisibility} type="button">{formData.showPassword ? 'Hide' : 'Show'}</button>
                </div>

                <div className="form-group switch-container">
                    <span>Streamer?</span>
                    <label className="switch">
                        <input type="checkbox" id="isStreamer" name="isStreamer" checked={formData.isStreamer} onChange={handleChange} />
                        <span className="slider round"></span>
                    </label>
                </div>
                <button type='submit' className='submit-btn'>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;
