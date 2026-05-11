import React from 'react';
import './Agents.css';
import './Inquiries.css';
import { UserPlus, Mail, MapPin, Search, Filter, Handshake, DollarSign, TrendingUp, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Agents = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [regionFilter, setRegionFilter] = React.useState('All');
    const [agents, setAgents] = React.useState([
        { id: 1, name: 'Global Travel Solutions', contact: 'John Carter', email: 'john@globaltravel.com', bookings: 145, revenue: 12400, location: 'London, UK', status: 'Active' },
        { id: 2, name: 'Elite Voyage Group', contact: 'Sarah Miller', email: 'sarah@elitevoyage.net', bookings: 89, revenue: 8950, location: 'Dubai, UAE', status: 'Active' },
        { id: 3, name: 'Skyline Partners', contact: 'Robert Chen', email: 'robert@skyline.com', bookings: 210, revenue: 21000, location: 'Singapore', status: 'Review' },
    ]);

    const regions = ['All', 'UK', 'UAE', 'Singapore'];

    const filteredAgents = agents.filter((agent) => {
        const query = searchTerm.toLowerCase();
        const matchesSearch =
            agent.name.toLowerCase().includes(query) ||
            agent.contact.toLowerCase().includes(query) ||
            agent.email.toLowerCase().includes(query);
        const matchesRegion = regionFilter === 'All' || agent.location.toLowerCase().includes(regionFilter.toLowerCase());
        return matchesSearch && matchesRegion;
    });

    const totalRevenue = filteredAgents.reduce((sum, agent) => sum + agent.revenue, 0);
    const totalBookings = filteredAgents.reduce((sum, agent) => sum + agent.bookings, 0);

    const openEditPage = (agent) => {
        navigate(`/agents/edit/${agent.id}`, { state: { agent } });
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <h1>B2B Agents</h1>
                    <p>Manage your business partnerships and agent performance.</p>
                </div>
                <button className="primary-btn" onClick={() => navigate('/agents/add')}>
                    <UserPlus size={18} />
                    Add New Agent
                </button>
            </header>

            <div className="agent-summary-grid">
                <div className="agent-summary-card">
                    <span className="summary-title">Active Partners</span>
                    <div className="summary-value-row">
                        <Handshake size={18} />
                        <strong>{filteredAgents.length}</strong>
                    </div>
                </div>
                <div className="agent-summary-card">
                    <span className="summary-title">Total Bookings</span>
                    <div className="summary-value-row">
                        <TrendingUp size={18} />
                        <strong>{totalBookings}</strong>
                    </div>
                </div>
                <div className="agent-summary-card">
                    <span className="summary-title">Total Revenue</span>
                    <div className="summary-value-row">
                        <DollarSign size={18} />
                        <strong>${totalRevenue.toLocaleString()}</strong>
                    </div>
                </div>
            </div>

            <div className="card-container">
                <div className="agent-toolbar">
                    <div className="search-bar">
                        <Search size={18} color="#94a3b8" />
                        <input
                            type="text"
                            placeholder="Search agent, contact, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-select-wrap">
                        <Filter size={16} color="#64748b" />
                        <select
                            value={regionFilter}
                            onChange={(e) => setRegionFilter(e.target.value)}
                            className="filter-select"
                        >
                            {regions.map((region) => (
                                <option key={region} value={region}>
                                    {region === 'All' ? 'All Regions' : region}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="agent-list">
                    {filteredAgents.length > 0 ? (
                        filteredAgents.map((agent) => (
                            <div key={agent.id} className="agent-item">
                                <div className="agent-profile">
                                    <div className="agent-avatar">{agent.name.charAt(0)}</div>
                                    <div className="agent-info">
                                        <h3>{agent.name}</h3>
                                        <p className="agent-contact">{agent.contact}</p>
                                        <p><Mail size={14} /> {agent.email}</p>
                                        <p><MapPin size={14} /> {agent.location}</p>
                                    </div>
                                </div>
                                <div className="agent-stats">
                                    <div className="agent-stat">
                                        <span className="agent-stat-value">{agent.bookings}</span>
                                        <span className="agent-stat-label">Bookings</span>
                                    </div>
                                    <div className="agent-stat">
                                        <span className="agent-stat-value">${agent.revenue.toLocaleString()}</span>
                                        <span className="agent-stat-label">Total Revenue</span>
                                    </div>
                                    <div className="agent-stat">
                                        <span className={`status-badge ${agent.status === 'Active' ? 'status-active' : 'status-pending'}`}>
                                            {agent.status}
                                        </span>
                                    </div>
                                    <button
                                        className="agent-edit-btn"
                                        onClick={() => openEditPage(agent)}
                                        aria-label={`Edit ${agent.name}`}
                                        title="Edit Agent"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="agent-empty-state">No agents found for the selected filters.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Agents;
