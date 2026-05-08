import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Forms.css';
import './Inquiries.css';
import { 
    ArrowLeft, 
    Save, 
    DollarSign, 
    Calendar, 
    Briefcase, 
    Tag, 
    Loader2, 
    Info, 
    ArrowUpCircle, 
    ArrowDownCircle
} from 'lucide-react';

const AddTransaction = () => {
    const [formData, setFormData] = useState({
        type: 'Income',
        category: 'Flight Booking',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        status: 'Completed'
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // In a real app: await api.post('/transactions', formData);
            setTimeout(() => {
                setLoading(false);
                navigate('/finance');
            }, 1000);
        } catch (err) {
            console.error('Failed to log transaction:', err);
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
                            onClick={() => navigate('/finance')}
                            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', color: '#64748b', fontWeight: 700, fontSize: '0.875rem', padding: 0, marginBottom: '1rem', cursor: 'pointer' }}
                        >
                            <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
                            Back to Ledger
                        </button>
                        <h1>Log Transaction</h1>
                        <p>Initialize a fiscal record and update the global accounting ledger.</p>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
                    <form onSubmit={handleSubmit} className="form-container">
                        <div className="form-section">
                            <div className="form-section-header">
                                <DollarSign size={18} color="#3b82f6" />
                                <h3 className="form-section-title">Fiscal Classification</h3>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Flow Direction</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="Income">Revenue / Income</option>
                                        <option value="Expense">Expense / Payout</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Asset Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="Flight Booking">Flight Booking</option>
                                        <option value="Hotel Reservation">Hotel Reservation</option>
                                        <option value="Tour Package">Expedition Package</option>
                                        <option value="Agent Commission">Agent Commission</option>
                                        <option value="Marketing">Marketing Expense</option>
                                        <option value="Operational">Operational Costs</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Monetary Valuation (GBP)</label>
                                    <div className="input-with-icon">
                                        <DollarSign size={16} className="input-icon" />
                                        <input
                                            type="number"
                                            name="amount"
                                            placeholder="0.00"
                                            value={formData.amount}
                                            onChange={handleChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Effective Date</label>
                                    <div className="input-with-icon">
                                        <Calendar size={16} className="input-icon" />
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-section-header">
                                <Tag size={18} color="#3b82f6" />
                                <h3 className="form-section-title">Audit Metadata</h3>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Transaction Narrative</label>
                                <textarea
                                    name="description"
                                    placeholder="Detailed explanation of the fiscal event..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="form-textarea"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Settlement Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="Completed">Settled / Completed</option>
                                    <option value="Pending">Pending Clearance</option>
                                    <option value="Cancelled">Voided / Cancelled</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={() => navigate('/finance')}
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
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Fiscal Oversight</h4>
                        </div>
                        <p className="info-text">
                            Accurate ledger maintenance is vital for tax compliance and cash-flow intelligence.
                        </p>
                        
                        <div className="tip-item">
                            <div style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '6px', height: 'fit-content' }}>
                                <ArrowUpCircle size={16} color="#10b981" />
                            </div>
                            <div className="tip-content">
                                <h5>Inflows</h5>
                                <p>Revenue from direct bookings should be logged under Income.</p>
                            </div>
                        </div>

                        <div className="tip-item">
                            <div style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '6px', height: 'fit-content' }}>
                                <ArrowDownCircle size={16} color="#ef4444" />
                            </div>
                            <div className="tip-content">
                                <h5>Outflows</h5>
                                <p>Operational costs and agent payouts should be categorized as Expenses.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTransaction;
