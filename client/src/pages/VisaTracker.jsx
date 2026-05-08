import React from 'react';
import './VisaTracker.css';
import './Inquiries.css'; // Reusing some shared styles
import { Plane, Calendar, User, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const VisaTracker = () => {
    const visas = [
        { id: 'V-1024', applicant: 'John Doe', country: 'United States', type: 'B1/B2', status: 'Approved', expiry: '2025-10-12' },
        { id: 'V-1025', applicant: 'Sarah Smith', country: 'United Kingdom', type: 'Tourist', status: 'Pending', expiry: 'N/A' },
        { id: 'V-1026', applicant: 'Mike Johnson', country: 'Schengen (France)', type: 'Business', status: 'Rejected', expiry: 'N/A' },
        { id: 'V-1027', applicant: 'Emma Wilson', country: 'Canada', type: 'Student', status: 'Approved', expiry: '2024-08-20' },
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved': return <CheckCircle2 size={18} className="text-success" />;
            case 'Pending': return <AlertCircle size={18} className="text-warning" />;
            case 'Rejected': return <XCircle size={18} className="text-danger" />;
            default: return <Clock size={18} />;
        }
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <h1>Visa Tracker</h1>
                    <p>Monitor application status and expiration dates for all clients.</p>
                </div>
                <div className="header-actions">
                    <button className="primary-btn">Update Status</button>
                </div>
            </header>

            <div className="visa-grid">
                {visas.map((visa) => (
                    <div key={visa.id} className="visa-card">
                        <div className="visa-card-header">
                            <span className="visa-country">{visa.country}</span>
                            <span className={`visa-status status-${visa.status.toLowerCase()}`}>
                                {visa.status}
                            </span>
                        </div>
                        <div className="visa-detail">
                            <span className="visa-label">Applicant</span>
                            <span className="visa-value">{visa.applicant}</span>
                        </div>
                        <div className="visa-detail">
                            <span className="visa-label">Visa Type</span>
                            <span className="visa-value">{visa.type}</span>
                        </div>
                        <div className="visa-detail">
                            <span className="visa-label">Expiry Date</span>
                            <span className="visa-value">{visa.expiry}</span>
                        </div>
                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {getStatusIcon(visa.status)}
                            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{visa.id}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VisaTracker;
