'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { builders } from '@/lib/mock-data';

export default function SubscriptionsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Subscription Plans</h3>
            <button className="bg-accent text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-100">+ Create Plan</button>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Basic', price: '₹4,999', color: 'slate-500', features: ['5 Users', '1 WhatsApp Number', '500 Leads/mo', '2 Sites'] },
              { name: 'Pro', price: '₹12,999', color: 'accent', featured: true, features: ['20 Users', '3 WhatsApp Numbers', '5,000 Leads/mo', '10 Sites'] },
              { name: 'Enterprise', price: '₹29,999', color: 'emerald-600', features: ['Unlimited Users', '10 WhatsApp Numbers', 'Unlimited Leads', 'Unlimited Sites'] },
            ].map((plan, i) => (
              <div key={i} className={cn("p-6 rounded-3xl border flex flex-col", plan.featured ? "border-accent/20 bg-accentbg/50" : "border-slate-100 bg-slate-50/50")}>
                {plan.featured && <div className="text-[10px] bg-accent text-white px-2 py-0.5 rounded-lg w-fit mb-4 font-bold tracking-wider">POPULAR</div>}
                <div className="font-bold text-slate-900">{plan.name}</div>
                <div className="mt-4 mb-2 flex items-baseline gap-1">
                  <span className={cn("text-2xl font-bold tracking-tight", plan.featured ? "text-accent" : "text-slate-900")}>{plan.price}</span>
                  <span className="text-[11px] text-slate-500 font-medium">/mo</span>
                </div>
                <div className="space-y-3 mt-6">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {f}
                    </div>
                  ))}
                </div>
                <button className={cn("mt-8 w-full py-2.5 rounded-xl text-xs font-bold transition-all", plan.featured ? "bg-accent text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50")}>
                  Edit Plan
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden p-6">
          <h3 className="font-bold text-slate-900 text-sm mb-6">Expiring Soon</h3>
          <div className="space-y-4">
            {builders.filter(b => b.status === 'Trial' || b.expiry < '2025-11-01').map((b, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-accent/20 transition-all">
                <div>
                  <div className="text-sm font-bold text-slate-900">{b.company}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{b.plan} Plan</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-amber-600 font-bold uppercase tracking-wider">{b.expiry}</div>
                  <div className="text-[10px] text-slate-400 font-medium">expiry</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
