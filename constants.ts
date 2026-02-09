import { InstallerFlow } from './types';

export const REPO_URL = "https://github.com/theocode29/Communokot-Launcher/releases/latest";

export const WINDOWS_FLOW: InstallerFlow = {
  os: 'windows',
  steps: [
    {
      id: 0,
      title: "Télécharger l'installateur",
      description: "Récupère le dernier fichier Communokot.exe depuis les releases GitHub.",
      actionLabel: "Télécharger .exe",
      actionUrl: REPO_URL,
      visualType: 'download'
    },
    {
      id: 1,
      title: "Lancer l'application",
      description: "Localise le fichier dans tes téléchargements et double-clique pour le lancer.",
      visualType: 'double-click'
    },
    {
      id: 2,
      title: "Contourner SmartScreen",
      description: "Si Windows protège ton PC, clique sur 'Informations complémentaires' puis 'Exécuter quand même'.",
      visualType: 'smart-screen'
    }
  ]
};

export const MAC_FLOW: InstallerFlow = {
  os: 'mac',
  steps: [
    {
      id: 0,
      title: "Télécharger l'application",
      description: "Récupère le fichier Communokot.zip ou .dmg depuis GitHub.",
      actionLabel: "Télécharger pour Mac",
      actionUrl: REPO_URL,
      visualType: 'download'
    },
    {
      id: 1,
      title: "Installation",
      description: "Glisse l'application Communokot Launcher dans ton dossier Applications.",
      visualType: 'drag-drop'
    },
    {
      id: 2,
      title: "Premier lancement",
      description: "Fais un clic droit sur l'app et sélectionne 'Ouvrir' pour valider la sécurité.",
      visualType: 'right-click'
    },
    {
      id: 3,
      title: "Ouvrir le Terminal",
      description: "Ouvre Spotlight (Cmd + Espace), tape 'Terminal' et appuie sur Entrée.",
      visualType: 'spotlight'
    },
    {
      id: 4,
      title: "Correction Sécurité",
      description: "Copie la commande ci-dessous et colle-la dans le Terminal pour autoriser l'application.",
      command: 'xattr -cr "/Applications/Communokot Launcher.app"',
      visualType: 'terminal'
    }
  ]
};