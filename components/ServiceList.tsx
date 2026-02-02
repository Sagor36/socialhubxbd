
import React, { useState } from 'react';
import { Service } from '../types';

interface ServiceListProps {
  services: Service[];
  onBuy: (service: Service) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, onBuy }) => {
  const [filter, setFilter] = useState('');
  const categories = Array.from(new Set(services.map(s => s.category)));

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(filter.toLowerCase()) || 
    s.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Available Services</h2>
          <p className="text-sm text-slate-400">Boost your social media presence in minutes</p>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search services..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2 pl-10 focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
          />
          <svg className="absolute left-3 top-2.5 text-slate-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-900/30 text-slate-400 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Service</th>
              <th className="px-6 py-4 font-semibold">Price per 1k</th>
              <th className="px-6 py-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {filteredServices.map(service => (
              <tr key={service.id} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-blue-500 mb-0.5">{service.category}</span>
                    <span className="text-sm font-semibold text-white">{service.name}</span>
                    <span className="text-xs text-slate-400 mt-1 line-clamp-1">{service.description}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-md font-bold text-green-400">৳{service.pricePer1k}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => onBuy(service)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-lg shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                  >
                    Buy Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceList;
