import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Forms.css';
import './Inquiries.css';
import { ArrowLeft, Save, Loader2, Info, Target, Map, Clock, DollarSign } from 'lucide-react';

const AddPackage = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'Adventure',
        duration: '',
        price: '',
        status: 'Active',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            navigate('/packages');
        }, 1000);
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
                            onClick={() => navigate('/packages')}
                            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', color: '#64748b', fontWeight: 700, fontSize: '0.875rem', padding: 0, marginBottom: '1rem', cursor: 'pointer' }}
                        >
                            <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
                            Back to Inventory
                        </button>
                        <h1>Initialize Travel Package</h1>
                        <p>Configure a signature expedition for the global inventory.</p>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
                    <form onSubmit={handleSubmit} className="form-container">
                        <div className="form-section">
                            <div className="form-section-header">
                                <Map size={18} color="#3b82f6" />
                                <h3 className="form-section-title">Package Identity</h3>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Expedition Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Santorini Sunset Cruise"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Service Category</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="Adventure">Adventure</option>
                                        <option value="Leisure">Leisure</option>
                                        <option value="Cultural">Cultural</option>
                                        <option value="Cruise">Cruise</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Temporal Duration</label>
                                    <div className="input-with-icon">
                                        <Clock size={16} className="input-icon" />
                                        <input
                                            type="text"
                                            name="duration"
                                            placeholder="e.g. 5 Days / 4 Nights"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Base Valuation (GBP)</label>
                                    <div className="input-with-icon">
                                        <DollarSign size={16} className="input-icon" />
                                        <input
                                            type="number"
                                            name="price"
                                            placeholder="Price in GBP"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Operational State</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="Active">Operational / Active</option>
                                        <option value="Seasonal">Seasonal</option>
                                        <option value="Draft">Draft / Under Dev</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={() => navigate('/packages')}
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
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Product Intelligence</h4>
                        </div>
                        <p className="info-text">
                            Unique packages drive market differentiation. Ensure duration and pricing are competitive with global benchmarks.
                        </p>
                        
                        <div className="tip-item">
                            <div style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '6px', height: 'fit-content' }}>
                                <Target size={16} color="#64748b" />
                            </div>
                            <div className="tip-content">
                                <h5>Target Audience</h5>
                                <p>Define the niche (Luxury, Solo, Family) to better target your marketing efforts.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPackage;
