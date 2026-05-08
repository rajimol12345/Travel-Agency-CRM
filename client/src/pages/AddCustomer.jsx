import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Forms.css';
import './Inquiries.css';
import { 
    ArrowLeft, 
    Save, 
    User as UserIcon, 
    Mail, 
    Phone, 
    MapPin, 
    Globe, 
    CreditCard, 
    Loader2, 
    Info, 
    Target, 
    Zap 
} from 'lucide-react';

const AddCustomer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        segment: 'new',
        preferences: {
            destinations: [],
            budget: '',
            travelType: ''
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/customers', formData);
            navigate('/customers');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create customer profile.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'budget') {
            setFormData(prev => ({
                ...prev,
                preferences: { ...prev.preferences, budget: value }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <div className="page-container">
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header className="page-header">
                    <div>
                        <button
                            onClick={() => navigate('/customers')}
                            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', color: '#64748b', fontWeight: 700, fontSize: '0.875rem', padding: 0, marginBottom: '1rem', cursor: 'pointer' }}
                        >
                            <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
                            Back to Directory
                        </button>
                        <h1>Initialize Client Profile</h1>
                        <p>Create a high-fidelity business relationship entry in the global directory.</p>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
                    {/* Form Column */}
                    <form onSubmit={handleSubmit} className="form-container">
                        {error && (
                            <div style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                                <Info size={18} />
                                {error}
                            </div>
                        )}

                        <div className="form-section">
                            <div className="form-section-header">
                                <UserIcon size={18} color="#3b82f6" />
                                <h3 className="form-section-title">Core Identity Profile</h3>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Full Legal Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Alexander Rivera"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <div className="input-with-icon">
                                        <Mail size={16} className="input-icon" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="alex@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <div className="input-with-icon">
                                        <Phone size={16} className="input-icon" />
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="+44 000 000 000"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-section-header">
                                <Globe size={18} color="#3b82f6" />
                                <h3 className="form-section-title">Strategic Logistics</h3>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Physical Residence</label>
                                <div className="input-with-icon">
                                    <MapPin size={16} className="input-icon" style={{ top: '1rem' }} />
                                    <textarea
                                        name="address"
                                        placeholder="Full residential or business address..."
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="form-textarea"
                                        style={{ paddingLeft: '2.75rem' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Relationship Segment</label>
                                    <select
                                        name="segment"
                                        value={formData.segment}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="new">Standard Relation</option>
                                        <option value="VIP">High-Value (VIP)</option>
                                        <option value="corporate">Enterprise Asset</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Fiscal Capacity</label>
                                    <div className="input-with-icon">
                                        <CreditCard size={16} className="input-icon" />
                                        <input
                                            type="text"
                                            name="budget"
                                            placeholder="Estimated budget..."
                                            value={formData.preferences.budget}
                                            onChange={handleChange}
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={() => navigate('/customers')}
                                className="secondary-btn"
                                style={{ background: 'white', border: '1px solid #e2e8f0' }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="primary-btn"
                            >
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <><Save size={18} /> Save</>}
                            </button>
                        </div>
                    </form>

                    {/* Sidebar Information */}
                    <div className="info-sidebar">
                        <div className="info-header">
                            <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '8px' }}>
                                <Info size={24} color="#3b82f6" />
                            </div>
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Strategic Insight</h4>
                        </div>
                        <p className="info-text">
                            Accurate data entry is critical for operational intelligence. Ensure names match official travel documents.
                        </p>
                        
                        <div className="tip-item">
                            <div style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '6px', height: 'fit-content' }}>
                                <Target size={16} color="#64748b" />
                            </div>
                            <div className="tip-content">
                                <h5>Segmentation</h5>
                                <p>Categorizing clients helps in personalized service delivery.</p>
                            </div>
                        </div>

                        <div className="tip-item">
                            <div style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '6px', height: 'fit-content' }}>
                                <Zap size={16} color="#64748b" />
                            </div>
                            <div className="tip-content">
                                <h5>Fiscal Capacity</h5>
                                <p>Budget tracking aids in targeted travel offers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCustomer;
