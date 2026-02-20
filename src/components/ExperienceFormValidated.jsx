import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Briefcase, X, Check, AlertCircle, Sparkles, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AIAssistantButton from "../services/AIAssistantButton";


import { genererDescriptionExperience } from '../services/aiService';

// Schéma de validation avec Zod
const experienceSchema = z.object({
  entreprise: z.string()
    .min(2, 'L\'entreprise doit contenir au moins 2 caractères')
    .max(100, 'L\'entreprise ne peut pas dépasser 100 caractères'),
  poste: z.string()
    .min(2, 'Le poste doit contenir au moins 2 caractères')
    .max(100, 'Le poste ne peut pas dépasser 100 caractères'),
  dateDebut: z.string()
    .min(4, 'Date début requise')
    .regex(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Janvier|Février|Mars|Avril|Mai|Juin|Juillet|Août|Septembre|Octobre|Novembre|Décembre|JAN|FEV|MAR|AVR|MAI|JUN|JUL|AOU|SEP|OCT|NOV|DEC|JANV|FÉVR?)? ?\d{4}$/i,
      'Format de date invalide (ex: Jan 2020 ou 2020)'),
  dateFin: z.string()
    .optional()
    .refine(val => !val || /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Janvier|Février|Mars|Avril|Mai|Juin|Juillet|Août|Septembre|Octobre|Novembre|Décembre|Présent|Present)? ?\d{4}$|Présent|Present/i.test(val), {
      message: 'Format de date invalide (ex: Dec 2023 ou Présent)'
    }),
  actuel: z.boolean().default(false),
  description: z.string()
    .max(1000, 'La description ne peut pas dépasser 1000 caractères')
    .optional()
}).refine((data) => data.actuel || data.dateFin, {
  message: "La date de fin est requise si vous ne travaillez pas actuellement ici",
  path: ["dateFin"]
}).refine((data) => !(data.actuel && data.dateFin && data.dateFin !== 'Présent' && data.dateFin !== 'Present'), {
  message: "Si vous travaillez actuellement ici, la date de fin doit être 'Présent' ou vide",
  path: ["dateFin"]
});

