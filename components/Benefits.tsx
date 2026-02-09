import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Zap, ShieldCheck, Map, ArrowRight, Layers } from 'lucide-react';

interface BenefitsProps {
  onNext: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(10px)",
    transition: { duration: 0.3 }
  }
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

export const Benefits: React.FC<BenefitsProps> = ({ onNext }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full h-full flex flex-col items-center justify-center max-w-6xl mx-auto px-6 py-8"
    >
      <motion.div variants={cardVariants} className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-3">
          Pourquoi utiliser ce launcher ?
        </h2>
        <p className="text-neutral-500 text-lg font-medium max-w-2xl mx-auto">
          Une application conçue pour simplifier ton accès au jeu, en garantissant performance et tranquillité d'esprit.
        </p>
      </motion.div>

      {/* Grid of 3 Cards - New Design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
        
        <BenefitCard 
          icon={<Zap />}
          title="Prêt à jouer instantanément"
          description="Oublie l'installation manuelle de mods ou de Fabric. Le launcher configure automatiquement l'environnement Java et optimise les performances pour ta machine. Lance et joue, sans configuration technique."
        />
        
        <BenefitCard 
          icon={<ShieldCheck />}
          title="Sauvegardes & Sécurité"
          description="Tes mondes sont précieux. Le système effectue des backups automatiques avant chaque mise à jour critique et intègre un mode de réparation intelligent pour éviter toute corruption de données."
        />
        
        <BenefitCard 
          icon={<Map />}
          title="Expérience Unifiée"
          description="Profite d'une interface fluide et gratuite. Une carte du monde interactive est intégrée nativement, et les mises à jour se font en arrière-plan pour que tu sois toujours synchronisé avec le serveur."
        />

      </div>

      {/* Action Button */}
      <motion.div variants={cardVariants}>
        <button
            onClick={onNext}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-semibold text-base shadow-xl shadow-black/10 hover:bg-neutral-800 hover:scale-105 transition-all duration-300"
        >
            <span>Passer à la configuration</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </motion.div>
  );
};

// Reusable Card Component with Large Background Icon Texture
const BenefitCard = ({ icon, title, description }: { icon: React.ReactElement, title: string, description: string }) => (
  <motion.div 
    variants={cardVariants}
    className="group relative bg-[#F5F5F7] rounded-[2rem] border border-white/60 p-8 flex flex-col justify-between overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-[320px] cursor-default"
  >
    {/* Content Layer (Z-10) */}
    <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-xl font-bold text-neutral-900 tracking-tight mb-4">
            {title}
        </h3>
        <p className="text-[15px] text-neutral-600 font-medium leading-relaxed">
            {description}
        </p>
        
        {/* Subtle decorative line or small icon at bottom */}
        <div className="mt-auto pt-6">
            <div className="w-12 h-1 bg-neutral-200 rounded-full group-hover:w-20 group-hover:bg-neutral-900 transition-all duration-500" />
        </div>
    </div>

    {/* Background Texture Icon (Absolute) */}
    <div className="absolute -right-6 -bottom-8 text-neutral-200/80 transform rotate-12 scale-[4] origin-bottom-right group-hover:scale-[4.5] group-hover:rotate-6 group-hover:text-neutral-200 transition-all duration-700 pointer-events-none">
        {/* Clone the icon to apply specific stroke width for the bg version */}
        {React.cloneElement(icon, { strokeWidth: 0.5 } as any)}
    </div>
  </motion.div>
);