import { GoogleGenerativeAI } from '@google/generative-ai';

// Vérification de la clé API
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

console.log('Clé API Gemini:', GEMINI_API_KEY ? 'Présente' : 'Absente');

let genAI = null;
let model = null;

// Initialisation seulement si la clé API existe
if (GEMINI_API_KEY && GEMINI_API_KEY !== 'undefined' && GEMINI_API_KEY !== '') {
  try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log('Service IA initialisé avec succès');
  } catch (error) {
    console.error('Erreur initialisation IA:', error);
  }
} else {
  console.warn('Clé API Gemini non configurée - fonctionnalités IA désactivées');
}

/**
 * GÉNÉRATION DE DESCRIPTION D'EXPÉRIENCE (Ultra-Optimisée)
 */
export const genererDescriptionExperience = async (poste, entreprise, competences) => {
  // Vérification si le service IA est disponible
  if (!model) {
    console.warn('Service IA non disponible - retour de suggestions par défaut');
    return ["Optimisation de la performance globale", "Collaboration transverse sur les projets critiques"];
  }

  try {
    const prompt = `En tant qu'expert en recrutement, génère une description de poste percutante pour un ${poste} chez ${entreprise}.
    Compétences à intégrer : ${competences?.join(', ') || 'Expertise métier'}
    
    Règles :
    - 3 puces (bullet points) maximum.
    - Utilise des verbes d'action forts (Conception, Pilotage, Optimisation...).
    - Quantifie les résultats si possible.
    - Style élégant et professionnel.
    
    Retourne UNIQUEMENT les puces, sans texte superflu.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text.split('\n').filter(line => line.trim() !== '');
  } catch (error) {
    console.error('Erreur IA (Description):', error);
    return ["Optimisation de la performance globale", "Collaboration transverse sur les projets critiques"];
  }
};

/**
 * RÉSUMÉ PROFESSIONNEL / BIO
 */
export const genererResumeProfessionnel = async (experiences, competences, titre) => {
  if (!model) {
    return "Développeur passionné avec une expertise solide en solutions web modernes.";
  }

  try {
    const prompt = `Génère un résumé professionnel "Premium" pour un profil ${titre}.
    Expériences: ${experiences.map(e => e.poste).join(', ')}
    Compétences: ${competences.join(', ')}
    
    Le résumé doit être court (max 400 caractères), percutant et donner envie d'embaucher immédiatement.
    Retourne uniquement le texte.`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error('Erreur IA (Résumé):', error);
    return "Développeur passionné avec une expertise solide en solutions web modernes.";
  }
};

/**
 * AUDIT DE CV (Le point critique "Whaou")
 */
export const analyserCVAudit = async (cvData) => {
  if (!model) {
    return { score: 75, pointsForts: ["Expertise technique solide"], pointsAmélioration: ["Ajouter plus de détails quantitatifs"], conseilStrategique: "Mettre en avant les réalisations concrètes" };
  }

  try {
    const prompt = `Analyse ce profil complet et donne un audit critique :
    ${JSON.stringify(cvData)}
    
    Produis un objet JSON valide contenant :
    - "score": (nombre de 0 à 100)
    - "pointsForts": (tableau de 3 strings)
    - "pointsAmélioration": (tableau de 3 strings)
    - "conseilStrategique": (une phrase percutante)
    
    Réponds uniquement par le JSON.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { score: 80, pointsForts: ["Expertise technique"], pointsAmélioration: ["Quantification des résultats"] };
  } catch (error) {
    console.error('Erreur IA (Audit):', error);
    return { score: 75, pointsForts: ["Expertise technique solide"], pointsAmélioration: ["Ajouter plus de détails quantitatifs"], conseilStrategique: "Mettre en avant les réalisations concrètes" };
  }
};

/**
 * GÉNÉRATEUR DE LETTRE DE MOTIVATION TACTIQUE
 */
export const genererLettreMotivation = async (cvData, jobDescription) => {
  if (!model) {
    return "Lettre de motivation indisponible - veuillez configurer l'API Gemini";
  }

  try {
    const prompt = `Rédige une lettre de motivation courte et percutante (format "Pitch Mail") basée sur ce profil :
    Profil: ${cvData.personnel.titrePoste}, ${cvData.personnel.resume}
    Offre visée: ${jobDescription}
    
    La lettre doit être audacieuse et personnalisée. Max 200 mots.`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error('Erreur IA (Lettre):', error);
    return "Impossible de générer la lettre pour le moment.";
  }
};

/**
 * SIMULATEUR D'ENTRETIEN (Questions Pièges)
 */
