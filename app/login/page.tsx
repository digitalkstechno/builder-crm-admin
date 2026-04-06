'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import axios from '@/lib/axios';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Backend should have a admin login endpoint
      const response = await axios.post('/admin/login', formData);
      if (response.data.success) {
        dispatch(setAuth({
          user: response.data.data.user,
          token: response.data.token
        }));
        
        // Middleware will check this cookie
        document.cookie = `admin_token=${response.data.token}; path=/; max-age=86400; SameSite=Lax`;
        
        toast.success("Access Granted. Welcome, Admin.");
        router.push('/');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Unauthorized Access');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 selection:bg-indigo-500/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-500/10 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl p-10 backdrop-blur-xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)]">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Super Admin Portal</h1>
          <p className="text-slate-400 text-sm font-medium">BuildFlow CRM Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Admin Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="email"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-sm"
                placeholder="admin@buildflow.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Secret Key</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="password"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-sm"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-[0_20px_40px_-10px_rgba(79,70,229,0.3)] flex items-center justify-center gap-3 transition-all disabled:opacity-70 mt-4 active:scale-[0.98]"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Authenticate"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">Authorized Access Only</p>
        </div>
      </motion.div>
    </div>
  );
}
