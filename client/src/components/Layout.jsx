import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';
import { Menu, X, Bell, User, LogOut, Settings as SettingsIcon } from 'lucide-react';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New Booking', text: 'John Doe booked Dubai Luxury Escape', time: '5m ago', unread: true },
        { id: 2, title: 'System Update', text: 'Operational metrics updated for Q2', time: '1h ago', unread: true },
        { id: 3, title: 'Payment Received', text: 'Invoice #INV-001 has been paid', time: '3h ago', unread: false },
    ]);
    const navigate = useNavigate();

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className={`layout-wrapper ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="main-content">
                <header className="top-header">
                    <div className="header-left">
                        <button className="sidebar-toggle" onClick={toggleSidebar}>
                            <Menu size={20} />
                        </button>
                    </div>

                    <div className="header-right">
                        <button className="icon-btn" onClick={() => navigate('/settings')} title="Settings">
                            <SettingsIcon size={20} />
                        </button>

                        <div style={{ position: 'relative' }}>
                            <button className="icon-btn" onClick={() => setNotifOpen(!notifOpen)}>
                                <Bell size={20} />
                                {notifications.some(n => n.unread) && <span className="notif-badge"></span>}
                            </button>
                            
                            {notifOpen && (
                                <div style={{ position: 'absolute', top: '100%', right: 0, width: '320px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', marginTop: '0.5rem', padding: '1rem', zIndex: 1000 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700 }}>Notifications</h4>
                                        <span onClick={markAllRead} style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600, cursor: 'pointer' }}>Mark all read</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {notifications.map(n => (
                                            <div key={n.id} style={{ display: 'flex', gap: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.unread ? '#2563eb' : '#cbd5e1', marginTop: '5px' }}></div>
                                                <div>
                                                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{n.title}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{n.text}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{ position: 'relative' }}>
                            <button className="user-profile-btn" onClick={() => setProfileOpen(!profileOpen)}>
                                <div className="user-info-text">
                                    <span className="user-name">Admin User</span>
                                    <span className="user-role">Super Admin</span>
                                </div>
                                <div className="user-avatar">A</div>
                            </button>

                            {profileOpen && (
                                <div style={{ position: 'absolute', top: '100%', right: 0, width: '200px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', marginTop: '0.5rem', overflow: 'hidden', zIndex: 1000 }}>
                                    <button onClick={() => navigate('/settings')} style={{ width: '100%', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: '#475569' }}>
                                        <SettingsIcon size={16} /> Settings
                                    </button>
                                    <button onClick={handleLogout} style={{ width: '100%', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: '#ef4444', borderTop: '1px solid #f1f5f9' }}>
                                        <LogOut size={16} /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="page-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
