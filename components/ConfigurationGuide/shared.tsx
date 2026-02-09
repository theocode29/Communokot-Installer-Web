import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

// --- TYPOGRAPHY HELPERS ---

export const Kbd = ({ children }: { children?: React.ReactNode }) => (
  <span className="inline-flex items-center justify-center bg-white border border-neutral-300 rounded-[4px] min-w-[20px] px-1 h-5 text-[10px] font-bold text-neutral-600 shadow-[0_1px_0_rgba(0,0,0,0.08)] font-mono mx-0.5 align-baseline transform translate-y-[-1px] select-none">
    {children}
  </span>
);

export const Badge = ({ children }: { children?: React.ReactNode }) => (
  <span className="inline-flex items-center bg-neutral-100 border border-neutral-200 rounded-[4px] px-1.5 h-5 text-[11px] font-semibold text-neutral-800 mx-0.5 align-baseline whitespace-nowrap">
    {children}
  </span>
);

export const Code = ({ children }: { children?: React.ReactNode }) => (
  <span className="inline-flex items-center bg-blue-50 border border-blue-100/50 rounded-[4px] px-1.5 h-5 text-[11px] font-bold text-blue-600 font-mono mx-0.5 align-baseline">
    {children}
  </span>
);

export const Bold = ({ children }: { children?: React.ReactNode }) => (
  <span className="font-bold text-neutral-900">{children}</span>
);

// --- UI COMPONENTS ---

export const LauncherCard = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`w-full max-w-[95%] bg-[#F3F3E8] rounded-xl border border-[#E5E5DE] shadow-sm p-4 ${className}`}>
    {children}
  </div>
);

export const LauncherSectionLabel = ({ label }: { label: string }) => (
  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2 pl-1 flex items-center gap-2 border-l-2 border-yellow-500 leading-none h-3">
    {label}
  </div>
);

export const Key = ({ children, solid }: { children?: React.ReactNode, solid?: boolean }) => (
    <div className={`px-2.5 py-2 border-b-2 rounded-lg text-xs font-bold font-mono shadow-lg min-w-[32px] text-center ${solid ? 'bg-white text-black border-neutral-300' : 'bg-white border-neutral-300 text-neutral-600'}`}>
        {children}
    </div>
);

export const ModCard = ({ title, sub, active }: { title: string, sub: string, active?: boolean }) => (
    <div className={`aspect-square rounded-xl border flex flex-col items-center justify-center text-center gap-1 p-1 transition-colors ${active ? 'bg-[#FDF7E7] border-[#F59E0B] relative' : 'bg-white border-transparent'}`}>
        {active && (
            <div className="absolute top-1.5 right-1.5 text-[#F59E0B]">
                <Check size={10} strokeWidth={4} />
            </div>
        )}
        <span className={`text-[10px] font-bold ${active ? 'text-[#B45309]' : 'text-neutral-700'}`}>{title}</span>
        <span className="text-[6px] font-bold text-neutral-400 uppercase leading-tight px-1">{sub}</span>
    </div>
);

export const Typewriter = ({ text, duration, delay, loopDuration }: { text: string, duration: number, delay: number, loopDuration?: number }) => {
    return (
        <motion.span
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ 
                duration, 
                delay, 
                ease: "linear", 
                repeat: Infinity, 
                repeatDelay: loopDuration ? loopDuration - duration : 10 
            }}
            className="overflow-hidden inline-block align-bottom whitespace-nowrap"
        >
            {text}
        </motion.span>
    )
};

export const MenuItem = ({ label, highlight, duration }: { label: string, highlight?: boolean, duration?: number }) => (
    <motion.div 
        className="px-2 py-1 text-[9px] font-medium rounded cursor-default relative overflow-hidden"
        animate={highlight ? { 
            backgroundColor: ["transparent", "transparent", "#0058D0", "#0058D0", "transparent"], 
            color: ["#000000", "#000000", "#FFFFFF", "#FFFFFF", "#000000"] 
        } : {}}
        transition={highlight && duration ? { duration, times: [0, 0.75, 0.76, 0.9, 0.95], repeat: Infinity } : {}}
    >
        {label}
        {highlight && (
            <motion.div 
                className="absolute inset-0 bg-white/20"
                animate={{ opacity: [0, 0, 1, 0] }}
                transition={{ duration, times: [0, 0.85, 0.86, 0.9], repeat: Infinity }}
            />
        )}
    </motion.div>
);