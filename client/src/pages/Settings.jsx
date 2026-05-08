import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Forms.css';
import './Inquiries.css';
import { User, Shield, Bell, Settings as SettingsIcon, ArrowLeft, Save } from 'lucide-react';

const Settings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = React.useState('account');

    const tabs = [
        { id: 'account', label: 'Account Settings', icon: User },
        { id: 'security', label: 'Security & Privacy', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'config', label: 'System Config', icon: SettingsIcon },
    ];

    return (
        <div className="page-container">
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header className="page-header">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', color: '#64748b', fontWeight: 700, fontSize: '0.875rem', padding: 0, marginBottom: '1rem', cursor: 'pointer' }}
                        >
                            <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
                            Return
                        </button>
                        <h1>System Control Center</h1>
                        <p>Manage your professional identity and application preferences.</p>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem', alignItems: 'start' }}>
                    {/* Navigation Sidebar */}
                    <div className="form-container" style={{ padding: '1.25rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '1rem', 
                                        padding: '0.875rem 1.25rem', 
                                        border: 'none', 
                                        background: activeTab === tab.id ? '#eff6ff' : 'none', 
                                        color: activeTab === tab.id ? '#3b82f6' : '#64748b', 
                                        borderRadius: '10px', 
                                        fontWeight: activeTab === tab.id ? 700 : 600, 
                                        textAlign: 'left', 
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <tab.icon size={18} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Settings Content */}
                    <div className="form-container">
                        {activeTab === 'account' && (
                            <div className="form-section">
                                <div className="form-section-header">
                                    <User size={18} color="#3b82f6" />
                                    <h3 className="form-section-title">Identity Information</h3>
                                </div>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className="form-input" defaultValue="Admin User" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Work Email</label>
                                        <input type="email" className="form-input" defaultValue="admin@flightzon.com" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'config' && (
                            <div className="form-section">
                                <div className="form-section-header">
                                    <SettingsIcon size={18} color="#3b82f6" />
                                    <h3 className="form-section-title">System Preferences</h3>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a', marginBottom: '0.25rem' }}>Real-time Analytics Push</div>
                                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Receive live updates on dashboard metrics.</div>
                                        </div>
                                        <div style={{ width: '40px', height: '20px', background: '#2563eb', borderRadius: '999px', position: 'relative', cursor: 'pointer' }}>
                                            <div style={{ position: 'absolute', top: '2px', right: '2px', width: '16px', height: '16px', background: 'white', borderRadius: '50%' }}></div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a', marginBottom: '0.25rem' }}>Automated Financial Reconciliation</div>
                                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Sync all transactions with accounting ledger daily.</div>
                                        </div>
                                        <div style={{ width: '40px', height: '20px', background: '#2563eb', borderRadius: '999px', position: 'relative', cursor: 'pointer' }}>
                                            <div style={{ position: 'absolute', top: '2px', right: '2px', width: '16px', height: '16px', background: 'white', borderRadius: '50%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {(activeTab === 'security' || activeTab === 'notifications') && (
                            <div className="form-section" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    {activeTab === 'security' ? <Shield size={48} /> : <Bell size={48} />}
                                </div>
                                <h3 style={{ marginBottom: '0.5rem' }}>{activeTab === 'security' ? 'Security & Privacy' : 'Notification Settings'}</h3>
                                <p>These settings are currently being configured for your account.</p>
                            </div>
                        )}

                        <div className="form-actions">
                            <button className="primary-btn">
                                <Save size={18} />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
