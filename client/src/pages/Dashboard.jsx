import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { 
    TrendingUp, 
    Users, 
    PlaneTakeoff, 
    Wallet, 
    ArrowUpRight, 
    ArrowDownRight,
    FileText,
    Plus
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
    const navigate = useNavigate();
    
    const stats = [
        { title: 'Total Revenue', value: '$24,500', icon: Wallet, change: '+12.5%', isPositive: true, color: '#3b82f6' },
        { title: 'Active Inquiries', value: '48', icon: Users, change: '+5.2%', isPositive: true, color: '#10b981' },
        { title: 'Pending Visas', value: '12', icon: PlaneTakeoff, change: '-2.1%', isPositive: false, color: '#f59e0b' },
        { title: 'Conversion Rate', value: '18.2%', icon: TrendingUp, change: '+1.4%', isPositive: true, color: '#8b5cf6' },
    ];

    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Revenue',
            data: [12000, 19000, 15000, 22000, 18000, 25000],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
        }]
    };

    const bookingData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Bookings',
            data: [12, 19, 3, 5, 2, 3, 9],
            backgroundColor: '#1e293b',
            borderRadius: 8,
        }]
    };

    const sourceData = {
        labels: ['Direct', 'Social', 'Referral'],
        datasets: [{
            data: [45, 30, 25],
            backgroundColor: ['#2563eb', '#1e293b', '#f59e0b'],
            borderWidth: 0,
        }]
    };

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#0f172a',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
                displayColors: false,
            }
        },
        scales: {
            y: {
                grid: { color: '#f1f5f9' },
                ticks: { color: '#64748b', font: { size: 11 } }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#64748b', font: { size: 11 } }
            }
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>Executive Overview</h1>
                    <p>Track your agency performance and recent operations.</p>
                </div>
                <div className="header-actions">
                    <button className="secondary-btn">
                        <FileText size={18} style={{ marginRight: '0.5rem' }} />
                        Export PDF
                    </button>
                    <button className="primary-btn" onClick={() => navigate('/bookings/add')}>
                        <Plus size={18} style={{ marginRight: '0.5rem' }} />
                        New Booking
                    </button>
                </div>
            </header>

            <div className="stats-grid">
                {stats.map((item, index) => (
                    <div key={index} className="stat-card" onClick={() => navigate('/finance')}>
                        <div className="stat-header">
                            <div className="stat-icon-wrapper" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                                <item.icon size={24} />
                            </div>
                            <span className={`stat-trend ${item.isPositive ? 'trend-up' : 'trend-down'}`}>
                                {item.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                {item.change}
                            </span>
                        </div>
                        <h3>{item.title}</h3>
                        <div className="stat-value">{item.value}</div>
                    </div>
                ))}
            </div>
            <div className="dashboard-grid">
                <div className="card-container main-chart">
                    <h3>
                        Revenue Growth
                        <TrendingUp size={20} color="#2563eb" />
                    </h3>
                    <div className="chart-height-lg">
                        <Line data={revenueData} options={commonOptions} />
                    </div>
                </div>
                
                <div className="card-container side-content">
                    <h3>Weekly Bookings</h3>
                    <div className="chart-height-md">
                        <Bar data={bookingData} options={commonOptions} />
                    </div>
                </div>

                <div className="card-container side-content">
                    <h3>Inquiry Sources</h3>
                    <div className="chart-height-md">
                        <Doughnut data={sourceData} options={{ 
                            ...commonOptions, 
                            scales: undefined, 
                            plugins: { ...commonOptions.plugins, legend: { display: true, position: 'bottom' } } 
                        }} />
                    </div>
                </div>
            </div>

            <div className="dashboard-grid" style={{ marginTop: '2rem' }}>
                <div className="card-container main-chart">
                    <div className="card-header">
                        <h3>Recent Transactions</h3>
                        <button 
                            className="secondary-btn table-action-btn"
                            onClick={() => navigate('/finance')}
                        >
                            View All
                        </button>
                    </div>
                    <div className="table-responsive">
                        <table className="professional-table">
                            <thead>
                                <tr>
                                    <th>Client</th>
                                    <th>Service</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Activity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { id: 1, name: 'John Doe', service: 'Dubai Tour', amount: '$850', status: 'Confirmed', time: '2m ago' },
                                    { id: 2, name: 'Sarah Smith', service: 'Visa Processing', amount: '$120', status: 'Pending', time: '1h ago' },
                                    { id: 3, name: 'Mike Johnson', service: 'Flight Ticket', amount: '$450', status: 'Confirmed', time: '3h ago' },
                                ].map((row) => (
                                    <tr key={row.id}>
                                        <td>
                                            <div className="client-cell">
                                                <div className="client-avatar">
                                                    {row.name.charAt(0)}
                                                </div>
                                                <span className="client-name">{row.name}</span>
                                            </div>
                                        </td>
                                        <td>{row.service}</td>
                                        <td className="amount-cell">{row.amount}</td>
                                        <td>
                                            <span className={`status-badge status-${row.status.toLowerCase()}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="activity-time">{row.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card-container side-content">
                    <h3>Recent Operations</h3>
                    <div className="operations-list">
                        {[
                            { id: 1, text: 'New booking for Dubai', time: '2m ago', color: '#2563eb' },
                            { id: 2, text: 'Payment received from Sarah', time: '45m ago', color: '#10b981' },
                            { id: 3, text: 'System update completed', time: '2h ago', color: '#8b5cf6' },
                            { id: 4, text: 'New inquiry from Mike', time: '3h ago', color: '#f59e0b' },
                        ].map((act) => (
                            <div key={act.id} className="operation-item">
                                <div className="operation-dot" style={{ backgroundColor: act.color }}></div>
                                <div className="operation-content">
                                    <div className="operation-text">{act.text}</div>
                                    <div className="operation-time">{act.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
