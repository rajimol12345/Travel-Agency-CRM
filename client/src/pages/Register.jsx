import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Auth.css';
import { Lock, Mail, Loader2, User, Info, Eye, EyeOff } from 'lucide-react';

import logo from '../assets/logo.png';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('agent'); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await api.post('/auth/register', { name, email, password, role });
            localStorage.setItem('token', data.token);
            navigate('/'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please contact an administrator.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <img src={logo} alt="FLIGHTZON" className="auth-brand-logo" />
                    <h1>Sign Up</h1>
                    <p>Create an account to start managing your travel agency.</p>
                </div>

                {error && (
                    <div className="auth-error">
                        <Info size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="auth-form-group">
                        <label className="auth-label">Full Name</label>
                        <div className="auth-input-wrapper">
                            <User size={18} className="auth-icon" />
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="auth-input"
                                required
                            />
                        </div>
                    </div>

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
                                placeholder="Create a secure password"
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
                        {loading ? <Loader2 size={20} className="animate-spin" /> : "Sign Up"}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <span className="auth-link" onClick={() => navigate('/login')}>Sign In</span>
                </div>
            </div>
        </div>
    );
};

export default Register;
