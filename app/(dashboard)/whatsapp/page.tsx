'use client';

import React from 'react';
import { MessageSquare, BarChart3, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { MetricCard } from '@/components/MetricCard';
import { builders } from '@/lib/mock-data';

export default function WhatsAppPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard label="Active Numbers" value="18" change="↑ 2 added this week" icon={MessageSquare} colorClass="emerald-600" />
        <MetricCard label="Messages Today" value="6,420" change="↑ 12% vs yesterday" icon={BarChart3} colorClass="amber-600" />
        <MetricCard label="API Usage" value="68%" change="of monthly quota" icon={Settings} colorClass="indigo-600" />
      </div>
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">WhatsApp Numbers — All Builders</h3>
          <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">Export Logs</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Number</th>
                <th className="px-6 py-4">Builder</th>
                <th className="px-6 py-4">Site</th>
                <th className="px-6 py-4">Messages</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {builders.map(b => (
                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 text-sm">{b.wa}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm font-medium">{b.company}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{b.site}</td>
                  <td className="px-6 py-4 font-bold text-accent text-sm">{b.leads.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      Active
                    </span>
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
