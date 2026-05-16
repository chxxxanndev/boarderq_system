'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronRight, Loader2, ShieldCheck, Mail, 
  Lock, Eye, EyeOff, AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Identity verification failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/tenant/dashboard');
      }
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="h-[calc(100vh-72px)] w-full flex flex-col lg:flex-row bg-white overflow-hidden font-sans">
      
      <div className="hidden lg:flex flex-1 relative bg-[#F8FAFC] items-center justify-center border-r border-[#E5E7EB]">
        
        <motion.div 
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-10 p-12 bg-white rounded-full shadow-xl shadow-blue-500/5 border border-[#E5E7EB]">
            <img src="/images/logo.png" alt="Logo" className="w-32 h-32 object-contain" />
          </div>            
          <h2 className="text-6xl font-black text-[#0B1F3B] tracking-tighter uppercase leading-none">
            BOARDER<span className="text-[#1E5EFF] italic">Q</span>
          </h2>
          <div className="h-1.5 w-16 bg-[#1E5EFF] my-6 rounded-full" />
          <p className="text-[#6B7280] text-xs font-black tracking-[0.5em] uppercase">
            Boarding House Management System
          </p>
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 relative bg-white">

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(30,94,255,0.05), transparent)",
              "radial-gradient(circle at 80% 80%, rgba(30,94,255,0.05), transparent)",
              "radial-gradient(circle at 20% 20%, rgba(30,94,255,0.05), transparent)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full max-w-md relative z-10"
        >
          
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-5xl font-black text-[#0B1F3B] tracking-tight uppercase leading-none">
              Sign In
            </h1>
            <p className="text-[#6B7280] text-[10px] font-bold tracking-[0.2em] uppercase mt-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1E5EFF]" /> Secure Credential Entry
            </p>
          </motion.div>

          <motion.form variants={itemVariants} onSubmit={handleLogin} className="space-y-6">
            
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 text-rose-600 shadow-sm"
                >
                  <AlertCircle className="shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-wider">{error}</p>
                    <p className="text-[9px] font-bold opacity-70 mt-1 uppercase">
                      Authentication Terminal Refused Access
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants} className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[#6B7280] ml-1 tracking-widest">Email Identity</label>
              <motion.div
                animate={error ? { x: [0, -4, 4, -4, 0] } : {}}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] group-focus-within:text-[#1E5EFF]" />
                <input 
                  type="email" name="email" required value={formData.email} onChange={handleChange}
                  className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl font-bold focus:border-[#1E5EFF] focus:ring-4 focus:ring-[#1E5EFF]/5"
                />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <div className="flex justify-between">
                <label className="text-[10px] font-black uppercase text-[#6B7280] ml-1 tracking-widest">Enter Password</label>
                <button type="button" className="text-[9px] font-black text-[#1E5EFF] uppercase hover:underline">Forgot Password?</button>
              </div>

              <motion.div
                animate={error ? { x: [0, -4, 4, -4, 0] } : {}}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] group-focus-within:text-[#1E5EFF]" />
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-14 py-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl font-bold focus:border-[#1E5EFF] focus:ring-4 focus:ring-[#1E5EFF]/5"
                />

                <motion.button
                  whileTap={{ scale: 0.8, rotate: 10 }}
                  whileHover={{ scale: 1.1 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              disabled={loading}
              className="w-full py-5 rounded-2xl bg-[#0B1F3B] text-white font-black tracking-[0.2em] text-xs shadow-xl flex justify-center items-center gap-3 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-[#1E5EFF] opacity-0"
                whileHover={{ opacity: 0.15 }}
              />

              {loading 
                ? <Loader2 className="animate-spin" size={18} /> 
                : <>ACCESS PORTAL <ChevronRight size={16} /></>
              }
            </motion.button>
          </motion.form>

          <motion.div variants={itemVariants} className="mt-12 text-center pt-8 border-t border-[#F8FAFC]">
            <p className="text-[#6B7280] text-[10px] font-bold uppercase tracking-widest">
              Need to initialize a profile?{' '}
              <Link href="/public/register" className="text-[#1E5EFF] font-black ml-1 hover:underline">
                Create Profile
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}