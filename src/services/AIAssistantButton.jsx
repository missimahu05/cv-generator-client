import React, { useState } from 'react';
import { Sparkles, Loader, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { genererDescriptionExperience } from './aiService';

const AIAssistantButton = ({ poste, entreprise, competences, onDescriptionGenerated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');

  const handleGenerate = async () => {
    if (!poste || !entreprise) {
      alert('Veuillez d\'abord remplir le poste et l\'entreprise');
      return;
    }

    setIsLoading(true);
    try {
      const descriptions = await genererDescriptionExperience(poste, entreprise, competences || []);
      setSuggestions(descriptions);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseSuggestion = (suggestion) => {
    onDescriptionGenerated(suggestion);
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        className="absolute right-2 top-8 text-purple-600 hover:text-purple-700 p-1 rounded-full hover:bg-purple-50"
        title="Aide IA"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Sparkles size={18} />
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
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Sparkles size={20} className="text-purple-600" />
                    Assistant IA
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Poste: <span className="font-medium">{poste || 'Non spécifié'}</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Entreprise: <span className="font-medium">{entreprise || 'Non spécifiée'}</span>
                  </p>

                  <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader size={18} className="animate-spin" />
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Générer des suggestions
                      </>
                    )}
                  </button>
                </div>

                {suggestions.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">Suggestions :</h4>
                    {suggestions.map((suggestion, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedSuggestion === suggestion
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                          }`}
                        onClick={() => setSelectedSuggestion(suggestion)}
                      >
                        <p className="text-sm text-gray-700">{suggestion}</p>
                        {selectedSuggestion === suggestion && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex justify-end mt-2"
                          >
                            <button
                              onClick={() => handleUseSuggestion(suggestion)}
                              className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm flex items-center gap-1"
                            >
                              <Check size={14} />
                              Utiliser cette suggestion
                            </button>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
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

export default AIAssistantButton;