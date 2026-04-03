'use client';

import React from 'react';
import { Search, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { builders } from '@/lib/mock-data';

export default function BuildersPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {['All Builders', 'Active', 'Suspended', 'Trial'].map((tab, i) => (
          <button 
            key={tab} 
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
              i === 0 ? "bg-white text-accent shadow-sm" : "text-slate-500 hover:text-slate-900"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">All Registered Builders</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search builder..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all w-48"
              />
            </div>
            <button className="bg-accent text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-100">+ Add Builder</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Users</th>
                <th className="px-6 py-4">Sites</th>
                <th className="px-6 py-4">Leads</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {builders.map(b => (
                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-[11px]"
                        style={{ backgroundColor: `${b.color}15`, color: b.color }}
                      >
                        {b.initials}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{b.company}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{b.person}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded uppercase", b.plan === 'Enterprise' ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700")}>
                      {b.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-xs font-medium">{b.users} users</td>
                  <td className="px-6 py-4 text-slate-600 text-xs font-medium">{b.sites} sites</td>
                  <td className="px-6 py-4 font-bold text-slate-900 text-sm">{b.leads.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full uppercase", b.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
