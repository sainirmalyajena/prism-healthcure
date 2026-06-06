"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Phone as PhoneIcon, ChevronRight, CheckCircle2, AlertCircle, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z.string().min(10, 'Please enter a valid phone number'),
  city: z.string().min(2, 'Please enter your city or pincode'),
  service: z.string().min(1, 'Please select a service'),
});

type FormData = z.infer<typeof formSchema>;

export default function AppointmentForm({ lang = 'en' }: { lang?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const isHi = lang === 'hi';

  const labels = {
    badge: isHi ? 'मुफ़्त परामर्श' : 'Free Consultation',
    title: isHi ? 'अपना स्लॉट बुक करें' : 'Book Your Slot',
    subtitle: isHi ? 'हमारे पार्टनर अस्पताल में मुफ़्त परामर्श' : 'Free consultation at our partner hospital.',
    name: isHi ? 'पूरा नाम' : 'Full Name',
    mobile: isHi ? 'मोबाइल नंबर' : 'Mobile Number',
    city: isHi ? 'शहर / पिनकोड' : 'City / Pincode',
    submit: isHi ? 'अपॉइंटमेंट का अनुरोध करें' : 'Request Appointment',
    processing: isHi ? 'प्रसंस्करण...' : 'Processing...',
    success_title: isHi ? 'अनुरोध प्राप्त हुआ!' : 'Request Received!',
    success_desc: isHi ? 'हमारे समन्वयक 15 मिनट के भीतर आपसे संपर्क करेंगे।' : 'Our coordinator will contact you within 15 mins.',
    book_another: isHi ? 'दूसरा स्लॉट बुक करें' : 'Book another slot',
    terms: isHi ? 'नियम और शर्तें लागू' : 'Terms & Conditions Apply',
    services: {
      cataract: isHi ? 'मोतियाबिंद सर्जरी' : 'Cataract Surgery',
      lasik: isHi ? 'लैसिक / दृष्टि सुधार' : 'LASIK / Vision Correction',
      retina: isHi ? 'रेटिना उपचार' : 'Retina Treatment',
      glaucoma: isHi ? 'ग्लूकोमा' : 'Glaucoma',
      other: isHi ? 'अन्य नेत्र सर्जरी' : 'Other Eye Surgery'
    }
  };

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
        {labels.badge}
      </div>

      <div className={cn(
        "w-full bg-white p-6 md:p-7 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-slate-100 relative z-10 transition-shadow duration-300 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]",
        success ? "min-h-[400px] flex flex-col items-center justify-center text-center" : ""
      )}>
        {success ? (
          <div className="animate-reveal">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner border border-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">{labels.success_title}</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed max-w-xs mx-auto">{labels.success_desc}</p>
            <button 
              onClick={() => setSuccess(false)}
              className="text-teal-600 text-sm font-bold hover:text-teal-700 transition-colors flex items-center gap-2 mx-auto"
            >
              {labels.book_another} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-1">{labels.title}</h3>
              <p className="text-slate-500 text-sm font-medium">{labels.subtitle}</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {error && (
                <div className="bg-red-50/80 backdrop-blur-sm text-red-600 p-3 rounded-xl text-xs flex items-start gap-2 border border-red-100">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-1">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    {...register('name')}
                    placeholder={labels.name}
                    className="w-full pl-10 pr-4 py-3.5 bg-white/60 border border-slate-200/60 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all outline-none text-slate-900 placeholder:text-slate-400 text-sm font-medium"
                  />
                </div>
                {errors.name && <p className="text-[10px] text-red-500 font-semibold ml-2">{errors.name.message}</p>}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    {...register('mobile')}
                    placeholder={labels.mobile}
                    className="w-full pl-10 pr-4 py-3.5 bg-white/60 border border-slate-200/60 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all outline-none text-slate-900 placeholder:text-slate-400 text-sm font-medium"
                  />
                </div>
                {errors.mobile && <p className="text-[10px] text-red-500 font-semibold ml-2">{errors.mobile.message}</p>}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    {...register('city')}
                    placeholder={labels.city}
                    className="w-full pl-10 pr-4 py-3.5 bg-white/60 border border-slate-200/60 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all outline-none text-slate-900 placeholder:text-slate-400 text-sm font-medium"
                  />
                </div>
                {errors.city && <p className="text-[10px] text-red-500 font-semibold ml-2">{errors.city.message}</p>}
              </div>

              <div className="space-y-1">
                <select
                  {...register('service')}
                  className="w-full px-4 py-3.5 bg-white/60 border border-slate-200/60 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all outline-none text-slate-900 appearance-none text-sm font-medium cursor-pointer"
                >
                  <option value="cataract">{labels.services.cataract}</option>
                  <option value="lasik">{labels.services.lasik}</option>
                  <option value="retina">{labels.services.retina}</option>
                  <option value="glaucoma">{labels.services.glaucoma}</option>
                  <option value="other">{labels.services.other}</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-[0_12px_24px_rgba(13,148,136,0.3)] active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2 mt-2 group"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-sm">{labels.processing}</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm">{labels.submit}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <p className="text-center text-[9px] text-slate-400 mt-2 font-bold uppercase tracking-tight">{labels.terms}</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
