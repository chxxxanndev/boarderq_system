export default function Button({ children, className = '', variant = 'primary', size = 'md', ...props }) {
  const variants = {
    primary: 'bg-cyan-500 text-slate-950 hover:bg-white shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]',
    secondary: 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700',
    outline: 'border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/60',
    danger: 'border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/60',
    success: 'border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/60',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-[9px] tracking-widest',
    md: 'px-6 py-2.5 text-[10px] tracking-[0.2em]',
    lg: 'px-10 py-4 text-[12px] tracking-[0.3em]',
  };

  const baseStyles = 'rounded-sm font-black uppercase italic transition-all duration-300 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2';

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  return (
    <button 
      className={combinedClasses.trim()} 
      {...props}
    >
      {children}
    </button>
  );
}