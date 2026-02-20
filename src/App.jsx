import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CVPDF from './components/CVPDF';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Briefcase,
  GraduationCap,
  Zap,
  Languages,
  Award,
  Folder,
  Heart,
  Download,
  Pencil,
  Trash2,
  Plus,
  Menu,
  X,
  Check,
  AlertCircle,
  GripVertical,
  Wifi,
  WifiOff,
  Sparkles,
  Target,
  User,
  Code,
  Palette,
  Briefcase as BriefcaseIcon,
  FileText,
  Minus,
  Star,
  Layout,
  Crosshair
} from 'lucide-react';

// Importer les services
import { enhanceCVContent } from './services/aiService';

// Importer les composants
import DraggableItem from './components/DraggableItem';
import ExperienceFormValidated from './components/ExperienceFormValidated';
import FormationForm from './components/forms/FormationForm';
import LanguesForm from './components/forms/LanguesForm';
import CentresInteretForm from './components/forms/CentresInteretForm';
import CertificationsForm from './components/forms/CertificationsForm';
import ProjetsForm from './components/forms/ProjetsForm';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import UpdateNotification from './components/UpdateNotification';
import ATSOptimizer from './components/ATSOptimizer';
import SkillSuggestions from './components/SkillSuggestions';

function App() {
  // Données par défaut avec TON profil
  const defaultCVData = {
    personnel: {
      nomComplet: "HOUNGUE Jolidon",
      titrePoste: "Développeur Full-Stack",
      email: "jolidonhoungue30@gmail.com",
      telephone: "+229 0151852420",
      resume: "Développeur Full-Stack passionné par la création d'applications web innovantes. Actuellement en Licence Informatique de Gestion à l'Université de Parakou, je combine compétences techniques et connaissances en gestion pour concevoir des solutions adaptées aux besoins des utilisateurs.",
      adresse: "Parakou, Bénin",
      siteWeb: "portfoliojolidon.vercel.app",
      linkedin: "linkedin.com/in/jolidonmissimahuhoungue",
      github: "github.com/joboy05",
      photo: ""
    },
    experiences: [
      {
        id: "1",
        entreprise: "Projet Personnel",
        poste: "Développeur Full-Stack",
        dateDebut: "2024",
        dateFin: "Présent",
        actuel: true,
        description: "Conception d'un générateur de CV en React + Node.js + MongoDB\nGestion des templates dynamiques stockés en base de données\nAuthentification et gestion des utilisateurs"
      },
      {
        id: "2",
        entreprise: "Projets Académiques",
        poste: "Développeur Web",
        dateDebut: "2023",
        dateFin: "2024",
        actuel: false,
        description: "Création de portfolio en HTML, CSS, Laravel et PHP\nDéploiement de projets sur GitHub Pages\nOptimisation mobile et PWA"
      }
    ],
    formations: [
      {
        id: "1",
        diplome: "Licence Informatique de Gestion (3e année)",
        ecole: "Institut Universitaire de Technologie – Université de Parakou",
        dateDebut: "2023",
        dateFin: "2026",
        description: "Bases de données (SQL, modélisation MERISE)\nOrganisation des entreprises\nDéveloppement web & algorithmique"
      }
    ],
    competences: [
      "React.js",
      "Vue.js",
      "Tailwind CSS",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Node.js",
      "Express.js",
      "Laravel",
      "PHP",
      "MongoDB",
      "MySQL",
      "Git",
      "Linux (Ubuntu)",
      "Wireshark",
      "Notions cybersécurité"
    ],
    langues: [
      { id: "1", nom: "Français", niveau: "Courant" },
      { id: "2", nom: "Anglais", niveau: "Intermédiaire" }
    ],
    centresInteret: [
      { id: "1", nom: "Cybersécurité" },
      { id: "2", nom: "Développement d'applications web" },
      { id: "3", nom: "Veille technologique" },
      { id: "4", nom: "Mannequinat" }
    ],
    certifications: [
      {
        id: "1",
        nom: "Formation cybersécurité",
        organisme: "Auto-apprentissage",
        date: "2024"
      },
      {
        id: "2",
        nom: "Apprentissage Metasploit & analyse réseau",
        organisme: "Auto-apprentissage",
        date: "2024"
      }
    ],
    projets: [
      {
        id: "1",
        nom: "Jj's CV Generator",
        description: "Application web de génération de CV avec sauvegarde des templates en MongoDB",
        lien: "github.com/ton-projet",
        technologies: ["React", "Node.js", "MongoDB"]
      },
      {
        id: "2",
        nom: "Portfolio Personnel",
        description: "Site web responsive présentant mes projets et compétences",
        lien: "portfoliojolidon.vercel.app",
        technologies: ["React", "Tailwind CSS"]
      }
    ],
    parametres: {
      template: "moderne",
      couleurPrincipale: "#2563eb",
    }
  };

  // Charger les données depuis localStorage
  const chargerDonneesInitiales = () => {
    const donneesSauvegardees = localStorage.getItem('cvData');
    if (donneesSauvegardees) {
      try {
        const parsed = JSON.parse(donneesSauvegardees);
        return {
          personnel: { ...defaultCVData.personnel, ...(parsed.personnel || {}) },
          experiences: parsed.experiences || defaultCVData.experiences,
          formations: parsed.formations || defaultCVData.formations,
          competences: parsed.competences || defaultCVData.competences,
          langues: parsed.langues || defaultCVData.langues,
          centresInteret: parsed.centresInteret || defaultCVData.centresInteret,
          certifications: parsed.certifications || defaultCVData.certifications,
          projets: parsed.projets || defaultCVData.projets,
          parametres: { ...defaultCVData.parametres, ...(parsed.parametres || {}) }
        };
      } catch (e) {
        console.error('Erreur de chargement des données', e);
        return defaultCVData;
      }
    }
    return defaultCVData;
  };

  // State
  const [cvData, setCvData] = useState(chargerDonneesInitiales());
  const [nouvelleCompetence, setNouvelleCompetence] = useState("");
  const [experienceEnEdition, setExperienceEnEdition] = useState(null);
  const [formationEnEdition, setFormationEnEdition] = useState(null);
  const [langueEnEdition, setLangueEnEdition] = useState(null);
  const [centreInteretEnEdition, setCentreInteretEnEdition] = useState(null);
  const [certificationEnEdition, setCertificationEnEdition] = useState(null);
  const [projetEnEdition, setProjetEnEdition] = useState(null);
  const [statutSauvegarde, setStatutSauvegarde] = useState('Sauvegardé');
  const [estInstalle, setEstInstalle] = useState(false);
  const [ongletActif, setOngletActif] = useState('edition'); // 'edition' ou 'apercu'
  const [previewScale, setPreviewScale] = useState(1);
  const [estEnLigne, setEstEnLigne] = useState(true);

  useEffect(() => {
    const updateScale = () => {
      if (typeof window !== 'undefined') {
        const containerWidth = window.innerWidth;
        if (containerWidth < 1024) {
          // Sur mobile, on adapte pour que le CV (793px de large environ pour A4) tienne dans l'écran
          const scale = (containerWidth - 64) / 793;
          setPreviewScale(Math.min(scale, 1));
        } else {
          setPreviewScale(1);
        }
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Capteurs pour le drag & drop
  useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Détecter si l'app est installée
  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setEstInstalle(true);
    }
  }, []);

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem('cvData', JSON.stringify(cvData));

    const timer = setTimeout(() => {
      setStatutSauvegarde('Tout est sauvegardé');
    }, 2000);
    return () => clearTimeout(timer);
  }, [cvData]);

  // Détection en ligne/hors ligne
  useEffect(() => {
    const handleEnLigne = () => setEstEnLigne(true);
    const handleHorsLigne = () => setEstEnLigne(false);
    window.addEventListener('online', handleEnLigne);
    window.addEventListener('offline', handleHorsLigne);
    return () => {
      window.removeEventListener('online', handleEnLigne);
      window.removeEventListener('offline', handleHorsLigne);
    };
  }, []);

  // Calcul du pourcentage de complétion
  const calculerCompletude = () => {
    let total = 0;
    let complet = 0;

    total += 9; // 8 champs + photo
    if (cvData.personnel.nomComplet?.trim()) complet++;
    if (cvData.personnel.titrePoste?.trim()) complet++;
    if (cvData.personnel.email?.trim()) complet++;
    if (cvData.personnel.telephone?.trim()) complet++;
    if (cvData.personnel.resume?.trim()) complet++;
    if (cvData.personnel.adresse?.trim()) complet++;
    if (cvData.personnel.siteWeb?.trim()) complet++;
    if (cvData.personnel.linkedin?.trim()) complet++;
    if (cvData.personnel.github?.trim()) complet++;

    total += 1;
    if (cvData.experiences.length > 0) complet++;
    total += 1;
    if (cvData.formations.length > 0) complet++;
    total += 1;
    if (cvData.competences.length >= 3) complet++;
    total += 1;
    if (cvData.langues.length > 0) complet++;
    total += 1;
    if (cvData.centresInteret.length > 0) complet++;
    total += 1;
    if (cvData.certifications.length > 0) complet++;
    total += 1;
    if (cvData.projets.length > 0) complet++;

    return Math.round((complet / total) * 100);
  };

  const completude = calculerCompletude();

  // Handlers pour les infos personnelles
  const handleChangementPersonnel = (champ, valeur) => {
    setCvData(prev => ({
      ...prev,
      personnel: { ...prev.personnel, [champ]: valeur }
    }));
  };

  // Handlers pour templates et couleurs
  const changerTemplate = (nomTemplate) => {
    setCvData(prev => ({
      ...prev,
      parametres: { ...prev.parametres, template: nomTemplate }
    }));
  };

  const changerCouleurPrincipale = (couleur) => {
    setCvData(prev => ({
      ...prev,
      parametres: { ...prev.parametres, couleurPrincipale: couleur }
    }));
  };

  // CRUD Expériences
  const sauvegarderExperience = (experience) => {
    setCvData(prev => {
      const existe = prev.experiences.findIndex(exp => exp.id === experience.id);
      if (existe >= 0) {
        const misesAJour = [...prev.experiences];
        misesAJour[existe] = experience;
        return { ...prev, experiences: misesAJour };
      } else {
        return { ...prev, experiences: [...prev.experiences, { ...experience, id: uuidv4() }] };
      }
    });
    setExperienceEnEdition(null);
  };

  const supprimerExperience = (id) => {
    if (window.confirm('Supprimer cette expérience ?')) {
      setCvData(prev => ({
        ...prev,
        experiences: prev.experiences.filter(exp => exp.id !== id)
      }));
    }
  };

  // CRUD Formations
  const sauvegarderFormation = (formation) => {
    setCvData(prev => {
      const existe = prev.formations.findIndex(f => f.id === formation.id);
      if (existe >= 0) {
        const misesAJour = [...prev.formations];
        misesAJour[existe] = formation;
        return { ...prev, formations: misesAJour };
      } else {
        return { ...prev, formations: [...prev.formations, { ...formation, id: uuidv4() }] };
      }
    });
    setFormationEnEdition(null);
  };

  const supprimerFormation = (id) => {
    if (window.confirm('Supprimer cette formation ?')) {
      setCvData(prev => ({
        ...prev,
        formations: prev.formations.filter(f => f.id !== id)
      }));
    }
  };

  // CRUD Langues
  const sauvegarderLangue = (langue) => {
    setCvData(prev => {
      const existe = prev.langues.findIndex(l => l.id === langue.id);
      if (existe >= 0) {
        const misesAJour = [...prev.langues];
        misesAJour[existe] = langue;
        return { ...prev, langues: misesAJour };
      } else {
        return { ...prev, langues: [...prev.langues, { ...langue, id: uuidv4() }] };
      }
    });
    setLangueEnEdition(null);
  };

  // Langues

  // CRUD Centres d'intérêt
  const sauvegarderCentreInteret = (centre) => {
    setCvData(prev => {
      const existe = prev.centresInteret.findIndex(c => c.id === centre.id);
      if (existe >= 0) {
        const misesAJour = [...prev.centresInteret];
        misesAJour[existe] = centre;
        return { ...prev, centresInteret: misesAJour };
      } else {
        return { ...prev, centresInteret: [...prev.centresInteret, { ...centre, id: uuidv4() }] };
      }
    });
    setCentreInteretEnEdition(null);
  };

  // Centres d'intérêt

  // CRUD Certifications
  const sauvegarderCertification = (certification) => {
    setCvData(prev => {
      const existe = prev.certifications.findIndex(c => c.id === certification.id);
      if (existe >= 0) {
        const misesAJour = [...prev.certifications];
        misesAJour[existe] = certification;
        return { ...prev, certifications: misesAJour };
      } else {
        return { ...prev, certifications: [...prev.certifications, { ...certification, id: uuidv4() }] };
      }
    });
    setCertificationEnEdition(null);
  };

  // Certifications

  // CRUD Projets
  const sauvegarderProjet = (projet) => {
    setCvData(prev => {
      const existe = prev.projets.findIndex(p => p.id === projet.id);
      if (existe >= 0) {
        const misesAJour = [...prev.projets];
        misesAJour[existe] = projet;
        return { ...prev, projets: misesAJour };
      } else {
        return { ...prev, projets: [...prev.projets, { ...projet, id: uuidv4() }] };
      }
    });
    setProjetEnEdition(null);
  };

  // Projets

  // Drag & Drop Handlers
  // Handlers Drag & Drop (Non utilisés pour l'instant)

  // Compétences
  const ajouterCompetence = (competenceSpecifique) => {
    const competenceAAjouter = competenceSpecifique || nouvelleCompetence;
    if (!competenceAAjouter || competenceAAjouter.trim() === "") return;
    setCvData(prev => ({
      ...prev,
      competences: [...prev.competences, competenceAAjouter.trim()]
    }));
    if (!competenceSpecifique) setNouvelleCompetence("");
  };

  // Suggestions

  const supprimerCompetence = (indexASupprimer) => {
    if (window.confirm('Supprimer cette compétence ?')) {
      setCvData(prev => ({
        ...prev,
        competences: prev.competences.filter((_, index) => index !== indexASupprimer)
      }));
    }
  };

  // Touche entrée

  // Réinitialisation
  const reinitialiserFormulaire = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données ?')) {
      setCvData(defaultCVData);
    }
  };

  // Export/Import JSON
  const exporterJSON = () => {
    const donneesStr = JSON.stringify(cvData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(donneesStr);
    const nomFichierExport = `cv - sauvegarde - ${new Date().toISOString().slice(0, 10)}.json`;
    const elementLien = document.createElement('a');
    elementLien.setAttribute('href', dataUri);
    elementLien.setAttribute('download', nomFichierExport);
    elementLien.click();
  };

  const importerJSON = () => {
    // Non utilisé
  };

  // Styles pour la prévisualisation avec tous les templates
  const getStylesPreview = () => {
    const template = cvData?.parametres?.template || 'moderne';

    switch (template) {
      case 'classique':
        return {
          conteneur: "border-2 border-gray-300 p-8 bg-white font-serif",
          nom: "text-2xl font-bold uppercase tracking-wide text-center",
          titre: "text-gray-700 text-center mt-2",
          sousTitre: "text-lg font-semibold border-b-2 border-gray-300 pb-2 mb-4",
          section: "mt-6",
          grid: "grid grid-cols-1 gap-4",
          competences: "flex flex-wrap gap-2",
          competence: "px-3 py-1 bg-gray-100 rounded-full text-xs",
          contact: "grid grid-cols-2 md:grid-cols-3 gap-2 text-[10px] mt-4",
        };

      case 'moderne':
        return {
          conteneur: "border-0 shadow-lg rounded-xl p-8 bg-white",
          nom: "text-3xl font-bold text-center",
          titre: "font-medium text-center text-blue-600",
          sousTitre: "text-lg font-semibold border-b-2 border-blue-100 pb-2 mb-4",
          section: "mt-6",
          grid: "grid grid-cols-1 md:grid-cols-2 gap-6",
          competences: "flex flex-wrap gap-2",
          competence: "px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm",
          contact: "flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs mt-4",
        };

      case 'minimal':
        return {
          conteneur: "border-0 p-8 bg-white",
          nom: "text-2xl font-light tracking-wider text-center",
          titre: "text-gray-400 font-light text-center",
          sousTitre: "text-md font-medium uppercase tracking-wider text-gray-500 mb-4",
          section: "mt-8",
          grid: "grid grid-cols-1 gap-4",
          competences: "flex flex-wrap gap-2",
          competence: "px-3 py-1 bg-gray-50 text-gray-600 rounded text-sm",
          contact: "flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400 mt-4",
        };

      case 'developpeur':
        return {
          conteneur: "border-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 text-white font-mono",
          nom: "text-3xl font-bold text-green-400 text-center tracking-tighter",
          titre: "text-green-500/80 text-center mt-2 uppercase tracking-widest text-xs",
          sousTitre: "text-lg font-bold text-green-400 border-b-2 border-green-400/20 pb-2 mb-6 flex items-center gap-2 before:content-['>']",
          section: "mt-8",
          grid: "grid grid-cols-1 md:grid-cols-2 gap-6",
          competences: "flex flex-wrap gap-2",
          competence: "px-3 py-1 bg-green-400/10 text-green-400 border border-green-400/30 rounded text-xs",
          contact: "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-green-500/60 mt-6",
          code: "bg-black/40 p-4 rounded border border-green-400/10 hover:border-green-400/30 transition-colors",
          textMain: "text-gray-300",
          textMuted: "text-gray-500",
        };

      case 'neobrutalisme':
        return {
          conteneur: "border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-bold",
          nom: "text-4xl uppercase italic mb-2",
          titre: "text-xl uppercase bg-yellow-300 inline-block px-2 py-1 border-2 border-black mb-4",
          sousTitre: "text-2xl uppercase border-b-4 border-black pb-1 mb-6 bg-pink-300 px-2",
          section: "mt-10",
          grid: "grid grid-cols-1 gap-8",
          competences: "flex flex-wrap gap-3",
          competence: "px-4 py-2 bg-cyan-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm",
          contact: "flex flex-wrap gap-6 text-sm mb-6",
          code: "border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          textMain: "text-black",
          textMuted: "text-black/70",
        };

      case 'glassmorphism':
        return {
          conteneur: "border border-white/20 p-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl relative overflow-hidden",
          nom: "text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600",
          titre: "text-lg font-medium text-gray-700/80 mb-6",
          sousTitre: "text-xl font-bold text-gray-800 flex items-center gap-3 mb-6",
          section: "mt-12 p-8 bg-white/40 rounded-2xl border border-white/50 shadow-sm",
          grid: "grid grid-cols-1 md:grid-cols-2 gap-8",
          competences: "flex flex-wrap gap-3",
          competence: "px-4 py-2 bg-white/60 backdrop-blur-sm border border-white text-blue-700 rounded-xl text-sm font-semibold shadow-sm",
          contact: "flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600/80 mb-8",
          code: "bg-white/30 p-5 rounded-xl border border-white/40",
          textMain: "text-gray-800",
          textMuted: "text-gray-500",
        };

      case 'luxury':
        return {
          conteneur: "border-[12px] border-double border-gray-100 p-12 bg-white font-serif",
          nom: "text-4xl font-light tracking-[0.2em] text-center uppercase mb-1",
          titre: "text-center tracking-[0.5em] text-gray-400 text-xs uppercase mb-8",
          sousTitre: "text-center text-lg italic border-y border-gray-100 py-2 mb-10 tracking-widest",
          section: "mt-16",
          grid: "grid grid-cols-1 gap-12",
          competences: "flex justify-center flex-wrap gap-6",
          competence: "text-sm tracking-widest uppercase text-gray-600",
          contact: "flex justify-center flex-wrap gap-x-10 gap-y-4 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-12 border-b pb-8",
          code: "p-0",
          textMain: "text-gray-800 leading-relaxed",
          textMuted: "text-gray-500 italic",
        };

      case 'creatif':
        return {
          conteneur: "border-0 bg-gradient-to-br from-purple-50 to-pink-50 p-0 relative overflow-hidden",
          nom: "text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center",
          titre: "text-gray-600 text-center mt-2",
          sousTitre: "text-lg font-bold text-purple-600 border-l-4 border-purple-600 pl-4 mb-4",
          section: "mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg",
          grid: "grid grid-cols-1 md:grid-cols-2 gap-6",
          competences: "flex flex-wrap gap-2",
          competence: "px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-lg text-sm font-medium shadow-sm",
          contact: "flex justify-center flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600 mt-4 bg-white/50 p-4 rounded-full",
          decoration: "absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full -mr-16 -mt-16 opacity-50",
        };

      case 'professionnel':
        return {
          conteneur: "border border-gray-200 p-8 bg-white",
          nom: "text-3xl font-bold text-gray-800",
          titre: "text-gray-600 mt-1",
          sousTitre: "text-md font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4",
          section: "mt-6",
          grid: "grid grid-cols-1 md:grid-cols-2 gap-4",
          competences: "flex flex-wrap gap-2",
          competence: "px-3 py-1 bg-gray-50 text-gray-700 border border-gray-200 rounded text-sm",
          contact: "flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mt-4",
          deuxColonnes: "grid grid-cols-1 md:grid-cols-3 gap-6",
          colonneGauche: "md:col-span-1",
          colonneDroite: "md:col-span-2",
        };

      default:
        return {
          conteneur: "border border-gray-200 rounded-lg p-6 bg-gray-50",
          nom: "text-xl font-bold",
          titre: "text-gray-600",
          sousTitre: "text-md font-semibold border-b border-gray-200 pb-2 mb-4",
          section: "mt-4",
          grid: "grid grid-cols-1 gap-4",
          competences: "flex flex-wrap gap-2",
          competence: "px-2 py-1 bg-gray-200 rounded-md text-sm",
          contact: "flex justify-center flex-wrap gap-x-4 gap-y-2 text-sm mt-4",
        };
    }
  };

  const stylesPreview = getStylesPreview();

  // Sections d'édition conditionnelles
  if (experienceEnEdition !== null) {
    return (
      <motion.div
        className="min-h-screen bg-gray-50 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.button
            onClick={() => setExperienceEnEdition(null)}
            className="mb-4 text-gray-600 hover:text-gray-800 flex items-center gap-2"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={18} /> Retour
          </motion.button>
          <ExperienceFormValidated
            experience={experienceEnEdition}
            onSave={sauvegarderExperience}
            onCancel={() => setExperienceEnEdition(null)}
            primaryColor={cvData.parametres.couleurPrincipale}
            availableSkills={cvData.competences}
          />
        </div>
      </motion.div>
    );
  }

  if (formationEnEdition !== null) {
    return (
      <motion.div
        className="min-h-screen bg-gray-50 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setFormationEnEdition(null)}
            className="mb-4 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <X size={18} /> Retour
          </button>
          <FormationForm
            formation={formationEnEdition}
            onSave={sauvegarderFormation}
            onCancel={() => setFormationEnEdition(null)}
          />
        </div>
      </motion.div>
    );
  }

  if (langueEnEdition !== null) {
    return (
      <motion.div
        className="min-h-screen bg-gray-50 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setLangueEnEdition(null)}
            className="mb-4 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <X size={18} /> Retour
          </button>
          <LanguesForm
            langue={langueEnEdition}
            onSave={sauvegarderLangue}
            onCancel={() => setLangueEnEdition(null)}
          />
        </div>
      </motion.div>
    );
  }

  if (centreInteretEnEdition !== null) {
    return (
      <motion.div
        className="min-h-screen bg-gray-50 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setCentreInteretEnEdition(null)}
            className="mb-4 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <X size={18} /> Retour
          </button>
          <CentresInteretForm
            centre={centreInteretEnEdition}
            onSave={sauvegarderCentreInteret}
            onCancel={() => setCentreInteretEnEdition(null)}
          />
        </div>
      </motion.div>
    );
  }

  if (certificationEnEdition !== null) {
    return (
      <motion.div
        className="min-h-screen bg-gray-50 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setCertificationEnEdition(null)}
            className="mb-4 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <X size={18} /> Retour
          </button>
          <CertificationsForm
            certification={certificationEnEdition}
            onSave={sauvegarderCertification}
            onCancel={() => setCertificationEnEdition(null)}
          />
        </div>
      </motion.div>
    );
  }

  if (projetEnEdition !== null) {
    return (
      <motion.div
        className="min-h-screen bg-gray-50 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setProjetEnEdition(null)}
            className="mb-4 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <X size={18} /> Retour
          </button>
          <ProjetsForm
            projet={projetEnEdition}
            onSave={sauvegarderProjet}
            onCancel={() => setProjetEnEdition(null)}
          />
        </div>
      </motion.div>
    );
  }

  // Affichage principal
  return (
    <div className="h-screen flex flex-col relative overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900 bg-slate-50">
      {/* Background Blobs for "Wow" effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-blue-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] bg-pink-500/10 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Header modernisé avec Tab Switcher pour Mobile */}
      <header className="shrink-0 z-40 w-full glass-card border-none rounded-none shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <FileText className="text-white" size={24} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-purple-900 uppercase tracking-tight">
                  JJ's CV Generative
                </h1>
                <p className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase">Version 3.0 • Premium</p>
              </div>
            </div>

            {/* Tab Switcher (Visible sur Mobile uniquement) */}
            <div className="md:hidden flex bg-slate-200/50 p-1 rounded-xl glass-card backdrop-blur-md">
              <button
                onClick={() => setOngletActif('edition')}
                className={`px - 4 py - 2 rounded - lg text - sm font - semibold transition - all duration - 300 ${ongletActif === 'edition' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'
                  } `}
              >
                Édition
              </button>
              <button
                onClick={() => setOngletActif('apercu')}
                className={`px - 4 py - 2 rounded - lg text - sm font - semibold transition - all duration - 300 ${ongletActif === 'apercu' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'
                  } `}
              >
                Aperçu
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-700 rounded-full border border-green-500/20">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-wider">{statutSauvegarde}</span>
              </div>
              <ATSOptimizer cvData={cvData} />

              <PDFDownloadLink
                document={<CVPDF data={cvData} />}
                fileName={`CV - ${cvData.personnel.nomComplet?.replace(/\s+/g, '-') || 'sans-nom'}.pdf`}
              >
                {({ loading }) => (
                  <motion.button
                    className="p-2 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                  >
                    <Download size={18} />
                    <span className="hidden sm:inline font-bold">Télécharger</span>
                  </motion.button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden container mx-auto px-4 sm:px-6 py-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 items-stretch h-full">
          {/* Section Édition */}
          <div className={`w-full lg:w-[45%] h-full flex flex-col ${ongletActif === 'apercu' ? 'hidden lg:flex' : 'flex'} `}>
            <div className="glass-card rounded-[2.5rem] p-6 sm:p-10 flex-1 overflow-y-auto custom-scrollbar shadow-2xl">
              <div className="flex items-center justify-between mb-10 sticky top-0 bg-white/20 backdrop-blur-3xl py-6 z-40 border-b border-white/20 rounded-t-[2.5rem] -mt-10 -mx-10 px-10">
                <h2 className="text-2xl font-black text-indigo-950 flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100">
                    <Pencil size={22} />
                  </div>
                  Éditeur <span className="text-indigo-600/30 ml-2">v3</span>
                </h2>
                <div className="flex items-center gap-4 bg-white/40 px-4 py-2 rounded-2xl border border-white/50 backdrop-blur-md">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score AI</p>
                    <p className="text-sm font-black text-indigo-600 font-mono leading-none">{completude}%</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-slate-100 flex items-center justify-center relative overflow-hidden">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={126} strokeDashoffset={126 - (126 * completude) / 100} className="text-indigo-600 transition-all duration-1000" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-12 pb-10">
                {/* Templates Selector */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                      <Layout size={14} className="text-indigo-500" /> Templates Premium
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-4"></div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { id: 'classique', label: 'Classique', icon: <FileText size={16} /> },
                      { id: 'moderne', label: 'Moderne', icon: <Star size={16} /> },
                      { id: 'minimal', label: 'Eco Minimal', icon: <Minus size={16} /> },
                      { id: 'developpeur', label: 'Dev Dark', icon: <Code size={16} /> },
                      { id: 'creatif', label: 'Art Créatif', icon: <Palette size={16} /> },
                      { id: 'neobrutalisme', label: 'Neo-Brutal', icon: <Zap size={16} /> },
                      { id: 'glassmorphism', label: 'Futuriste', icon: <Sparkles size={16} /> },
                      { id: 'luxury', label: 'Elite Luxe', icon: <Award size={16} /> }
                    ].map((t) => (
                      <button key={t.id} onClick={() => changerTemplate(t.id)} className={`group relative p - 4 rounded - 3xl flex flex - col items - center gap - 3 transition - all duration - 300 border - 2 ${cvData.parametres.template === t.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl scale-105' : 'bg-white/50 border-white hover:border-indigo-100 hover:bg-white text-slate-600'} `}>
                        <div className={`${cvData.parametres.template === t.id ? 'text-white' : 'text-indigo-500 group-hover:scale-110 transition-transform'} `}>{t.icon}</div>
                        <span className="text-[10px] font-black uppercase tracking-wider">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Sélecteur de Couleurs */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                      <Palette size={14} className="text-indigo-500" /> Couleur Thème
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-4"></div>
                  </div>
                  <div className="flex flex-wrap gap-3 p-4 bg-white/40 rounded-3xl border border-white/50">
                    {[
                      '#2563eb', '#7c3aed', '#db2777', '#dc2626',
                      '#ea580c', '#16a34a', '#0891b2', '#1f2937'
                    ].map((couleur) => (
                      <button
                        key={couleur}
                        onClick={() => changerCouleurPrincipale(couleur)}
                        className={`w - 10 h - 10 rounded - full transition - all border - 4 ${cvData.parametres.couleurPrincipale === couleur
                          ? 'border-white ring-2 ring-indigo-500 scale-110 shadow-lg'
                          : 'border-white/50'
                          } `}
                        style={{ backgroundColor: couleur }}
                      />
                    ))}
                    <input
                      type="color"
                      value={cvData.parametres.couleurPrincipale}
                      onChange={(e) => changerCouleurPrincipale(e.target.value)}
                      className="w-10 h-10 bg-transparent cursor-pointer rounded-full overflow-hidden"
                    />
                  </div>
                </section>

                {/* Photo & Identité */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                      <User size={14} className="text-indigo-500" /> Identité & Photo
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-4"></div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center bg-white/40 p-6 rounded-[2rem] border border-white/50">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center transition-all group-hover:border-indigo-400">
                        {cvData.personnel.photo ? (
                          <img src={cvData.personnel.photo} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <User size={32} className="text-slate-300" />
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => handleChangementPersonnel('photo', reader.result);
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      {cvData.personnel.photo && (
                        <button onClick={() => handleChangementPersonnel('photo', '')} className="absolute -top-2 -right-2 p-1 bg-rose-500 text-white rounded-lg shadow-lg">
                          <X size={12} />
                        </button>
                      )}
                    </div>
                    <div className="flex-1 w-full space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <input type="text" value={cvData.personnel.nomComplet || ''} onChange={(e) => handleChangementPersonnel('nomComplet', e.target.value)} className="w-full glass-input px-5 py-3 rounded-xl text-sm font-semibold" placeholder="Nom complet" />
                        <input type="text" value={cvData.personnel.titrePoste || ''} onChange={(e) => handleChangementPersonnel('titrePoste', e.target.value)} className="w-full glass-input px-5 py-3 rounded-xl text-sm font-semibold" placeholder="Titre du poste" />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact Détails */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                      <Mail size={14} className="text-indigo-500" /> Coordonnées
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-4"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="email" value={cvData.personnel.email || ''} onChange={(e) => handleChangementPersonnel('email', e.target.value)} className="w-full glass-input pl-11 pr-5 py-3 rounded-xl text-sm" placeholder="Email" />
                    </div>
                    <div className="relative">
                      <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="tel" value={cvData.personnel.telephone || ''} onChange={(e) => handleChangementPersonnel('telephone', e.target.value)} className="w-full glass-input pl-11 pr-5 py-3 rounded-xl text-sm" placeholder="Téléphone" />
                    </div>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="text" value={cvData.personnel.adresse || ''} onChange={(e) => handleChangementPersonnel('adresse', e.target.value)} className="w-full glass-input pl-11 pr-5 py-3 rounded-xl text-sm" placeholder="Adresse" />
                    </div>
                    <div className="relative">
                      <Linkedin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="text" value={cvData.personnel.linkedin || ''} onChange={(e) => handleChangementPersonnel('linkedin', e.target.value)} className="w-full glass-input pl-11 pr-5 py-3 rounded-xl text-sm" placeholder="LinkedIn" />
                    </div>
                  </div>
                </section>

                {/* Résumé Restored */}
                <section className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Résumé Premium (IA)</label>
                  <div className="relative group">
                    <textarea value={cvData.personnel.resume || ''} onChange={(e) => handleChangementPersonnel('resume', e.target.value)} rows="4" className="w-full glass-input px-5 py-4 rounded-3xl text-sm leading-relaxed focus:ring-4 focus:ring-indigo-500/10 outline-none" placeholder="Racontez votre histoire..." />
                    <button onClick={async () => {
                      try {
                        const response = await enhanceCVContent('résumé', cvData.personnel.resume);
                        handleChangementPersonnel('resume', response);
                      } catch (e) { console.error(e); }
                    }} className="absolute bottom-4 right-4 p-2 bg-indigo-600 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-105">
                      <Sparkles size={12} />
                    </button>
                  </div>
                </section>

                {/* Expériences Section Restored */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                      <Briefcase size={14} className="text-indigo-500" /> Expériences
                    </h3>
                    <button onClick={() => setExperienceEnEdition({ id: Date.now(), poste: '', entreprise: '', dateDebut: '', dateFin: '', description: '', ville: '' })} className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {cvData.experiences.map((exp) => (
                      <div key={exp.id} className="group glass-card p-5 rounded-2xl border border-white/50 hover:border-indigo-200 transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-indigo-950 text-sm">{exp.poste || 'Nouvelle expérience'}</h4>
                            <p className="text-xs text-indigo-600 font-semibold">{exp.entreprise}</p>
                            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tight">{exp.dateDebut} — {exp.dateFin}</p>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setExperienceEnEdition(exp)} className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"><Pencil size={12} /></button>
                            <button onClick={() => supprimerExperience(exp.id)} className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-rose-50 hover:text-rose-600"><Trash2 size={12} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {cvData.experiences.length === 0 && (
                      <div className="text-center py-10 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aucune expérience ajoutée</p>
                      </div>
                    )}
                  </div>
                </section>

                {/* Formations Section */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                      <GraduationCap size={14} className="text-indigo-500" /> Formations
                    </h3>
                    <button onClick={() => setFormationEnEdition({ id: Date.now(), diplome: '', ecole: '', dateDebut: '', dateFin: '', description: '', ville: '' })} className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {cvData.formations.map((f) => (
                      <div key={f.id} className="group glass-card p-5 rounded-2xl border border-white/50 hover:border-indigo-200 transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-indigo-950 text-sm">{f.diplome || 'Nouveau diplôme'}</h4>
                            <p className="text-xs text-indigo-600 font-semibold">{f.ecole}</p>
                            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tight">{f.dateDebut} — {f.dateFin}</p>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setFormationEnEdition(f)} className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"><Pencil size={12} /></button>
                            <button onClick={() => supprimerFormation(f.id)} className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-rose-50 hover:text-rose-600"><Trash2 size={12} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {cvData.formations.length === 0 && (
                      <div className="text-center py-10 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aucune formation ajoutée</p>
                      </div>
                    )}
                  </div>
                </section>

                {/* Compétences Section */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                      <Crosshair size={14} className="text-indigo-500" /> Compétences
                    </h3>
                  </div>

                  <div className="bg-white/40 p-6 rounded-[2rem] border border-white/50 space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="newSkillInput"
                        className="flex-1 glass-input px-5 py-3 rounded-xl text-sm"
                        placeholder="Ex: React, UX Design..."
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && e.target.value.trim()) {
                            ajouterCompetence(e.target.value);
                            e.target.value = '';
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const input = document.getElementById('newSkillInput');
                          if (input.value.trim()) {
                            ajouterCompetence(input.value);
                            input.value = '';
                          }
                        }}
                        className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 shadow-lg"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cvData.competences.map((skill, i) => (
                        <span key={i} className="group flex items-center gap-2 bg-indigo-50/50 text-indigo-700 px-4 py-2 rounded-xl text-xs font-bold border border-indigo-100 hover:bg-indigo-200 transition-colors">
                          {skill}
                          <button onClick={() => supprimerCompetence(i)} className="text-indigo-300 hover:text-rose-500 transition-colors">
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </section>

                <div className="pt-8 border-t border-indigo-100 flex flex-wrap gap-3">
                  <button onClick={reinitialiserFormulaire} className="flex-1 min-w-[140px] px-6 py-4 bg-rose-50 text-rose-600 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all flex items-center justify-center gap-2">
                    <Trash2 size={16} /> Réinitialiser
                  </button>
                  <button onClick={exporterJSON} className="flex-1 min-w-[140px] px-6 py-4 bg-indigo-50 text-indigo-700 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all flex items-center justify-center gap-2">
                    <Download size={16} /> Exporter .json
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section Prévisualisation */}
          <div className={`w-full md:w-[55%] h-full ${ongletActif === 'edition' ? 'hidden md:block' : 'block'}`}>
            <div className="glass-card rounded-[2.5rem] p-4 sm:p-10 h-full overflow-y-auto custom-scrollbar shadow-2xl relative">
              <div className="flex justify-between items-center mb-10 sticky top-0 bg-white/20 backdrop-blur-3xl py-6 z-40 border-b border-white/20 rounded-t-[2.5rem] -mt-10 -mx-10 px-10">
                <h2 className="text-2xl font-black text-indigo-950 flex items-center gap-3">
                  <div className="p-2.5 bg-purple-600 rounded-2xl text-white shadow-xl shadow-purple-100">
                    <Sparkles size={22} />
                  </div>
                  Live Preview
                </h2>
                <div className="hidden sm:flex gap-2">
                  {['bg-rose-400', 'bg-amber-400', 'bg-emerald-400'].map(c => <div key={c} className={`w-3 h-3 rounded-full ${c} opacity-30`} />)}
                </div>
              </div>

              <div className="flex justify-center bg-slate-900/5 rounded-[2rem] p-4 sm:p-8 min-h-[800px] transition-all duration-500 overflow-x-hidden">
                <div className="origin-top transition-transform duration-500 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] bg-white w-full max-w-[210mm]"
                  style={{
                    transform: `scale(${previewScale})`,
                  }}>
                  <div className={`${stylesPreview.conteneur} min-h-[297mm] relative`}>
                    {/* Template decorations and logic restored inside */}
                    {cvData.parametres.template === 'creatif' && (
                      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-[100px] -mr-32 -mt-32 opacity-50 pointer-events-none"></div>
                    )}

                    {/* Preview Content (Simplié pour robustesse) */}
                    <div className="p-8 sm:p-12">
                      <h3 className={stylesPreview.nom} style={{ color: cvData.parametres.couleurPrincipale }}>{cvData.personnel.nomComplet || 'Nom complet'}</h3>
                      <p className={stylesPreview.titre}>{cvData.personnel.titrePoste || 'Poste visé'}</p>

                      <div className={stylesPreview.contact}>
                        {cvData.personnel.email && <span className="flex items-center gap-1"><Mail size={12} className="shrink-0" /> {cvData.personnel.email}</span>}
                        {cvData.personnel.telephone && <span className="flex items-center gap-1"><Phone size={12} className="shrink-0" /> {cvData.personnel.telephone}</span>}
                      </div>

                      {cvData.personnel.resume && (
                        <div className="mt-8">
                          <h4 className={stylesPreview.sousTitre} style={{ color: cvData.parametres.couleurPrincipale }}>Profil</h4>
                          <p className="text-sm leading-relaxed text-slate-600 italic">{cvData.personnel.resume}</p>
                        </div>
                      )}

                      {cvData.experiences.length > 0 && (
                        <div className="mt-10">
                          <h4 className={stylesPreview.sousTitre} style={{ color: cvData.parametres.couleurPrincipale }}>Expériences</h4>
                          <div className="space-y-6 mt-4">
                            {cvData.experiences.map(exp => (
                              <div key={exp.id}>
                                <div className="flex justify-between font-bold text-sm">
                                  <span>{exp.poste}</span>
                                  <span className="text-slate-400">{exp.dateDebut} - {exp.dateFin}</span>
                                </div>
                                <p className="text-xs font-bold text-indigo-600">{exp.entreprise}</p>
                                <p className="text-xs mt-2 text-slate-500 whitespace-pre-line leading-relaxed">{exp.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PWA & Footer */}
      <PWAInstallPrompt />
      <UpdateNotification />
    </div>
  );
}

export default App;