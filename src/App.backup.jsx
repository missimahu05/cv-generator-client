import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
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
  Eye
} from 'lucide-react';

// Importer les composants
import DraggableItem from './components/DraggableItem';

const hexToRGBA = (hex, opacity) => {
  if (!hex) return `rgba(37, 99, 235, ${opacity})`;
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

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
import LoadingScreen from './components/LoadingScreen';
import { Layout } from 'lucide-react';

function App() {
  // Données par défaut avec TON profil
  const defaultCVData = {
    personnel: {
      nomComplet: "HOUNGUE Jolidon",
      titrePoste: "Développeur Full-Stack & Mobile",
      email: "jolidonhoungue30@gmail.com",
      telephone: "+229 0151852420",
      resume: "Développeur Full-Stack et Mobile passionné par la création d'applications web et mobiles innovantes. Actuellement en Licence Informatique de Gestion à l'Université de Parakou, je combine compétences techniques pour concevoir des solutions performantes et adaptées aux besoins des utilisateurs.",
      adresse: "Parakou, Bénin",
      siteWeb: "portfoliojolidon.vercel.app",
      linkedin: "linkedin.com/in/jolidonmissimahuhoungue",
      github: "github.com/joboy05",
      photo: "",
      permisDeConduire: "Permis B"
    },
    experiences: [
      {
        id: "1",
        entreprise: "Projet Personnel",
        poste: "Développeur Full-Stack & Mobile",
        dateDebut: "2024",
        dateFin: "Présent",
        actuel: true,
        description: "Développement de l'application mobile KlipSave en React Native\nConception d'un générateur de CV en React + Node.js + MongoDB\nGestion des templates dynamiques stockés en base de données"
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
      "React Native",
      "React.js",
      "Expo",
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
      { id: "2", nom: "Développement d'applications web & mobiles" },
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
      },
      {
        id: "3",
        nom: "KlipSave",
        description: "Application mobile de téléchargement de vidéos",
        lien: "",
        technologies: ["React Native", "Expo", "FastAPI", "Python"]
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
          personnel: { ...defaultCVData.personnel, permisDeConduire: "", ...(parsed.personnel || {}) },
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
  const [statutSauvegarde, setStatutSauvegarde] = useState('Tout est sauvegardé');
  const [erreurImport, setErreurImport] = useState('');
  const [estEnLigne, setEstEnLigne] = useState(navigator.onLine);
  const [estInstalle, setEstInstalle] = useState(false);
  const [chargement, setChargement] = useState(true);
  const [enTrainDeGenererPDF, setEnTrainDeGenererPDF] = useState(false);
  const [mobileView, setMobileView] = useState('edit'); // 'edit' | 'preview'
  const [activeTab, setActiveTab] = useState('profil'); // tab active dans l'éditeur

  const cvRef = useRef(null);

  // Effet pour le preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setChargement(false);
    }, 1200); // Un peu plus d'une seconde pour un effet premium
    return () => clearTimeout(timer);
  }, []);

  // Capteurs pour le drag & drop
  const sensors = useSensors(
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
    setStatutSauvegarde('Sauvegardé à ' + new Date().toLocaleTimeString());

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

  const exporterPDF = async () => {
    if (!cvRef.current) return;

    setEnTrainDeGenererPDF(true);
    // Petit délai pour stabiliser le rendu
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const element = cvRef.current;
      const canvas = await html2canvas(element, {
        scale: 3, // Excellent compromis poids/qualité
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        imageTimeout: 15000,
        removeContainer: true,
        // Forcer le rendu webkit pour plus de précision sur les arrondis
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('cv-preview-export');
          if (el) {
            el.style.width = '794px'; // A4 width
            el.style.height = 'auto';
            el.style.transform = 'none';
          }
        }
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = 210;
      const pdfPageHeight = 297;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Ajouter la première page
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfPageHeight;

      // Ajouter des pages supplémentaires si le contenu dépasse la hauteur d'une page A4
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfPageHeight;
      }

      pdf.save(`CV-${cvData.personnel.nomComplet?.replace(/\s+/g, '-') || 'sans-nom'}.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
    } finally {
      setEnTrainDeGenererPDF(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChangementPersonnel('photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
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

  const supprimerLangue = (id) => {
    if (window.confirm('Supprimer cette langue ?')) {
      setCvData(prev => ({
        ...prev,
        langues: prev.langues.filter(l => l.id !== id)
      }));
    }
  };

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

  const supprimerCentreInteret = (id) => {
    if (window.confirm('Supprimer ce centre d\'intérêt ?')) {
      setCvData(prev => ({
        ...prev,
        centresInteret: prev.centresInteret.filter(c => c.id !== id)
      }));
    }
  };

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

  const supprimerCertification = (id) => {
    if (window.confirm('Supprimer cette certification ?')) {
      setCvData(prev => ({
        ...prev,
        certifications: prev.certifications.filter(c => c.id !== id)
      }));
    }
  };

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

  const supprimerProjet = (id) => {
    if (window.confirm('Supprimer ce projet ?')) {
      setCvData(prev => ({
        ...prev,
        projets: prev.projets.filter(p => p.id !== id)
      }));
    }
  };

  // Drag & Drop Handlers
  const handleDragEndExperiences = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCvData(prev => {
        const oldIndex = prev.experiences.findIndex(item => item.id === active.id);
        const newIndex = prev.experiences.findIndex(item => item.id === over.id);
        return { ...prev, experiences: arrayMove(prev.experiences, oldIndex, newIndex) };
      });
    }
  };

  const handleDragEndFormations = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCvData(prev => {
        const oldIndex = prev.formations.findIndex(item => item.id === active.id);
        const newIndex = prev.formations.findIndex(item => item.id === over.id);
        return { ...prev, formations: arrayMove(prev.formations, oldIndex, newIndex) };
      });
    }
  };

  const handleDragEndLangues = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCvData(prev => {
        const oldIndex = prev.langues.findIndex(item => item.id === active.id);
        const newIndex = prev.langues.findIndex(item => item.id === over.id);
        return { ...prev, langues: arrayMove(prev.langues, oldIndex, newIndex) };
      });
    }
  };

  const handleDragEndCentresInteret = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCvData(prev => {
        const oldIndex = prev.centresInteret.findIndex(item => item.id === active.id);
        const newIndex = prev.centresInteret.findIndex(item => item.id === over.id);
        return { ...prev, centresInteret: arrayMove(prev.centresInteret, oldIndex, newIndex) };
      });
    }
  };

  const handleDragEndCertifications = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCvData(prev => {
        const oldIndex = prev.certifications.findIndex(item => item.id === active.id);
        const newIndex = prev.certifications.findIndex(item => item.id === over.id);
        return { ...prev, certifications: arrayMove(prev.certifications, oldIndex, newIndex) };
      });
    }
  };

  const handleDragEndProjets = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCvData(prev => {
        const oldIndex = prev.projets.findIndex(item => item.id === active.id);
        const newIndex = prev.projets.findIndex(item => item.id === over.id);
        return { ...prev, projets: arrayMove(prev.projets, oldIndex, newIndex) };
      });
    }
  };

  // Compétences
  const ajouterCompetence = () => {
    if (nouvelleCompetence.trim() === "") return;
    setCvData(prev => ({
      ...prev,
      competences: [...prev.competences, nouvelleCompetence.trim()]
    }));
    setNouvelleCompetence("");
  };

  const ajouterCompetenceDepuisSuggestion = (competence) => {
    if (!cvData.competences.includes(competence)) {
      setCvData(prev => ({
        ...prev,
        competences: [...prev.competences, competence]
      }));
    }
  };

  const supprimerCompetence = (indexASupprimer) => {
    if (window.confirm('Supprimer cette compétence ?')) {
      setCvData(prev => ({
        ...prev,
        competences: prev.competences.filter((_, index) => index !== indexASupprimer)
      }));
    }
  };

  const handleToucheEntree = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      ajouterCompetence();
    }
  };

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
    const nomFichierExport = `cv-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
    const elementLien = document.createElement('a');
    elementLien.setAttribute('href', dataUri);
    elementLien.setAttribute('download', nomFichierExport);
    elementLien.click();
  };

  const importerJSON = (event) => {
    const fichier = event.target.files[0];
    if (!fichier) return;

    const lecteur = new FileReader();
    lecteur.onload = (e) => {
      try {
        const donneesImportees = JSON.parse(e.target.result);
        if (!donneesImportees.personnel) throw new Error('Format de fichier invalide');
        setCvData(donneesImportees);
        setErreurImport('');
        event.target.value = '';
      } catch (error) {
        setErreurImport('Fichier JSON invalide');
      }
    };
    lecteur.readAsText(fichier);
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
          competence: "px-3 py-1 bg-gray-100 rounded-full text-sm",
          contact: "flex justify-center gap-4 text-sm mt-4",
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
          contact: "flex justify-center gap-4 text-sm mt-4",
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
          contact: "flex justify-center gap-6 text-sm text-gray-400 mt-4",
        };

      case 'developpeur':
        return {
          conteneur: "border-0 bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white",
          nom: "text-3xl font-mono font-bold text-green-400 text-center",
          titre: "font-mono text-gray-300 text-center mt-2",
          sousTitre: "text-lg font-mono text-green-400 border-b border-green-400/30 pb-2 mb-4",
          section: "mt-6",
          grid: "grid grid-cols-1 md:grid-cols-2 gap-6",
          competences: "flex flex-wrap gap-2",
          competence: "px-3 py-1 bg-gray-700 text-green-400 rounded-md text-sm font-mono",
          contact: "flex justify-center gap-4 text-sm text-gray-300 mt-4 font-mono",
          code: "bg-gray-800 p-4 rounded-lg border border-green-400/30",
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
          contact: "flex justify-center gap-6 text-sm text-gray-600 mt-4 bg-white/50 p-4 rounded-full",
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
          contact: "flex flex-wrap gap-4 text-sm text-gray-600 mt-4",
          deuxColonnes: "grid grid-cols-1 md:grid-cols-3 gap-6",
          colonneGauche: "md:col-span-1",
          colonneDroite: "md:col-span-2",
        };

      case 'sidebar_left':
        return {
          conteneur: "border-0 shadow-xl bg-white flex min-h-[800px] text-gray-800",
          sidebar: "w-1/3 bg-gray-900 text-white p-6 flex flex-col items-center",
          main: "w-2/3 p-8",
          nom: "text-2xl font-bold text-center mb-1 text-white",
          titre: "text-sm text-gray-400 text-center uppercase tracking-widest mb-6",
          sousTitre: "text-sm font-bold uppercase tracking-widest border-b border-gray-700 pb-2 mb-4 mt-6",
          mainSousTitre: "text-lg font-bold uppercase tracking-wider border-b-2 border-gray-100 pb-2 mb-4 mt-6",
          contact: "flex flex-col gap-3 text-xs text-gray-300 w-full mt-4",
          competence: "px-2 py-1 bg-gray-800 text-gray-300 rounded text-[10px] mb-1 mr-1 inline-block",
        };

      case 'sidebar_right':
        return {
          conteneur: "border-0 shadow-xl bg-white flex min-h-[800px] text-gray-800",
          main: "w-2/3 p-8",
          sidebar: "w-1/3 bg-gray-50 border-l border-gray-100 p-6 flex flex-col",
          nom: "text-3xl font-black text-gray-900",
          titre: "text-lg font-medium text-gray-500 mb-6",
          sousTitre: "text-sm font-bold uppercase tracking-widest border-b border-gray-200 pb-2 mb-4 mt-6",
          mainSousTitre: "text-lg font-bold text-gray-900 border-l-4 pl-3 mb-4 mt-6",
          contact: "flex flex-col gap-3 text-xs text-gray-600 w-full",
          competence: "px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-full text-[10px] inline-block mb-1 mr-1",
        };

      case 'fancy_header':
        return {
          conteneur: "border-0 shadow-2xl bg-white overflow-hidden text-gray-800",
          header: "p-8 text-white relative",
          body: "p-8",
          nom: "text-4xl font-extrabold tracking-tight",
          titre: "text-xl font-light opacity-90 mt-1",
          sousTitre: "text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 mt-6 before:content-[''] before:w-8 before:h-1",
          contact: "flex flex-wrap gap-4 text-xs mt-6 pt-6 border-t border-white/20",
          competence: "px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium",
          grid: "grid grid-cols-1 md:grid-cols-2 gap-8",
        };

      default:
        return {
          conteneur: "border border-gray-200 rounded-lg p-6 bg-gray-50",
          nom: "text-xl font-bold",
          titre: "text-gray-600",
          sousTitre: "text-md font-semibold border-b border-gray-200 pb-2 mb-4",
          mainSousTitre: "text-md font-semibold border-b border-gray-200 pb-2 mb-4",
          section: "mt-4",
          grid: "grid grid-cols-1 gap-4",
          competences: "flex flex-wrap gap-2",
          competence: "px-2 py-1 bg-gray-200 rounded-md text-sm",
          contact: "flex justify-center gap-4 text-sm mt-4",
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

  // --- Composants de Rendu de la Prévisualisation ---
  const ExperienceItem = ({ exp }) => (
    <div key={exp.id} className="mb-4">
      <div className="flex justify-between items-start">
        <p className="font-semibold">{exp.poste}</p>
        <p className="text-xs text-gray-400">{exp.dateDebut} - {exp.dateFin}</p>
      </div>
      <p className="text-sm font-medium opacity-90">{exp.entreprise}</p>
      {exp.description && <p className="text-xs mt-1 whitespace-pre-line leading-relaxed opacity-80">{exp.description}</p>}
    </div>
  );

  const TextRenderer = ({ data, styles, section }) => {
    const isSidebar = section === 'sidebar';
    const sTitleStyle = isSidebar ? {} : { color: data.parametres.couleurPrincipale };
    const sTitleClass = isSidebar ? styles.sousTitre : styles.mainSousTitre;

    const renderContact = () => (
      <div className={styles.contact}>
        {data.personnel.email && <span className="flex items-center gap-2"><Mail size={12} /> {data.personnel.email}</span>}
        {data.personnel.telephone && <span className="flex items-center gap-2"><Phone size={12} /> {data.personnel.telephone}</span>}
        {data.personnel.adresse && <span className="flex items-center gap-2"><MapPin size={12} /> {data.personnel.adresse}</span>}
        {data.personnel.linkedin && <span className="flex items-center gap-2"><Linkedin size={12} /> {data.personnel.linkedin}</span>}
        {data.personnel.github && <span className="flex items-center gap-2"><Github size={12} /> {data.personnel.github}</span>}
        {data.personnel.siteWeb && <span className="flex items-center gap-2"><Globe size={12} /> {data.personnel.siteWeb}</span>}
      </div>
    );

    const renderSkills = () => data.competences.length > 0 && (
      <div className="mt-6 w-full overflow-hidden">
        <h4 className={sTitleClass} style={sTitleStyle}>Compétences</h4>
        <div className="flex flex-wrap gap-2 py-1">
          {data.competences.map((s, i) => (
            <span
              key={i}
              className={`${styles.competence} inline-flex items-center justify-center whitespace-nowrap`}
              style={{
                ...(!isSidebar ? {
                  backgroundColor: hexToRGBA(data.parametres.couleurPrincipale, 0.1),
                  color: data.parametres.couleurPrincipale
                } : {}),
                padding: '4px 12px',
                borderRadius: '9999px',
                margin: '2px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 'normal',
                border: `1px solid ${hexToRGBA(data.parametres.couleurPrincipale, 0.05)}`
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    );

    const renderEducation = () => data.formations.length > 0 && (
      <div className="mt-6 w-full">
        <h4 className={sTitleClass} style={sTitleStyle}>Formations</h4>
        {data.formations.map(f => (
          <div key={f.id} className="mb-3">
            <p className="font-semibold text-sm">{f.diplome}</p>
            <p className="text-xs opacity-70">{f.ecole}</p>
            <p className="text-[10px] opacity-50">{f.dateDebut} - {f.dateFin}</p>
          </div>
        ))}
      </div>
    );

    const renderInterests = () => data.centresInteret.length > 0 && (
      <div className="mt-6 w-full">
        <h4 className={sTitleClass} style={sTitleStyle}>Centres d'intérêt</h4>
        <div className="flex flex-wrap gap-2 py-1">
          {data.centresInteret.map(c => (
            <span key={c.id} className="text-xs px-2 py-1 bg-gray-50 rounded border border-gray-100">{c.nom}</span>
          ))}
        </div>
      </div>
    );

    const renderCertifications = () => data.certifications.length > 0 && (
      <div className="mt-6 w-full">
        <h4 className={sTitleClass} style={sTitleStyle}>Certifications</h4>
        {data.certifications.map(c => (
          <div key={c.id} className="mb-2">
            <p className="text-xs font-bold">{c.nom}</p>
            <p className="text-[10px] opacity-50">{c.organisme} • {c.date}</p>
          </div>
        ))}
      </div>
    );

    if (section === 'sidebar') {
      return (
        <div className="w-full">
          <h2 className={styles.nom}>{data.personnel.nomComplet}</h2>
          <p className={styles.titre}>{data.personnel.titrePoste}</p>
          {renderContact()}
          {renderSkills()}
          {renderEducation()}
          {data.langues.length > 0 && (
            <div className="mt-6">
              <h4 className={sTitleClass}>Langues</h4>
              {data.langues.map(l => (
                <div key={l.id} className="flex justify-between text-xs mb-1">
                  <span>{l.nom}</span>
                  <span className="opacity-50 italic">{l.niveau}</span>
                </div>
              ))}
            </div>
          )}
          {renderInterests()}
          {renderCertifications()}
          {data.personnel.permisDeConduire && (
            <div className="mt-6">
              <h4 className={sTitleClass}>Permis</h4>
              <p className="text-xs">{data.personnel.permisDeConduire}</p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="w-full">
        {(section === 'header' || section === 'full') && (
          <div className="mb-8">
            <h1 className={styles.nom}>{data.personnel.nomComplet}</h1>
            <p className={styles.titre}>{data.personnel.titrePoste}</p>
            {section === 'header' && renderContact()}
          </div>
        )}

        {data.personnel.resume && (
          <div className="mb-8">
            <h4 className={styles.mainSousTitre} style={{ color: data.parametres.couleurPrincipale }}>Profil</h4>
            <p className="text-sm leading-relaxed text-gray-700 italic border-l-2 pl-4 py-1" style={{ borderColor: data.parametres.couleurPrincipale }}>
              "{data.personnel.resume}"
            </p>
          </div>
        )}

        {data.experiences.length > 0 && (
          <div className="mb-8">
            <h4 className={styles.mainSousTitre} style={{ color: data.parametres.couleurPrincipale }}>Expériences Professionnelles</h4>
            {data.experiences.map(exp => <ExperienceItem key={exp.id} exp={exp} />)}
          </div>
        )}

        {section === 'full' && (
          <>
            {renderEducation()}
            {renderSkills()}
            {data.langues.length > 0 && (
              <div className="mt-6">
                <h4 className={styles.mainSousTitre} style={{ color: data.parametres.couleurPrincipale }}>Langues</h4>
                <div className="grid grid-cols-2 gap-2">
                  {data.langues.map(l => (
                    <div key={l.id} className="text-xs"><span className="font-bold">{l.nom}</span> : {l.niveau}</div>
                  ))}
                </div>
              </div>
            )}
            {renderInterests()}
            {renderCertifications()}
            {data.personnel.permisDeConduire && (
              <div className="mt-6">
                <h4 className={styles.mainSousTitre} style={{ color: data.parametres.couleurPrincipale }}>Divers</h4>
                <p className="text-xs"><span className="font-bold">Permis :</span> {data.personnel.permisDeConduire}</p>
              </div>
            )}
          </>
        )}

        {data.projets.length > 0 && (
          <div className="mb-8">
            <h4 className={styles.mainSousTitre} style={{ color: data.parametres.couleurPrincipale }}>Projets</h4>
            <div className={styles.grid || 'grid grid-cols-1 gap-4'}>
              {data.projets.map(p => (
                <div key={p.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-sm font-bold">{p.nom}</p>
                  <p className="text-xs text-gray-600 mt-1">{p.description}</p>
                  {p.lien && <a href={p.lien} className="text-[10px] text-blue-600 mt-2 block hover:underline">{p.lien}</a>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const DefaultRenderer = ({ data, styles }) => {
    return (
      <div className="w-full">
        <div className="flex gap-6 mb-8">
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-2xl border-4 overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center"
              style={{ borderColor: data.parametres.couleurPrincipale }}>
              {data.personnel.photo ? <img src={data.personnel.photo} className="w-full h-full object-cover" /> : <User size={50} className="text-gray-300" />}
            </div>
          </div>
          <div className="flex-1">
            <h1 className={styles.nom} style={{ color: data.parametres.couleurPrincipale }}>{data.personnel.nomComplet}</h1>
            <p className={styles.titre}>{data.personnel.titrePoste}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-600">
              {data.personnel.email && <span className="flex items-center gap-1"><Mail size={12} /> {data.personnel.email}</span>}
              {data.personnel.telephone && <span className="flex items-center gap-1"><Phone size={12} /> {data.personnel.telephone}</span>}
              {data.personnel.adresse && <span className="flex items-center gap-1"><MapPin size={12} /> {data.personnel.adresse}</span>}
            </div>
          </div>
        </div>

        {data.personnel.resume && (
          <div className="mb-8">
            <p className="text-sm leading-relaxed text-gray-700 italic bg-gray-50 p-4 rounded-lg border-l-4" style={{ borderLeftColor: data.parametres.couleurPrincipale }}>
              "{data.personnel.resume}"
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            {data.experiences.length > 0 && (
              <section>
                <h4 className={styles.sousTitre} style={{ color: data.parametres.couleurPrincipale }}>Expériences</h4>
                {data.experiences.map(exp => <ExperienceItem key={exp.id} exp={exp} />)}
              </section>
            )}
            {data.projets.length > 0 && (
              <section>
                <h4 className={styles.sousTitre} style={{ color: data.parametres.couleurPrincipale }}>Projets</h4>
                {data.projets.map(p => (
                  <div key={p.id} className="mb-3">
                    <p className="text-sm font-bold">{p.nom}</p>
                    <p className="text-xs text-gray-600">{p.description}</p>
                  </div>
                ))}
              </section>
            )}
            {data.formations.length > 0 && (
              <section>
                <h4 className={styles.sousTitre} style={{ color: data.parametres.couleurPrincipale }}>Formations</h4>
                {data.formations.map(f => (
                  <div key={f.id} className="mb-3">
                    <p className="text-sm font-bold">{f.diplome}</p>
                    <p className="text-xs text-gray-600">{f.ecole}</p>
                    <p className="text-[10px] text-gray-400">{f.dateDebut} - {f.dateFin}</p>
                  </div>
                ))}
              </section>
            )}
            {data.certifications.length > 0 && (
              <section>
                <h4 className={styles.sousTitre} style={{ color: data.parametres.couleurPrincipale }}>Certifications</h4>
                {data.certifications.map(c => (
                  <div key={c.id} className="mb-2">
                    <p className="text-sm font-bold">{c.nom}</p>
                    <p className="text-xs text-gray-600">{c.organisme} • {c.date}</p>
                  </div>
                ))}
              </section>
            )}
          </div>
          <div className="space-y-8">
            {data.competences.length > 0 && (
              <section>
                <h4 className={styles.sousTitre} style={{ color: data.parametres.couleurPrincipale }}>Compétences</h4>
                <div className="flex flex-wrap gap-2 py-1">
                  {data.competences.map((s, i) => (
                    <span
                      key={i}
                      className={`${styles.competence} inline-flex items-center justify-center whitespace-nowrap`}
                      style={{
                        backgroundColor: hexToRGBA(data.parametres.couleurPrincipale, 0.1),
                        color: data.parametres.couleurPrincipale,
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        margin: '2px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 'normal',
                        border: `1px solid ${hexToRGBA(data.parametres.couleurPrincipale, 0.05)}`
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {data.langues.length > 0 && (
              <section>
                <h4 className={styles.sousTitre} style={{ color: data.parametres.couleurPrincipale }}>Langues</h4>
                {data.langues.map(l => (
                  <div key={l.id} className="flex justify-between text-xs mb-1">
                    <span>{l.nom}</span>
                    <span className="opacity-50 italic">{l.niveau}</span>
                  </div>
                ))}
              </section>
            )}
            {data.centresInteret.length > 0 && (
              <section>
                <h4 className={styles.sousTitre} style={{ color: data.parametres.couleurPrincipale }}>Centres d'intérêt</h4>
                <div className="flex flex-wrap gap-1">
                  {data.centresInteret.map(c => (
                    <span key={c.id} className="text-[10px] px-2 py-0.5 bg-gray-50 rounded border">{c.nom}</span>
                  ))}
                </div>
              </section>
            )}

            {data.personnel.permisDeConduire && (
              <section>
                <h4 className={styles.sousTitre} style={{ color: data.parametres.couleurPrincipale }}>Permis</h4>
                <p className="text-[10px]">{data.personnel.permisDeConduire}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  };

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
    <>
      <AnimatePresence>
        {chargement && <LoadingScreen color={cvData.parametres.couleurPrincipale} />}
      </AnimatePresence>

      <motion.div
        className="min-h-screen relative"
        style={{
          backgroundColor: '#f8fafc',
          backgroundImage: `radial-gradient(at 0% 0%, ${cvData.parametres.couleurPrincipale}10 0, transparent 40%), radial-gradient(at 100% 100%, ${cvData.parametres.couleurPrincipale}10 0, transparent 40%)`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <header className="bg-white border-b border-slate-100 sticky top-0 z-20 shadow-sm">
          <div className="max-w-screen-xl mx-auto px-4">
            {/* Top bar */}
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${cvData.parametres.couleurPrincipale}, ${cvData.parametres.couleurPrincipale}aa)` }}>
                  CV
                </div>
                <div>
                  <span className="font-bold text-slate-800 text-sm">Jj's CV Generator</span>
                  <span className="hidden sm:inline text-xs text-slate-400 ml-2">• {statutSauvegarde}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Statut online */}
                <span className={`hidden sm:flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${
                  estEnLigne ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${estEnLigne ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  {estEnLigne ? 'En ligne' : 'Hors ligne'}
                </span>

                {/* ATS Optimizer */}
                <ATSOptimizer cvData={cvData} />

                {/* Barre de complétion */}
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${completude}%`, backgroundColor: cvData.parametres.couleurPrincipale }} />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{completude}%</span>
                </div>

                {/* PDF Download */}
                <button
                  onClick={exporterPDF}
                  disabled={enTrainDeGenererPDF}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
                  style={{ background: `linear-gradient(135deg, ${cvData.parametres.couleurPrincipale}, ${cvData.parametres.couleurPrincipale}cc)` }}
                >
                  <Download size={13} />
                  {enTrainDeGenererPDF ? 'Génération...' : 'Télécharger PDF'}
                </button>

                {/* PWA install */}
                {!estInstalle && (
                  <button
                    onClick={() => document.dispatchEvent(new CustomEvent('show-pwa-prompt'))}
                    className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-medium hover:bg-slate-200 transition-all"
                  >
                    <Download size={12} /> Installer
                  </button>
                )}
              </div>
            </div>

            {/* Mobile + Tablet toggle Éditer / Aperçu */}
            <div className="flex lg:hidden gap-1 pb-2">
              {[
                { id: 'edit', label: 'Éditer', icon: <Pencil size={14} /> },
                { id: 'preview', label: 'Aperçu', icon: <Eye size={14} /> }
              ].map(v => (
                <button key={v.id} onClick={() => setMobileView(v.id)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                    mobileView === v.id
                      ? 'text-white shadow-sm'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                  style={mobileView === v.id ? { backgroundColor: cvData.parametres.couleurPrincipale } : {}}
                >
                  {v.icon}
                  {v.label}
                </button>
              ))}
              {/* Mobile PDF */}
              {mobileView === 'preview' && (
                <button
                  onClick={exporterPDF}
                  disabled={enTrainDeGenererPDF}
                  className="px-3 py-2 text-white text-xs font-semibold rounded-xl shadow-sm transition-all disabled:opacity-60"
                  style={{ backgroundColor: cvData.parametres.couleurPrincipale }}
                >
                  <Download size={14} />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Contenu principal */}
        <div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* PANNEAU GAUCHE - Éditeur */}
            <div
              className={`w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-slate-100
                max-h-screen lg:max-h-[calc(100vh-110px)] overflow-y-auto
                ${mobileView === 'preview' ? 'hidden lg:flex lg:flex-col' : 'flex flex-col'}`}
            >
              {/* Onglets de navigation */}
              <div className="sticky top-0 bg-white z-10 px-4 pt-4 pb-0 border-b border-slate-100">
                <div className="flex gap-1 overflow-x-auto pb-0 scrollbar-hide">
                  {[
                    { id: 'apparence', icon: <Palette size={16} />, full: 'Apparence' },
                    { id: 'profil',    icon: <User size={16} />, full: 'Profil' },
                    { id: 'experience', icon: <Briefcase size={16} />, full: 'Expériences' },
                    { id: 'formation',  icon: <GraduationCap size={16} />, full: 'Formations' },
                    { id: 'skills',     icon: <Zap size={16} />, full: 'Compétences' },
                    { id: 'langues',    icon: <Languages size={16} />, full: 'Langues' },
                    { id: 'autres',     icon: <Folder size={16} />, full: 'Autres' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold rounded-t-lg whitespace-nowrap transition-all border-b-2 ${
                        activeTab === tab.id
                          ? 'border-b-2 bg-slate-50'
                          : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                      }`}
                      style={activeTab === tab.id ? { borderBottomColor: cvData.parametres.couleurPrincipale, color: cvData.parametres.couleurPrincipale } : {}}
                    >
                      {tab.icon}
                      <span className="hidden md:inline">{tab.full}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contenu des onglets */}
              <div className="p-4 flex-1">
              {/* === ONGLET APPARENCE === */}
              {activeTab === 'apparence' && (
                <div className="animate-fadeIn">
                  {/* Barre de complétion */}
                  <div className="mb-5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex justify-between text-xs text-slate-600 mb-2">
                      <span className="font-medium flex items-center gap-1.5">
                        {completude < 100 ? (
                          <>
                            <Sparkles size={13} className="text-amber-500" />
                            Encore {100 - completude}% à compléter
                          </>
                        ) : (
                          <>
                            <Check size={13} className="text-emerald-500" />
                            CV complet !
                          </>
                        )}
                      </span>
                      <span className="font-bold" style={{ color: cvData.parametres.couleurPrincipale }}>{completude}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="h-2 rounded-full transition-all duration-700"
                        style={{ width: `${completude}%`, backgroundColor: cvData.parametres.couleurPrincipale }} />
                    </div>
                  </div>

              {/* Sélecteur de template avec tous les templates */}
              <div className="mb-6">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Template</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { nom: 'classique', label: 'Classique', icon: <FileText size={14} /> },
                      { nom: 'moderne', label: 'Moderne', icon: <Star size={14} /> },
                      { nom: 'professionnel', label: 'Pro', icon: <BriefcaseIcon size={14} /> },
                      { nom: 'sidebar_left', label: 'Sidebar G.', icon: <Layout size={14} className="rotate-90" /> },
                      { nom: 'sidebar_right', label: 'Sidebar D.', icon: <Layout size={14} className="-rotate-90" /> },
                      { nom: 'fancy_header', label: 'Élégant', icon: <Sparkles size={14} /> },
                      { nom: 'developpeur', label: 'Dev', icon: <Code size={14} /> },
                      { nom: 'creatif', label: 'Créatif', icon: <Palette size={14} /> },
                      { nom: 'minimal', label: 'Minimal', icon: <Minus size={14} /> }
                    ].map((template) => (
                      <button
                        key={template.nom}
                        onClick={() => changerTemplate(template.nom)}
                        className={`px-2 py-2.5 rounded-xl text-xs font-semibold transition-all flex flex-col items-center gap-1 border ${
                          cvData.parametres.template === template.nom
                            ? 'text-white border-transparent shadow-sm'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                        }`}
                        style={cvData.parametres.template === template.nom ? { backgroundColor: cvData.parametres.couleurPrincipale } : {}}
                      >
                        <span className={cvData.parametres.template === template.nom ? 'text-white' : 'text-slate-400'}>{template.icon}</span>
                        <span>{template.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sélecteur de couleur */}
                <div className="mt-5">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Couleur principale</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="color"
                        value={cvData.parametres.couleurPrincipale}
                        onChange={(e) => changerCouleurPrincipale(e.target.value)}
                        className="w-12 h-12 rounded-xl cursor-pointer border-0 p-0.5"
                        style={{ background: cvData.parametres.couleurPrincipale }}
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={cvData.parametres.couleurPrincipale}
                        onChange={(e) => changerCouleurPrincipale(e.target.value)}
                        className="input-field font-mono text-sm"
                        placeholder="#6366f1"
                      />
                    </div>
                    <div className="flex gap-1.5">
                      {['#6366f1','#2563eb','#0ea5e9','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899','#0f172a'].map(c => (
                        <button key={c} onClick={() => changerCouleurPrincipale(c)}
                          className="w-6 h-6 rounded-full border-2 transition-all hover:scale-110"
                          style={{ backgroundColor: c, borderColor: cvData.parametres.couleurPrincipale === c ? 'white' : 'transparent',
                            outline: cvData.parametres.couleurPrincipale === c ? `2px solid ${c}` : 'none' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Export/Import buttons */}
                <div className="flex gap-2 mt-5">
                    <button onClick={reinitialiserFormulaire} className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-all">
                      <Trash2 size={13} /> Réinit.
                    </button>
                    <button onClick={() => document.getElementById('fileInput').click()} className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-all">
                      <Folder size={13} /> Importer
                    </button>
                    <input type="file" id="fileInput" accept=".json" onChange={importerJSON} className="hidden" />
                    <button onClick={exporterJSON} className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-all">
                      <Download size={13} /> Exporter
                    </button>
                  </div>
                </div>
              )}

              {/* === ONGLET PROFIL === */}
              {activeTab === 'profil' && (
                <div className="animate-fadeIn space-y-4">
                  {/* Photo */}
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-slate-200 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: cvData.parametres.couleurPrincipale + '40' }}>
                      {cvData.personnel.photo
                        ? <img src={cvData.personnel.photo} className="w-full h-full object-cover" />
                        : <User size={28} className="text-slate-400" />}
                    </div>
                    <div>
                      <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" id="photo-upload" />
                      <label htmlFor="photo-upload" className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all text-white"
                        style={{ backgroundColor: cvData.parametres.couleurPrincipale }}>
                        <Pencil size={12} /> {cvData.personnel.photo ? 'Changer' : 'Ajouter photo'}
                      </label>
                      {cvData.personnel.photo && (
                        <button onClick={() => handleChangementPersonnel('photo', '')} className="ml-2 text-xs text-red-400 hover:text-red-600">Supprimer</button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="label">Nom complet</label>
                      <input type="text" value={cvData.personnel.nomComplet || ''} onChange={(e) => handleChangementPersonnel('nomComplet', e.target.value)} className="input-field" placeholder="Votre nom complet" />
                    </div>
                    <div>
                      <label className="label">Titre / Poste</label>
                      <input type="text" value={cvData.personnel.titrePoste || ''} onChange={(e) => handleChangementPersonnel('titrePoste', e.target.value)} className="input-field" placeholder="Développeur Full-Stack" />
                    </div>
                  </div>

                  <div>
                    <label className="label">Résumé professionnel</label>
                    <textarea value={cvData.personnel.resume || ''} onChange={(e) => handleChangementPersonnel('resume', e.target.value)} rows={3} className="input-field resize-none" placeholder="Décrivez votre profil en quelques phrases..." />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="label flex items-center gap-1"><Mail size={12} /> Email</label>
                      <input type="email" value={cvData.personnel.email || ''} onChange={(e) => handleChangementPersonnel('email', e.target.value)} className="input-field" placeholder="email@exemple.com" />
                    </div>
                    <div>
                      <label className="label flex items-center gap-1"><Phone size={12} /> Téléphone</label>
                      <input type="tel" value={cvData.personnel.telephone || ''} onChange={(e) => handleChangementPersonnel('telephone', e.target.value)} className="input-field" placeholder="+229 01 XX XX XX" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="label flex items-center gap-1"><MapPin size={12} /> Adresse</label>
                      <input type="text" value={cvData.personnel.adresse || ''} onChange={(e) => handleChangementPersonnel('adresse', e.target.value)} className="input-field" placeholder="Ville, Pays" />
                    </div>
                    <div>
                      <label className="label flex items-center gap-1"><Target size={12} /> Permis</label>
                      <input type="text" value={cvData.personnel.permisDeConduire || ''} onChange={(e) => handleChangementPersonnel('permisDeConduire', e.target.value)} className="input-field" placeholder="Permis B" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="label flex items-center gap-1"><Globe size={12} /> Site web</label>
                      <input type="text" value={cvData.personnel.siteWeb || ''} onChange={(e) => handleChangementPersonnel('siteWeb', e.target.value)} className="input-field" placeholder="portfolio.vercel.app" />
                    </div>
                    <div>
                      <label className="label flex items-center gap-1"><Linkedin size={12} /> LinkedIn</label>
                      <input type="text" value={cvData.personnel.linkedin || ''} onChange={(e) => handleChangementPersonnel('linkedin', e.target.value)} className="input-field" placeholder="linkedin.com/in/profil" />
                    </div>
                  </div>

                  <div>
                    <label className="label flex items-center gap-1"><Github size={12} /> GitHub</label>
                    <input type="text" value={cvData.personnel.github || ''} onChange={(e) => handleChangementPersonnel('github', e.target.value)} className="input-field" placeholder="github.com/profil" />
                  </div>
                </div>
              )}



              {/* === ONGLET EXPERIENCES === */}
              {activeTab === 'experience' && (
                <div className="animate-fadeIn">
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndExperiences}>
                    <SortableContext items={cvData.experiences.map(exp => exp.id)} strategy={verticalListSortingStrategy}>
                      <div className="space-y-3">
                        <AnimatePresence>
                          {cvData.experiences.map((exp) => (
                            <motion.div key={exp.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -80 }} transition={{ duration: 0.2 }}>
                              <DraggableItem id={exp.id} onEdit={() => setExperienceEnEdition(exp)} onDelete={() => supprimerExperience(exp.id)}>
                                <div className="font-semibold text-sm text-slate-800">{exp.poste}</div>
                                <div className="text-xs text-slate-500 mt-0.5">{exp.entreprise} • {exp.dateDebut} – {exp.dateFin}</div>
                              </DraggableItem>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </SortableContext>
                  </DndContext>
                  <button onClick={() => setExperienceEnEdition({})} className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: cvData.parametres.couleurPrincipale }}>
                    <Plus size={15} /> Ajouter une expérience
                  </button>
                </div>
              )}



              {/* Section Formations avec Drag & Drop */}

              {/* === ONGLET FORMATIONS === */}
              {activeTab === 'formation' && (
                <div className="animate-fadeIn">
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndFormations}>
                    <SortableContext items={cvData.formations.map(f => f.id)} strategy={verticalListSortingStrategy}>
                      <div className="space-y-3">
                        <AnimatePresence>
                          {cvData.formations.map((formation) => (
                            <motion.div key={formation.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -80 }} transition={{ duration: 0.2 }}>
                              <DraggableItem id={formation.id} onEdit={() => setFormationEnEdition(formation)} onDelete={() => supprimerFormation(formation.id)}>
                                <div className="font-semibold text-sm text-slate-800">{formation.diplome}</div>
                                <div className="text-xs text-slate-500 mt-0.5">{formation.ecole} • {formation.dateDebut} – {formation.dateFin}</div>
                              </DraggableItem>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </SortableContext>
                  </DndContext>
                  <button onClick={() => setFormationEnEdition({})} className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: cvData.parametres.couleurPrincipale }}>
                    <Plus size={15} /> Ajouter une formation
                  </button>
                </div>
              )}

              {/* === ONGLET COMPETENCES === */}
              {activeTab === 'skills' && (
                <div className="animate-fadeIn">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{cvData.competences.length} compétence(s)</span>
                    <SkillSuggestions titre={cvData.personnel.titrePoste} onAddSkill={ajouterCompetenceDepuisSuggestion} />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <AnimatePresence>
                      {cvData.competences.map((competence, index) => (
                        <motion.span key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                          style={{ backgroundColor: hexToRGBA(cvData.parametres.couleurPrincipale, 0.08), color: cvData.parametres.couleurPrincipale, borderColor: hexToRGBA(cvData.parametres.couleurPrincipale, 0.2) }}>
                          {competence}
                          <button onClick={() => supprimerCompetence(index)} className="opacity-60 hover:opacity-100 hover:text-red-500 transition-all">
                            <X size={12} />
                          </button>
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={nouvelleCompetence} onChange={(e) => setNouvelleCompetence(e.target.value)}
                      onKeyPress={handleToucheEntree} placeholder="Ex: React.js, Python..." className="input-field flex-1" />
                    <button onClick={ajouterCompetence} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 active:scale-95 transition-all"
                      style={{ backgroundColor: cvData.parametres.couleurPrincipale }}>
                      <Plus size={14} /> Ajouter
                    </button>
                  </div>
                </div>
              )}

              {/* === ONGLET LANGUES === */}
              {activeTab === 'langues' && (
                <div className="animate-fadeIn">
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndLangues}>
                    <SortableContext items={cvData.langues.map(l => l.id)} strategy={verticalListSortingStrategy}>
                      <div className="space-y-3">
                        <AnimatePresence>
                          {cvData.langues.map((langue) => (
                            <motion.div key={langue.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -80 }} transition={{ duration: 0.2 }}>
                              <DraggableItem id={langue.id} onEdit={() => setLangueEnEdition(langue)} onDelete={() => supprimerLangue(langue.id)}>
                                <div className="font-semibold text-sm text-slate-800">{langue.nom}</div>
                                <div className="text-xs text-slate-500">{langue.niveau}</div>
                              </DraggableItem>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </SortableContext>
                  </DndContext>
                  <button onClick={() => setLangueEnEdition({})} className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: cvData.parametres.couleurPrincipale }}>
                    <Plus size={15} /> Ajouter une langue
                  </button>
                </div>
              )}

              {/* === ONGLET AUTRES (Certifications + Centres intérêt + Projets) === */}
              {activeTab === 'autres' && (
                <div className="animate-fadeIn space-y-8">

                  {/* Certifications */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Award size={16} style={{ color: cvData.parametres.couleurPrincipale }} />
                      <h3 className="text-sm font-bold text-slate-700">Certifications</h3>
                      <span className="ml-auto text-xs text-slate-400">{cvData.certifications.length}</span>
                    </div>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndCertifications}>
                      <SortableContext items={cvData.certifications.map(c => c.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-2">
                          <AnimatePresence>
                            {cvData.certifications.map((cert) => (
                              <motion.div key={cert.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -80 }} transition={{ duration: 0.2 }}>
                                <DraggableItem id={cert.id} onEdit={() => setCertificationEnEdition(cert)} onDelete={() => supprimerCertification(cert.id)}>
                                  <div className="font-semibold text-sm text-slate-800">{cert.nom}</div>
                                  <div className="text-xs text-slate-500">{cert.organisme} • {cert.date}</div>
                                </DraggableItem>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </SortableContext>
                    </DndContext>
                    <button onClick={() => setCertificationEnEdition({})} className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border-2 border-dashed border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-600 transition-all w-full justify-center">
                      <Plus size={13} /> Ajouter une certification
                    </button>
                  </div>

                  {/* Centres d'intérêt */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Heart size={16} style={{ color: cvData.parametres.couleurPrincipale }} />
                      <h3 className="text-sm font-bold text-slate-700">Centres d'intérêt</h3>
                      <span className="ml-auto text-xs text-slate-400">{cvData.centresInteret.length}</span>
                    </div>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndCentresInteret}>
                      <SortableContext items={cvData.centresInteret.map(c => c.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-2">
                          <AnimatePresence>
                            {cvData.centresInteret.map((centre) => (
                              <motion.div key={centre.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -80 }} transition={{ duration: 0.2 }}>
                                <DraggableItem id={centre.id} onEdit={() => setCentreInteretEnEdition(centre)} onDelete={() => supprimerCentreInteret(centre.id)}>
                                  <div className="font-semibold text-sm text-slate-800">{centre.nom}</div>
                                </DraggableItem>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </SortableContext>
                    </DndContext>
                    <button onClick={() => setCentreInteretEnEdition({})} className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border-2 border-dashed border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-600 transition-all w-full justify-center">
                      <Plus size={13} /> Ajouter un centre d'intérêt
                    </button>
                  </div>

                  {/* Projets */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Folder size={16} style={{ color: cvData.parametres.couleurPrincipale }} />
                      <h3 className="text-sm font-bold text-slate-700">Projets</h3>
                      <span className="ml-auto text-xs text-slate-400">{cvData.projets.length}</span>
                    </div>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndProjets}>
                      <SortableContext items={cvData.projets.map(p => p.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-2">
                          <AnimatePresence>
                            {cvData.projets.map((projet) => (
                              <motion.div key={projet.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -80 }} transition={{ duration: 0.2 }}>
                                <DraggableItem id={projet.id} onEdit={() => setProjetEnEdition(projet)} onDelete={() => supprimerProjet(projet.id)}>
                                  <div className="font-semibold text-sm text-slate-800">{projet.nom}</div>
                                  <div className="text-xs text-slate-500 mt-0.5">{projet.description}</div>
                                </DraggableItem>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </SortableContext>
                    </DndContext>
                    <button onClick={() => setProjetEnEdition({})} className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border-2 border-dashed border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-600 transition-all w-full justify-center">
                      <Plus size={13} /> Ajouter un projet
                    </button>
                  </div>
                </div>
              )}

              {erreurImport && (
                <div className="mt-3 text-xs text-red-500 flex items-center gap-1 p-2 bg-red-50 rounded-xl">
                  <AlertCircle size={13} /> {erreurImport}
                </div>
              )}

              </div> {/* fin contenu onglets */}
            </div> {/* fin panneau gauche */}






            {/* Côté droit - Prévisualisation avec tous les templates */}
            <motion.div
              className={`w-full lg:w-1/2 bg-white rounded-lg shadow-sm p-6 max-h-screen lg:max-h-[calc(100vh-120px)] overflow-y-auto
                ${mobileView === 'edit' ? 'hidden lg:block' : 'block'}`}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2">
                <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <Menu size={18} /> Prévisualisation
                </h2>
                <motion.button
                  onClick={exporterPDF}
                  disabled={enTrainDeGenererPDF}
                  className="px-4 py-2 text-white rounded-md hover:opacity-90 flex items-center gap-2 text-sm shadow-sm"
                  style={{ backgroundColor: cvData.parametres.couleurPrincipale }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {enTrainDeGenererPDF ? (
                    <>⏳ Génération...</>
                  ) : (
                    <>
                      <Download size={16} /> Télécharger PDF
                    </>
                  )}
                </motion.button>
              </div>

              {/* Prévisualisation complète du CV avec tous les templates */}
              <div ref={cvRef} id="cv-preview-export" className={stylesPreview.conteneur}>
                {/* Layout spécial pour Sidebar Left */}
                {cvData.parametres.template === 'sidebar_left' && (
                  <>
                    <div className={stylesPreview.sidebar} style={{ backgroundColor: cvData.parametres.couleurPrincipale === '#2563eb' ? '#111827' : cvData.parametres.couleurPrincipale }}>
                      {/* Photo */}
                      <div className="w-24 h-24 rounded-full border-4 border-white/20 overflow-hidden mb-4 bg-white/10 flex items-center justify-center">
                        {cvData.personnel.photo ? (
                          <img src={cvData.personnel.photo} className="w-full h-full object-cover" />
                        ) : (
                          <User size={40} className="text-white/30" />
                        )}
                      </div>
                      <TextRenderer data={cvData} styles={stylesPreview} section="sidebar" />
                    </div>
                    <div className={stylesPreview.main}>
                      <TextRenderer data={cvData} styles={stylesPreview} section="main" />
                    </div>
                  </>
                )}

                {/* Layout spécial pour Sidebar Right */}
                {cvData.parametres.template === 'sidebar_right' && (
                  <>
                    <div className={stylesPreview.main}>
                      <TextRenderer data={cvData} styles={stylesPreview} section="header" />
                      <TextRenderer data={cvData} styles={stylesPreview} section="main" />
                    </div>
                    <div className={stylesPreview.sidebar}>
                      <div className="w-full aspect-square rounded-xl overflow-hidden mb-6 bg-gray-200 flex items-center justify-center border-4 border-white shadow-sm">
                        {cvData.personnel.photo ? (
                          <img src={cvData.personnel.photo} className="w-full h-full object-cover" />
                        ) : (
                          <User size={40} className="text-gray-400" />
                        )}
                      </div>
                      <TextRenderer data={cvData} styles={stylesPreview} section="sidebar" />
                    </div>
                  </>
                )}

                {/* Layout spécial pour Fancy Header */}
                {cvData.parametres.template === 'fancy_header' && (
                  <>
                    <div className={stylesPreview.header} style={{ backgroundColor: cvData.parametres.couleurPrincipale }}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h1 className={stylesPreview.nom}>{cvData.personnel.nomComplet}</h1>
                          <p className={stylesPreview.titre}>{cvData.personnel.titrePoste}</p>
                          <div className={stylesPreview.contact}>
                            {cvData.personnel.email && <span className="flex items-center gap-1"><Mail size={12} /> {cvData.personnel.email}</span>}
                            {cvData.personnel.telephone && <span className="flex items-center gap-1"><Phone size={12} /> {cvData.personnel.telephone}</span>}
                            {cvData.personnel.adresse && <span className="flex items-center gap-1"><MapPin size={12} /> {cvData.personnel.adresse}</span>}
                          </div>
                        </div>
                        <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden shadow-2xl rotate-3">
                          {cvData.personnel.photo ? (
                            <img src={cvData.personnel.photo} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-white/20 flex items-center justify-center"><User size={40} /></div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={stylesPreview.body}>
                      <TextRenderer data={cvData} styles={stylesPreview} section="full" />
                    </div>
                  </>
                )}

                {/* Layouts existants (Moderne, Classique, etc.) */}
                {!['sidebar_left', 'sidebar_right', 'fancy_header'].includes(cvData.parametres.template) && (
                  <div className="w-full">
                    {/* ... (Reste du code existant pour les autres templates, adapté) */}
                    <DefaultRenderer data={cvData} styles={stylesPreview} />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Composants PWA */}
        <PWAInstallPrompt />
        <UpdateNotification />
      </motion.div>
    </>
  );
}

export default App;