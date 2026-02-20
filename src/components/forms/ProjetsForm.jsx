import React from 'react';

const ProjetsForm = ({ projet, onSave, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSave({
      id: projet?.id,
      nom: formData.get('nom'),
      description: formData.get('description'),
      lien: formData.get('lien'),
      technologies: formData.get('technologies')?.split(',').map(t => t.trim()) || []
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">
        {projet ? 'Modifier' : 'Ajouter'} un projet
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom du projet
        </label>
        <input
          type="text"
          name="nom"
          defaultValue={projet?.nom || ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="ex: Application mobile"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={projet?.description || ''}
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Description du projet..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Lien (optionnel)
        </label>
        <input
          type="text"
          name="lien"
          defaultValue={projet?.lien || ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="github.com/projet"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Technologies (séparées par des virgules)
        </label>
        <input
          type="text"
          name="technologies"
          defaultValue={projet?.technologies?.join(', ') || ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="React, Node.js, MongoDB"
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
          {projet ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default ProjetsForm;