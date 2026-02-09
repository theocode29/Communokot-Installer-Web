import React from 'react';
import { Cpu, Check } from 'lucide-react';
import { LauncherCard, LauncherSectionLabel } from '../shared';

export const RamStep: React.FC = () => {
    return (
        <div className="w-full flex flex-col gap-4 items-center">
             <LauncherSectionLabel label="PERFORMANCES (RAM)" />
             <LauncherCard>
                 <div className="flex items-start gap-2 mb-4 px-1">
                    <Cpu size={14} className="text-neutral-500 mt-0.5" />
                    <span className="text-[10px] text-neutral-500 leading-tight">Allouez plus de mémoire pour améliorer la stabilité.</span>
                 </div>
                 <div className="grid grid-cols-3 gap-2">
                    {["2 GO", "4 GO", "6 GO", "8 GO", "12 GO", "16 GO"].map((opt, idx) => (
                        <div key={idx} className={`relative rounded-lg border px-2 py-3 flex items-center justify-center text-xs font-bold ${opt === "6 GO" ? 'bg-[#FDF7E7] border-yellow-400 text-neutral-800' : 'bg-[#EDEDE9] border-transparent text-neutral-500'}`}>
                            {opt}
                            {opt === "6 GO" && <div className="absolute top-1 right-1 text-yellow-600"><Check size={10} strokeWidth={4} /></div>}
                        </div>
                    ))}
                 </div>
             </LauncherCard>
        </div>
    );
};