import React, { useState, useEffect } from 'react';
import { X, CreditCard, Zap, Calendar, IndianRupee, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface RenewPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  builder: any;
  plans: any[];
  onSuccess: () => void;
}

export default function RenewPlanModal({
  isOpen,
  onClose,
  builder,
  plans,
  onSuccess
}: RenewPlanModalProps) {
  const { token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    planId: '',
    amountPaid: ''
  });

  useEffect(() => {
    if (isOpen && plans.length > 0) {
      // Default to the first plan or currently active plan's equivalent
      const activeSub = builder?.subscriptions?.find((s: any) => s.status === 'active');
      const defaultPlan = plans.find(p => p._id === activeSub?.planId) || plans[0];
      
      setFormData({
        planId: defaultPlan?._id || '',
        amountPaid: defaultPlan?.price?.toString() || ''
      });
    }
  }, [isOpen, plans, builder]);

  const handlePlanChange = (planId: string) => {
    const selectedPlan = plans.find(p => p._id === planId);
    setFormData({
      planId,
      amountPaid: selectedPlan?.price?.toString() || ''
    });
  };

  const handleRenew = async () => {
    if (!formData.planId || !formData.amountPaid) {
      toast.error("Please select a plan and amount");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/builder/renew-subscription`, {
        builderId: builder._id,
        planId: formData.planId,
        amountPaid: Number(formData.amountPaid),
        razorpayOrderId: 'MANUAL',
        razorpayPaymentId: `ADMIN_RENEWAL_${Date.now()}`
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        toast.success("Plan Renewed Successfully!");
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to renew plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-[2rem] shadow-2xl z-[101] overflow-hidden border border-slate-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                  <Zap size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Renew Plan</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{builder?.companyName}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Plan Selection */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <CreditCard size={12} className="text-indigo-500" />
                  Select Renewal Plan
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {plans.map((plan) => (
                    <button
                      key={plan._id}
                      onClick={() => handlePlanChange(plan._id)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border transition-all",
                        formData.planId === plan._id 
                          ? "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-500/10" 
                          : "bg-white border-slate-100 hover:border-slate-200"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
                          formData.planId === plan._id ? "border-indigo-600 bg-indigo-600" : "border-slate-200"
                        )}>
                          {formData.planId === plan._id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-slate-900">{plan.planName}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{plan.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-black text-slate-900">₹{plan.price.toLocaleString()}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Override */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <IndianRupee size={12} className="text-emerald-500" />
                  Renewal Price (Adjustable)
                </label>
                <div className="relative">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</div>
                   <input
                    type="number"
                    value={formData.amountPaid}
                    onChange={(e) => setFormData(prev => ({ ...prev, amountPaid: e.target.value }))}
                    className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-black text-lg text-slate-900"
                   />
                </div>
              </div>

              {/* Info Alert */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
                 <Calendar size={18} className="text-amber-500 shrink-0 mt-0.5" />
                 <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
                   <strong>Note:</strong> Renewal will start from the end of the current active plan. If the plan is expired, it starts from today.
                 </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-50/50 border-t border-slate-100">
               <button
                onClick={handleRenew}
                disabled={loading}
                className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 disabled:opacity-50"
               >
                 {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                 ) : (
                    <>
                      <Zap size={14} />
                      Confirm Manual Renewal
                    </>
                 )}
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
