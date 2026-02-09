import React from 'react';
import { motion } from 'framer-motion';
import { StepData } from '../types';
import { Visuals } from './Visuals';
import { Copy, Check, ArrowRight } from 'lucide-react';

interface StepCardProps {
  step: StepData;
  direction: number;
}

const variants = {
  enter: (direction: number) => ({
    x: direction === 0 ? 0 : (direction > 0 ? '100%' : '-100%'),
    y: direction === 0 ? 20 : 0,
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)"
  }),
  center: {
    zIndex: 1,
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)"
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)"
  }),
};

export const StepCard: React.FC<StepCardProps> = ({ step, direction }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (step.command) {
      navigator.clipboard.writeText(step.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      key={step.id}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 350, damping: 30 },
        y: { type: "spring", stiffness: 350, damping: 30 },
        opacity: { duration: 0.4, ease: "circOut" },
        scale: { duration: 0.4, ease: "circOut" },
        filter: { duration: 0.4, ease: "circOut" }
      }}
      className="absolute top-0 left-0 w-full h-full flex flex-col gap-5 md:gap-6 bg-white"
    >
      {/* Visual Area - Fixed Height from Visuals.tsx */}
      <div className="w-full shrink-0">
        <Visuals type={step.visualType} />
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-4 px-1 w-full max-w-lg mx-auto">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2 tracking-tight">{step.title}</h2>
          <p className="text-neutral-500 leading-relaxed text-base font-medium">
            {step.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-1">
            {/* Action Button (Link) */}
            {step.actionLabel && step.actionUrl && (
            <motion.a
                href={step.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white rounded-xl font-semibold text-base text-center transition-colors shadow-lg shadow-neutral-200 flex items-center justify-center gap-2 group cursor-pointer"
            >
                {step.actionLabel}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            )}

            {/* Command Copy Button */}
            {step.command && (
            <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.01, backgroundColor: "#FAFAFA" }}
                whileTap={{ scale: 0.99 }}
                className="w-full p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-left font-mono text-xs text-neutral-600 flex items-center justify-between group transition-colors relative overflow-hidden shadow-sm"
            >
                <span className="truncate pr-8 select-all">{step.command}</span>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 group-hover:text-neutral-900 transition-colors">
                {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                </div>
            </motion.button>
            )}
        </div>
      </div>
    </motion.div>
  );
};