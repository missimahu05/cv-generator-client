import React, { useState, useRef } from 'react';
import {
  Printer,
  Sparkles,
  Layout,
  User,
  GraduationCap,
  Briefcase,
  Code,
  Award,
  Plus,
  Trash2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  QrCode,
  MapPin,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Car,
  Image as ImageIcon
} from 'lucide-react';

// QR Code Data URI par défaut (Portfolio Jolidon)
const DEFAULT_QR_CODE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWAQMAAAAGz+OhAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABIUlEQVRIib2WSw6DMAxEJ8oiS47AUbhYVcjNOEqO0GUWUd2x039ZNrYQgrdhcMaTAAe1CmuPlwVzrrO+1L+zE78z7cQEdd6A4MQmadNTSxbJnqxN/PkN7oxapIQffSPZo/dJrvhej4Gse41y6rf/xrJeUR/Pn9M0llFLs/Yn2VI583JjwBL1HkyOG9sfWq6pBClrdWFU0QC5QAeLNldFHowGj5qd4EwnUbv9n3GOCO55hb6+LsyGl3LAISqr9dmJqRb6au4NCG6MprLIyhoaGlkerJew9+Df08/wYfecBPo+aG3wYH1fiGL5rFqCE7PQ4Pyq0bT32ZM1LBrOuuzmAz8Ge0N6O4OMZdZ73X9haf1aj7Gse429131Q3s8CY9lB3QDb/cmb/SRBAQAAAABJRU5ErkJggg==";

// Données initiales authentiques de Jolidon
const INITIAL_CV_DATA = {
  personnel: {
    nomComplet: "Jolidon Missimahu HOUNGUE",
    titrePoste: "Informatique de Gestion & Conception d'Applications Web",
    sousTitre: "Compétences transversales en Gestion Comptable, Design UI/UX et Sécurité Informatique",
    email: "jolidonhoungue30@gmail.com",
    telephone: "+229 01 51 85 24 20",
    adresse: "Cotonou / Parakou, Bénin",
    portfolio: "https://jolidonhoungue.pages.dev",
    linkedin: "https://linkedin.com/in/jolidon-houngue",
    permis: "Permis B et A2",
    langues: "Français (Courant) • Anglais (Professionnel)",
    photo: "/photo_jolidon.jpg",
    qrCode: DEFAULT_QR_CODE,
    qrLabel: "Scannez pour voir mon Portfolio"
  },
  profil: "Titulaire d'une Licence en Informatique de Gestion avec une solide formation de base en comptabilité (Bac G2 & CAP Aide Comptable). J'associe la rigueur de la gestion financière à la création de sites internet, au design d'interfaces (UI/UX) et à la sécurité informatique. Polyvalent et méthodique, je m'implique avec sérieux dans les missions qui me sont confiées.",
  formations: [
    {
      id: "f1",
      diplome: "Licence en Informatique de Gestion",
      ecole: "Institut Universitaire de Technologie (IUT) de Parakou — Université de Parakou",
      details: "Gestion des systèmes d'information, comptabilité générale & financière, bases de données, génie logiciel."
    },
    {
      id: "f2",
      diplome: "Baccalauréat G2 (Techniques Quantitatives de Gestion)",
      ecole: "Enseignement Secondaire Technique",
      details: "Comptabilité d'entreprise, calculs financiers, mathématiques appliquées, économie et droit."
    },
    {
      id: "f3",
      diplome: "CAP Aide Comptable",
      ecole: "Formation Professionnelle Comptable",
      details: "Enregistrement des opérations comptables, gestion des pièces justificatives, rapprochements bancaires."
    }
  ],
  projets: [
    {
      id: "p1",
      titre: "Mouvement Patriotique du Bénin (MPB)",
      lien: "https://mouvementpatriotiquedubenin.netlify.app",
      role: "Site officiel & Espace Membres",
      sousTitre: "Plateforme web multi-pages d'information et d'engagement citoyen",
      points: [
        "Création d'un portail complet multi-pages : actualités, communiqués, galerie médias et programme citoyen.",
        "Formulaire d'adhésion en ligne sécurisé avec tableau de bord pour l'enregistrement et le suivi dynamique des membres.",
        "Conception graphique et adaptation ergonomique pour une utilisation fluide sur mobile et ordinateur."
      ]
    },
    {
      id: "p2",
      titre: "ONG BUSOLA (Plateforme Numérique & Administration)",
      lien: "https://busolaong.com",
      role: "Projet soutenu en Licence",
      sousTitre: "Site institutionnel multi-pages et panneau d'administration privé",
      points: [
        "Développement du site officiel présentant les activités humanitaires, les projets et les rapports d'action.",
        "Espace d'administration privé permettant à l'équipe de mettre à jour les contenus et de suivre les dons reçus.",
        "Projet mené de bout en bout et soutenu avec succès devant le jury académique de l'IUT de Parakou."
      ]
    },
    {
      id: "p3",
      titre: "TontineRandom — Gestion d'Épargne & Cotisations",
      lien: "",
      role: "Application Web & Mobile",
      sousTitre: "Solution informatisée pour la gestion transparente des tontines rotatives",
      points: [
        "Automatisation du calendrier des versements, du suivi des cotisations et du calcul des montants à percevoir.",
        "Validation instantanée par code QR pour certifier et sécuriser les versements effectués par les participants."
      ]
    }
  ],
  competences: [
    {
      id: "c1",
      titre: "Gestion & Comptabilité",
      description: "Comptabilité générale, tenue des livres, rapprochement bancaire, modélisation de données."
    },
    {
      id: "c2",
      titre: "Création de Sites & Applications",
      description: "Développement web (React, Node.js, JavaScript, Tailwind, HTML/CSS), mise en ligne & maintenance."
    },
    {
      id: "c3",
      titre: "Design Graphique & UI/UX",
      description: "Conception visuelle, maquettes épurées, ergonomie des écrans, identité et chartes graphiques."
    },
    {
      id: "c4",
      titre: "Sécurité Informatique & Systèmes",
      description: "Gestion des accès et mots de passe, sécurisation des formulaires, environnement Linux."
    }
  ],
  parametres: {
    template: "femi_epure", // femi_epure | executive_royal | minimal_chic | sidebar_sombre | classique_pro
    couleur: "#0284c7"
  }
};

