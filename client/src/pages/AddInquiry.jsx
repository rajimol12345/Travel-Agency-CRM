import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Forms.css';
import './Inquiries.css';
import { 
    ArrowLeft, 
    Save, 
    MessageSquare, 
    User, 
    Globe, 
    Zap, 
    Loader2, 
    Info, 
    Target,
    Mail,
    Phone
} from 'lucide-react';

const AddInquiry = () => {
    const [formData, setFormData] = useState({
        customer: {
            name: '',
            email: '',
            phone: ''
        },
        serviceInterested: 'Tour Package',
        source: 'Direct',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/leads', formData);
            navigate('/inquiries');
        } catch (err) {
            console.error('Failed to create inquiry:', err);
            // demo fallback
            setTimeout(() => navigate('/inquiries'), 1000);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('customer.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                customer: { ...prev.customer, [field]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div className="page-container">
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header className="page-header">
                    <div>
                        <button
                            onClick={() => navigate('/inquiries')}
                            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', color: '#64748b', fontWeight: 700, fontSize: '0.875rem', padding: 0, marginBottom: '1rem', cursor: 'pointer' }}
                        >
                            <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
                            Back to Inquiries
                        </button>
                        <h1>Register New Inquiry</h1>
                        <p>Initialize a high-potential lead in the global conversion pipeline.</p>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
                    <form onSubmit={handleSubmit} className="form-container">
                        <div className="form-section">
                            <div className="form-section-header">
                                <User size={18} color="#3b82f6" />
                                <h3 className="form-section-title">Lead Identity</h3>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Prospect Name</label>
                                <input
                                    type="text"
                                    name="customer.name"
                                    placeholder="e.g. Robert Fox"
                                    value={formData.customer.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Digital Contact</label>
                                    <div className="input-with-icon">
                                        <Mail size={16} className="input-icon" />
                                        <input
                                            type="email"
                                            name="customer.email"
                                            placeholder="prospect@example.com"
                                            value={formData.customer.email}
                                            onChange={handleChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Direct Line</label>
                                    <div className="input-with-icon">
                                        <Phone size={16} className="input-icon" />
                                        <input
                                            type="text"
                                            name="customer.phone"
                                            placeholder="+44 000 000 000"
                                            value={formData.customer.phone}
                                            onChange={handleChange}
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-section-header">
                                <Target size={18} color="#3b82f6" />
                                <h3 className="form-section-title">Strategic Interest</h3>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Service Asset</label>
                                    <select
                                        name="serviceInterested"
                                        value={formData.serviceInterested}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="Flight">Aviation (Flight)</option>
                                        <option value="Hotel">Hospitality (Hotel)</option>
                                        <option value="Tour Package">Expedition (Tour)</option>
                                        <option value="Visa">Visa Support</option>
                                        <option value="Custom">Custom Itinerary</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Acquisition Source</label>
                                    <select
                                        name="source"
                                        value={formData.source}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="Direct">Direct Engagement</option>
                                        <option value="Referral">Partner Referral</option>
                                        <option value="Social Media">Digital Campaign</option>
                                        <option value="Website">Organic Search</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Engagement Notes</label>
                                <textarea
                                    name="notes"
                                    placeholder="Specific requirements, destination preferences, or budget range..."
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="form-textarea"
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={() => navigate('/inquiries')}
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

                    <div className="info-sidebar">
                        <div className="info-header">
                            <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '8px' }}>
                                <Zap size={24} color="#3b82f6" />
                            </div>
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Conversion Intelligence</h4>
                        </div>
                        <p className="info-text">
                            Early-stage inquiries are critical for growth. Speed of response is the primary driver for successful conversion.
                        </p>
                        
                        <div className="tip-item">
                            <div style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '6px', height: 'fit-content' }}>
                                <Globe size={16} color="#64748b" />
                            </div>
                            <div className="tip-content">
                                <h5>Market Reach</h5>
                                <p>Tracking sources helps optimize marketing capital deployment.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddInquiry;
