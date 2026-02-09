import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';
import { OS } from '../../../types';
import { Typewriter } from '../shared';

interface FilesPasteStepProps {
    os: OS;
}

export const FilesPasteStep: React.FC<FilesPasteStepProps> = ({ os }) => {
    const DURATION = 6;
    const targetPath = os === 'windows' ? 'C:\\Users\\Theo\\AppData\\Roaming\\.minecraft' : '/Users/Theo/Library/Application Support/minecraft';

    return (
        <div className="w-full flex flex-col gap-4 items-center relative">
             {/* Faithful Replica of the interface */}
             <div className="w-[420px] bg-[#F0F0EB] rounded-xl shadow-sm border border-white/50 p-6 flex flex-col gap-6 relative">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="w-1 h-4 bg-[#F59E0B] rounded-full" />
                    <h3 className="text-xs font-bold text-neutral-600 tracking-wide uppercase">Java & Fichiers</h3>
                </div>

                <div className="flex flex-col gap-5">
                     {/* Row 1: Java */}
                     <div className="flex flex-col gap-2">
                         <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider ml-1">Chemin Java</label>
                         <div className="flex gap-2 h-10">
                             <div className="flex-1 bg-[#FCFCFA] rounded-md border border-[#E6E6E1] px-3 flex items-center text-xs font-medium text-neutral-600 shadow-sm">
                                 auto
                             </div>
                             <div className="px-4 bg-[#EBEBE6] rounded-md border border-[#E0E0DB] text-[10px] font-bold text-neutral-600 flex items-center justify-center shadow-sm uppercase tracking-wider">
                                 Parcourir
                             </div>
                         </div>
                     </div>

                     {/* Row 2: .minecraft (Active) */}
                     <div className="flex flex-col gap-2 relative">
                         <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider ml-1">Dossier .minecraft</label>
                         <div className="flex gap-2 h-10">
                             <motion.div 
                                className="flex-1 bg-[#FCFCFA] rounded-md border px-3 flex items-center text-xs font-medium text-neutral-800 shadow-sm overflow-hidden whitespace-nowrap"
                                animate={{ borderColor: ["#E6E6E1", "#3b82f6", "#E6E6E1"] }}
                                transition={{ duration: DURATION, times: [0, 0.2, 1], repeat: Infinity }}
                             >
                                 <div className="relative z-10">
                                     <Typewriter text={targetPath} duration={1} delay={DURATION * 0.3} loopDuration={DURATION} />
                                 </div>
                             </motion.div>
                             <div className="px-4 bg-[#EBEBE6] rounded-md border border-[#E0E0DB] text-[10px] font-bold text-neutral-600 flex items-center justify-center shadow-sm uppercase tracking-wider">
                                 Parcourir
                             </div>
                         </div>

                         {/* Ghost Cursor Animation */}
                         <motion.div
                            animate={{ 
                                x: [50, 100, 100, 200], 
                                y: [80, 20, 20, 80], 
                                opacity: [0, 1, 1, 0] 
                            }}
                            transition={{ duration: DURATION, times: [0, 0.2, 0.3, 0.4], repeat: Infinity }}
                            className="absolute top-0 left-0 z-20 pointer-events-none"
                         >
                             <MousePointer2 size={24} className="fill-black stroke-white" />
                             <motion.div 
                                animate={{ scale: [1, 0.9, 1] }}
                                transition={{ duration: 0.2, delay: DURATION * 0.25 }}
                                className="absolute -top-1 -left-1 w-8 h-8 rounded-full border border-blue-400/50 opacity-0" 
                             />
                         </motion.div>
                     </div>
                </div>
            </div>
        </div>
    );
};