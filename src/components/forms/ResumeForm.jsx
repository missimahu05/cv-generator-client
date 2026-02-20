import React from 'react';

const ResumeForm = ({ resume, onSave, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSave(formData.get('resume'));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">
        {resume ? 'Modifier' : 'Ajouter'} un résumé professionnel
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Résumé
        </label>
        <textarea
          name="resume"
          defaultValue={resume || ''}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Décrivez votre profil en quelques phrases..."
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Sauvegarder
        </button>
      </div>
    </form>
  );
};

export default ResumeForm;