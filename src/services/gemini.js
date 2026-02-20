import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Enhances a CV section content using Gemini 1.5 Flash.
 * @param {string} section - The section type (e.g., 'experience', 'bio', 'skill')
 * @param {string} content - The current content to enhance
 * @returns {Promise<string>} - The enhanced content
 */
export async function enhanceCVContent(section, content) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Tu es un expert en recrutement et en rédaction de CV.
      Améliore le contenu suivant pour la section "${section}" d'un CV.
      Rends-le plus professionnel, percutant et optimisé pour les recruteurs.
      Utilise des verbes d'action et des résultats concrets si possible.
      Garde un ton formel et élégant.
      
      Contenu original : "${content}"
      
      Réponds UNIQUEMENT avec le nouveau contenu amélioré, sans introduction ni conclusion.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error("Erreur Gemini:", error);
        throw new Error("Impossible d'améliorer le contenu pour le moment.");
    }
}
