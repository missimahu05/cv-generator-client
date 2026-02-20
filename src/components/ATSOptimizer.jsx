import React, { useState } from 'react';
import { Target, Loader, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { optimiserPourATS } from '../services/aiService';

const ATSOptimizer = ({ cvData }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await optimiserPourATS(cvData);
      setAnalysis(result);
      setShowResults(true);
    } catch (error) {
      console.error('Erreur analyse:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 text-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isAnalyzing ? (
          <>
            <Loader size={16} className="animate-spin" />
            Analyse en cours...
          </>
        ) : (
          <>
            <Target size={16} />
            Optimiser pour ATS
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {showResults && analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowResults(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Target size={20} className="text-indigo-600" />
                    Analyse ATS
                  </h3>
                  <button
                    onClick={() => setShowResults(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Score ATS */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Score ATS</span>
                    <span className="text-2xl font-bold" style={{ color: analysis.score >= 70 ? '#10b981' : '#f59e0b' }}>
                      {analysis.score}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${analysis.score}%` }}
                      className="h-2 rounded-full"
                      style={{ backgroundColor: analysis.score >= 70 ? '#10b981' : '#f59e0b' }}
                    />
                  </div>
                </div>

                {/* Mots-clés manquants */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <TrendingUp size={16} /> Mots-clés recommandés
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywords?.map((keyword, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Suggestions d'amélioration */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <AlertTriangle size={16} /> Suggestions d'amélioration
                  </h4>
                  <ul className="space-y-2">
                    {analysis.suggestions?.map((suggestion, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-indigo-500 mt-1">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions rapides */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowResults(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Fermer
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Appliquer les suggestions
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ATSOptimizer;