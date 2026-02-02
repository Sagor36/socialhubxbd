
import React from 'react';
import { SUPPORT_EMAIL } from '../constants';

interface FooterProps {
  onAdminLink: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminLink }) => {
  return (
    <footer className="bg-slate-950/50 py-12 border-t border-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">SocialHubXBD</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              We provide the most competitive pricing for social media marketing services in the market. Guaranteed delivery and 24/7 support.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Links</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400">Refund Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Contact</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                {SUPPORT_EMAIL}
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                Direct Telegram: @socialhubxbd
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-[10px] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} SocialHubXBD. All rights reserved.
          </p>
          
          {/* Subtle Hidden Admin Link */}
          <button 
            onClick={onAdminLink}
            className="text-slate-800 hover:text-slate-700 text-[8px] transition-colors cursor-default"
          >
            Management
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
