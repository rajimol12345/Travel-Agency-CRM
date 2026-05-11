import React, { useState } from 'react';
import './Finance.css';
import './Inquiries.css';
import './Forms.css';
import { DollarSign, ArrowUpCircle, ArrowDownCircle, Wallet, Download, Calendar, Save, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Finance = () => {
    const [transactions, setTransactions] = useState([
        { id: 'TX-5501', date: '2023-10-24', category: 'Flight Booking', amount: '+$1,250', type: 'Income', status: 'Completed' },
        { id: 'TX-5502', date: '2023-10-23', category: 'Hotel Commission', amount: '+$340', type: 'Income', status: 'Pending' },
        { id: 'TX-5503', date: '2023-10-22', category: 'Software Subscription', amount: '-$45', type: 'Expense', status: 'Completed' },
        { id: 'TX-5504', date: '2023-10-21', category: 'B2B Agent Payout', amount: '-$800', type: 'Expense', status: 'Completed' },
    ]);
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <h1>Finance Management</h1>
                    <p>Track revenue, expenses, and transaction history.</p>
                </div>
                <div className="header-actions">
                    <button className="secondary-btn" style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.625rem 1.25rem', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Download size={18} />
                        Export Report
                    </button>
                    <button className="primary-btn" onClick={() => navigate('/finance/add')}>
                        <DollarSign size={18} />
                        New Transaction
                    </button>
                </div>
            </header>

            <div className="finance-summary">
                <div className="summary-card">
                    <span className="summary-label">Total Balance</span>
                    <span className="summary-value">$45,200.00</span>
                </div>
                <div className="summary-card">
                    <span className="summary-label">Monthly Income</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ArrowUpCircle size={20} color="#10b981" />
                        <span className="summary-value">$8,450.00</span>
                    </div>
                </div>
                <div className="summary-card">
                    <span className="summary-label">Monthly Expenses</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ArrowDownCircle size={20} color="#ef4444" />
                        <span className="summary-value">$2,100.00</span>
                    </div>
                </div>
                <div className="summary-card">
                    <span className="summary-label">Pending Payouts</span>
                    <span className="summary-value">$1,240.00</span>
                </div>
            </div>

            <div className="card-container">
                <div className="card-header" style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Recent Transactions</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                        <Calendar size={16} />
                        Last 30 Days
                    </div>
                </div>
                <div className="table-wrapper">
                    <table className="professional-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx) => (
                                <tr key={tx.id}>
                                    <td style={{ fontWeight: 600 }}>{tx.id}</td>
                                    <td style={{ color: '#64748b' }}>{tx.date}</td>
                                    <td>{tx.category}</td>
                                    <td>
                                        <div className="transaction-type">
                                            <div className={`type-indicator indicator-${tx.type.toLowerCase()}`}></div>
                                            {tx.type}
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: 700, color: tx.type === 'Income' ? '#10b981' : '#ef4444' }}>
                                        {tx.amount}
                                    </td>
                                    <td>
                                        <span className={`status-badge status-${tx.status.toLowerCase()}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Finance;
