import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';
import { Menu, Bell, LogOut, Settings as SettingsIcon } from 'lucide-react';

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

    useEffect(() => {
        const handleViewportSidebarState = () => {
            const isDesktopViewport = window.innerWidth >= 992;
            setSidebarOpen(isDesktopViewport);
        };

        handleViewportSidebarState();
        window.addEventListener('resize', handleViewportSidebarState);

        return () => {
            window.removeEventListener('resize', handleViewportSidebarState);
        };
    }, []);

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
                                <div className="header-dropdown notifications-dropdown">
                                    <div className="dropdown-header">
                                        <h4>Notifications</h4>
                                        <span onClick={markAllRead} className="dropdown-link">Mark all read</span>
                                    </div>
                                    <div className="dropdown-list">
                                        {notifications.map(n => (
                                            <div key={n.id} className="notification-item">
                                                <div className="notification-dot" style={{ background: n.unread ? '#2563eb' : '#cbd5e1' }}></div>
                                                <div>
                                                    <div className="notification-title">{n.title}</div>
                                                    <div className="notification-text">{n.text}</div>
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
                                <div className="header-dropdown profile-dropdown">
                                    <button onClick={() => navigate('/settings')} className="profile-action-btn">
                                        <SettingsIcon size={16} /> Settings
                                    </button>
                                    <button onClick={handleLogout} className="profile-action-btn danger">
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
