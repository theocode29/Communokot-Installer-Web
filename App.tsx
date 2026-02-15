import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OS } from './types';
import { ConfigurationGuide } from './components/ConfigurationGuide/index';

type AppPhase = 'selection' | 'configuration';

const App: React.FC = () => {
  const [os, setOs] = useState<OS>(null);
  const [phase, setPhase] = useState<AppPhase>('selection');

  const handleOsSelect = (selectedOs: OS) => {
    setOs(selectedOs);
    setPhase('configuration');
  };

  const handleBackToHome = () => {
    setOs(null);
    setPhase('selection');
  };

  const handleConfigurationComplete = () => {
    setOs(null);
    setPhase('selection');
  };

  return (
    <div className="h-screen w-screen bg-white text-neutral-900 font-sans selection:bg-black selection:text-white flex flex-col overflow-hidden">

      {/* Header - Fixed Top */}
      <header className="w-full px-8 py-6 md:py-8 flex justify-between items-center shrink-0 z-50">
        <div className="flex items-baseline gap-2 cursor-pointer" onClick={handleBackToHome}>
          <span className="font-bold text-neutral-900 tracking-tighter text-xl md:text-2xl">Communokot</span>
          <span className="font-medium bg-gradient-to-br from-slate-500 to-slate-400 bg-clip-text text-transparent tracking-tight text-lg md:text-xl">Guide</span>
        </div>
        <AnimatePresence>
          {os && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-3 py-1 bg-neutral-100 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-500 border border-neutral-200"
            >
              {os === 'mac' ? 'macOS' : 'Windows'}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex flex-col items-center justify-center w-full mx-auto pb-6 relative">
        <AnimatePresence mode="wait">
          {phase === 'selection' && (
            <OSSelector key="selector" onSelect={handleOsSelect} />
          )}

          {phase === 'configuration' && os && (
            <ConfigurationGuide key="config" os={os} onComplete={handleConfigurationComplete} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

// --- LOGOS ---

const WindowsLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M0 3.449L9.362 2.14V11.66H0V3.449ZM10.51 2.01L24 0.15V11.66H10.51V2.01ZM0 12.75H9.362V22.25L0 20.94V12.75ZM10.51 12.75H24V24.23L10.51 22.37V12.75Z" />
  </svg>
);

const AppleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.818 13.921C17.809 16.58 20.088 17.892 20.154 17.925C20.122 18.031 19.757 19.28 18.882 20.558C18.121 21.666 17.332 22.754 16.108 22.754C14.908 22.754 14.522 22.036 13.136 22.036C11.728 22.036 11.365 22.732 10.224 22.732C9.043 22.732 8.167 21.579 7.399 20.472C5.833 18.209 4.636 14.076 6.25 11.272C7.051 9.882 8.48 8.996 9.948 8.996C11.129 8.996 12.008 9.791 12.736 9.791C13.443 9.791 14.502 8.799 15.938 8.799C16.495 8.799 18.062 9.022 19.07 10.5C18.986 10.553 17.838 11.217 17.818 13.921ZM15.021 6.136C15.632 5.395 16.039 4.368 15.926 3.35C15.027 3.386 13.94 3.949 13.295 4.702C12.716 5.373 12.203 6.421 12.339 7.42C13.337 7.498 14.412 6.877 15.021 6.136Z" />
  </svg>
);

const OSSelector: React.FC<{ onSelect: (os: OS) => void }> = ({ onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      className="w-full flex flex-col items-center max-w-lg px-4"
    >
      <div className="text-center mb-10 md:mb-14">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-neutral-900">Configuration</h1>
        <p className="text-neutral-500 font-medium text-base md:text-lg">Choisis ton système d'exploitation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <OSButton
          // Windows logo: Dense block. 
          // Size: 96px (md) inside a 128px container.
          icon={<WindowsLogo className="w-20 h-20 md:w-24 md:h-24" />}
          title="Windows"
          subtitle=".exe"
          onClick={() => onSelect('windows')}
        />
        <OSButton
          // Apple logo: Fine shape.
          // Size: 128px (md) inside a 128px container.
          // This creates optical balance.
          icon={<AppleLogo className="w-24 h-24 md:w-32 md:h-32 -mt-2" />}
          title="macOS"
          subtitle=".zip / .dmg"
          onClick={() => onSelect('mac')}
        />
      </div>
    </motion.div>
  )
}

interface OSButtonProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}

const OSButton: React.FC<OSButtonProps> = ({ icon, title, subtitle, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex flex-col items-center justify-center p-6 md:p-8 rounded-[2.5rem] bg-[#F5F5F7] border border-white/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-neutral-200 transition-all duration-300 group w-full h-64 md:h-80"
    >
      {/* 
         FIXED HEIGHT CONTAINER 
         Ensures that regardless of icon visual size, the text starts at the exact same vertical position.
         md:h-32 (128px) accommodates the largest icon (Apple).
      */}
      <div className="h-24 md:h-32 w-full flex items-center justify-center text-neutral-900 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm mb-6">
        {icon}
      </div>

      <div className="text-center flex flex-col gap-1">
        <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">{title}</h3>
        <p className="text-neutral-500 font-medium text-sm md:text-base">{subtitle}</p>
      </div>
    </motion.button>
  );
};

export default App;