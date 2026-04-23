'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  UserPlus, Zap, ArrowLeft, Loader2, Mail, Lock, User, 
  Eye, EyeOff, ShieldCheck, Activity, CheckCircle2, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // New Modal State
  
  // Updated state to include confirmPassword
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // 1. Password Confirmation Check
    if (formData.password !== formData.confirmPassword) {
      setError("PASSWORDS DO NOT MATCH");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // 2. Show Custom Modal instead of Alert
      setShowSuccessModal(true);

    } catch (err) {
      setError(err.message.toUpperCase());
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="h-[calc(100vh-72px)] w-full flex flex-col lg:flex-row bg-white overflow-hidden font-sans">
      
      {/* LEFT SECTION: BRANDING */}
      <div className="hidden lg:flex flex-1 relative bg-[#F8FAFC] items-center justify-center border-r border-[#E5E7EB]">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-10 p-12 bg-white rounded-full shadow-xl shadow-blue-500/5 border border-[#E5E7EB]">
            <UserPlus size={80} className="text-[#1E5EFF]" />
          </div>            
          <h2 className="text-6xl font-black text-[#0B1F3B] tracking-tighter uppercase leading-none">
            JOIN <span className="text-[#1E5EFF] italic">US</span>
          </h2>
          <div className="h-1.5 w-16 bg-[#1E5EFF] my-6 rounded-full" />
          <p className="text-[#6B7280] text-xs font-black tracking-[0.5em] uppercase">
            Tenant Onboarding Terminal
          </p>
        </motion.div>

        <div className="absolute bottom-10 left-10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Protocol: Secure Initialization</span>
        </div>
      </div>

      {/* RIGHT SECTION: FORM AREA */}
      <div className="flex-1 flex flex-col justify-start items-center pt-16 p-8 md:p-1 relative bg-white overflow-y-auto">
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-40"
          animate={{
            background: [
              "radial-gradient(circle at 80% 20%, rgba(34,211,238,0.1), transparent)",
              "radial-gradient(circle at 20% 80%, rgba(34,211,238,0.1), transparent)",
              "radial-gradient(circle at 80% 20%, rgba(34,211,238,0.1), transparent)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full max-w-md relative z-10"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-5xl font-black text-[#0B1F3B] tracking-tight uppercase leading-none">
              Register
            </h1>
            <p className="text-[#6B7280] text-[10px] font-bold tracking-[0.2em] uppercase mt-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#1E5EFF]" /> Initialize Tenant Identity
            </p>
          </motion.div>

          <motion.form variants={itemVariants} onSubmit={handleRegister} className="space-y-4">
            
            {/* Error Message */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 flex items-center gap-3 text-[10px] font-black uppercase tracking-wider"
                >
                  <ShieldCheck size={16} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[#6B7280] ml-1 tracking-widest">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] group-focus-within:text-[#1E5EFF] transition-colors" />
                <input 
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  placeholder="e.g. JOHN DOE" 
                  className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl text-[#0B1F3B] font-bold focus:outline-none focus:border-[#1E5EFF] focus:ring-4 focus:ring-[#1E5EFF]/5 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[#6B7280] ml-1 tracking-widest">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] group-focus-within:text-[#1E5EFF] transition-colors" />
                <input 
                  type="email" name="email" required value={formData.email} onChange={handleChange}
                  placeholder="name@provider.com" 
                  className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl text-[#0B1F3B] font-bold focus:outline-none focus:border-[#1E5EFF] focus:ring-4 focus:ring-[#1E5EFF]/5 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-[#6B7280] ml-1 tracking-widest">Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] group-focus-within:text-[#1E5EFF] transition-colors" />
                        <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" required value={formData.password} onChange={handleChange}
                        placeholder="••••••••" 
                        className="w-full pl-11 pr-4 py-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl text-[#0B1F3B] font-bold focus:outline-none focus:border-[#1E5EFF] transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-[#6B7280] ml-1 tracking-widest">Confirm</label>
                    <div className="relative group">
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] group-focus-within:text-[#1E5EFF] transition-colors" />
                        <input 
                        type={showPassword ? "text" : "password"} 
                        name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange}
                        placeholder="••••••••" 
                        className="w-full pl-11 pr-12 py-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl text-[#0B1F3B] font-bold focus:outline-none focus:border-[#1E5EFF] transition-all text-sm"
                        />
                        <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#0B1F3B]"
                        >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit" 
              disabled={loading}
              className="w-full py-5 mt-4 rounded-2xl bg-[#0B1F3B] text-white font-black tracking-[0.2em] text-xs shadow-xl hover:bg-[#1E5EFF] transition-all flex justify-center items-center gap-3 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>INITIALIZE PROFILE <Zap size={16} /></>}
            </motion.button>
          </motion.form>

          <motion.div variants={itemVariants} className="mt-6 text-center pt-4 border-t border-[#F1F5F9]">
            <Link href="/public/login" className="text-[#6B7280] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center hover:text-[#1E5EFF] transition-colors group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Return to Secure Login
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* BRANDED SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0B1F3B]/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-[#E5E7EB] overflow-hidden"
            >
              <div className="p-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black text-[#0B1F3B] uppercase tracking-tight leading-none mb-3">
                    Registration <span className="text-[#1E5EFF]">Complete</span>
                </h3>
                <p className="text-[#6B7280] text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                    Identity created successfully. Please await <span className="text-[#0B1F3B]">Administrator Approval</span> before terminal access.
                </p>
                <button 
                  onClick={() => router.push('/public/login')}
                  className="w-full mt-8 py-4 bg-[#0B1F3B] text-white rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase hover:bg-[#1E5EFF] transition-all shadow-lg shadow-blue-500/10"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}