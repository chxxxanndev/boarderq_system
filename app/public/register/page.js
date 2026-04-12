'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  UserPlus, Zap, ArrowLeft, Loader2, Mail, Lock, User, 
  Eye, EyeOff, ShieldCheck, Activity, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      alert('Profile Created Successfully! Please wait for Admin approval before logging in.');
      router.push('/public/login');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Same Animation Variants as Login for perfect consistency
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    /* Locked height under Navbar */
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
      <div className="flex-1 flex flex-col justify-start items-center pt-24 p-8 md:p-1 relative bg-white">
        
        {/* Animated subtle background glow */}
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
          <motion.div variants={itemVariants} className="mb-0">
            <h1 className="text-5xl font-black text-[#0B1F3B] tracking-tight uppercase leading-none">
              Register
            </h1>
            <p className="text-[#6B7280] text-[10px] font-bold tracking-[0.2em] uppercase mt-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#1E5EFF]" /> Initialize Tenant Identity
            </p>
          </motion.div>

          <motion.form variants={itemVariants} onSubmit={handleRegister} className="space-y-5">
            
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 flex items-center gap-3 text-[11px] font-black uppercase"
                >
                  <ShieldCheck size={18} /> {error}
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

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[#6B7280] ml-1 tracking-widest">Access Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] group-focus-within:text-[#1E5EFF] transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" required value={formData.password} onChange={handleChange}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-14 py-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl text-[#0B1F3B] font-bold focus:outline-none focus:border-[#1E5EFF] focus:ring-4 focus:ring-[#1E5EFF]/5 transition-all text-sm"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#0B1F3B] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading}
              className="w-full py-5 rounded-2xl bg-[#0B1F3B] text-white font-black tracking-[0.2em] text-xs shadow-xl hover:bg-[#1E5EFF] transition-all flex justify-center items-center gap-3 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>INITIALIZE PROFILE <Zap size={16} /></>}
            </motion.button>
          </motion.form>

          <motion.div variants={itemVariants} className="mt-1 text-center pt-2 border-t border-[#F8FAFC]">
            <Link href="/public/login" className="text-[#6B7280] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center hover:text-[#1E5EFF] transition-colors group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Return to Secure Login
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}