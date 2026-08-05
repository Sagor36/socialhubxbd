import React, { useState } from 'react';
import {
  Service,
  Order,
  PaymentRequest,
  OrderStatus,
  PaymentStatus,
} from '../types';

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
  services,
  setServices,
  orders,
  setOrders,
  payments,
  setPayments,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<
    'orders' | 'payments' | 'services'
  >('orders');

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Admin Login
  const handleLogin = () => {
    const enteredPassword = password.trim();
    const correctPassword = ADMIN_PASSWORD.trim();

    if (enteredPassword === correctPassword) {
      setIsAuthenticated(true);
      setError('');
      setPassword('');
    } else {
      setError('Invalid Key! Please check your password.');
    }
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setError('');
    onLogout();
  };

  // Update Order Status
  const updateOrderStatus = (
    id: string,
    status: OrderStatus
  ) => {
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === id
          ? { ...order, status }
          : order
      )
    );
  };

  // Update Payment Status
  const updatePaymentStatus = (
    id: string,
    status: PaymentStatus
  ) => {
    setPayments((previousPayments) =>
      previousPayments.map((payment) =>
        payment.id === id
          ? { ...payment, status }
          : payment
      )
    );
  };

  // Delete Order
  const deleteOrder = (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this order?'
    );

    if (!confirmed) return;

    setOrders((previousOrders) =>
      previousOrders.filter(
        (order) => order.id !== id
      )
    );
  };

  // Delete Service
  const deleteService = (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this service?'
    );

    if (!confirmed) return;

    setServices((previousServices) =>
      previousServices.filter(
        (service) => service.id !== id
      )
    );
  };

  // Add AI Service
  const addAiService = async () => {
    const serviceName = window.prompt(
      'Enter service name:'
    );

    if (!serviceName?.trim()) return;

    try {
      const description =
        await generateServiceDescription(
          serviceName.trim()
        );

      const newService: Service = {
        id: Math.random()
          .toString(36)
          .substring(2, 11),

        name: serviceName.trim(),
        category: 'New',
        pricePer1k: 100,
        min: 10,
        max: 100000,
        description,
      };

      setServices((previousServices) => [
        newService,
        ...previousServices,
      ]);
    } catch (error) {
      console.error(
        'Failed to generate service:',
        error
      );

      alert(
        'AI service could not be generated. Please try again.'
      );
    }
  };

  // Admin Login Page
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Admin Login
        </h2>

        <p className="text-center text-slate-400 text-sm mb-6">
          Enter your security key
        </p>

        <input
          type="password"
          placeholder="Security Key"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);

            if (error) {
              setError('');
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleLogin();
            }
          }}
          autoComplete="current-password"
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 mb-4 text-center text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && (
          <p className="text-red-500 text-xs text-center mb-4">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition"
        >
          Access Dashboard
        </button>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Admin Console
        </h1>

        <div className="flex bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
          {(
            [
              'orders',
              'payments',
              'services',
            ] as const
          ).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() =>
                setActiveTab(tab)
              }
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all capitalize ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="text-slate-500 hover:text-white text-sm font-bold"
        >
          Logout
        </button>
      </div>

      <div className="bg-slate-800/40 rounded-3xl border border-slate-700 overflow-hidden">

        {/* Orders */}
        {activeTab === 'orders' && (
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 text-[10px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="px-6 py-4">
                    ID
                  </th>

                  <th className="px-6 py-4">
                    Service
                  </th>

                  <th className="px-6 py-4">
                    Link
                  </th>

                  <th className="px-6 py-4">
                    Charge
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-700">
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-slate-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="text-sm"
                    >
                      <td className="px-6 py-4 font-mono text-blue-400">
                        {order.id}
                      </td>

                      <td className="px-6 py-4 font-medium text-white">
                        {order.serviceName}
                      </td>

                      <td className="px-6 py-4 text-slate-400 truncate max-w-[150px]">
                        {order.link}
                      </td>

                      <td className="px-6 py-4 text-green-400 font-bold">
                        ৳
                        {order.charge.toFixed(2)}
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(event) =>
                            updateOrderStatus(
                              order.id,
                              event.target
                                .value as OrderStatus
                            )
                          }
                          className="bg-slate-900 border border-slate-700 text-xs rounded px-2 py-1 outline-none"
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Completed">
                            Completed
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>
                        </select>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            deleteOrder(
                              order.id
                            )
                          }
                          className="text-red-500 hover:text-red-400"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Payments */}
        {activeTab === 'payments' && (
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 text-[10px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="px-6 py-4">
                    TrxID
                  </th>

                  <th className="px-6 py-4">
                    Method
                  </th>

                  <th className="px-6 py-4">
                    Amount
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-700">
                {payments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-slate-500"
                    >
                      No payment requests found.
                    </td>
                  </tr>
                ) : (
                  payments.map(
                    (payment) => (
                      <tr
                        key={payment.id}
                        className="text-sm"
                      >
                        <td className="px-6 py-4 font-mono text-pink-500">
                          {payment.trxId}
                        </td>

                        <td className="px-6 py-4 text-white">
                          {payment.method}
                        </td>

                        <td className="px-6 py-4 font-bold text-white">
                          ৳
                          {payment.amount}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-[10px] font-bold ${
                              payment.status ===
                              'Approved'
                                ? 'bg-green-500/10 text-green-500'
                                : payment.status ===
                                  'Rejected'
                                ? 'bg-red-500/10 text-red-500'
                                : 'bg-yellow-500/10 text-yellow-500'
                            }`}
                          >
                            {payment.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updatePaymentStatus(
                                payment.id,
                                'Approved'
                              )
                            }
                            className="bg-green-600 text-white text-[10px] px-2 py-1 rounded"
                          >
                            Approve
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              updatePaymentStatus(
                                payment.id,
                                'Rejected'
                              )
                            }
                            className="bg-red-600 text-white text-[10px] px-2 py-1 rounded"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Services */}
        {activeTab === 'services' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">
                Manage Services
              </h3>

              <button
                type="button"
                onClick={addAiService}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold"
              >
                + Add AI Powered Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.length === 0 ? (
                <p className="text-slate-500">
                  No services found.
                </p>
              ) : (
                services.map(
                  (service) => (
                    <div
                      key={service.id}
                      className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] text-blue-500 font-bold uppercase">
                          {
                            service.category
                          }
                        </span>

                        <h4 className="font-bold text-white text-sm mt-1">
                          {service.name}
                        </h4>

                        <p className="text-xs text-slate-400 mt-1">
                          ৳
                          {
                            service.pricePer1k
                          }{' '}
                          / 1k
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          deleteService(
                            service.id
                          )
                        }
                        className="mt-4 text-xs font-bold text-red-500 hover:bg-red-500/10 py-2 rounded"
                      >
                        Delete Service
                      </button>
                    </div>
                  )
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
