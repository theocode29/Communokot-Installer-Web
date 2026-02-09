import React from 'react';

export const FilesIntroStep: React.FC = () => {
    return (
        <div className="w-full flex flex-col gap-4 items-center">
             {/* Faithful Replica of the static interface */}
             <div className="w-[420px] bg-[#F0F0EB] rounded-xl shadow-sm border border-white/50 p-6 flex flex-col gap-6">
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

                     {/* Row 2: .minecraft */}
                     <div className="flex flex-col gap-2">
                         <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider ml-1">Dossier .minecraft</label>
                         <div className="flex gap-2 h-10">
                             <div className="flex-1 bg-[#FCFCFA] rounded-md border border-[#E6E6E1] px-3 flex items-center text-xs font-medium text-neutral-400 shadow-sm">
                                 ...
                             </div>
                             <div className="px-4 bg-[#EBEBE6] rounded-md border border-[#E0E0DB] text-[10px] font-bold text-neutral-600 flex items-center justify-center shadow-sm uppercase tracking-wider">
                                 Parcourir
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};