import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Bookings.css';
import './Inquiries.css';
import { exportToCSV } from '../utils/exportUtils';
import RowActionMenu from '../components/RowActionMenu';
import { 
    Plus, 
    Plane, 
    Hotel, 
    Map, 
    CreditCard, 
    Download, 
    Search, 
    Filter, 
    Calendar, 
    DollarSign, 
    CheckCircle, 
    Briefcase,
    Loader2
} from 'lucide-react';

const Bookings = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');

    const handleExport = () => {
        exportToCSV(bookings, 'global_reservations');
    };

    const handleDownload = async (id) => {
        try {
            const response = await api.get(`/bookings/${id}/itinerary`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `itinerary-${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Download error:', error);
        }
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await api.get('/bookings');
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                // Fallback for demo if API is not running
                setBookings([
                    { _id: '1', type: 'Flight', customer: { name: 'John Doe', email: 'john@example.com' }, totalAmount: 1200, paidAmount: 1200, status: 'Confirmed' },
                    { _id: '2', type: 'Hotel', customer: { name: 'Sarah Smith', email: 'sarah@example.com' }, totalAmount: 850, paidAmount: 400, status: 'Pending' },
                    { _id: '3', type: 'Tour Package', customer: { name: 'Mike Johnson', email: 'mike@example.com' }, totalAmount: 2500, paidAmount: 2500, status: 'Confirmed' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case 'Flight': return <Plane size={18} />;
            case 'Hotel': return <Hotel size={18} />;
            case 'Tour Package': return <Map size={18} />;
            default: return <CreditCard size={18} />;
        }
    };

    const filteredBookings = bookings.filter(b => 
        (typeFilter === 'All' || b.type === typeFilter) &&
        (b.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         b.type?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const removeBooking = (id) => {
        const confirmed = window.confirm('Delete this reservation from the list?');
        if (!confirmed) return;
        setBookings((prev) => prev.filter((booking) => booking._id !== id));
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <h1>Global Reservations</h1>
                    <p>Operational oversight of all active travel contracts.</p>
                </div>
                <div className="header-actions">
                    <button 
                        className="filter-trigger-btn"
                        onClick={handleExport}
                    >
                        <Download size={18} />
                        Report
                    </button>
                    <button className="primary-btn" onClick={() => navigate('/bookings/add')}>
                        <Plus size={18} />
                        New Reservation
                    </button>
                </div>
            </header>

            <div className="finance-summary" style={{ marginBottom: '2rem' }}>
                <div className="summary-card">
                    <span className="summary-label">Total Bookings</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Calendar size={20} color="#3b82f6" />
                        <span className="summary-value">{bookings.length}</span>
                    </div>
                </div>
                <div className="summary-card">
                    <span className="summary-label">Confirmed</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <CheckCircle size={20} color="#10b981" />
                        <span className="summary-value">{bookings.filter(b => b.status === 'Confirmed').length}</span>
                    </div>
                </div>
                <div className="summary-card">
                    <span className="summary-label">Total Value</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <DollarSign size={20} color="#f59e0b" />
                        <span className="summary-value">${bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}</span>
                    </div>
                </div>
                <div className="summary-card">
                    <span className="summary-label">Active Users</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Briefcase size={20} color="#8b5cf6" />
                        <span className="summary-value">24 Active</span>
                    </div>
                </div>
            </div>

            <div className="card-container">
                <div className="table-toolbar">
                    <div className="search-bar" style={{ width: '350px' }}>
                        <Search size={18} color="#94a3b8" />
                        <input 
                            type="text" 
                            placeholder="Search by client or service..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-inline-group">
                        <div className="filter-select-wrap">
                            <Filter size={16} />
                            <select 
                                className="filter-select"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option value="All">All Services</option>
                                <option value="Flight">Aviation</option>
                                <option value="Hotel">Hospitality</option>
                                <option value="Tour Package">Expeditions</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="table-wrapper">
                    {loading ? (
                        <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
                            <Loader2 size={32} className="animate-spin" style={{ marginBottom: '1rem' }} />
                            <p>Fetching Operational Data...</p>
                        </div>
                    ) : filteredBookings.length === 0 ? (
                        <div style={{ padding: '4rem', textAlign: 'center' }}>
                            <Briefcase size={48} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ color: '#0f172a', fontWeight: 600 }}>No matching reservations</h3>
                            <p style={{ color: '#64748b' }}>Try adjusting your search or filters.</p>
                        </div>
                    ) : (
                        <table className="professional-table">
                            <thead>
                                <tr>
                                    <th>Service</th>
                                    <th>Client Details</th>
                                    <th>Value</th>
                                    <th>Status</th>
                                    <th>Payment</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((b) => (
                                    <tr key={b._id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div className="service-icon">
                                                    {getIcon(b.type)}
                                                </div>
                                                <span style={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: '#475569' }}>
                                                    {b.type}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 600, color: '#0f172a' }}>{b.customer?.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{b.customer?.email}</div>
                                        </td>
                                        <td>
                                            <span style={{ fontWeight: 700, fontSize: '1rem' }}>${b.totalAmount.toLocaleString()}</span>
                                        </td>
                                        <td>
                                            <span className={`status-badge status-${b.status.toLowerCase() === 'confirmed' ? 'active' : 'pending'}`}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="progress-container">
                                                <div className="progress-bar-bg">
                                                    <div 
                                                        className="progress-bar-fill" 
                                                        style={{ width: `${(b.paidAmount / b.totalAmount) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="progress-label">
                                                    {Math.round((b.paidAmount / b.totalAmount) * 100)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="circle-btn" onClick={() => handleDownload(b._id)}>
                                                    <Download size={16} />
                                                </button>
                                                <RowActionMenu
                                                    actions={[
                                                        { label: 'Open reservation', onClick: () => navigate('/bookings/add') },
                                                        { label: 'Download itinerary', onClick: () => handleDownload(b._id) },
                                                        { label: 'Delete reservation', onClick: () => removeBooking(b._id), danger: true },
                                                    ]}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Bookings;
