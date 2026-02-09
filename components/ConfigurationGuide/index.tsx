import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, Cpu, Box, FolderOpen, Search } from 'lucide-react';
import { OS } from '../../types';

import { Kbd, Badge, Code, Bold } from './shared';
import { AccountStep } from './steps/Account';
import { RamStep } from './steps/Ram';
import { ModsStep } from './steps/Mods';
import { FilesIntroStep } from './steps/FilesIntro';
import { FilesTutorialStep } from './steps/FilesTutorial';

interface ConfigurationGuideProps {
  os: OS;
  onComplete: () => void;
}

export const ConfigurationGuide: React.FC<ConfigurationGuideProps> = ({ os, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  // Dynamic steps based on OS to split the file configuration into 3 parts
  const steps = useMemo(() => [
    {
      id: 'account',
      title: 'Compte & Jeu',
      icon: <User size={20} />,
      description: (
        <span>
          Connecte-toi avec ton pseudo. Assure-toi simplement que c'est bien celui enregistré sur le serveur.
        </span>
      ),
      component: <AccountStep />
    },
    {
      id: 'ram',
      title: 'Performances',
      icon: <Cpu size={20} />,
      description: (
        <span>
            La RAM allouée au jeu. Par défaut, le launcher gère ça tout seul. Ne touche à rien si tu ne sais pas ce que tu fais.
        </span>
      ),
      component: <RamStep />
    },
    {
      id: 'mods',
      title: 'Optimisation',
      icon: <Box size={20} />,
      description: (
        <span>
            Si tu ne sais pas quoi choisir, laisse sur <Badge>Auto</Badge>. Sinon, sélectionne le profil adapté à ta machine.
        </span>
      ),
      component: <ModsStep />
    },
    // PART 1: The UI Context
    {
      id: 'files-intro',
      title: 'Java & Fichiers',
      icon: <FolderOpen size={20} />,
      description: (
        <span>
            Pour Java, laisse sur <Badge>Auto</Badge>. Pour le dossier Minecraft, il va falloir indiquer son emplacement précis.
        </span>
      ),
      component: <FilesIntroStep />
    },
    // PART 2: The OS Specific Tutorial (Merged)
    {
      id: 'files-tutorial',
      title: os === 'windows' ? 'Chemin d\'accès' : 'Chemin d\'installation',
      icon: <Search size={20} />,
      description: os === 'windows' 
        ? (
            <span>
                Clique sur <Bold>Parcourir</Bold>. Fais <Kbd>Win</Kbd> + <Kbd>R</Kbd>, tape exactement <Code>%appdata%\.minecraft</Code> et valide. Le dossier s'ouvrira : clique simplement sur <Bold>Ouvrir</Bold> pour confirmer.
            </span>
          )
        : (
            <span>
                Clique sur <Bold>Parcourir</Bold>. Fais <Kbd>Cmd</Kbd> + <Kbd>Shift</Kbd> + <Kbd>G</Kbd>, colle le chemin <Code>~/Library/Application Support/minecraft</Code> et valide. Termine en cliquant sur <Bold>Ouvrir</Bold>.
            </span>
          ),
      component: <FilesTutorialStep os={os} />
    }
  ], [os]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const isLast = currentStep === steps.length - 1;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl px-6 flex flex-col"
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">Configuration</h2>
        <p className="text-neutral-500 font-medium">Étape {currentStep + 1} sur {steps.length}</p>
      </div>

      {/* Main Content Card - Height increased to 520px to accommodate content without clipping */}
      <div className="relative h-[520px] w-full overflow-hidden bg-white rounded-none md:rounded-3xl">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full h-full flex flex-col"
          >
            {/* Visual Preview Section - Fixed Height */}
            <div className="w-full h-64 bg-[#F5F5F7] rounded-[2rem] border border-white/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.03)] flex items-center justify-center relative overflow-hidden shrink-0 mb-6 p-4 md:p-6 select-none">
                {steps[currentStep].component}
            </div>

            {/* Text Content */}
            <div className="flex flex-col px-2">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-neutral-100 rounded-lg text-neutral-900 shrink-0">
                        {steps[currentStep].icon}
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">{steps[currentStep].title}</h3>
                </div>
                <div className="text-neutral-600 leading-relaxed font-medium text-sm md:text-base">
                    {steps[currentStep].description}
                </div>
                
                {/* Specific Hint for Tutorial Steps to make commands obvious */}
                {steps[currentStep].id === 'files-tutorial' && (
                    <div className="mt-4 p-3 bg-neutral-100 text-neutral-600 text-xs font-mono font-semibold rounded-lg border border-neutral-200 flex justify-center text-center select-all">
                         {os === 'windows' ? '%appdata%\\.minecraft' : '~/Library/Application Support/minecraft'}
                    </div>
                )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-2 border-t border-neutral-100">
         <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${currentStep === 0 ? 'text-neutral-300 cursor-not-allowed' : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'}`}
        >
            <ArrowLeft size={18} />
            <span>Retour</span>
        </button>

        <div className="flex gap-2">
            {steps.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-black' : 'w-1.5 bg-neutral-200'}`} />
            ))}
        </div>

        <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white bg-black px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
        >
            <span>{isLast ? "C'est fini !" : 'Suivant'}</span>
            <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};