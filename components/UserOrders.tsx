
import React from 'react';
import { Order, PaymentRequest } from '../types';

interface UserOrdersProps {
  orders: Order[];
  payments: PaymentRequest[];
}

const UserOrders: React.FC<UserOrdersProps> = ({ orders, payments }) => {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          Your Recent Orders
        </h2>
        {orders.length === 0 ? (
          <div className="bg-slate-800/40 p-12 rounded-3xl border border-dashed border-slate-700 text-center">
            <p className="text-slate-500">No orders found. Start boosting today!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map(order => (
              <div key={order.id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-slate-500 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">{order.id}</span>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{order.serviceName}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                    order.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                    order.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Link:</span>
                    <span className="text-slate-300 truncate w-32 text-right">{order.link}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Quantity:</span>
                    <span className="text-white font-bold">{order.quantity}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Total Charge:</span>
                    <span className="text-green-400 font-bold">৳{order.charge.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
          <span className="w-1.5 h-6 bg-pink-600 rounded-full"></span>
          Payment History
        </h2>
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/50 text-slate-500 uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4">TrxID</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500 italic">No payment requests submitted yet.</td>
                </tr>
              ) : (
                payments.map(pay => (
                  <tr key={pay.id}>
                    <td className="px-6 py-4 font-mono text-blue-400">{pay.trxId}</td>
                    <td className="px-6 py-4">
                      <span className={pay.method === 'bKash' ? 'text-pink-500' : 'text-orange-500'}>{pay.method}</span>
                    </td>
                    <td className="px-6 py-4 text-white font-bold">৳{pay.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                        pay.status === 'Approved' ? 'bg-green-500/10 text-green-500' :
                        pay.status === 'Rejected' ? 'bg-red-500/10 text-red-500' :
                        'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {pay.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default UserOrders;
