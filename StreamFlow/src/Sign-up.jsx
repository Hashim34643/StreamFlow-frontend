import { useState } from 'react'
import "./styles/Sign-up.css"

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        isStreamer: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("success");
    }
    return (
        <div className='signup-form-container'>
            <form className='signup-form' onSubmit={handleSubmit}>
                <h2>Sign-Up</h2>
                <div className="form-group">
                    <label htmlFor='username'>Username:</label>
                    <input type="text" id='username' name='username' value={formData.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor='firstName'>First Name:</label>
                    <input type="text" id='firstName' name='firstName' value={formData.firstName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor='lastName'>Last Name:</label>
                    <input type="text" id='lastName' name='lastName' value={formData.lastName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor='email'>Email:</label>
                    <input type="email" id='email' name='email' value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Password:</label>
                    <input type="password" id='password' name='password' value={formData.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input type="password" id='confirmPassword' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <span>Streamer?</span>
                    <label for="isStreamer" class="switch">
                        <input type="checkbox" id="isStreamer" name="isStreamer" />
                        <span class="slider round"></span>
                    </label>
                </div>
                <button type='submit' className='submit-btn'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;