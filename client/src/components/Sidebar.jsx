import React from 'react';
import './Sidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';

const navItems = [
    { name: 'Dashboard', path: '/', icon: 'dashboard' },
    { name: 'Inquiries', path: '/inquiries', icon: 'assignment' },
    { name: 'Customers', path: '/customers', icon: 'groups' },
    { name: 'Bookings', path: '/bookings', icon: 'event' },
    { name: 'Visa Tracker', path: '/visa-tracker', icon: 'flight_takeoff' },
    { name: 'B2B Agents', path: '/agents', icon: 'badge' },
    { name: 'Packages', path: '/packages', icon: 'public' },
    { name: 'Finance', path: '/finance', icon: 'credit_card' },
    { name: 'Settings', path: '/settings', icon: 'settings' },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <>
            {isOpen && <div className="mobile-backdrop" onClick={toggleSidebar}></div>}
            
            <aside className={`glass-sidebar ${isOpen ? 'sidebar-mobile-open' : ''}`}>
                <div className="sidebar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <img src={logo} alt="FLIGHTZON" className="brand-logo" />
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => 
                                `nav-link-item ${isActive ? "active-link" : ""}`
                            }
                        >
                            <span className="material-symbols-outlined nav-icon ms-icon">{item.icon}</span>
                            <span className="nav-label">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="sign-out-btn">
                        <span className="material-symbols-outlined nav-icon ms-icon">logout</span>
                        <span className="nav-label">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;