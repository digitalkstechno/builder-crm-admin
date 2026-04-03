'use client';

import React from 'react';
import { Users2, ShieldCheck, ExternalLink, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';
import { MetricCard } from '@/components/MetricCard';
import { builders } from '@/lib/mock-data';

export default function AnalyticsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard label="Total Leads (All)" value="12,483" change="↑ 18% MoM" icon={Users2} colorClass="accent" />
        <MetricCard label="Closed Won" value="1,771" change="14.2% conversion" icon={ShieldCheck} colorClass="green" />
        <MetricCard label="Site Visits" value="3,104" change="↑ 8% this month" icon={ExternalLink} colorClass="amber" />
        <MetricCard label="Avg Deal Value" value="₹84L" change="Median: ₹62L" icon={IndianRupee} colorClass="blue" />
      </div>
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Builder Performance Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Builder</th>
                <th className="px-6 py-4">Total Leads</th>
                <th className="px-6 py-4">Contacted</th>
                <th className="px-6 py-4">Site Visits</th>
                <th className="px-6 py-4">Closed Won</th>
                <th className="px-6 py-4">Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {builders.map(b => (
                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 text-sm">{b.company}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{b.leads.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{(b.leads * 0.8).toFixed(0)}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{(b.leads * 0.15).toFixed(0)}</td>
                  <td className="px-6 py-4 font-bold text-emerald-600 text-sm">{(b.leads * 0.12).toFixed(0)}</td>
                  <td className="px-6 py-4"><span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded">12.4%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
