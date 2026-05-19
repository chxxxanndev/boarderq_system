'use client';

import React from 'react';
import Link from 'next/link'; 
import Image from 'next/image';
import { 
  Target, Users, Shield, Zap, Database, 
  Cpu, Layout, Layers, ArrowRight
} from 'lucide-react';

import {
  Activity, CheckCircle2, MapPin, Megaphone, Clock, BedDouble, TrendingUp, Wrench,
  Globe, Mail, Phone, ExternalLink, ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const proponents = [
    { 
      name: "Abal, Che Ann P.", 
      role: "Full-Stack Developer", 
      image: "/images/Cheangg.jpg",
      focus: "Logic & Integration"
    },
    { 
      name: "Lagpac, Sheila Mae A.", 
      role: "UI/UX & Database Designer", 
      image: "/images/maymaygwapa.jpg",
      focus: "Interface & Schema"
    },
    { 
      name: "Orosca, Xhyndy Lynne A.", 
      role: "Lead Systems Architect", 
      image: "/images/xhyndy.jpg",
      focus: "Cloud Infrastructure"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1F3B] font-sans overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-24 space-y-20">
        
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="px-6 py-1.5 mb-1">
            </div>
            <h1 className="text-6xl md:text-25px font-black tracking-tighter uppercase leading-none">
              ABOUT <span className="text-[#1E5EFF]">BOARDER-Q</span>
            </h1>
            <div className="mt-8 flex items-center justify-center gap-6">
              <div className="h-[2px] w-12 bg-[#22D3EE] rounded-full" />
              <p className="text-[#6B7280] text-xs md:text-sm font-black tracking-[0.3em] uppercase">
               © 2026
              </p>
              <div className="h-[2px] w-12 bg-[#22D3EE] rounded-full" />
            </div>
          </motion.div>
        </section>

        <motion.section 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-sm hover:border-[#1E5EFF]/30 transition-all duration-500">
 
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#1E5EFF] p-2.5 rounded-xl">
                </div>
                <h2 className="text-xl font-black text-[#0B1F3B] tracking-tight uppercase">Executive Summary</h2>
              </div>
              
              <p className="text-[#475569] text-base md:text-xl leading-relaxed font-medium max-w-4xl mb-10">
                Boarder-Q addresses the inefficiencies of traditional boarding house management. By integrating 
                <span className="text-[#1E5EFF] font-black"> real-time data synchronization </span> 
                with a user-centric interface, the platform eliminates manual record-keeping, 
                reduces payment disputes, and streamlines the tenant onboarding process.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {['Next.js 14', 'Node.js', 'Vercel App', 'MySQL Engine', 'Railway', 'Tailwind CSS'].map((tech) => (
                  <span key={tech} className="bg-[#F8FAFC] border border-[#E5E7EB] px-4 py-2 text-[10px] font-black text-[#6B7280] uppercase tracking-widest rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <section>
          <div className="flex items-center justify-between mb-6 border-b border-[#E5E7EB] pb-4">
            <h2 className="text-[11px] font-black text-[#0B1F3B] tracking-[0.4em] uppercase flex items-center gap-2">
              <Target size={15} className="text-[#1E5EFF]" /> Infrastructure Pillars
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Automated Onboarding", desc: "Digital application submission and instant room availability status.", icon: Layout },
              { title: "Financial Ledger", desc: "Transparent tracking of monthly dues, deposits, and payment histories.", icon: Layers },
              { title: "Maintenance Bridge", desc: "Direct ticket system for tenants to report facility issues to landlords.", icon: Cpu }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-[#E5E7EB] rounded-3xl p-8 group hover:border-[#1E5EFF] transition-all"
              >
                <div className="w-12 h-12 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl flex items-center justify-center text-[#1E5EFF] group-hover:bg-[#1E5EFF] group-hover:text-white transition-all mb-6">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-black text-[#0B1F3B] uppercase mb-3 group-hover:text-[#1E5EFF] transition-colors">{item.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed font-bold tracking-tight">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-10 border-b border-[#E5E7EB] pb-4">
            <h2 className="text-[11px] font-black text-[#0B1F3B] tracking-[0.4em] uppercase flex items-center gap-2">
              <Users size={15} className="text-[#1E5EFF]" /> Project Proponents
            </h2>
            <span className="text-[10px] font-black text-[#1E5EFF] bg-[#1E5EFF]/5 px-4 py-1 rounded-full border border-[#1E5EFF]/10 uppercase tracking-widest">
              Core Development Team
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {proponents.map((member, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative bg-white border border-[#E5E7EB] rounded-[2rem] overflow-hidden shadow-sm transition-all duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-all duration-500"
                  />

                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block bg-[#1E5EFF] text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-md mb-2">
                      {member.focus}
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase leading-none tracking-tighter">
                      {member.name.split(',')[0]},
                      <span className="block text-sm opacity-80">{member.name.split(',')[1]}</span>
                    </h3>
                  </div>
                </div>

                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#0B1F3B] uppercase mt-1">{member.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 p-8 border border-dashed border-[#CBD5E1] rounded-3xl bg-white/50">
            <Shield className="text-[#1E5EFF] w-8 h-8" />
            <div className="text-center md:text-left">
              <p className="text-[11px] font-black text-[#0B1F3B] uppercase tracking-widest">College of Computing Studies</p>
              <p className="text-[10px] text-[#6B7280] font-bold uppercase tracking-widest mt-1">Platform-Based Development • 2026 Final Project</p>
            </div>
            <div className="h-px w-full md:w-20 bg-[#E5E7EB]" />
            <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Mr. Whelster R. Esmade
            </div>
          </div>
        </section>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="w-full text-center py-10"
        >
          <p className="text-[10px] text-[#6B7280] font-black uppercase tracking-[0.5em] mb-6">The Future of Boarding Management</p>
          <h3 className="text-3xl md:text-4xl font-black text-[#0B1F3B] tracking-tighter uppercase">
            Efficiency through <span className="text-[#1E5EFF]">Technology</span>
          </h3>
        </motion.section>
      </main>

      <footer className="bg-white border-t border-[#E5E7EB] pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

            <div className="space-y-4">
              <Link href="/">
                <h3 className="text-2xl font-black tracking-tighter uppercase leading-none text-[#0B1F3B] cursor-pointer">
                  BOARDER<span className="text-[#1E5EFF] italic">Q</span>
                </h3>
              </Link>
              <p className="text-[11px] text-[#6B7280] font-bold leading-relaxed tracking-wider">
                Redefining the boarding house experience through automated logistics and real-time inventory synchronization.
              </p>
              <div className="flex items-center gap-3">
                <button className="w-9 h-9 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#1E5EFF] transition-all">
                  <Globe size={18} />
                </button>
                <a href="mailto:boarderqadmin123@gmail.com" className="w-9 h-9 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#1E5EFF] transition-all">
                  <Mail size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-[#0B1F3B] uppercase tracking-[0.4em] mb-6">Ecosystem</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Overview', href: '/' },
                  { label: 'Browse Rooms', href: '/public/rooms' },
                  { label: 'About Project', href: '/public/about' },
                  { label: 'Sign In', href: '/public/login' }
                ].map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-[11px] font-bold text-[#6B7280] hover:text-[#1E5EFF] uppercase tracking-widest transition-colors flex items-center gap-2 group"
                    >
                      <div className="w-1 h-1 bg-[#E5E7EB] group-hover:bg-[#1E5EFF] transition-colors" /> 
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-[#0B1F3B] uppercase tracking-[0.4em] mb-6">Landlord Connect</h4>
              <div className="space-y-4">
                <a href="https://www.facebook.com/che.ann.abal.2024" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <Globe className="text-[#1E5EFF] mt-1" size={18} />
                  <div>
                    <p className="text-[11px] font-black text-[#0B1F3B] uppercase tracking-tight group-hover:text-[#1E5EFF] transition-colors">
                      Official Facebook
                    </p>
                    <p className="text-[10px] text-[#6B7280] font-bold uppercase mt-1 flex items-center gap-1">
                      Visit Page <ExternalLink size={10} />
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <Mail className="text-[#1E5EFF] mt-1" size={18} />
                  <div>
                    <p className="text-[11px] font-black text-[#0B1F3B] uppercase tracking-tight">
                      Support Email
                    </p>
                    <p className="text-[10px] text-[#6B7280] font-bold mt-1">
                      boarderqadmin123@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-[#0B1F3B] uppercase tracking-[0.4em] mb-6">Property Hub</h4>
              <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#1E5EFF] flex-shrink-0" />
                  <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wide leading-relaxed">
                    Dapitan City, <br /> Zamboanga Del Norte, 7101<br /> Philippines
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-[#F8FAFC] flex flex-col md:flex-row justify-center items-center gap-4">
            <span className="text-[9px] font-black text-[#CBD5E1] uppercase tracking-[0.4em]">
              BOARDER-Q © 2026
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}