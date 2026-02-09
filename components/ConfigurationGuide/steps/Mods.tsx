import React from 'react';
import { motion } from 'framer-motion';
import { ModCard } from '../shared';

export const ModsStep: React.FC = () => {
    const DURATION = 8;
    return (
         <div className="w-full h-full relative overflow-hidden bg-[#EAEAEA] flex items-center justify-center font-sans">
             {/* Simulate the Application Window Content */}
             <motion.div
                className="w-[115%] bg-[#FDFBF7] shadow-2xl rounded-xl p-5 flex flex-col origin-top"
                animate={{
                    y: [0, 0, -50, -50], // Pan down slightly less since content is shorter
                }}
                transition={{
                    duration: DURATION,
                    times: [0, 0.4, 0.6, 1],
                    repeat: Infinity,
                    repeatDelay: 2
                }}
             >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-4 bg-[#F59E0B] rounded-full" />
                    <h3 className="text-xs font-bold text-neutral-700 tracking-wide uppercase">Optimisation des mods</h3>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                     <ModCard title="AUTO" sub="DÉTECTION AUTOMATIQUE" active />
                     <ModCard title="LOW-END" sub="PC BAS DE GAMME" />
                     <ModCard title="BALANCED" sub="ÉQUILIBRÉ" />
                     <ModCard title="HIGH-END" sub="HAUTE PERFORMANCE" />
                </div>

                {/* Toggle Section */}
                <div className="bg-white rounded-xl p-4 border border-neutral-200/80 shadow-sm flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-neutral-800">Gérer mes propres configurations</span>
                        <span className="text-[9px] text-neutral-500 font-medium leading-tight">Désactive l'application automatique des presets d'optimisation</span>
                    </div>
                    <div className="w-10 h-6 bg-neutral-300 rounded-full relative p-1 shrink-0">
                        <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                </div>

             </motion.div>
         </div>
    );
};