export const preparerEntretien = async (cvData) => {
  if (!model) {
    return ["Parlez-moi de votre plus grand défi technique.", "Comment gérez-vous les conflits en équipe ?", "Qu'est-ce qui vous motive dans ce domaine ?"];
  }

  try {
    const prompt = `En tant que recruteur de chez Google, quelles sont les 3 questions les plus complexes et pertinentes que tu poserais à ce candidat ?
    Candidat: ${cvData.personnel.titrePoste}
    Expériences: ${cvData.experiences.map(e => e.poste).join(', ')}
    
    Retourne juste les 3 questions séparées par des sauts de ligne.`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim().split('\n');
  } catch (error) {
    console.error('Erreur IA (Entretien):', error);
    return ["Parlez-moi de votre plus grand défi technique.", "Comment gérez-vous les conflits en équipe ?", "Qu'est-ce qui vous motive dans ce domaine ?"];
  }
};

/**
 * OPTIMISATION DE PROFIL LINKEDIN (L'arme secrète)
 */
export const optimiserProfilLinkedIn = async (cvData) => {
  if (!model) {
    return "Optimisation LinkedIn indisponible - veuillez configurer l'API Gemini";
  }

  try {
    const prompt = `À partir de ce CV, génère :
    1. Un Titre de profil LinkedIn percutant (accrocheur).
    2. Une section "Infos/About" qui raconte une histoire (storytelling).
    3. 3 suggestions de posts pour se lancer.
    
    Candidat: ${cvData.personnel.nomComplet}, ${cvData.personnel.titrePoste}
    CV: ${JSON.stringify(cvData)}
    
    Réponds de manière structurée et inspirante.`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error('Erreur IA (LinkedIn):', error);
    return "Optimisation LinkedIn temporairement indisponible.";
  }
};

/**
 * AMÉLIORATION DE TEXTE GÉNÉRIQUE (Remplacement de gemini.js)
 */
/**
 * OPTIMISATION ATS (Utilisé par ATSOptimizer.jsx)
 */
export const optimiserPourATS = async (cvData) => {
  if (!model) {
    return { 
      score: 75, 
      keywords: ["React", "Node.js", "JavaScript", "TypeScript", "CSS"], 
      suggestions: ["Ajoutez des métriques quantifiables", "Incluez plus de mots-clés techniques", "Mettez en avant vos réalisations"] 
    };
  }

  try {
    const prompt = `En tant qu'expert en recrutement et spécialiste des systèmes ATS, analyse ce CV :
    ${JSON.stringify(cvData)}
    
    Produis un objet JSON valide contenant :
    - "score": (nombre de 0 à 100)
    - "keywords": (tableau de 5 à 10 mots-clés manquants ou à renforcer)
    - "suggestions": (tableau de 3 à 5 conseils précis pour améliorer le score ATS)
    
    Réponds uniquement par le JSON.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { score: 70, keywords: ["React", "TypeScript"], suggestions: ["Quantifiez vos résultats"] };
  } catch (error) {
    console.error('Erreur IA (ATS):', error);
    return { 
      score: 75, 
      keywords: ["React", "Node.js", "JavaScript", "TypeScript", "CSS"], 
      suggestions: ["Ajoutez des métriques quantifiables", "Incluez plus de mots-clés techniques", "Mettez en avant vos réalisations"] 
    };
  }
};

/**
 * SUGGESTION DE COMPÉTENCES (Utilisé par SkillSuggestions.jsx)
 */
export const suggererCompetences = async (titre) => {
  if (!model) {
    return ["JavaScript", "React", "Node.js", "TypeScript", "CSS", "HTML", "Git", "Communication", "Travail d'équipe", "Résolution de problèmes"];
  }

  try {
    const prompt = `Liste 10 compétences clés (techniques et soft skills) pour un poste de "${titre}".
    Réponds uniquement par une liste de mots séparés par des virgules.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    return text.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
  } catch (error) {
    console.error('Erreur IA (Suggestions):', error);
    return ["JavaScript", "React", "Node.js", "TypeScript", "CSS", "HTML", "Git", "Communication", "Travail d'équipe", "Résolution de problèmes"];
  }
};

export const enhanceCVContent = async (section, content) => {
  if (!model) {
    return content;
  }

  try {
    const prompt = `Améliore ce texte pour la section "${section}" d'un CV de façon à ce qu'il soit "Ultra-Pro" : "${content}". Retourne juste le texte amélioré.`;
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error('Erreur IA (Enhancement):', error);
    return content;
  }
};