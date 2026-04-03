import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  colorClass: string;
}

export const MetricCard = ({ label, value, change, icon: Icon, colorClass }: MetricCardProps) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
      <div className={cn("p-2 rounded-xl text-white", `bg-${colorClass}`)}>
        <Icon size={18} />
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-3xl font-bold text-slate-900 tracking-tight">{value}</span>
      <div className={cn("flex items-center gap-1 mt-1 text-xs font-medium", change.startsWith('↑') ? "text-emerald-600" : "text-rose-600")}>
        {change}
      </div>
    </div>
  </div>
);
