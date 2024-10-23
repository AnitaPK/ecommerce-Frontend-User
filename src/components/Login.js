import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, loginUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'; 
import sideImage from '../assets/image2.jpg'
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const action = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(action)) {
        dispatch(getUserInfo());
        
        navigate('/dashboard'); 
    } else {
        console.error('Login failed:', action.error.message);
    }
    };
    

    return (
        <div className="login-container">
            <div className="image-container">
                <img src={sideImage} alt="Login" className="login-image" /> 
            </div>
            <div className="form-container">
                <h2>Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="mt-3">
                    Not registered? <a href="/register">Create an account</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
