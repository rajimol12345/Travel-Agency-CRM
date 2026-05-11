import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Packages.css';
import './Inquiries.css';
import { exportToCSV } from '../utils/exportUtils';
import { 
    Plus, 
    Search, 
    Filter, 
    Map, 
    ArrowUpRight, 
    TrendingUp, 
    Zap, 
    Download,
    Palmtree,
    Sun,
    Anchor,
    Mountain
} from 'lucide-react';

const packages = [
    { id: 'PKG-001', name: 'Dubai Luxury Escape', type: 'Adventure', duration: '7 Days', price: 2500, status: 'Active', icon: Sun },
    { id: 'PKG-002', name: 'Maldives Overwater Bliss', type: 'Leisure', duration: '5 Days', price: 4200, status: 'Trending', icon: Palmtree },
    { id: 'PKG-003', name: 'European Grand Tour', type: 'Cultural', duration: '14 Days', price: 5800, status: 'Seasonal', icon: Mountain },
    { id: 'PKG-004', name: 'Greek Islands Cruise', type: 'Cruise', duration: '10 Days', price: 3100, status: 'Active', icon: Anchor },
];

const Packages = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const navigate = useNavigate();

    const handleExport = () => {
        exportToCSV(packages, 'travel_packages');
    };

    const filteredPackages = packages
        .filter(p => statusFilter === 'All' || p.status === statusFilter)
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <h1>Curated Packages</h1>
                    <p>Strategic travel inventory and signature expeditions.</p>
                </div>
                <div className="header-actions">
                    <button className="secondary-btn" onClick={handleExport}>
                        <Download size={18} />
                        Export
                    </button>
                    <button className="primary-btn" onClick={() => navigate('/packages/add')}>
                        <Plus size={18} />
                        New Package
                    </button>
                </div>
            </header>

            <div className="grid-responsive" style={{ marginBottom: '2rem' }}>
                <div className="card-premium">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <Map size={20} color="var(--primary)" />
                        <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Live Inventory</span>
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{packages.length} Packages</span>
                </div>
                <div className="card-premium">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <TrendingUp size={20} color="var(--warning)" />
                        <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Hot Sellers</span>
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)' }}>12 Trending</span>
                </div>
                <div className="card-premium">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <Zap size={20} color="var(--success)" />
                        <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Avg. Margin</span>
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)' }}>22.4%</span>
                </div>
                <div className="card-premium">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <Anchor size={20} color="#8b5cf6" />
                        <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Active Bookings</span>
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)' }}>84 Units</span>
                </div>
            </div>

            <div className="card-container" style={{ padding: '1.25rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div className="search-bar" style={{ width: '100%', maxWidth: '400px' }}>
                    <Search size={18} color="#94a3b8" />
                    <input 
                        type="text" 
                        placeholder="Search signature expeditions..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <select 
                        className="secondary-btn" 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ appearance: 'auto' }}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Trending">Trending</option>
                        <option value="Seasonal">Seasonal</option>
                    </select>
                    <button className="secondary-btn">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            <div className="packages-grid">
                {filteredPackages.map((pkg) => (
                    <div key={pkg.id} className="package-card">
                        <div className="package-header">
                            <span className={`package-badge badge-${pkg.status.toLowerCase()}`}>
                                {pkg.status}
                            </span>
                            <span className="package-id">{pkg.id}</span>
                        </div>

                        <h3 className="package-title">{pkg.name}</h3>
                        <div className="package-type">
                            <pkg.icon size={16} />
                            {pkg.type.toUpperCase()}
                        </div>

                        <div className="package-info-grid">
                            <div className="info-item">
                                <label>Duration</label>
                                <span>{pkg.duration}</span>
                            </div>
                            <div className="info-item">
                                <label>Price Point</label>
                                <span>${pkg.price.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="package-footer">
                            <button className="configure-btn">Configure Package</button>
                            <button className="details-btn">
                                <ArrowUpRight size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Packages;
