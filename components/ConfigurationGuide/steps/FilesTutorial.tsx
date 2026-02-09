import React from 'react';
import { motion } from 'framer-motion';
import { Folder, ArrowRight, Check, Search, X } from 'lucide-react';
import { OS } from '../../../types';
import { Key, Typewriter } from '../shared';

interface FilesTutorialStepProps {
    os: OS;
}

export const FilesTutorialStep: React.FC<FilesTutorialStepProps> = ({ os }) => {
    // TIMELINE MASTER (20 secondes)
    const DURATION = 20;

    // --- UTILS ---
    // Helper pour afficher un élément sur une période donnée de la timeline
    const show = (start: number, end: number) => ({
        opacity: [0, 1, 1, 0],
        scale: [0.95, 1, 1, 0.95],
        transition: { 
            duration: DURATION, 
            times: [start, start + 0.02, end - 0.02, end] 
        }
    });

    // Chemins à taper
    const macPath = "~/Library/Application Support/minecraft";
    const winPath = "%appdata%\\.minecraft";

    // --- COMPOSANTS UI STATIQUES (REUTILISABLES) ---

    // 1. LE LAUNCHER (Fond de scène)
    const LauncherInterface = () => (
        <div className="w-[440px] bg-[#F0F0EB] rounded-xl shadow-xl border border-white/60 p-6 flex flex-col gap-6 relative z-0 origin-top">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-1 h-4 bg-[#F59E0B] rounded-full" />
                <h3 className="text-xs font-bold text-neutral-600 tracking-wide uppercase">Java & Fichiers</h3>
            </div>

            <div className="flex flex-col gap-5">
                 {/* Row 1: Java (Static) */}
                 <div className="flex flex-col gap-2 opacity-60">
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
                         {/* Input Field - Se remplit à la fin */}
                         <div className="flex-1 bg-[#FCFCFA] rounded-md border border-[#E6E6E1] px-3 flex items-center text-xs font-medium text-neutral-800 shadow-sm overflow-hidden whitespace-nowrap relative">
                             {/* Placeholder animé ou texte final */}
                             <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: DURATION * 0.85, duration: 0.5 }}
                             >
                                {os === 'mac' ? '/Users/admin/Library/Application Support/minecraft' : 'C:\\Users\\Admin\\AppData\\Roaming\\.minecraft'}
                             </motion.span>
                             
                             {/* Success State Overlay (Green flash) */}
                             <motion.div 
                                className="absolute inset-0 bg-[#ECFDF5] border border-[#10B981] rounded-md flex items-center px-3 text-[#065F46]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ delay: DURATION * 0.85, duration: 2 }}
                             >
                                <span className="truncate">{os === 'mac' ? '.../Application Support/minecraft' : '...\\AppData\\Roaming\\.minecraft'}</span>
                             </motion.div>
                         </div>

                         {/* Button: Parcourir */}
                         <div className="relative">
                            <motion.div 
                                className="h-full px-4 bg-[#EBEBE6] rounded-md border border-[#E0E0DB] text-[10px] font-bold text-neutral-600 flex items-center justify-center shadow-sm uppercase tracking-wider z-10 relative"
                                animate={{ 
                                    scale: [1, 1.05, 0.95, 1],
                                    borderColor: ["#E0E0DB", "#F59E0B", "#E0E0DB", "#E0E0DB"],
                                    color: ["#525252", "#000000", "#525252", "#525252"]
                                }}
                                transition={{ 
                                    duration: DURATION, 
                                    times: [0.05, 0.1, 0.12, 0.15] // Action happens early
                                }}
                            >
                                Parcourir
                            </motion.div>
                            
                            {/* Pulse Glow behind button */}
                            <motion.div 
                                className="absolute inset-0 bg-yellow-400/30 rounded-md blur-md"
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: DURATION, times: [0.05, 0.1, 0.15] }}
                            />
                         </div>
                     </div>
                 </div>
            </div>
            
            {/* Final Success Checkmark */}
            <motion.div 
                className="absolute -right-2 -top-2 bg-[#10B981] text-white p-1.5 rounded-full shadow-lg z-50"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: DURATION * 0.92, duration: 0.4 }}
            >
                <Check size={14} strokeWidth={4} />
            </motion.div>
        </div>
    );

    // --- SCÉNARIO MAC OS ---
    if (os === 'mac') {
        return (
            <div className="w-full h-full relative flex items-center justify-center bg-[#F5F5F7] overflow-hidden rounded-[2rem] border border-white/50 select-none font-sans cursor-default">
                
                {/* 1. LAUNCHER (Fond) */}
                <LauncherInterface />

                {/* 2. FINDER WINDOW (Apparition: 15% - 80%) */}
                <motion.div
                    className="absolute z-20 w-[500px] h-[320px] bg-[#F6F6F6] rounded-xl shadow-2xl border border-[#D1D1D1] flex flex-col overflow-hidden text-[#4a4a4a]"
                    {...show(0.15, 0.80)}
                >
                    {/* Sidebar + Content */}
                    <div className="flex flex-1 h-full">
                        {/* Sidebar */}
                        <div className="w-[130px] bg-[#F0F0F0]/90 backdrop-blur border-r border-[#D9D9D9] p-3 flex flex-col gap-4">
                            <div className="flex gap-1.5 mb-1">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
                                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                                <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]" />
                            </div>
                            <div className="space-y-2 mt-2">
                                {['Récents', 'Applications', 'Bureau', 'Documents'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 px-1 text-[10px] text-neutral-600 font-medium">
                                       <Folder size={12} className="text-[#007AFF] fill-[#007AFF] opacity-80" /> {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Main Finder Area */}
                        <div className="flex-1 bg-white flex flex-col relative">
                            {/* Toolbar */}
                            <div className="h-10 border-b border-[#E5E5E5] flex items-center px-4 justify-between bg-[#F6F6F6]">
                                <div className="flex gap-3 text-neutral-400"><ArrowRight size={14} className="rotate-180"/><ArrowRight size={14} /></div>
                                <span className="text-xs font-semibold text-neutral-700">Macintosh HD</span>
                                <Search size={14} className="text-neutral-400" />
                            </div>

                            {/* Folders Grid */}
                            <div className="p-4 grid grid-cols-4 gap-4 content-start">
                                {['Users', 'Library', 'System', 'Apps'].map((f) => (
                                    <div key={f} className="flex flex-col items-center justify-center gap-1 opacity-50">
                                        <Folder size={42} className="fill-[#007AFF] text-[#1a85ff]" />
                                        <span className="text-[10px]">{f}</span>
                                    </div>
                                ))}
                                {/* Target Folder (Hidden initially, appears after Go To) */}
                                <motion.div 
                                    className="flex flex-col items-center justify-center gap-1 absolute top-4 left-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: DURATION * 0.65 }}
                                >
                                    <Folder size={42} className="fill-[#007AFF] text-[#1a85ff]" />
                                    <span className="text-[10px] bg-[#007AFF] text-white px-1.5 rounded-sm">minecraft</span>
                                </motion.div>
                            </div>
                            
                            {/* Footer Buttons */}
                            <div className="absolute bottom-0 left-0 right-0 h-11 border-t border-[#E5E5E5] bg-[#F6F6F6] flex items-center justify-end px-3 gap-3">
                                <div className="px-4 py-1 bg-white border border-[#D1D1D1] rounded-[5px] text-[11px] text-neutral-700 shadow-sm">Annuler</div>
                                <motion.div 
                                    className="px-4 py-1 bg-[#007AFF] border border-[#0062CC] rounded-[5px] text-[11px] text-white font-medium shadow-sm"
                                    animate={{ 
                                        scale: [1, 1, 0.95, 1], 
                                        filter: ["brightness(1)", "brightness(1)", "brightness(1.2)", "brightness(1)"] 
                                    }}
                                    transition={{ duration: DURATION, times: [0.75, 0.77, 0.79, 0.81] }}
                                >
                                    Ouvrir
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 3. BLUR LAYER (Focus Mode) */}
                <motion.div 
                    className="absolute inset-0 bg-white/30 backdrop-blur-[6px] z-30"
                    {...show(0.20, 0.65)}
                />

                {/* 4. KEYBOARD SHORTCUTS (20% - 35%) */}
                <motion.div 
                    className="absolute z-40 flex gap-3"
                    {...show(0.22, 0.35)}
                >
                    <Key solid>Cmd</Key><Key solid>Shift</Key><Key solid>G</Key>
                </motion.div>

                {/* 5. "GO TO FOLDER" MODAL (35% - 60%) */}
                <motion.div 
                    className="absolute z-50 w-[380px] bg-[#F2F2F2] rounded-xl shadow-2xl border border-[#C5C5C5] overflow-hidden flex flex-col"
                    {...show(0.35, 0.62)}
                >
                    <div className="px-4 py-3 pb-1 text-[11px] font-bold text-[#4a4a4a]">Aller au dossier :</div>
                    <div className="px-4 py-2">
                        <div className="bg-white border border-[#C3C3C3] shadow-inner rounded-[4px] h-7 flex items-center px-2 w-full">
                            <div className="text-[11px] text-black whitespace-nowrap overflow-hidden flex items-center w-full">
                                <Typewriter text={macPath} duration={3} delay={DURATION * 0.40} />
                                <motion.div 
                                    className="w-[1.5px] h-3.5 bg-[#007AFF] ml-0.5" 
                                    animate={{ opacity: [1, 0] }} 
                                    transition={{ duration: 0.8, repeat: Infinity }} 
                                />
                            </div>
                        </div>
                    </div>
                    {/* Suggestions list (Visual sugar) */}
                    <div className="px-4 pb-2">
                         <div className="text-[10px] text-neutral-400 py-1 border-b border-neutral-200">~/Library/Application Support/minecraft</div>
                    </div>
                </motion.div>

            </div>
        );
    }

    // --- SCÉNARIO WINDOWS ---
    return (
        <div className="w-full h-full relative flex items-center justify-center bg-[#F5F5F7] overflow-hidden rounded-[2rem] border border-white/50 select-none font-sans cursor-default">
            
            {/* 1. LAUNCHER (Fond) */}
            <LauncherInterface />

            {/* 2. EXPLORER WINDOW (Apparition: 15%) */}
            <motion.div
                className="absolute z-20 w-[500px] h-[340px] bg-[#F3F3F3] rounded-lg shadow-2xl border border-[#999999] flex flex-col overflow-hidden"
                {...show(0.15, 0.80)}
            >
                {/* Ribbon / Toolbar */}
                <div className="h-12 bg-[#F3F3F3] border-b border-[#E5E5E5] flex items-center px-2 gap-2">
                     <div className="flex gap-2 text-neutral-400 px-2"><ArrowRight size={16} className="rotate-180"/><ArrowRight size={16} /></div>
                     <div className="flex-1 h-7 border border-[#D9D9D9] bg-white flex items-center px-2 text-xs text-neutral-700">
                        <Folder size={12} className="text-yellow-500 mr-2" />
                        Ce PC {'>'} OS (C:) {'>'} Users
                     </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-white flex p-1">
                    {/* Sidebar */}
                    <div className="w-32 border-r border-[#F0F0F0] p-2">
                        <div className="text-[10px] text-neutral-500 font-bold mb-2">Accès rapide</div>
                        {['Bureau', 'Documents', 'Images'].map(f => (
                             <div key={f} className="flex items-center gap-2 mb-2 text-[11px] text-neutral-700">
                                 <Folder size={12} className="text-yellow-500" /> {f}
                             </div>
                        ))}
                    </div>
                    {/* Files */}
                    <div className="flex-1 p-2">
                        <div className="grid grid-cols-4 gap-4">
                             {['Program Files', 'Windows', 'Users'].map(f => (
                                 <div key={f} className="flex flex-col items-center gap-1 opacity-60">
                                     <Folder size={32} className="fill-yellow-400 text-yellow-500" />
                                     <span className="text-[10px] text-center">{f}</span>
                                 </div>
                             ))}
                             {/* Minecraft Folder (Hidden then appears) */}
                             <motion.div 
                                className="flex flex-col items-center gap-1 absolute top-3 left-36 p-2 rounded bg-[#CCE8FF] border border-[#99D1FF]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: DURATION * 0.65 }}
                             >
                                 <Folder size={32} className="fill-yellow-400 text-yellow-500" />
                                 <span className="text-[10px] text-center font-medium">.minecraft</span>
                             </motion.div>
                        </div>
                    </div>
                </div>
                
                {/* Footer Buttons */}
                <div className="h-10 bg-[#F0F0F0] border-t border-[#D9D9D9] flex items-center justify-end px-3 gap-2">
                     <div className="px-6 py-1 bg-[#E1E1E1] border border-[#ADADAD] rounded-[2px] text-[11px] text-neutral-600">Annuler</div>
                     <motion.div 
                        className="px-6 py-1 bg-[#E1E1E1] border border-[#ADADAD] rounded-[2px] text-[11px] text-neutral-600 shadow-sm"
                        animate={{ 
                            backgroundColor: ["#E1E1E1", "#0078D7", "#0078D7", "#E1E1E1"],
                            color: ["#404040", "#FFFFFF", "#FFFFFF", "#404040"],
                            borderColor: ["#ADADAD", "#005A9E", "#005A9E", "#ADADAD"]
                        }}
                        transition={{ duration: DURATION, times: [0.75, 0.77, 0.81, 1] }}
                     >
                        Ouvrir
                     </motion.div>
                </div>
            </motion.div>

            {/* 3. BLUR LAYER (Focus Mode) */}
            <motion.div 
                className="absolute inset-0 bg-white/20 backdrop-blur-[6px] z-30"
                {...show(0.20, 0.65)}
            />

            {/* 4. KEYBOARD SHORTCUTS (Win + R) */}
            <motion.div 
                className="absolute z-40 flex gap-3"
                {...show(0.22, 0.35)}
            >
                <Key solid>Win</Key><Key solid>R</Key>
            </motion.div>

            {/* 5. RUN DIALOG (35% - 60%) */}
            <motion.div 
                className="absolute z-50 w-[360px] bg-white rounded-lg shadow-xl border border-[#999999] flex flex-col overflow-hidden"
                {...show(0.35, 0.62)}
            >
                <div className="h-8 flex items-center justify-between px-3 border-b border-[#F0F0F0]">
                    <span className="text-xs font-semibold">Exécuter</span>
                    <X size={12} className="text-neutral-400"/>
                </div>
                <div className="p-4 flex gap-3 items-center">
                    <div className="w-8 h-8 rounded bg-[#0078D7] flex items-center justify-center shrink-0">
                        <Folder size={18} className="text-white" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                        <span className="text-[10px] text-neutral-600">Tapez le nom d'un programme, d'un dossier...</span>
                        <div className="h-6 border border-[#0078D7] flex items-center px-2 shadow-sm">
                             <div className="text-[11px] text-black whitespace-nowrap overflow-hidden flex items-center w-full">
                                <Typewriter text={winPath} duration={3} delay={DURATION * 0.40} />
                                <motion.div 
                                    className="w-[1px] h-3 bg-black ml-0.5" 
                                    animate={{ opacity: [1, 0] }} 
                                    transition={{ duration: 0.8, repeat: Infinity }} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-10 bg-[#F0F0F0] flex items-center justify-end px-3 gap-2 border-t border-[#DFDFDF]">
                    <div className="px-4 py-1 bg-[#E1E1E1] border border-[#ADADAD] rounded-[2px] text-[11px] text-black w-20 text-center shadow-sm">OK</div>
                    <div className="px-4 py-1 bg-[#E1E1E1] border border-[#ADADAD] rounded-[2px] text-[11px] text-black w-20 text-center">Annuler</div>
                </div>
            </motion.div>

        </div>
    );
};