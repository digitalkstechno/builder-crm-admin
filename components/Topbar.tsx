'use client';

import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';

interface TopbarProps {
  title: string;
  sub: string;
}

export const Topbar = ({ title, sub }: TopbarProps) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div>
        <h2 className="text-lg font-bold text-slate-900 capitalize tracking-tight">{title}</h2>
        <p className="text-[11px] text-slate-500 font-medium">{sub}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search builders..." 
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all w-64"
          />
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative border border-slate-100">
          <Bell size={16} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <button className="flex items-center gap-2 bg-accent hover:bg-accent2 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-100">
          <Plus size={18} />
          Add Builder
        </button>
      </div>
    </header>
  );
};
