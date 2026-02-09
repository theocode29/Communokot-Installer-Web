import React from 'react';
import { motion } from 'framer-motion';
import { Download, Folder, MousePointer2, Terminal, ShieldAlert, Command, Search, FileCode, HardDrive, ArrowRight, Check } from 'lucide-react';

interface VisualProps {
  type: 'download' | 'drag-drop' | 'right-click' | 'terminal' | 'smart-screen' | 'double-click' | 'spotlight';
}

export const Visuals: React.FC<VisualProps> = ({ type }) => {
  // Container style - Apple-esque glass/neutral feel
  const containerClass = "w-full h-52 bg-[#F5F5F7] rounded-[2rem] border border-white/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.03)] flex items-center justify-center relative overflow-hidden select-none cursor-default";

  // Physics presets
  const springBouncy = { type: "spring" as const, stiffness: 400, damping: 15 };

  if (type === 'download') {
    const CYCLE_DURATION = 4.5;
    
    return (
      <div className={containerClass}>
        <div className="relative w-full h-full flex items-center justify-center">
            
            {/* The Morphing Entity */}
            <motion.div
                className="relative z-20 flex items-center justify-center overflow-hidden shadow-xl"
                animate={{
                    width: ["140px", "140px", "130px", "64px", "64px", "64px", "64px", "64px", "140px"], 
                    height: ["44px", "44px", "40px", "64px", "64px", "64px", "64px", "64px", "44px"],
                    borderRadius: ["99px", "99px", "99px", "18px", "18px", "18px", "18px", "18px", "99px"], 
                    backgroundColor: ["#171717", "#171717", "#171717", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#171717"],
                    // Bounce: Normal -> Squash(Click) -> Pop(Big) -> Recoil(Small) -> Settle(Big) -> Rest -> Hold -> FadeOut
                    scale: [0, 1, 0.9, 1.25, 0.95, 1.05, 1, 1, 0], 
                    opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0],
                    rotate: [0, 0, 0, -5, 3, -1, 0, 0, 0] // Subtle wiggle during morph
                }}
                transition={{
                    duration: CYCLE_DURATION,
                    times: [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.9, 1],
                    ease: "easeInOut"
                }}
            >
                {/* State 1: Button Content (Text) */}
                <motion.div 
                    className="absolute flex items-center gap-2.5 text-white"
                    animate={{ opacity: [1, 1, 0, 0, 0, 0] }}
                    transition={{ duration: CYCLE_DURATION, times: [0, 0.3, 0.32, 1] }}
                >
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                        <Download size={12} strokeWidth={3} />
                    </div>
                    <span className="text-xs font-bold tracking-wide">Download</span>
                </motion.div>

                {/* State 2: Icon Content (Logo) */}
                <motion.div 
                    className="absolute flex items-center justify-center w-full h-full"
                    animate={{ opacity: [0, 0, 0, 1, 1, 1, 0] }}
                    transition={{ duration: CYCLE_DURATION, times: [0, 0.3, 0.32, 0.35, 0.9, 1] }}
                >
                    <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center text-white font-bold text-lg">C</div>
                </motion.div>

                {/* Success Badge (Pops up attached to the square) */}
                <motion.div 
                    className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-1 shadow-sm"
                    animate={{ scale: [0, 0, 0, 1.2, 1, 1, 0] }}
                    transition={{ duration: CYCLE_DURATION, times: [0, 0.45, 0.5, 0.6, 0.7, 0.9, 1] }} // Syncs with the bounce
                >
                     <Check size={8} strokeWidth={4} />
                </motion.div>
            </motion.div>

            {/* Cursor */}
            <motion.div
                className="absolute z-50 pointer-events-none drop-shadow-xl"
                animate={{ 
                    x: [60, 0, 0, 80, 80], // Enter, Stay, Leave, Stay
                    y: [80, 15, 15, 80, 80],
                    scale: [1, 1, 0.85, 1, 1], // Click squash
                    opacity: [0, 1, 1, 1, 0] // Fade out after leaving
                }}
                transition={{ 
                    duration: CYCLE_DURATION, 
                    times: [0, 0.2, 0.3, 0.5, 0.6], // Leave ends at 0.5, opacity 0 by 0.6
                    ease: "easeInOut"
                }}
            >
                 <MousePointer2 size={24} className="fill-black stroke-white stroke-[2px]" />
            </motion.div>
        </div>
      </div>
    );
  }

  if (type === 'drag-drop') {
    return (
      <div className={containerClass}>
        {/* Fake Installer Window */}
        <div className="w-64 h-36 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-xl flex flex-col relative overflow-hidden">
            {/* Window Header */}
            <div className="h-6 bg-neutral-100/50 border-b border-neutral-200 flex items-center px-2 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840] border border-[#1AAB29]" />
            </div>

            <div className="flex-1 flex items-center justify-center gap-6 px-4">
                {/* App Icon (Draggable) */}
                <motion.div
                    animate={{ 
                        x: [0, 80, 80, 0], 
                        scale: [1, 1.1, 0, 0],
                        rotate: [0, 5, 0, 0]
                    }}
                    transition={{ 
                        duration: 1.8, 
                        times: [0, 0.5, 0.6, 1],
                        repeat: Infinity, 
                        repeatDelay: 1 
                    }}
                    className="flex flex-col items-center gap-1 z-20"
                >
                    <div className="w-14 h-14 bg-white border border-neutral-200 rounded-[12px] shadow-sm flex items-center justify-center">
                         <div className="w-9 h-9 bg-neutral-900 rounded-lg flex items-center justify-center text-white font-bold">C</div>
                    </div>
                    <span className="text-[9px] text-neutral-500 font-medium">Communokot</span>
                </motion.div>

                <ArrowRight size={16} className="text-neutral-300" />

                {/* Applications Folder (Target) */}
                <motion.div 
                    className="flex flex-col items-center gap-1 z-10"
                    animate={{ scale: [1, 1, 1.15, 1] }}
                    transition={{ 
                        duration: 1.8,
                        times: [0, 0.4, 0.5, 1],
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                >
                    <div className="w-14 h-14 bg-gradient-to-b from-[#82C3FF] to-[#3A99FC] rounded-[12px] shadow-sm flex items-center justify-center border border-blue-400/20">
                        <Folder size={28} className="text-white/90" fill="currentColor" />
                    </div>
                    <span className="text-[9px] text-neutral-500 font-medium">Applications</span>
                </motion.div>
            </div>
            
            {/* Hand Cursor */}
            <motion.div
                animate={{ 
                    x: [35, 115, 115, 35], 
                    y: [60, 60, 60, 60],
                    scale: [1, 0.9, 1, 1] // Grabbing effect
                }}
                transition={{ 
                    duration: 1.8, 
                    times: [0, 0.5, 0.9, 1],
                    repeat: Infinity, 
                    repeatDelay: 1
                }}
                className="absolute top-0 left-0 z-50 drop-shadow-lg"
            >
               {/* Using a custom hand shape for drag */}
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-black stroke-white stroke-2">
                 <path d="M10 24C10 24 6 22 6 16V8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8V14H11V5C11 3.89543 11.8954 3 13 3C14.1046 3 15 3.89543 15 5V14H16V7C16 5.89543 16.8954 5 18 5C19.1046 5 20 5.89543 20 7V17C20 20.866 16.866 24 13 24H10Z" />
               </svg>
            </motion.div>
        </div>
      </div>
    );
  }

  if (type === 'right-click') {
    return (
      <div className={containerClass}>
        <div className="relative">
             {/* Target Icon */}
            <div className="w-20 h-24 flex flex-col items-center justify-center gap-2">
                 <div className="w-16 h-16 bg-white border border-neutral-200 rounded-[14px] shadow-sm flex items-center justify-center">
                    <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center text-white font-bold">C</div>
                 </div>
                 <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full">Communokot</span>
            </div>

            {/* Context Menu */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5, transformOrigin: "top left" }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.5] }}
                transition={{ 
                    duration: 3, 
                    times: [0, 0.15, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 0.5
                }}
                className="absolute left-10 top-8 w-44 bg-white/80 backdrop-blur-xl rounded-xl border border-white/40 shadow-[0_8px_40px_rgba(0,0,0,0.15)] p-1.5 flex flex-col gap-1 z-10"
            >
                <motion.div 
                    animate={{ backgroundColor: ["transparent", "#007AFF", "#007AFF", "transparent"] }}
                    transition={{ duration: 3, times: [0.3, 0.35, 0.7, 0.8], repeat: Infinity, repeatDelay: 0.5 }}
                    className="h-7 w-full rounded-md px-2 flex items-center text-xs font-medium justify-between group"
                >
                    <span className="group-hover:text-white transition-colors text-black">Ouvrir</span>
                </motion.div>
                <div className="h-7 w-full rounded-md px-2 flex items-center text-xs text-neutral-500">
                    Afficher le contenu...
                </div>
                <div className="h-[1px] bg-neutral-200 my-0.5 w-full" />
                <div className="h-7 w-full rounded-md px-2 flex items-center text-xs text-neutral-500">
                    Placer dans la corbeille
                </div>
            </motion.div>

            {/* Cursor */}
            <motion.div
                animate={{ 
                    x: [-40, 40, 50, -40], // Start left, go to icon, go to menu, reset
                    y: [40, 20, 45, 40],
                    scale: [1, 0.9, 0.9, 1] // Click animation
                }}
                transition={{ 
                    duration: 3, 
                    times: [0, 0.15, 0.5, 1],
                    repeat: Infinity, 
                    repeatDelay: 0.5
                }}
                className="absolute top-0 left-0 z-50 pointer-events-none drop-shadow-xl"
            >
                <MousePointer2 size={24} className="fill-black stroke-white stroke-[2px]" />
                {/* Click Ripple */}
                <motion.div
                     animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1.5] }}
                     transition={{ duration: 0.5, delay: 0.15, repeat: Infinity, repeatDelay: 3 }}
                     className="absolute -top-2 -left-2 w-10 h-10 rounded-full border-2 border-neutral-400"
                />
            </motion.div>
        </div>
      </div>
    );
  }

  if (type === 'spotlight') {
    const CYCLE_DURATION = 5; // Total duration of the loop in seconds

    return (
      <div className={containerClass}>
        <div className="flex flex-col items-center justify-center w-full h-full relative">
            
            {/* Phase 1: Keyboard Hint (Cmd + Space) */}
            <motion.div 
                className="absolute flex gap-2 z-10"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ 
                    opacity: [0, 1, 1, 0, 0], 
                    scale: [1, 1, 0.95, 0.95, 1], 
                    y: [0, 0, 1, 1, 0]
                }}
                transition={{ 
                    duration: CYCLE_DURATION,
                    times: [0, 0.1, 0.25, 0.3, 1], 
                    repeat: Infinity,
                }}
            >
                <div className="px-3 py-1.5 bg-white border border-neutral-200 rounded-lg shadow-sm text-xs font-bold text-neutral-500 font-mono">Cmd</div>
                <div className="px-3 py-1.5 bg-white border border-neutral-200 rounded-lg shadow-sm text-xs font-bold text-neutral-500 font-mono">Space</div>
            </motion.div>

            {/* Phase 2: Spotlight Bar Appearance & Typing */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                    scale: [0.9, 1, 1, 0.95, 0.9], 
                    opacity: [0, 1, 1, 0, 0],
                    y: [10, 0, 0, 0, 10]
                }}
                transition={{ 
                    duration: CYCLE_DURATION, 
                    times: [0.35, 0.4, 0.9, 0.95, 1],
                    repeat: Infinity 
                }}
                className="w-[320px] bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/60 flex flex-col overflow-hidden relative z-20"
            >
                <div className="h-14 flex items-center px-4 gap-3">
                    <Search size={22} className="text-neutral-400" strokeWidth={2.5} />
                    <div className="flex-1 font-medium text-lg text-neutral-800 flex items-center">
                        {"Terminal".split('').map((char, i) => (
                             <motion.span
                                key={i}
                                animate={{ opacity: [0, 1, 1, 0] }}
                                transition={{ 
                                    duration: CYCLE_DURATION, 
                                    times: [0.45 + (i * 0.03), 0.46 + (i * 0.03), 0.9, 1], 
                                    repeat: Infinity 
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                        <motion.div 
                            animate={{ opacity: [1, 0, 1, 0, 1, 0] }} 
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-[2px] h-6 bg-[#007AFF] ml-0.5"
                        />
                    </div>
                </div>

                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: ["0px", "auto", "auto", "0px"], opacity: [0, 1, 1, 0] }}
                    transition={{ 
                        duration: CYCLE_DURATION, 
                        times: [0.75, 0.8, 0.9, 0.95],
                        repeat: Infinity 
                    }}
                    className="bg-white/50 border-t border-neutral-200/50 overflow-hidden origin-top"
                >
                    <div className="px-2 py-2">
                        <motion.div 
                            className="flex items-center gap-3 p-2 rounded-lg bg-[#007AFF] text-white"
                        >
                            <Terminal size={20} />
                            <div className="flex flex-col leading-none">
                                <span className="text-sm font-semibold">Terminal</span>
                                <span className="text-[10px] opacity-80 mt-0.5">Applications</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
      </div>
    );
  }

  if (type === 'terminal') {
    return (
      <div className={containerClass}>
        <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={springBouncy}
            className="w-[340px] h-32 bg-[#1e1e1e] rounded-xl shadow-2xl border border-white/10 flex flex-col font-mono overflow-hidden"
        >
          <div className="bg-[#2d2d2d] h-7 flex items-center px-3 gap-2 border-b border-black/50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex gap-1.5 mx-auto text-[10px] font-medium text-neutral-400 items-center">
                <Folder size={10} />
                <span>user — -zsh</span>
            </div>
          </div>
          
          <div className="p-4 text-[#dadada] text-xs leading-relaxed">
            <div className="flex items-center flex-wrap gap-1.5">
                <span className="text-[#28C840] font-bold">➜</span>
                <span className="text-[#56b6c2] font-bold">~</span>
                
                <div className="flex items-center">
                    <span>xattr -cr /App...</span>
                    <motion.div
                       animate={{ opacity: [1, 0] }}
                       transition={{ duration: 0.8, repeat: Infinity }}
                       className="w-1.5 h-3.5 bg-neutral-400 ml-1"
                     />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ delay: 2, duration: 0.3 }}
                className="mt-2 text-neutral-500 flex items-center gap-2"
            >
                <span className="text-green-500">✔</span>
                <span>Permissions fixed.</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === 'smart-screen') {
    const CYCLE_DURATION = 9; // Extended for slower, cleaner movements

    return (
      <div className={containerClass}>
        <div className="relative flex items-center justify-center w-full h-full bg-[#E5E5E5]">
             
             {/* The SmartScreen Window - Optimized for 208px height with tighter padding */}
            <motion.div
               className="w-[280px] bg-[#0078D7] text-white font-sans shadow-2xl flex flex-col relative select-none overflow-hidden"
               initial={{ opacity: 0, scale: 0.96 }}
               animate={{
                 opacity: [0, 1, 1, 1, 0],
                 scale: [0.96, 1, 1, 1, 0.96]
               }}
               transition={{
                 duration: CYCLE_DURATION,
                 times: [0, 0.1, 0.9, 0.95, 1],
                 repeat: Infinity,
                 repeatDelay: 1
               }}
            >
                {/* Main Content */}
                <div className="p-5 pb-1 flex gap-3">
                     <div className="shrink-0 pt-0.5">
                        <ShieldAlert size={32} strokeWidth={1.5} className="text-white" />
                     </div>
                     
                     <div className="flex flex-col w-full">
                        <h3 className="font-semibold text-[13px] leading-tight mb-1">Windows a protégé votre ordinateur</h3>
                        <div className="text-[10px] font-light leading-snug opacity-95 mb-2">
                             Microsoft Defender SmartScreen a empêché le démarrage d'une application non reconnue.
                        </div>
                        
                        {/* The Link - Target 1 with Bounce */}
                        <motion.div 
                            className="flex items-center w-fit origin-left py-1"
                            animate={{ scale: [1, 1, 0.9, 1.1, 1] }} // Jelly bounce on click
                            transition={{ duration: CYCLE_DURATION, times: [0, 0.32, 0.34, 0.36, 1] }}
                        >
                            <span className="text-[11px] font-medium underline decoration-white/50 underline-offset-2 cursor-pointer">
                                Informations complémentaires
                            </span>
                        </motion.div>

                        {/* Hidden Details - Reveal AFTER click */}
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ 
                                height: [0, 0, "auto", "auto", 0], 
                                opacity: [0, 0, 1, 1, 0],
                                marginTop: [0, 0, 8, 8, 0],
                                marginBottom: [0, 0, 4, 4, 0]
                            }}
                            transition={{
                                duration: CYCLE_DURATION,
                                times: [0, 0.36, 0.4, 0.9, 0.95]
                            }}
                            className="overflow-hidden flex flex-col gap-0.5"
                        >
                            <div className="flex gap-2 text-[10px]">
                                <span className="opacity-70">App:</span>
                                <span className="font-medium">Communokot.exe</span>
                            </div>
                            <div className="flex gap-2 text-[10px]">
                                <span className="opacity-70">Éditeur:</span>
                                <span className="font-medium">Inconnu</span>
                            </div>
                        </motion.div>
                     </div>
                </div>

                {/* Buttons Row - Target 2 (Right Button) */}
                <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ 
                        height: [0, 0, "auto", "auto", 0],
                        opacity: [0, 0, 1, 1, 0]
                     }}
                     transition={{
                        duration: CYCLE_DURATION,
                        times: [0, 0.36, 0.4, 0.9, 0.95]
                     }}
                     className="overflow-hidden"
                >
                     <div className="flex justify-end gap-2 px-5 pb-4 bg-[#0078D7]">
                         <div className="px-3 py-1 rounded-[2px] border border-white/40 text-[10px] font-medium opacity-80 cursor-default">
                            Ne pas exécuter
                         </div>
                         
                         {/* Primary Button with Bounce */}
                         <motion.div
                            className="px-3 py-1 rounded-[2px] bg-white text-black text-[10px] font-semibold shadow-sm cursor-pointer"
                            animate={{ scale: [1, 1, 1, 0.9, 1.1, 1] }} // Jelly bounce on click
                            transition={{
                                duration: CYCLE_DURATION,
                                times: [0, 0.72, 0.73, 0.75, 0.77, 1]
                            }}
                         >
                            Exécuter quand même
                         </motion.div>
                     </div>
                </motion.div>
            </motion.div>

            {/* Cursor Actor - Center Origin for Precision */}
            <motion.div
                className="absolute left-1/2 top-1/2 z-50 pointer-events-none drop-shadow-xl"
                initial={{ x: 120, y: 150 }}
                animate={{
                    // Timeline (9s total):
                    // 0-0.25 (2.25s): Enter & Move to Link (Target: x:-20, y:30)
                    // 0.25-0.32: Hover Link
                    // 0.32-0.36: Click Link (Squash/Pop) -> Trigger Link Bounce
                    // 0.36-0.65: Move SLOWLY to Button (Target: x:65, y:82)
                    // 0.65-0.72: Hover Button
                    // 0.72-0.77: Click Button (Squash/Pop) -> Trigger Button Bounce
                    // 0.77-1.0: Exit
                    x: [120, -20, -20, -20, 65, 65, 65, 120], 
                    y: [150, 30, 30, 30, 82, 82, 82, 150],
                    scale: [1, 1, 0.75, 1.15, 1, 0.75, 1.15, 1] // Cartoonish squash & stretch
                }}
                transition={{
                    duration: CYCLE_DURATION,
                    times: [0, 0.25, 0.32, 0.36, 0.65, 0.72, 0.77, 1],
                    ease: "easeInOut"
                }}
            >
                 <MousePointer2 size={24} className="fill-black stroke-white stroke-[2px]" />
            </motion.div>
        </div>
      </div>
    );
  }

  if (type === 'double-click') {
     return (
       <div className={containerClass}>
         <div className="relative flex flex-col items-center gap-6">
            
            {/* The Icon */}
            <motion.div
               animate={{ scale: [1, 0.9, 1, 0.9, 1] }} // Double squash
               transition={{ 
                   duration: 1.5, 
                   times: [0, 0.4, 0.5, 0.6, 1],
                   repeat: Infinity, 
                   repeatDelay: 1 
               }}
               className="w-20 h-24 flex flex-col items-center justify-center gap-2 z-10"
            >
                <div className="w-16 h-16 bg-white border border-neutral-200 rounded-xl shadow-sm flex items-center justify-center relative overflow-hidden group">
                     <div className="w-full h-full bg-gradient-to-br from-white to-neutral-50 flex items-center justify-center">
                        <div className="w-8 h-8 bg-neutral-900 rounded-md" />
                     </div>
                     {/* Windows Blue Selection Overlay */}
                     <motion.div 
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                        className="absolute inset-0 bg-[#0078D7] mix-blend-multiply"
                     />
                </div>
                <span className="text-xs font-medium text-neutral-600 px-2 py-0.5 rounded bg-white/50">Communokot.exe</span>
            </motion.div>
            
            {/* The Cursor */}
            <motion.div
                animate={{ 
                    x: [30, 0, 0, 30], 
                    y: [30, -10, -10, 30],
                }}
                transition={{ 
                    duration: 1.5, 
                    ease: "easeInOut",
                    repeat: Infinity, 
                    repeatDelay: 1
                }}
                className="absolute z-50 pointer-events-none drop-shadow-xl top-6 left-6"
            >
                <MousePointer2 size={24} className="fill-black stroke-white stroke-[2px]" />
            </motion.div>

            {/* Click Ripple Effects */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2">
                {[0, 0.15].map((delay, i) => (
                    <motion.div
                        key={i}
                        animate={{ 
                            opacity: [0, 1, 0], 
                            scale: [0.5, 1.5] 
                        }}
                        transition={{ 
                            duration: 0.4, 
                            delay: 0.6 + delay, // Sync with cursor squash
                            repeat: Infinity, 
                            repeatDelay: 1.5 + (0.15 - delay)
                        }}
                        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-neutral-400/50"
                    />
                ))}
            </div>
         </div>
       </div>
     )
  }

  return null;
};