import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Auth.css';
import { Lock, Mail, Loader2, Info, Eye, EyeOff } from 'lucide-react';

import logo from '../assets/logo.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <img src={logo} alt="FLIGHTZON" className="auth-brand-logo" />
                    <h1>Sign In</h1>
                    <p>Enter your credentials to access your account.</p>
                </div>

                {error && (
                    <div className="auth-error">
                        <Info size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="auth-form-group">
                        <label className="auth-label">Email Address</label>
                        <div className="auth-input-wrapper">
                            <Mail size={18} className="auth-icon" />
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="auth-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-form-group">
                        <label className="auth-label">Password</label>
                        <div className="auth-input-wrapper">
                            <Lock size={18} className="auth-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="auth-input"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="auth-eye-btn"
                                style={{ background: 'none', border: 'none', position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', padding: 0 }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="auth-submit-btn"
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : "Sign In"}
                    </button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <span className="auth-link" onClick={() => navigate('/register')}>Sign Up</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
