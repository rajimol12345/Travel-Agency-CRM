import React from 'react';
import './Agents.css';
import './Inquiries.css';
import { UserPlus, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Agents = () => {
    const navigate = useNavigate();
    const agents = [
        { id: 1, name: 'Global Travel Solutions', contact: 'John Carter', email: 'john@globaltravel.com', bookings: 145, revenue: '£12,400', location: 'London, UK' },
        { id: 2, name: 'Elite Voyage Group', contact: 'Sarah Miller', email: 'sarah@elitevoyage.net', bookings: 89, revenue: '£8,950', location: 'Dubai, UAE' },
        { id: 3, name: 'Skyline Partners', contact: 'Robert Chen', email: 'robert@skyline.com', bookings: 210, revenue: '£21,000', location: 'Singapore' },
    ];

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

            <div className="agent-list">
                {agents.map((agent) => (
                    <div key={agent.id} className="agent-item">
                        <div className="agent-profile">
                            <div className="agent-avatar">{agent.name.charAt(0)}</div>
                            <div className="agent-info">
                                <h3>{agent.name}</h3>
                                <p><Mail size={14} inline /> {agent.email}</p>
                                <p><MapPin size={14} inline /> {agent.location}</p>
                            </div>
                        </div>
                        <div className="agent-stats">
                            <div className="agent-stat">
                                <span className="agent-stat-value">{agent.bookings}</span>
                                <span className="agent-stat-label">Bookings</span>
                            </div>
                            <div className="agent-stat">
                                <span className="agent-stat-value">{agent.revenue}</span>
                                <span className="agent-stat-label">Total Revenue</span>
                            </div>
                            <button className="primary-btn" style={{ backgroundColor: 'white', color: '#3b82f6', border: '1px solid #dbeafe', padding: '0.5rem' }}>
                                <ExternalLink size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Agents;