// Modèles / Canevas disponibles
const TEMPLATES = [
  { id: "femi_epure", nom: "Épuré & Aéré (Fèmi)", icon: <Sparkles size={14} />, desc: "Fond blanc sobre, photo ronde, ligne cyan, calibré 1 page" },
  { id: "executive_royal", nom: "Executive Royal", icon: <Layout size={14} />, desc: "En-tête bleu dégradé, médaillon photo, look corporate" },
  { id: "minimal_chic", nom: "Minimaliste Chic", icon: <Award size={14} />, desc: "Noir & blanc élégant, typographie fine et aérée" },
  { id: "sidebar_sombre", nom: "Sidebar Sombre", icon: <Briefcase size={14} />, desc: "Colonne latérale ardoise foncée, corps blanc contrasté" },
  { id: "classique_pro", nom: "Classique Institutionnel", icon: <GraduationCap size={14} />, desc: "Structure centrée sobre et traditionnelle" }
];

// Nuancier de couleurs d'accentuation
const COULEURS = [
  { hex: "#0284c7", label: "Bleu Ciel (Fèmi)" },
  { hex: "#1d4ed8", label: "Bleu Royal" },
  { hex: "#057a55", label: "Vert Émeraude" },
  { hex: "#475569", label: "Gris Ardoise" },
  { hex: "#7c3aed", label: "Violet Élégant" },
  { hex: "#b45309", label: "Ambre Chaud" }
];

