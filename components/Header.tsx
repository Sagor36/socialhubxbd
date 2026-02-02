
import React from 'react';

interface HeaderProps {
  setView: (view: 'home' | 'admin' | 'my-orders' | 'pay') => void;
  isAdmin: boolean;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ setView, isAdmin, currentView }) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
          <div className="bg-blue-600 p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12L2.1 12.45"/><path d="M16 12l5.45-2.26"/><path d="M12 12l3.41-9.39"/></svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            SocialHubXBD
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => setView('home')} 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'home' ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:text-white'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setView('my-orders')} 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'my-orders' ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:text-white'}`}
          >
            Track Order
          </button>
          <button 
            onClick={() => setView('pay')} 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'pay' ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:text-white'}`}
          >
            Add Funds
          </button>
        </nav>

        <div className="flex items-center gap-4">
          {isAdmin && (
            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Admin Mode
            </span>
          )}
          <button className="md:hidden p-2 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
