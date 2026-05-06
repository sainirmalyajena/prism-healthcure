"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Phone as PhoneIcon, ChevronRight, CheckCircle2, AlertCircle, MapPin } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z.string().min(10, 'Please enter a valid phone number'),
  city: z.string().min(2, 'Please enter your city or pincode'),
  service: z.string().min(1, 'Please select a service'),
});

type FormData = z.infer<typeof formSchema>;

export default function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to submit request');
      
      setSuccess(true);
      reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative group/form">
      {/* Floating Badge */}
      <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-[0_10px_20px_rgba(16,185,129,0.3)] z-20 animate-float" style={{ animationDuration: '3s' }}>
        Free Consultation
      </div>

      <div className={cn(
        "w-full glass-card p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-white/50 relative z-10 transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)]",
        success ? "min-h-[450px] flex flex-col items-center justify-center text-center" : ""
      )}>
        {success ? (
          <div className="animate-reveal">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-emerald-100">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Request Received!</h3>
            <p className="text-slate-600 mb-8 leading-relaxed max-w-xs mx-auto">Our senior care coordinator will contact you within 15 minutes to confirm your slot.</p>
            <button 
              onClick={() => setSuccess(false)}
              className="text-teal-600 font-bold hover:text-teal-700 transition-colors flex items-center gap-2 mx-auto"
            >
              Book another consultation <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Book Your Slot</h3>
              <p className="text-slate-500 font-medium">Get a free consultation at our partner hospital today.</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="bg-red-50/80 backdrop-blur-sm text-red-600 p-4 rounded-2xl text-sm flex items-start gap-3 border border-red-100">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-1">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    {...register('name')}
                    placeholder="Full Name"
                    className="w-full pl-12 pr-5 py-4 bg-white/60 border border-slate-200/60 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium"
                  />
                </div>
                {errors.name && <p className="text-[11px] text-red-500 font-semibold ml-2">{errors.name.message}</p>}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    {...register('mobile')}
                    placeholder="Mobile Number"
                    className="w-full pl-12 pr-5 py-4 bg-white/60 border border-slate-200/60 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium"
                  />
                </div>
                {errors.mobile && <p className="text-[11px] text-red-500 font-semibold ml-2">{errors.mobile.message}</p>}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    {...register('city')}
                    placeholder="City / Pincode"
                    className="w-full pl-12 pr-5 py-4 bg-white/60 border border-slate-200/60 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium"
                  />
                </div>
                {errors.city && <p className="text-[11px] text-red-500 font-semibold ml-2">{errors.city.message}</p>}
              </div>

              <div className="space-y-1">
                <select
                  {...register('service')}
                  className="w-full px-5 py-4 bg-white/60 border border-slate-200/60 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all outline-none text-slate-900 appearance-none font-medium cursor-pointer"
                >
                  <option value="cataract">Cataract Surgery</option>
                  <option value="lasik">LASIK / Vision Correction</option>
                  <option value="retina">Retina Treatment</option>
                  <option value="glaucoma">Glaucoma</option>
                  <option value="other">Other Eye Surgery</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold py-5 px-6 rounded-2xl transition-all shadow-[0_15px_30px_rgba(13,148,136,0.3)] active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-3 mt-4 group"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Request Appointment</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tight">By clicking, you agree to our Terms & Conditions</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
