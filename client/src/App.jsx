import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Packages from './pages/Packages';
import Bookings from './pages/Bookings';
import Inquiries from './pages/Inquiries';
import VisaTracker from './pages/VisaTracker';
import Agents from './pages/Agents';
import Finance from './pages/Finance';
import Login from './pages/Login';
import Register from './pages/Register';
import AddCustomer from './pages/AddCustomer';
import AddPackage from './pages/AddPackage';
import AddBooking from './pages/AddBooking';
import AddInquiry from './pages/AddInquiry';
import AddAgent from './pages/AddAgent';
import AddTransaction from './pages/AddTransaction';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" replace />;
};

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="customers" element={<Customers />} />
                <Route path="customers/add" element={<AddCustomer />} />
                <Route path="packages" element={<Packages />} />
                <Route path="packages/add" element={<AddPackage />} />
                <Route path="settings" element={<Settings />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="bookings/add" element={<AddBooking />} />
                <Route path="inquiries" element={<Inquiries />} />
                <Route path="inquiries/add" element={<AddInquiry />} />
                <Route path="visa-tracker" element={<VisaTracker />} />
                <Route path="agents" element={<Agents />} />
                <Route path="agents/add" element={<AddAgent />} />
                <Route path="agents/edit/:id" element={<AddAgent />} />
                <Route path="finance" element={<Finance />} />
                <Route path="finance/add" element={<AddTransaction />} />
            </Route>
        </Routes>
    );
}

export default App;
