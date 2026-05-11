import React from 'react';
import './Inquiries.css';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, MessageSquare } from 'lucide-react';
import RowActionMenu from '../components/RowActionMenu';

const Inquiries = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState('All');
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);

    const [inquiries, setInquiries] = React.useState([
        { id: 'INQ-001', customer: 'Alice Johnson', subject: 'Summer Trip to Swiss Alps', status: 'New', date: 'Oct 24, 2023' },
        { id: 'INQ-002', customer: 'Bob Smith', subject: 'Business Flight to Tokyo', status: 'Active', date: 'Oct 23, 2023' },
        { id: 'INQ-003', customer: 'Charlie Brown', subject: 'Family Vacation in Florida', status: 'Closed', date: 'Oct 20, 2023' },
    ]);

    const updateInquiryStatus = (id, status) => {
        setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
    };

    const deleteInquiry = (id) => {
        const confirmed = window.confirm('Delete this inquiry?');
        if (!confirmed) return;
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    };

    const filteredInquiries = inquiries.filter(inq => {
        const matchesSearch = inq.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             inq.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             inq.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <h1>Client Inquiries</h1>
                    <p>Manage and respond to incoming travel requests.</p>
                </div>
                <button className="primary-btn" onClick={() => navigate('/inquiries/add')}>
                    <Plus size={18} />
                    New Inquiry
                </button>
            </header>

            <div className="card-container">
                <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '1rem' }}>
                    <div className="search-bar">
                        <Search size={18} color="#94a3b8" />
                        <input 
                            type="text" 
                            placeholder="Search inquiries..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div style={{ position: 'relative' }}>
                        <button 
                            className="primary-btn" 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            style={{ backgroundColor: 'white', color: '#0f172a', border: '1px solid #e2e8f0' }}
                        >
                            <Filter size={18} />
                            {statusFilter === 'All' ? 'Filter' : `Status: ${statusFilter}`}
                        </button>

                        {isFilterOpen && (
                            <div style={{ 
                                position: 'absolute', 
                                top: '100%', 
                                right: 0, 
                                marginTop: '0.5rem',
                                background: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                zIndex: 10,
                                minWidth: '150px',
                                padding: '0.5rem'
                            }}>
                                {['All', 'New', 'Active', 'Closed'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => {
                                            setStatusFilter(status);
                                            setIsFilterOpen(false);
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem 1rem',
                                            textAlign: 'left',
                                            background: statusFilter === status ? '#f1f5f9' : 'none',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            color: '#0f172a'
                                        }}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="professional-table">
                        <thead>
                            <tr>
                                <th>Inquiry ID</th>
                                <th>Customer</th>
                                <th>Subject</th>
                                <th>Status</th>
                                <th>Date Received</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInquiries.length > 0 ? (
                                filteredInquiries.map((inq) => (
                                    <tr key={inq.id}>
                                        <td style={{ fontWeight: 600 }}>{inq.id}</td>
                                        <td>{inq.customer}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <MessageSquare size={16} color="#3b82f6" />
                                                {inq.subject}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-badge status-${inq.status.toLowerCase()}`}>
                                                {inq.status}
                                            </span>
                                        </td>
                                        <td style={{ color: '#64748b' }}>{inq.date}</td>
                                        <td>
                                            <RowActionMenu
                                                actions={[
                                                    { label: 'View details', onClick: () => navigate('/inquiries/add') },
                                                    {
                                                        label: inq.status === 'Closed' ? 'Mark Active' : 'Mark Closed',
                                                        onClick: () => updateInquiryStatus(inq.id, inq.status === 'Closed' ? 'Active' : 'Closed'),
                                                    },
                                                    { label: 'Delete inquiry', onClick: () => deleteInquiry(inq.id), danger: true },
                                                ]}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                                        No inquiries found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Inquiries;
