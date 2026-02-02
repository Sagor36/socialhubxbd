
import React, { useState } from 'react';
import { PaymentRequest } from '../types';
import { PAYMENT_NUMBER } from '../constants';

interface PaymentFormProps {
  onSubmit: (payment: PaymentRequest) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [method, setMethod] = useState<'bKash' | 'Nagad'>('bKash');
  const [amount, setAmount] = useState<number>(0);
  const [trxId, setTrxId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !trxId) return;

    const newPayment: PaymentRequest = {
      id: 'PAY-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      method,
      amount,
      trxId,
      status: 'Pending',
      createdAt: Date.now()
    };
    onSubmit(newPayment);
  };

  return (
    <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
      <h2 className="text-2xl font-bold text-center mb-8">Add Funds Manually</h2>
      
      <div className="bg-slate-900/80 p-6 rounded-2xl mb-8 border border-blue-500/20">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Personal Number</div>
          <span className="text-xl font-mono text-white font-bold tracking-widest">{PAYMENT_NUMBER}</span>
        </div>
        <p className="text-sm text-slate-400">
          Send money to the number above using <span className="text-pink-500 font-bold">bKash</span> or <span className="text-orange-500 font-bold">Nagad</span>. Once sent, fill the form below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-4">
          <button 
            type="button" 
            onClick={() => setMethod('bKash')}
            className={`flex-1 py-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-bold ${method === 'bKash' ? 'border-pink-500 bg-pink-500/10 text-pink-500' : 'border-slate-700 text-slate-500'}`}
          >
            bKash
          </button>
          <button 
            type="button" 
            onClick={() => setMethod('Nagad')}
            className={`flex-1 py-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-bold ${method === 'Nagad' ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-slate-700 text-slate-500'}`}
          >
            Nagad
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Amount Paid (৳)</label>
          <input 
            type="number" 
            placeholder="Enter exact amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Transaction ID (TrxID)</label>
          <input 
            type="text" 
            placeholder="e.g. 9J3K8L2M"
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none uppercase"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl shadow-xl hover:bg-slate-200 transition-colors"
        >
          Confirm Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
