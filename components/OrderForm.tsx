
import React, { useState, useEffect } from 'react';
import { Service, Order } from '../types';

interface OrderFormProps {
  service: Service | null;
  services: Service[];
  onSubmit: (order: Order) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ service, services, onSubmit }) => {
  const [selectedId, setSelectedId] = useState(service?.id || '');
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState<number>(100);

  useEffect(() => {
    if (service) setSelectedId(service.id);
  }, [service]);

  const activeService = services.find(s => s.id === selectedId);
  const charge = activeService ? (activeService.pricePer1k / 1000) * quantity : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeService || !link || quantity <= 0) return;

    const newOrder: Order = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      serviceId: activeService.id,
      serviceName: activeService.name,
      link,
      quantity,
      charge,
      status: 'Pending',
      createdAt: Date.now()
    };
    onSubmit(newOrder);
    setLink('');
    setQuantity(100);
  };

  return (
    <div className="bg-slate-800/60 p-6 rounded-2xl border border-blue-500/20 shadow-2xl shadow-blue-900/10">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        New Order
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Select Service</label>
          <select 
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          >
            <option value="" disabled>Choose a service...</option>
            {services.map(s => (
              <option key={s.id} value={s.id}>{s.name} - ৳{s.pricePer1k}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Profile/Post Link</label>
          <input 
            type="url" 
            placeholder="https://facebook.com/username"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Quantity</label>
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              min={activeService?.min || 1}
              max={activeService?.max || 100000}
              required
            />
          </div>
          <div className="flex flex-col justify-end">
            <div className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-bold">Charge:</span>
              <span className="text-lg font-bold text-blue-400">৳{charge.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform active:scale-[0.98]"
        >
          Submit Order
        </button>
        <p className="text-[10px] text-center text-slate-500 italic uppercase tracking-widest">
          Secure encrypted payment processing
        </p>
      </form>
    </div>
  );
};

export default OrderForm;
