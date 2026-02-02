
import React, { useState } from 'react';
import { Service, Order, PaymentRequest, OrderStatus, PaymentStatus } from '../types';
import { ADMIN_PASSWORD } from '../constants';
import { generateServiceDescription } from '../services/geminiService';

interface AdminDashboardProps {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  payments: PaymentRequest[];
  setPayments: React.Dispatch<React.SetStateAction<PaymentRequest[]>>;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  services, setServices, orders, setOrders, payments, setPayments, onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'payments' | 'services'>('orders');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Login Logic
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <input 
          type="password" 
          placeholder="Security Key" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (password === ADMIN_PASSWORD ? setIsAuthenticated(true) : setError('Invalid Key'))}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 mb-4 text-center focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {error && <p className="text-red-500 text-xs text-center mb-4">{error}</p>}
        <button 
          onClick={() => password === ADMIN_PASSWORD ? setIsAuthenticated(true) : setError('Invalid Key')}
          className="w-full bg-blue-600 font-bold py-4 rounded-xl"
        >
          Access Dashboard
        </button>
      </div>
    );
  }

  // Dashboard Helpers
  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const updatePaymentStatus = (id: string, status: PaymentStatus) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addAiService = async () => {
    const serviceName = prompt("Enter service name:");
    if (!serviceName) return;
    const desc = await generateServiceDescription(serviceName);
    const newService: Service = {
      id: Math.random().toString(36).substr(2, 9),
      name: serviceName,
      category: 'New',
      pricePer1k: 100,
      min: 10,
      max: 100000,
      description: desc
    };
    setServices(prev => [newService, ...prev]);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">Admin Console</h1>
        <div className="flex bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
          {(['orders', 'payments', 'services'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all capitalize ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button onClick={onLogout} className="text-slate-500 hover:text-white text-sm font-bold">Logout</button>
      </div>

      <div className="bg-slate-800/40 rounded-3xl border border-slate-700 overflow-hidden">
        {activeTab === 'orders' && (
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 text-[10px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Link</th>
                  <th className="px-6 py-4">Charge</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {orders.map(o => (
                  <tr key={o.id} className="text-sm">
                    <td className="px-6 py-4 font-mono text-blue-400">{o.id}</td>
                    <td className="px-6 py-4 font-medium text-white">{o.serviceName}</td>
                    <td className="px-6 py-4 text-slate-400 truncate max-w-[150px]">{o.link}</td>
                    <td className="px-6 py-4 text-green-400 font-bold">৳{o.charge.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <select 
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                        className="bg-slate-900 border border-slate-700 text-xs rounded px-2 py-1 outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setOrders(prev => prev.filter(x => x.id !== o.id))}
                        className="text-red-500 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 text-[10px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="px-6 py-4">TrxID</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {payments.map(p => (
                  <tr key={p.id} className="text-sm">
                    <td className="px-6 py-4 font-mono text-pink-500">{p.trxId}</td>
                    <td className="px-6 py-4">{p.method}</td>
                    <td className="px-6 py-4 font-bold text-white">৳{p.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${p.status === 'Approved' ? 'bg-green-500/10 text-green-500' : p.status === 'Rejected' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => updatePaymentStatus(p.id, 'Approved')} className="bg-green-600 text-white text-[10px] px-2 py-1 rounded">Approve</button>
                      <button onClick={() => updatePaymentStatus(p.id, 'Rejected')} className="bg-red-600 text-white text-[10px] px-2 py-1 rounded">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Manage Services</h3>
              <button 
                onClick={addAiService}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add AI Powered Service
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map(s => (
                <div key={s.id} className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-blue-500 font-bold uppercase">{s.category}</span>
                    <h4 className="font-bold text-white text-sm line-clamp-1">{s.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">৳{s.pricePer1k} / 1k</p>
                  </div>
                  <button 
                    onClick={() => deleteService(s.id)}
                    className="mt-4 text-xs font-bold text-red-500 hover:bg-red-500/10 py-1 rounded text-center"
                  >
                    Delete Service
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
