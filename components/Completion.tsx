import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

interface CompletionProps {
  onReset: () => void;
}

export const Completion: React.FC<CompletionProps> = ({ onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      className="w-full max-w-2xl px-6 flex flex-col items-center"
    >
      {/* Visual Container - Consistent with Bento style */}
      <div className="w-full h-64 bg-[#F5F5F7] rounded-[2rem] border border-white/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.03)] flex items-center justify-center mb-8 relative overflow-hidden">
         <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
            className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-neutral-900 border border-neutral-100"
         >
             <Check size={42} strokeWidth={3} />
         </motion.div>
      </div>

      <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-neutral-900 mb-3 tracking-tight">
            Installation terminée
          </h1>
          <p className="text-neutral-500 text-lg font-medium leading-relaxed mb-8">
            Tout est configuré. Lance le jeu, et joue.
          </p>

          <motion.button
            onClick={onReset}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-semibold text-sm shadow-lg hover:bg-neutral-800 transition-all"
          >
            <span>Retour à l'accueil</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
      </div>
    </motion.div>
  );
};