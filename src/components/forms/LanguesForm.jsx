import React from 'react';

const LanguesForm = ({ langue, onSave, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSave({
      id: langue?.id,
      nom: formData.get('nom'),
      niveau: formData.get('niveau')
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">
        {langue ? 'Modifier' : 'Ajouter'} une langue
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Langue
        </label>
        <input
          type="text"
          name="nom"
          defaultValue={langue?.nom || ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="ex: Anglais, Espagnol..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Niveau
        </label>
        <select
          name="niveau"
          defaultValue={langue?.niveau || 'Courant'}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="Débutant">Débutant</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Courant">Courant</option>
          <option value="Natif">Natif</option>
          <option value="Bilingue">Bilingue</option>
        </select>
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
          {langue ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default LanguesForm;