const ExperienceFormValidated = ({ experience, onSave, onCancel, primaryColor, availableSkills = [] }) => {
  const [aiDescription, setAiDescription] = useState('');
  const [isGeneratingResume, setIsGeneratingResume] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting, isValid }, watch, setValue } = useForm({
    resolver: zodResolver(experienceSchema),
    mode: 'onChange',
    defaultValues: {
      entreprise: experience?.entreprise || '',
      poste: experience?.poste || '',
      dateDebut: experience?.dateDebut || '',
      dateFin: experience?.dateFin || '',
      actuel: experience?.actuel || false,
      description: experience?.description || ''
    }
  });

  const actuel = watch('actuel');
  const posteValue = watch('poste');
  const entrepriseValue = watch('entreprise');

  // Générer un résumé avec l'IA
  const handleGenerateFullDescription = async () => {
    if (!posteValue || !entrepriseValue) {
      alert('Veuillez d\'abord remplir le poste et l\'entreprise');
      return;
    }

    setIsGeneratingResume(true);
    try {
      const descriptions = await genererDescriptionExperience(
        posteValue,
        entrepriseValue,
        availableSkills
      );
      if (descriptions && descriptions.length > 0) {
        setAiDescription(descriptions.join('\n'));
      }
    } catch (error) {
      console.error('Erreur génération:', error);
    } finally {
      setIsGeneratingResume(false);
    }
  };

  // Appliquer la suggestion IA
  const applyAIDescription = () => {
    if (aiDescription) {
      setValue('description', aiDescription);
      setAiDescription('');
      setShowAIPanel(false);
    }
  };

  const onSubmit = (data) => {
    onSave({
      id: experience?.id,
      ...data
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Briefcase size={20} />
          {experience ? 'Modifier' : 'Ajouter'} une expérience
        </h3>

        {/* Bouton assistant IA */}
        <motion.button
          type="button"
          onClick={() => setShowAIPanel(!showAIPanel)}
          className="text-purple-600 hover:text-purple-700 p-2 rounded-full hover:bg-purple-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Assistant IA"
        >
          <Sparkles size={20} />
        </motion.button>
      </div>

      {/* Panneau IA */}
      <AnimatePresence>
        {showAIPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-purple-50 rounded-lg p-4 mb-4 border border-purple-200">
              <h4 className="text-sm font-medium text-purple-800 mb-3 flex items-center gap-1">
                <Sparkles size={16} />
                Assistant IA
              </h4>

              <button
                type="button"
                onClick={handleGenerateFullDescription}
                disabled={isGeneratingResume}
                className="w-full px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2 text-sm mb-3"
              >
                {isGeneratingResume ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Générer une description complète
                  </>
                )}
              </button>

              {aiDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-3 border border-purple-200"
                >
                  <p className="text-sm text-gray-700 whitespace-pre-line mb-3">
                    {aiDescription}
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setAiDescription('')}
                      className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800"
                    >
                      Ignorer
                    </button>
                    <button
                      type="button"
                      onClick={applyAIDescription}
                      className="px-3 py-1 bg-purple-600 text-white rounded-md text-xs hover:bg-purple-700"
                    >
                      Utiliser cette description
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Champ Entreprise */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Entreprise <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('entreprise')}
          className={`w-full px-3 py-2 border rounded-md transition-colors ${errors.entreprise ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            } focus:outline-none focus:ring-2`}
          placeholder="Nom de l'entreprise"
        />
        {errors.entreprise && (
          <motion.p
            className="text-red-500 text-xs mt-1 flex items-center gap-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle size={12} /> {errors.entreprise.message}
          </motion.p>
        )}
      </div>

      {/* Champ Poste */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Poste <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('poste')}
          className={`w-full px-3 py-2 border rounded-md transition-colors ${errors.poste ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            } focus:outline-none focus:ring-2 pr-10`}
          placeholder="Titre du poste"
        />
        <AIAssistantButton
          poste={posteValue}
          entreprise={entrepriseValue}
          competences={availableSkills}
          onDescriptionGenerated={(desc) => setAiDescription(desc)}
          onOpen={() => setShowAIPanel(true)}
        />
        {errors.poste && (
          <motion.p
            className="text-red-500 text-xs mt-1 flex items-center gap-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle size={12} /> {errors.poste.message}
          </motion.p>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date début <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('dateDebut')}
            placeholder="Jan 2020"
            className={`w-full px-3 py-2 border rounded-md transition-colors ${errors.dateDebut ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              } focus:outline-none focus:ring-2`}
          />
          {errors.dateDebut && (
            <p className="text-red-500 text-xs mt-1">{errors.dateDebut.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date fin
          </label>
          <input
            type="text"
            {...register('dateFin')}
            placeholder={actuel ? "Présent" : "Dec 2023"}
            disabled={actuel}
            className={`w-full px-3 py-2 border rounded-md transition-colors ${actuel ? 'bg-gray-100' : ''
              } ${errors.dateFin ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              } focus:outline-none focus:ring-2`}
          />
          {errors.dateFin && (
            <p className="text-red-500 text-xs mt-1">{errors.dateFin.message}</p>
          )}
        </div>
      </div>

      {/* Checkbox "Je travaille actuellement ici" */}
      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('actuel')}
          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <label className="ml-2 text-sm text-gray-700">
          Je travaille actuellement ici
        </label>
      </div>

      {/* Champ Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description / Réalisations
        </label>
        <textarea
          {...register('description')}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Décrivez vos missions et réalisations... (l'IA peut vous aider à générer ce contenu)"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}

        {/* Compteur de caractères */}
        <div className="text-right mt-1">
          <span className={`text-xs ${(watch('description')?.length || 0) > 900 ? 'text-orange-500' : 'text-gray-400'}`}>
            {(watch('description')?.length || 0)}/1000 caractères
          </span>
        </div>
      </div>

      {/* Indicateur de validation */}
      <div className="flex items-center gap-2 text-xs">
        {isValid ? (
          <span className="text-green-600 flex items-center gap-1">
            <Check size={14} /> Tous les champs sont valides
          </span>
        ) : (
          <span className="text-orange-500 flex items-center gap-1">
            <AlertCircle size={14} /> Certains champs nécessitent votre attention
          </span>
        )}
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <motion.button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <X size={16} /> Annuler
        </motion.button>
        <motion.button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="px-4 py-2 text-white rounded-md hover:opacity-90 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: primaryColor }}
          whileHover={{ scale: isValid ? 1.02 : 1 }}
          whileTap={{ scale: isValid ? 0.98 : 1 }}
        >
          {isSubmitting ? (
            <>
              <Loader size={16} className="animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Check size={16} />
              {experience ? 'Mettre à jour' : 'Ajouter'}
            </>
          )}
        </motion.button>
      </div>

      {/* Message d'aide */}
      <div className="text-xs text-gray-400 text-center mt-2">
        <span className="flex items-center justify-center gap-1">
          <Sparkles size={12} className="text-purple-400" />
          L'icône ✨ à côté du poste active l'assistant IA
        </span>
      </div>
    </motion.form>
  );
};

export default ExperienceFormValidated;