export type OS = 'windows' | 'mac' | null;

export interface StepData {
  id: number;
  title: string;
  description: string;
  actionLabel?: string;
  actionUrl?: string;
  command?: string; // For terminal commands
  visualType: 'download' | 'drag-drop' | 'right-click' | 'terminal' | 'smart-screen' | 'double-click' | 'spotlight';
}

export interface InstallerFlow {
  os: OS;
  steps: StepData[];
}