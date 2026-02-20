import React, { useState } from 'react';
import { Lightbulb, Loader, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// CORRIGÉ
import { suggererCompetences } from '../services/aiService';

const SkillSuggestions = ({ titre, onAddSkill }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleGetSuggestions = async () => {
    if (!titre) {
      alert('Veuillez d\'abord renseigner votre titre de poste');
      return;
    }

    setIsLoading(true);
    try {
      const skills = await suggererCompetences(titre);
      setSuggestions(skills);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm flex items-center gap-1 hover:bg-amber-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Lightbulb size={14} />
        Suggestions de compétences
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-xl max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb size={20} className="text-amber-600" />
                  Suggestions de compétences
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  Basé sur votre titre : <span className="font-medium">{titre || 'Non spécifié'}</span>
                </p>

                {suggestions.length === 0 ? (
                  <button
                    onClick={handleGetSuggestions}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader size={18} className="animate-spin" />
                        Analyse en cours...
                      </>
                    ) : (
                      <>
                        <Lightbulb size={18} />
                        Générer des suggestions
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((skill, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1 group"
                        >
                          {skill}
                          <button
                            onClick={() => onAddSkill(skill)}
                            className="text-gray-500 hover:text-green-600"
                            title="Ajouter cette compétence"
                          >
                            <Plus size={14} />
                          </button>
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex justify-end pt-4 border-t">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SkillSuggestions;