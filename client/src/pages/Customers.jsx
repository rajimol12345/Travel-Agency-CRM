import React from 'react';
import './Inquiries.css'; // Reusing base page styles
import { Search, Plus, Filter, User, Mail, Phone, MapPin, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { exportToCSV } from '../utils/exportUtils';
import RowActionMenu from '../components/RowActionMenu';

const Customers = () => {
    const navigate = useNavigate();
    const [segmentFilter, setSegmentFilter] = React.useState('All');
    
    const [customers, setCustomers] = React.useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+44 7700 900077', status: 'Active', bookings: 12, segment: 'VIP' },
        { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', phone: '+44 7700 900088', status: 'Active', bookings: 5, segment: 'Regular' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+44 7700 900099', status: 'Inactive', bookings: 1, segment: 'New' },
        { id: 4, name: 'Emma Wilson', email: 'emma@example.com', phone: '+44 7700 900011', status: 'Active', bookings: 8, segment: 'Corporate' },
    ]);

    const handleExport = () => {
        exportToCSV(customers, 'customer_directory');
    };

    const removeCustomer = (id) => {
        const confirmed = window.confirm('Delete this customer from the list?');
        if (!confirmed) return;
        setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    };

    const filteredCustomers = customers.filter((customer) => {
        if (segmentFilter === 'All') return true;
        return customer.segment === segmentFilter;
    });

    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <h1>Client Directory</h1>
                    <p>Manage your global customer database and relationship history.</p>
                </div>
                <button className="primary-btn" onClick={() => navigate('/customers/add')}>
                    <Plus size={18} />
                    Initialize Client
                </button>
            </header>

            <div className="card-container">
                <div className="table-toolbar">
                    <div className="search-bar">
                        <Search size={18} color="#94a3b8" />
                        <input type="text" placeholder="Search by name, email, or ID..." />
                    </div>
                    <div className="filter-inline-group">
                        <div className="filter-select-wrap">
                            <Filter size={16} />
                            <select
                                className="filter-select"
                                value={segmentFilter}
                                onChange={(e) => setSegmentFilter(e.target.value)}
                            >
                                <option value="All">All Segments</option>
                                <option value="VIP">VIP</option>
                                <option value="Regular">Regular</option>
                                <option value="New">New</option>
                                <option value="Corporate">Corporate</option>
                            </select>
                        </div>
                        <button 
                            className="filter-trigger-btn"
                            onClick={handleExport}
                        >
                            Export CSV
                        </button>
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="professional-table">
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>Contact Details</th>
                                <th>Segment</th>
                                <th>Bookings</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <tr key={customer.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, color: '#0f172a' }}>{customer.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>ID: #CL-00{customer.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#475569' }}>
                                                <Mail size={14} color="#94a3b8" /> {customer.email}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#475569' }}>
                                                <Phone size={14} color="#94a3b8" /> {customer.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#3b82f6', background: '#eff6ff', padding: '0.25rem 0.625rem', borderRadius: '6px' }}>
                                            {customer.segment}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{customer.bookings}</div>
                                    </td>
                                    <td>
                                        <span className={`status-badge status-${customer.status.toLowerCase() === 'active' ? 'active' : 'closed'}`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td>
                                        <RowActionMenu
                                            actions={[
                                                { label: 'View customer', onClick: () => navigate('/customers/add') },
                                                { label: 'Send email', onClick: () => (window.location.href = `mailto:${customer.email}`) },
                                                { label: 'Delete customer', onClick: () => removeCustomer(customer.id), danger: true },
                                            ]}
                                        />
                                    </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                                        No customers found for selected segment.
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

export default Customers;
