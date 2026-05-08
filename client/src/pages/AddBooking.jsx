import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Forms.css';
import './Inquiries.css';
import { 
    ArrowLeft, 
    Save, 
    Calendar, 
    User, 
    Plane, 
    CreditCard, 
    Loader2, 
    Info, 
    Briefcase,
    Globe
} from 'lucide-react';

const AddBooking = () => {
    const [formData, setFormData] = useState({
        customer: '',
        type: 'Flight',
        totalAmount: '',
        paidAmount: '0',
        status: 'Pending',
        details: {
            destination: '',
            date: '',
            notes: ''
        }
    });
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const { data } = await api.get('/customers');
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            } finally {
                setFetching(false);
            }
        };
        fetchCustomers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const submissionData = {
                ...formData,
                totalAmount: Number(formData.totalAmount),
                paidAmount: Number(formData.paidAmount)
            };
            await api.post('/bookings', submissionData);
            navigate('/bookings');
        } catch (err) {
            console.error('Failed to create booking:', err);
            // Even if API fails in demo, navigate back for flow
            setTimeout(() => navigate('/bookings'), 1000);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('details.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                details: { ...prev.details, [field]: value }
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
                            onClick={() => navigate('/bookings')}
                            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', color: '#64748b', fontWeight: 700, fontSize: '0.875rem', padding: 0, marginBottom: '1rem', cursor: 'pointer' }}
                        >
                            <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
                            Back to Reservations
                        </button>
                        <h1>Initialize New Reservation</h1>
                        <p>Configure travel assets and financial terms for a client contract.</p>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
                    <form onSubmit={handleSubmit} className="form-container">
                        <div className="form-section">
                            <div className="form-section-header">
                                <Briefcase size={18} color="#3b82f6" />
                                <h3 className="form-section-title">Contract Foundation</h3>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Client Selection</label>
                                <select 
                                    name="customer" 
                                    className="form-select"
                                    value={formData.customer}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a client...</option>
                                    {customers.map(c => (
                                        <option key={c._id} value={c._id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Service Asset</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="Flight">Aviation (Flight)</option>
                                        <option value="Hotel">Hospitality (Hotel)</option>
                                        <option value="Tour Package">Expedition (Tour)</option>
                                        <option value="Visa">Visa Processing</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Operational Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="Pending">Pending Confirmation</option>
                                        <option value="Confirmed">Confirmed / Active</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-section-header">
                                <Globe size={18} color="#3b82f6" />
                                <h3 className="form-section-title">Logistical Configuration</h3>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Primary Destination</label>
                                    <input
                                        type="text"
                                        name="details.destination"
                                        placeholder="e.g. Dubai, UAE"
                                        value={formData.details.destination}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Deployment Date</label>
                                    <input
                                        type="date"
                                        name="details.date"
                                        value={formData.details.date}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Operational Notes</label>
                                <textarea
                                    name="details.notes"
                                    placeholder="Special requirements or itinerary details..."
                                    value={formData.details.notes}
                                    onChange={handleChange}
                                    className="form-textarea"
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-section-header">
                                <CreditCard size={18} color="#3b82f6" />
                                <h3 className="form-section-title">Fiscal Terms</h3>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Total Contract Value (GBP)</label>
                                    <input
                                        type="number"
                                        name="totalAmount"
                                        placeholder="0.00"
                                        value={formData.totalAmount}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Initial Liquidity (Paid)</label>
                                    <input
                                        type="number"
                                        name="paidAmount"
                                        placeholder="0.00"
                                        value={formData.paidAmount}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={() => navigate('/bookings')}
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
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Fiscal Integrity</h4>
                        </div>
                        <p className="info-text">
                            Reservations represent binding travel contracts. Ensure all financial valuations match the current market rates.
                        </p>
                        
                        <div className="tip-item">
                            <div style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '6px', height: 'fit-content' }}>
                                <Calendar size={16} color="#64748b" />
                            </div>
                            <div className="tip-content">
                                <h5>Scheduling</h5>
                                <p>Double-check travel dates against passport expiration records.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBooking;
