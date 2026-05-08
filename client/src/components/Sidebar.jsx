import React from 'react';
import './Sidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    ClipboardList,
    Calendar,
    PlaneTakeoff,
    UserCheck,
    Globe,
    CreditCard,
    Settings,
    LogOut
} from 'lucide-react';

import logo from '../assets/logo.png';

const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Inquiries', path: '/inquiries', icon: ClipboardList },
    { name: 'Customers', path: '/customers', icon: UserCheck },
    { name: 'Bookings', path: '/bookings', icon: Calendar },
    { name: 'Visa Tracker', path: '/visa-tracker', icon: PlaneTakeoff },
    { name: 'B2B Agents', path: '/agents', icon: UserCheck },
    { name: 'Packages', path: '/packages', icon: Globe },
    { name: 'Finance', path: '/finance', icon: CreditCard },
    { name: 'Settings', path: '/settings', icon: Settings },
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
                            <item.icon size={20} className="nav-icon" />
                            <span className="nav-label">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="sign-out-btn">
                        <LogOut size={20} className="nav-icon" />
                        <span className="nav-label">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;