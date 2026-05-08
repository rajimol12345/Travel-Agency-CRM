import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Forms.css';
import './Inquiries.css';
import { 
    ArrowLeft, 
    Save, 
    UserPlus, 
    Mail, 
    Phone, 
    MapPin, 
    Globe, 
    Briefcase, 
    Loader2, 
    Info, 
    ShieldCheck,
    Zap
} from 'lucide-react';

const AddAgent = () => {
    const [formData, setFormData] = useState({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        location: '',
        status: 'Active',
        commissionRate: '10'
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // In a real app: await api.post('/agents', formData);
            setTimeout(() => {
                setLoading(false);
                navigate('/agents');
            }, 1000);
        } catch (err) {
            console.error('Failed to register agent:', err);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="page-container">
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header className="page-header">
                    <div>
                        <button
                            onClick={() => navigate('/agents')}
                            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', color: '#64748b', fontWeight: 700, fontSize: '0.875rem', padding: 0, marginBottom: '1rem', cursor: 'pointer' }}
                        >
                            <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
                            Back to Partners
                        </button>
                        <h1>Register B2B Partner</h1>
                        <p>Initialize a new business relationship and define commercial terms.</p>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
                    <form onSubmit={handleSubmit} className="form-container">
                        <div className="form-section">
                            <div className="form-section-header">
                                <Briefcase size={18} color="#3b82f6" />
                                <h3 className="form-section-title">Corporate Profile</h3>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Agency / Partner Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Skyline Travel Group"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Primary Liaison</label>
                                    <div className="input-with-icon">
                                        <UserPlus size={16} className="input-icon" />
                                        <input
                                            type="text"
                                            name="contactPerson"
                                            placeholder="Contact person name"
                                            value={formData.contactPerson}
                                            onChange={handleChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Operational Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="Active">Active / Verified</option>
                                        <option value="Pending">Pending Verification</option>
                                        <option value="Inactive">On Hold</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-section-header">
                                <Globe size={18} color="#3b82f6" />
                                <h3 className="form-section-title">Communication & Logistics</h3>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Corporate Email</label>
                                    <div className="input-with-icon">
                                        <Mail size={16} className="input-icon" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="partners@agency.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Direct Contact</label>
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

                            <div className="form-group">
                                <label className="form-label">Headquarters / Location</label>
                                <div className="input-with-icon">
                                    <MapPin size={16} className="input-icon" />
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="e.g. London, United Kingdom"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-section-header">
                                <ShieldCheck size={18} color="#3b82f6" />
                                <h3 className="form-section-title">Commercial Agreement</h3>
                            </div>

                            <div className="form-group" style={{ maxWidth: '200px' }}>
                                <label className="form-label">Commission Rate (%)</label>
                                <input
                                    type="number"
                                    name="commissionRate"
                                    value={formData.commissionRate}
                                    onChange={handleChange}
                                    className="form-input"
                                    min="0"
                                    max="100"
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={() => navigate('/agents')}
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
                                <Info size={24} color="#3b82f6" />
                            </div>
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Network Growth</h4>
                        </div>
                        <p className="info-text">
                            B2B partnerships are the backbone of our scale operations. Verified agents receive priority access to signature inventory.
                        </p>
                        
                        <div className="tip-item">
                            <div style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '6px', height: 'fit-content' }}>
                                <Zap size={16} color="#64748b" />
                            </div>
                            <div className="tip-content">
                                <h5>Incentives</h5>
                                <p>Standard commission rates start at 10% for new verified partners.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAgent;
