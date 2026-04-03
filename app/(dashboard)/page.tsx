'use client';

import React from 'react';
import { 
  Building2, 
  Users2, 
  MessageCircle, 
  IndianRupee,
  ChevronDown,
  MoreVertical
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import { MetricCard } from '@/components/MetricCard';
import { builders, revData, planDistribution } from '@/lib/mock-data';

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Total Builders" 
          value="24" 
          change="↑ 3 this month" 
          icon={Building2} 
          colorClass="accent" 
        />
        <MetricCard 
          label="Total Leads" 
          value="12,483" 
          change="↑ 18% vs last month" 
          icon={Users2} 
          colorClass="green" 
        />
        <MetricCard 
          label="Messages Sent" 
          value="84.2K" 
          change="↑ 6.4K today" 
          icon={MessageCircle} 
          colorClass="amber" 
        />
        <MetricCard 
          label="Monthly Revenue" 
          value="₹3.6L" 
          change="↑ ₹22K vs last month" 
          icon={IndianRupee} 
          colorClass="blue" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Registered Builders</h3>
            <div className="flex items-center gap-3">
              <select className="bg-slate-50 border border-slate-200 text-slate-500 text-xs rounded-lg px-2.5 py-1.5 outline-none cursor-pointer focus:ring-2 focus:ring-accent/20">
                <option>All Status</option>
                <option>Active</option>
                <option>Suspended</option>
              </select>
              <button className="text-xs font-bold text-accent hover:underline">View all</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Leads</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {builders.slice(0, 5).map(b => (
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
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider", b.plan === 'Enterprise' ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700")}>
                        {b.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900 text-sm">{b.leads.toLocaleString()}</td>
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

        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Monthly Revenue</h3>
            <button className="text-xs font-bold text-accent flex items-center gap-1">2025 <ChevronDown size={14} /></button>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="mb-8">
              <div className="text-3xl font-bold text-slate-900 tracking-tight">₹3,62,400</div>
              <p className="text-xs text-slate-500 font-medium mt-1">Total this year: <span className="text-slate-900">₹38.1L</span></p>
            </div>
            <div className="flex-1 min-h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revData}>
                  <Bar 
                    dataKey="value" 
                    fill="#4f46e5" 
                    radius={[4, 4, 0, 0]}
                  >
                    {revData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 9 ? '#4f46e5' : '#e2e8f0'} 
                      />
                    ))}
                  </Bar>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8' }} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#0f172a', fontSize: '12px', fontWeight: '600' }}
                    labelStyle={{ display: 'none' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="p-5 pt-0 border-t border-border mt-auto">
            <div className="text-xs font-semibold text-muted mb-3 uppercase tracking-wider">Plan Distribution</div>
            <div className="space-y-3">
              {planDistribution.map(plan => (
                <div key={plan.name} className="flex items-center gap-3">
                  <div className="text-[12.5px] text-muted w-20">{plan.name}</div>
                  <div className="flex-1 h-1.5 bg-card2 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ width: `${(plan.value / 24) * 100}%`, backgroundColor: plan.color }}
                    />
                  </div>
                  <div className="text-xs text-muted w-6 text-right">{plan.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-syne font-semibold text-sm">WhatsApp Activity</h3>
            <button className="text-xs text-accent2 hover:underline">Manage →</button>
          </div>
          <div className="p-5 space-y-4">
            {[
              { num: '+91 98765 43210', builder: 'Skyline Infra', count: '2,340', color: 'green' },
              { num: '+91 87654 32109', builder: 'Apex Builders', count: '1,892', color: 'green' },
              { num: '+91 76543 21098', builder: 'Prestige Homes', count: '1,240', color: 'amber' },
              { num: '+91 65432 10987', builder: 'GreenCity Dev', count: '802', color: 'red' },
            ].map((wa, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full bg-${wa.color}`} />
                  <div>
                    <div className="text-[13px] font-medium">{wa.num}</div>
                    <div className="text-[11px] text-muted">{wa.builder}</div>
                  </div>
                </div>
                <div className="text-[13px] font-bold text-accent2">{wa.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-syne font-semibold text-sm">Recent Activity</h3>
            <button className="text-xs text-hint">Clear</button>
          </div>
          <div className="p-5 space-y-4">
            {[
              { icon: '🆕', text: 'Skyline Infra added 34 new leads', time: '2 min ago', color: 'green' },
              { icon: '💳', text: 'Apex Builders renewed Pro plan', time: '18 min ago', color: 'purple' },
              { icon: '⚠️', text: 'GreenCity Dev WhatsApp limit 90%', time: '1 hr ago', color: 'amber' },
              { icon: '👤', text: 'New builder Orbit Realty registered', time: '3 hr ago', color: 'blue' },
            ].map((act, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-card2 flex items-center justify-center text-sm shrink-0">
                  {act.icon}
                </div>
                <div>
                  <div className="text-[12.5px] leading-tight">
                    {act.text.split(' ').map((word, j) => (
                      builders.some(b => b.company.includes(word)) 
                        ? <span key={j} className="text-accent2 font-medium">{word} </span> 
                        : word + ' '
                    ))}
                  </div>
                  <div className="text-[11px] text-hint mt-1">{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-syne font-semibold text-sm">Platform Health</h3>
          </div>
          <div className="p-5 space-y-3.5">
            {[
              { label: 'Active Builders', value: '19 / 24', color: 'green' },
              { label: 'Leads This Week', value: '3,241', color: 'accent2' },
              { label: 'API Calls Today', value: '48.6K', color: 'blue' },
              { label: 'Expiring Plans (30d)', value: '4', color: 'amber' },
              { label: 'Avg Conversion Rate', value: '14.2%', color: 'green' },
              { label: 'System Uptime', value: '99.97%', color: 'green' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-[12.5px] text-muted">{stat.label}</span>
                <span className="text-sm font-semibold font-syne" style={{ color: `var(--color-${stat.color})` }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
