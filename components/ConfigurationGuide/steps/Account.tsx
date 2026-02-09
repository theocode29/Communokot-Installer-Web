import React from 'react';
import { TriangleAlert } from 'lucide-react';
import { LauncherCard, LauncherSectionLabel } from '../shared';

export const AccountStep: React.FC = () => {
    return (
        <div className="w-full flex flex-col gap-4 items-center">
             <LauncherSectionLabel label="COMPTE & JEU" />
             <LauncherCard>
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider ml-1">PSEUDO MINECRAFT</label>
                    <div className="w-full bg-white rounded-lg px-4 py-3 text-sm font-bold text-neutral-800 shadow-sm border border-neutral-200/50">Theophile</div>
                    <div className="flex items-start gap-1.5 mt-1 px-1">
                         <TriangleAlert size={12} className="text-yellow-600 mt-0.5 shrink-0" />
                         <span className="text-[10px] text-neutral-500 leading-tight">Assurez-vous d'avoir accès au serveur avec ce pseudo.</span>
                    </div>
                </div>
             </LauncherCard>
        </div>
    );
};