export default function App() {
  const [cvData, setCvData] = useState(INITIAL_CV_DATA);
  const [activeTab, setActiveTab] = useState("infos");
  const [zoomLevel, setZoomLevel] = useState(88); // 88% = vue confortable de la page A4 entière
  const photoInputRef = useRef(null);

  // Mise à jour imbriquée simple
  const updatePersonnel = (champ, valeur) => {
    setCvData(prev => ({
      ...prev,
      personnel: { ...prev.personnel, [champ]: valeur }
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updatePersonnel("photo", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Gestion des Formations
  const updateFormation = (id, champ, valeur) => {
    setCvData(prev => ({
      ...prev,
      formations: prev.formations.map(f => f.id === id ? { ...f, [champ]: valeur } : f)
    }));
  };

  const addFormation = () => {
    const newId = "f_" + Date.now();
    setCvData(prev => ({
      ...prev,
      formations: [...prev.formations, { id: newId, diplome: "Nouveau Diplôme", ecole: "Établissement / Université", details: "Détails de la formation..." }]
    }));
  };

  const removeFormation = (id) => {
    setCvData(prev => ({
      ...prev,
      formations: prev.formations.filter(f => f.id !== id)
    }));
  };

  // Gestion des Projets
  const updateProjet = (id, champ, valeur) => {
    setCvData(prev => ({
      ...prev,
      projets: prev.projets.map(p => p.id === id ? { ...p, [champ]: valeur } : p)
    }));
  };

  const updateProjetPoint = (projetId, index, valeur) => {
    setCvData(prev => ({
      ...prev,
      projets: prev.projets.map(p => {
        if (p.id !== projetId) return p;
        const newPoints = [...p.points];
        newPoints[index] = valeur;
        return { ...p, points: newPoints };
      })
    }));
  };

  const addProjet = () => {
    const newId = "p_" + Date.now();
    setCvData(prev => ({
      ...prev,
      projets: [...prev.projets, {
        id: newId,
        titre: "Nouveau Projet / Réalisation",
        lien: "",
        role: "Rôle ou Contexte",
        sousTitre: "Description brève",
        points: ["Description concrète de la réalisation."]
      }]
    }));
  };

  const removeProjet = (id) => {
    setCvData(prev => ({
      ...prev,
      projets: prev.projets.filter(p => p.id !== id)
    }));
  };

  // Gestion des Compétences
  const updateCompetence = (id, champ, valeur) => {
    setCvData(prev => ({
      ...prev,
      competences: prev.competences.map(c => c.id === id ? { ...c, [champ]: valeur } : c)
    }));
  };

  // Fonction d'impression native vectorielle A4 (100% fidèle et net)
  const imprimerCV = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">

      {/* TOPBAR / NAVBAR (MASQUÉE EN MODE IMPRESSION) */}
      <nav className="no-print bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-40 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
            JJ
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight text-slate-900 flex items-center gap-2">
              Jj's CV Generator
              <span className="bg-sky-100 text-sky-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                1-Page A4 Precision
              </span>
            </h1>
            <p className="text-xs text-slate-500">Générateur vectoriel haute fidélité</p>
          </div>
        </div>

        {/* Contrôles du Canevas & Actions */}
        <div className="flex items-center gap-3">
          {/* Zoom */}
          <div className="flex items-center bg-slate-100 rounded-lg p-1 text-xs">
            <button onClick={() => setZoomLevel(z => Math.max(60, z - 8))} className="p-1 hover:bg-white rounded transition" title="Zoom -">
              <ZoomOut size={15} />
            </button>
            <span className="px-2 font-semibold text-slate-600">{zoomLevel}%</span>
            <button onClick={() => setZoomLevel(z => Math.min(120, z + 8))} className="p-1 hover:bg-white rounded transition" title="Zoom +">
              <ZoomIn size={15} />
            </button>
            <button onClick={() => setZoomLevel(88)} className="p-1 hover:bg-white rounded text-slate-500 transition" title="Réinitialiser le zoom">
              <RotateCcw size={13} />
            </button>
          </div>

          {/* Bouton d'impression vectorielle A4 */}
          <button
            onClick={imprimerCV}
            className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Printer size={16} />
            <span>Imprimer / Télécharger PDF</span>
          </button>
        </div>
      </nav>

      {/* CONTENEUR PRINCIPAL 2 COLONNES (ÉDITEUR À GAUCHE, FEUILLE A4 À DROITE) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* PANNEAU GAUCHE : ÉDITEUR (MASQUÉ À L'IMPRESSION) */}
        <div className="no-print w-full lg:w-[460px] xl:w-[500px] bg-white border-r border-slate-200 flex flex-col h-[calc(100vh-61px)] overflow-hidden">

          {/* Onglets de sections */}
          <div className="flex border-b border-slate-200 bg-slate-50 p-1.5 gap-1 overflow-x-auto text-xs font-medium">
            {[
              { id: "canevas", label: "Canevas", icon: <Layout size={13} /> },
              { id: "infos", label: "Infos", icon: <User size={13} /> },
              { id: "formations", label: "Diplômes", icon: <GraduationCap size={13} /> },
              { id: "projets", label: "Projets", icon: <Briefcase size={13} /> },
              { id: "competences", label: "Compétences", icon: <Code size={13} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white text-sky-700 font-bold shadow-sm border border-slate-200/80"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Corps de formulaire déroulant */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">

            {/* TAB 1 : CHOIX DU CANEVAS & COULEUR */}
            {activeTab === "canevas" && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-800 uppercase tracking-wide text-[11px] mb-2">Choisir un canevas (Template)</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {TEMPLATES.map(t => (
                      <div
                        key={t.id}
                        onClick={() => setCvData(prev => ({ ...prev, parametres: { ...prev.parametres, template: t.id } }))}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                          cvData.parametres.template === t.id
                            ? "border-sky-500 bg-sky-50/50 shadow-sm ring-2 ring-sky-200"
                            : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${cvData.parametres.template === t.id ? "bg-sky-600 text-white" : "bg-white text-slate-600 shadow-xs"}`}>
                          {t.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-slate-800 text-xs">{t.nom}</div>
                          <div className="text-[11px] text-slate-500">{t.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sélecteur de couleur */}
                <div className="pt-2 border-t border-slate-200">
                  <h3 className="font-bold text-slate-800 uppercase tracking-wide text-[11px] mb-2">Couleur d'accentuation</h3>
                  <div className="flex flex-wrap gap-2">
                    {COULEURS.map(c => (
                      <button
                        key={c.hex}
                        onClick={() => setCvData(prev => ({ ...prev, parametres: { ...prev.parametres, couleur: c.hex } }))}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition ${
                          cvData.parametres.couleur === c.hex ? "border-slate-800 ring-2 ring-slate-300" : "border-slate-200"
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: c.hex }}></span>
                        <span>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2 : INFOS PERSONNELLES & PROFIL */}
            {activeTab === "infos" && (
              <div className="space-y-3">
                {/* Photo Upload */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-sky-400 bg-white flex-shrink-0">
                    {cvData.personnel.photo ? (
                      <img src={cvData.personnel.photo} alt="Photo" className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400"><User size={20} /></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800 mb-1">Photo d'identité</div>
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 inline-flex items-center gap-1.5"
                    >
                      <ImageIcon size={13} /> Changer la photo
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Nom Complet</label>
                  <input
                    type="text"
                    value={cvData.personnel.nomComplet}
                    onChange={(e) => updatePersonnel("nomComplet", e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Titre Professionnel</label>
                  <input
                    type="text"
                    value={cvData.personnel.titrePoste}
                    onChange={(e) => updatePersonnel("titrePoste", e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Sous-titre / Spécialités</label>
                  <input
                    type="text"
                    value={cvData.personnel.sousTitre}
                    onChange={(e) => updatePersonnel("sousTitre", e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Email</label>
                    <input
                      type="email"
                      value={cvData.personnel.email}
                      onChange={(e) => updatePersonnel("email", e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Téléphone</label>
                    <input
                      type="text"
                      value={cvData.personnel.telephone}
                      onChange={(e) => updatePersonnel("telephone", e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Portfolio (Site web)</label>
                    <input
                      type="text"
                      value={cvData.personnel.portfolio}
                      onChange={(e) => updatePersonnel("portfolio", e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">LinkedIn</label>
                    <input
                      type="text"
                      value={cvData.personnel.linkedin}
                      onChange={(e) => updatePersonnel("linkedin", e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Permis de conduire</label>
                    <input
                      type="text"
                      value={cvData.personnel.permis}
                      onChange={(e) => updatePersonnel("permis", e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Localisation</label>
                    <input
                      type="text"
                      value={cvData.personnel.adresse}
                      onChange={(e) => updatePersonnel("adresse", e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Texte du Profil / Accroche</label>
                  <textarea
                    rows={4}
                    value={cvData.profil}
                    onChange={(e) => setCvData(prev => ({ ...prev, profil: e.target.value }))}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs resize-none"
                  />
                </div>
              </div>
            )}

            {/* TAB 3 : FORMATIONS & DIPLOMES */}
            {activeTab === "formations" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">Parcours & Diplômes</h3>
                  <button
                    onClick={addFormation}
                    className="px-2.5 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg font-bold text-[11px] inline-flex items-center gap-1"
                  >
                    <Plus size={13} /> Ajouter
                  </button>
                </div>

                {cvData.formations.map((f, idx) => (
                  <div key={f.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative group">
                    <button
                      onClick={() => removeFormation(f.id)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-600 p-1"
                      title="Supprimer"
                    >
                      <Trash2 size={13} />
                    </button>
                    <div>
                      <label className="block font-semibold text-slate-500 text-[10px]">Diplôme</label>
                      <input
                        type="text"
                        value={f.diplome}
                        onChange={(e) => updateFormation(f.id, "diplome", e.target.value)}
                        className="w-full p-1.5 border border-slate-300 rounded text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-500 text-[10px]">Établissement / École</label>
                      <input
                        type="text"
                        value={f.ecole}
                        onChange={(e) => updateFormation(f.id, "ecole", e.target.value)}
                        className="w-full p-1.5 border border-slate-300 rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-500 text-[10px]">Détails & Compétences acquises</label>
                      <input
                        type="text"
                        value={f.details}
                        onChange={(e) => updateFormation(f.id, "details", e.target.value)}
                        className="w-full p-1.5 border border-slate-300 rounded text-xs text-slate-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4 : RÉALISATIONS & PROJETS */}
            {activeTab === "projets" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">Projets & Réalisations</h3>
                  <button
                    onClick={addProjet}
                    className="px-2.5 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg font-bold text-[11px] inline-flex items-center gap-1"
                  >
                    <Plus size={13} /> Ajouter
                  </button>
                </div>

                {cvData.projets.map((p) => (
                  <div key={p.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative group">
                    <button
                      onClick={() => removeProjet(p.id)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-600 p-1"
                      title="Supprimer"
                    >
                      <Trash2 size={13} />
                    </button>
                    <div>
                      <label className="block font-semibold text-slate-500 text-[10px]">Titre du Projet</label>
                      <input
                        type="text"
                        value={p.titre}
                        onChange={(e) => updateProjet(p.id, "titre", e.target.value)}
                        className="w-full p-1.5 border border-slate-300 rounded text-xs font-semibold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-semibold text-slate-500 text-[10px]">Lien du site (optionnel)</label>
                        <input
                          type="text"
                          value={p.lien}
                          onChange={(e) => updateProjet(p.id, "lien", e.target.value)}
                          className="w-full p-1.5 border border-slate-300 rounded text-xs"
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-500 text-[10px]">Rôle / Statut</label>
                        <input
                          type="text"
                          value={p.role}
                          onChange={(e) => updateProjet(p.id, "role", e.target.value)}
                          className="w-full p-1.5 border border-slate-300 rounded text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-500 text-[10px]">Sous-titre descriptif</label>
                      <input
                        type="text"
                        value={p.sousTitre}
                        onChange={(e) => updateProjet(p.id, "sousTitre", e.target.value)}
                        className="w-full p-1.5 border border-slate-300 rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-500 text-[10px] mb-1">Points clés & Missions</label>
                      {p.points.map((pt, pIdx) => (
                        <input
                          key={pIdx}
                          type="text"
                          value={pt}
                          onChange={(e) => updateProjetPoint(p.id, pIdx, e.target.value)}
                          className="w-full p-1.5 border border-slate-300 rounded text-xs mb-1"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 5 : COMPÉTENCES & QR CODE */}
            {activeTab === "competences" && (
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">Compétences (4 Catégories Aérées)</h3>
                {cvData.competences.map((c) => (
                  <div key={c.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                    <input
                      type="text"
                      value={c.titre}
                      onChange={(e) => updateCompetence(c.id, "titre", e.target.value)}
                      className="w-full p-1.5 border border-slate-300 rounded text-xs font-bold text-slate-800"
                    />
                    <textarea
                      rows={2}
                      value={c.description}
                      onChange={(e) => updateCompetence(c.id, "description", e.target.value)}
                      className="w-full p-1.5 border border-slate-300 rounded text-xs text-slate-600 resize-none"
                    />
                  </div>
                ))}

                <div className="pt-2 border-t border-slate-200">
                  <h3 className="font-bold text-slate-800 uppercase tracking-wide text-[11px] mb-1">Code QR en bas du CV</h3>
                  <label className="block font-semibold text-slate-500 text-[10px] mb-1">Libellé d'invitation</label>
                  <input
                    type="text"
                    value={cvData.personnel.qrLabel}
                    onChange={(e) => updatePersonnel("qrLabel", e.target.value)}
                    className="w-full p-1.5 border border-slate-300 rounded text-xs"
                  />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* PANNEAU DROIT : PRÉVISUALISATION DIRECTE FEUILLE A4 (LA VRAIE VUE AVANT DE TIRER) */}
        <div className="preview-container flex-1 bg-slate-200/90 overflow-auto flex items-start justify-center p-4 lg:p-8">
          
          <div
            className="preview-scale-wrapper"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top center",
              transition: "transform 0.15s ease-out"
            }}
          >
            {/* FEUILLE A4 STRICTE (210mm x 297mm) */}
            <div
              id="cv-preview-export"
              className="a4-sheet bg-white shadow-2xl relative overflow-hidden"
              style={{
                width: "210mm",
                height: "296.5mm",
                maxHeight: "296.5mm",
                boxSizing: "border-box"
              }}
            >
              {/* RENDU SELON LE CANEVAS CHOISI */}
              {cvData.parametres.template === "femi_epure" && (
                <RenderFemiEpure data={cvData} couleur={cvData.parametres.couleur} />
              )}
              {cvData.parametres.template === "executive_royal" && (
                <RenderExecutiveRoyal data={cvData} couleur={cvData.parametres.couleur} />
              )}
              {cvData.parametres.template === "minimal_chic" && (
                <RenderMinimalChic data={cvData} couleur={cvData.parametres.couleur} />
              )}
              {cvData.parametres.template === "sidebar_sombre" && (
                <RenderSidebarSombre data={cvData} couleur={cvData.parametres.couleur} />
              )}
              {cvData.parametres.template === "classique_pro" && (
                <RenderClassiquePro data={cvData} couleur={cvData.parametres.couleur} />
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

/* ==============================================================================
   CANEVAS 1 : ÉPURÉ & AÉRÉ (STYLE FÈMI) - LE PRÉFÉRÉ DE L'UTILISATEUR
============================================================================== */
function RenderFemiEpure({ data, couleur }) {
  return (
    <div className="w-full h-full flex flex-row overflow-hidden font-sans text-slate-800 text-[11.2px] leading-[1.38]">
      {/* SIDEBAR GAUCHE (31%) */}
      <div className="w-[31%] bg-slate-50 border-r border-slate-200 p-[18px_16px_14px] flex flex-col gap-3" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
        {/* Photo ronde */}
        <div className="flex flex-col items-center">
          <div
            className="w-[90px] h-[90px] rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center relative"
            style={{ border: `3px solid #e0f2fe`, outline: `2px solid ${couleur}` }}
          >
            {data.personnel.photo ? (
              <img src={data.personnel.photo} alt="Photo" className="w-full h-full object-cover object-[center_25%]" />
            ) : (
              <User size={36} className="text-slate-300" />
            )}
          </div>
        </div>

        {/* Profil */}
        <div>
          <h2 className="font-extrabold uppercase text-[11px] pb-1 mb-1.5 tracking-wider" style={{ color: couleur, borderBottom: `1.5px solid ${couleur}` }}>
            Profil
          </h2>
          <p className="text-[10.5px] leading-[1.42] text-slate-700 text-justify">
            {data.profil}
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-extrabold uppercase text-[11px] pb-1 mb-1.5 tracking-wider" style={{ color: couleur, borderBottom: `1.5px solid ${couleur}` }}>
            Contact
          </h2>
          <div className="flex flex-col gap-1.5 text-[10.5px]">
            <div>
              <span className="font-bold text-slate-400 text-[9.5px] uppercase block">Téléphone</span>
              <span className="font-semibold text-slate-800">{data.personnel.telephone}</span>
            </div>
            <div>
              <span className="font-bold text-slate-400 text-[9.5px] uppercase block">Email</span>
              <span className="font-semibold text-slate-800">{data.personnel.email}</span>
            </div>
            <div>
              <span className="font-bold text-slate-400 text-[9.5px] uppercase block">Portfolio</span>
              <span className="font-semibold truncate block" style={{ color: couleur }}>{data.personnel.portfolio.replace('https://', '')}</span>
            </div>
            <div>
              <span className="font-bold text-slate-400 text-[9.5px] uppercase block">LinkedIn</span>
              <span className="font-semibold text-slate-800">{data.personnel.linkedin.replace('https://linkedin.com/in/', 'in/')}</span>
            </div>
            <div>
              <span className="font-bold text-slate-400 text-[9.5px] uppercase block">Localisation</span>
              <span className="font-semibold text-slate-800">{data.personnel.adresse}</span>
            </div>
          </div>
        </div>

        {/* Mobilité & Langues */}
        <div>
          <h2 className="font-extrabold uppercase text-[11px] pb-1 mb-1.5 tracking-wider" style={{ color: couleur, borderBottom: `1.5px solid ${couleur}` }}>
            Mobilité & Langues
          </h2>
          <div className="text-[10.5px] space-y-1 text-slate-700">
            <div><strong>Permis :</strong> {data.personnel.permis}</div>
            <div><strong>Langues :</strong> {data.personnel.langues}</div>
          </div>
        </div>

        {/* Code QR en bas */}
        <div className="mt-auto bg-white border border-slate-300 rounded-lg p-2 text-center flex flex-col items-center gap-1 shadow-2xs">
          <img src={data.personnel.qrCode} alt="QR Code" className="w-[66px] h-[66px] rounded" />
          <div className="text-[9px] font-bold" style={{ color: couleur }}>{data.personnel.qrLabel}</div>
        </div>
      </div>

      {/* COLONNE DROITE (69%) */}
      <main className="w-[69%] p-[20px_22px_14px_20px] flex flex-col gap-2.5">
        {/* En-tête principal blanc sobre */}
        <header className="border-b border-slate-200 pb-2">
          <h1 className="text-[22px] font-black uppercase text-slate-900 tracking-tight leading-tight">
            {data.personnel.nomComplet}
          </h1>
          <div className="text-[13px] font-bold leading-snug" style={{ color: couleur }}>
            {data.personnel.titrePoste}
          </div>
          <div className="text-[10.8px] text-slate-500 font-medium">
            {data.personnel.sousTitre}
          </div>
        </header>

        {/* Formation */}
        <section>
          <h2 className="font-extrabold uppercase text-[11px] pb-1 mb-1.5 tracking-wider" style={{ color: couleur, borderBottom: `1.5px solid ${couleur}` }}>
            Formation
          </h2>
          <div className="space-y-1.5">
            {data.formations.map(f => (
              <div key={f.id}>
                <div className="font-bold text-slate-900 text-[11.5px]">{f.diplome}</div>
                <div className="font-semibold text-[10.5px]" style={{ color: couleur }}>{f.ecole}</div>
                <div className="text-slate-500 text-[10px] leading-tight">{f.details}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Réalisations & Projets */}
        <section>
          <h2 className="font-extrabold uppercase text-[11px] pb-1 mb-1.5 tracking-wider" style={{ color: couleur, borderBottom: `1.5px solid ${couleur}` }}>
            Réalisations & Projets Principaux
          </h2>
          <div className="space-y-2">
            {data.projets.map(p => (
              <div key={p.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-[12px] flex items-center gap-1.5">
                    {p.titre}
                    {p.lien && (
                      <span className="text-[9.5px] underline font-medium" style={{ color: couleur }}>
                        {p.lien.replace('https://', '')}
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{p.role}</span>
                </div>
                <div className="text-[10.5px] font-semibold mb-0.5" style={{ color: couleur }}>{p.sousTitre}</div>
                <ul className="space-y-0.5 text-[10.8px] text-slate-700">
                  {p.points.map((pt, i) => (
                    <li key={i} className="relative pl-3 before:content-['—'] before:absolute before:left-0 before:text-slate-400">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Compétences professionnelles (Grille 2x2) */}
        <section>
          <h2 className="font-extrabold uppercase text-[11px] pb-1 mb-1.5 tracking-wider" style={{ color: couleur, borderBottom: `1.5px solid ${couleur}` }}>
            Compétences Professionnelles
          </h2>
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-1.5">
            {data.competences.map(c => (
              <div key={c.id}>
                <div className="font-bold text-[10.5px] border-b border-slate-100 pb-0.5 mb-0.5" style={{ color: couleur }}>
                  {c.titre}
                </div>
                <div className="text-[10.2px] text-slate-600 leading-snug">
                  {c.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/* ==============================================================================
   CANEVAS 2 : EXECUTIVE ROYAL (EN-TÊTE DÉGRADÉ & MÉDAILLON)
============================================================================== */
function RenderExecutiveRoyal({ data, couleur }) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden font-sans text-slate-800 text-[11px] leading-[1.38]">
      {/* En-tête bleu royal avec dégradé */}
      <header
        className="p-[18px_24px_16px] text-white flex items-center justify-between gap-4"
        style={{ background: `linear-gradient(135deg, ${couleur} 0%, #1e293b 100%)` }}
      >
        <div className="flex-1">
          <h1 className="text-[21px] font-black uppercase tracking-tight text-white leading-tight">
            {data.personnel.nomComplet}
          </h1>
          <div className="text-[13px] font-bold text-sky-200 mb-1">
            {data.personnel.titrePoste}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10.5px] text-slate-200">
            <span>📞 {data.personnel.telephone}</span>
            <span>✉️ {data.personnel.email}</span>
            <span>📍 {data.personnel.adresse}</span>
            <span>🚗 {data.personnel.permis}</span>
          </div>
        </div>

        {/* Photo médaillon */}
        <div className="w-[78px] h-[78px] rounded-full border-2 border-white/80 overflow-hidden shadow-md flex-shrink-0 bg-white/20">
          {data.personnel.photo ? (
            <img src={data.personnel.photo} alt="Photo" className="w-full h-full object-cover object-[center_25%]" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/50"><User size={30} /></div>
          )}
        </div>
      </header>

      {/* Corps 2 colonnes */}
      <div className="flex-1 flex overflow-hidden">
        {/* Colonne gauche (32%) */}
        <div className="w-[32%] bg-slate-50 border-r border-slate-200 p-[16px_14px] flex flex-col gap-3">
          <div>
            <h3 className="font-black uppercase text-[10.5px] tracking-wider mb-1" style={{ color: couleur }}>Profil</h3>
            <p className="text-[10.2px] text-slate-600 leading-snug">{data.profil}</p>
          </div>

          <div>
            <h3 className="font-black uppercase text-[10.5px] tracking-wider mb-1" style={{ color: couleur }}>Formations</h3>
            <div className="space-y-1.5">
              {data.formations.map(f => (
                <div key={f.id}>
                  <div className="font-bold text-slate-800 text-[10.8px]">{f.diplome}</div>
                  <div className="text-[10px] text-slate-500">{f.ecole}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black uppercase text-[10.5px] tracking-wider mb-1" style={{ color: couleur }}>Compétences</h3>
            <div className="space-y-1.5">
              {data.competences.map(c => (
                <div key={c.id}>
                  <div className="font-bold text-[10.2px]" style={{ color: couleur }}>{c.titre}</div>
                  <div className="text-[9.8px] text-slate-600 leading-snug">{c.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200">
            <img src={data.personnel.qrCode} alt="QR" className="w-12 h-12" />
            <div className="text-[8.5px] text-slate-500 leading-tight">
              <strong className="block text-slate-800">Portfolio</strong>
              Scannez pour voir mes réalisations
            </div>
          </div>
        </div>

        {/* Colonne droite (68%) */}
        <div className="w-[68%] p-[18px_20px] flex flex-col gap-2.5">
          <h3 className="font-black uppercase text-[11px] tracking-wider pb-1 border-b border-slate-200" style={{ color: couleur }}>
            Projets & Réalisations Majeures
          </h3>
          <div className="space-y-2.5">
            {data.projets.map(p => (
              <div key={p.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-[11.8px]">{p.titre}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">{p.role}</span>
                </div>
                <div className="text-[10.2px] font-semibold text-slate-500 mb-0.5">{p.sousTitre}</div>
                <ul className="space-y-0.5 text-[10.5px] text-slate-700">
                  {p.points.map((pt, i) => (
                    <li key={i} className="relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-sky-600">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==============================================================================
   CANEVAS 3 : MINIMALISTE CHIC (NOIR & BLANC MODERNE)
============================================================================== */
function RenderMinimalChic({ data, couleur }) {
  return (
    <div className="w-full h-full p-[26px_28px] flex flex-col gap-3 font-sans text-slate-900 text-[11px] leading-[1.4]">
      <header className="border-b-2 border-slate-900 pb-2.5 flex justify-between items-end">
        <div>
          <h1 className="text-[23px] font-black uppercase tracking-tight text-slate-900">{data.personnel.nomComplet}</h1>
          <div className="text-[12.5px] font-bold text-slate-600">{data.personnel.titrePoste}</div>
        </div>
        <div className="text-right text-[10.2px] text-slate-600 space-y-0.5">
          <div>{data.personnel.telephone} • {data.personnel.email}</div>
          <div>{data.personnel.adresse} • {data.personnel.permis}</div>
          <div>{data.personnel.portfolio}</div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-3 gap-6">
        <div className="col-span-1 border-r border-slate-200 pr-4 space-y-3">
          <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-200 mx-auto">
            {data.personnel.photo && <img src={data.personnel.photo} alt="Photo" className="w-full h-full object-cover" />}
          </div>
          <div>
            <h4 className="font-black uppercase text-[10.5px] tracking-widest text-slate-400 mb-1">Profil</h4>
            <p className="text-[10px] text-slate-700 leading-snug">{data.profil}</p>
          </div>
          <div>
            <h4 className="font-black uppercase text-[10.5px] tracking-widest text-slate-400 mb-1">Diplômes</h4>
            <div className="space-y-1.5">
              {data.formations.map(f => (
                <div key={f.id}>
                  <div className="font-bold text-[10.5px]">{f.diplome}</div>
                  <div className="text-[9.5px] text-slate-500">{f.ecole}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-3">
          <div>
            <h4 className="font-black uppercase text-[10.5px] tracking-widest text-slate-400 mb-1.5 pb-0.5 border-b border-slate-200">
              Réalisations Phares
            </h4>
            <div className="space-y-2">
              {data.projets.map(p => (
                <div key={p.id}>
                  <div className="font-bold text-slate-900 text-[11.5px]">{p.titre}</div>
                  <div className="text-[10px] text-slate-500 mb-0.5">{p.sousTitre}</div>
                  <ul className="text-[10.2px] text-slate-700 space-y-0.5">
                    {p.points.map((pt, i) => (
                      <li key={i} className="pl-2 border-l border-slate-300">{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black uppercase text-[10.5px] tracking-widest text-slate-400 mb-1 pb-0.5 border-b border-slate-200">
              Compétences
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              {data.competences.map(c => (
                <div key={c.id}>
                  <div className="font-bold text-slate-900">{c.titre}</div>
                  <div className="text-slate-600">{c.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==============================================================================
   CANEVAS 4 : SIDEBAR SOMBRE
============================================================================== */
function RenderSidebarSombre({ data, couleur }) {
  return (
    <div className="w-full h-full flex flex-row overflow-hidden font-sans text-slate-800 text-[11px] leading-[1.38]">
      <div className="w-[33%] bg-slate-900 text-white p-[20px_16px] flex flex-col gap-3">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 mx-auto">
          {data.personnel.photo && <img src={data.personnel.photo} alt="Photo" className="w-full h-full object-cover" />}
        </div>
        <div className="text-center">
          <h2 className="text-[14px] font-black uppercase text-white leading-tight">{data.personnel.nomComplet}</h2>
          <div className="text-[10.5px] text-sky-400 font-semibold">{data.personnel.titrePoste}</div>
        </div>
        <div className="text-[10px] space-y-1 text-slate-300 pt-2 border-t border-slate-800">
          <div>✉️ {data.personnel.email}</div>
          <div>📞 {data.personnel.telephone}</div>
          <div>📍 {data.personnel.adresse}</div>
          <div>🚗 {data.personnel.permis}</div>
        </div>
        <div>
          <h3 className="text-[10.5px] font-bold uppercase text-sky-400 mb-1">Formations</h3>
          <div className="space-y-1.5 text-[9.8px]">
            {data.formations.map(f => (
              <div key={f.id}>
                <div className="font-bold text-white">{f.diplome}</div>
                <div className="text-slate-400">{f.ecole}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="w-[67%] p-[20px_22px] flex flex-col gap-2.5">
        <div>
          <h3 className="font-black uppercase text-[11px] text-slate-900 pb-1 border-b-2 border-slate-900 mb-1">Profil</h3>
          <p className="text-[10.5px] text-slate-700 leading-snug">{data.profil}</p>
        </div>
        <div>
          <h3 className="font-black uppercase text-[11px] text-slate-900 pb-1 border-b-2 border-slate-900 mb-1.5">Réalisations</h3>
          <div className="space-y-2">
            {data.projets.map(p => (
              <div key={p.id}>
                <div className="font-bold text-slate-900 text-[11.8px]">{p.titre}</div>
                <div className="text-[10px] text-sky-700 font-semibold mb-0.5">{p.sousTitre}</div>
                <ul className="text-[10.2px] text-slate-600 space-y-0.5">
                  {p.points.map((pt, i) => (
                    <li key={i} className="pl-2 border-l-2 border-slate-200">{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-black uppercase text-[11px] text-slate-900 pb-1 border-b-2 border-slate-900 mb-1">Compétences</h3>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {data.competences.map(c => (
              <div key={c.id}>
                <div className="font-bold text-slate-800">{c.titre}</div>
                <div className="text-slate-600">{c.description}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ==============================================================================
   CANEVAS 5 : CLASSIQUE INSTITUTIONNEL
============================================================================== */
function RenderClassiquePro({ data, couleur }) {
  return (
    <div className="w-full h-full p-[24px_26px] flex flex-col gap-2.5 font-serif text-slate-900 text-[11px] leading-[1.38]">
      <header className="text-center border-b-2 border-slate-800 pb-2">
        <h1 className="text-[22px] font-black tracking-wide uppercase">{data.personnel.nomComplet}</h1>
        <div className="text-[12.5px] font-semibold text-slate-700 italic">{data.personnel.titrePoste}</div>
        <div className="text-[10px] text-slate-600 mt-1 flex justify-center gap-3">
          <span>{data.personnel.telephone}</span> • <span>{data.personnel.email}</span> • <span>{data.personnel.adresse}</span> • <span>{data.personnel.permis}</span>
        </div>
      </header>

      <div>
        <h3 className="font-bold uppercase text-[11px] tracking-wider border-b border-slate-300 pb-0.5 mb-1 font-sans">
          Formation Universitaire & Professionnelle
        </h3>
        <div className="space-y-1">
          {data.formations.map(f => (
            <div key={f.id} className="flex justify-between items-baseline">
              <div>
                <span className="font-bold text-[11px]">{f.diplome}</span> — <span className="italic text-slate-600">{f.ecole}</span>
                <div className="text-[9.8px] text-slate-500 font-sans">{f.details}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold uppercase text-[11px] tracking-wider border-b border-slate-300 pb-0.5 mb-1.5 font-sans">
          Expériences & Projets Majeurs
        </h3>
        <div className="space-y-2">
          {data.projets.map(p => (
            <div key={p.id}>
              <div className="font-bold text-[11.5px] text-slate-900">{p.titre} <span className="font-normal italic text-slate-500">({p.role})</span></div>
              <div className="text-[10px] text-slate-600 italic mb-0.5">{p.sousTitre}</div>
              <ul className="text-[10.2px] text-slate-700 space-y-0.5 font-sans">
                {p.points.map((pt, i) => (
                  <li key={i} className="pl-3 relative before:content-['—'] before:absolute before:left-0">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold uppercase text-[11px] tracking-wider border-b border-slate-300 pb-0.5 mb-1 font-sans">
          Compétences & Domaines d'Expertise
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] font-sans">
          {data.competences.map(c => (
            <div key={c.id}>
              <strong className="block text-slate-900">{c.titre} :</strong>
              <span className="text-slate-600">{c.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}