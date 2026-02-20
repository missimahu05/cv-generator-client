import React from 'react';

const FormationForm = ({ formation, onSave, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSave({
      id: formation?.id,
      diplome: formData.get('diplome'),
      ecole: formData.get('ecole'),
      dateDebut: formData.get('dateDebut'),
      dateFin: formData.get('dateFin'),
      description: formData.get('description')
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">
        {formation ? 'Modifier' : 'Ajouter'} une formation
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Diplôme
        </label>
        <input
          type="text"
          name="diplome"
          defaultValue={formation?.diplome || ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="ex: Master en Design"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          École / Université
        </label>
        <input
          type="text"
          name="ecole"
          defaultValue={formation?.ecole || ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Nom de l'établissement"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date début
          </label>
          <input
            type="text"
            name="dateDebut"
            defaultValue={formation?.dateDebut || ''}
            placeholder="2018"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date fin
          </label>
          <input
            type="text"
            name="dateFin"
            defaultValue={formation?.dateFin || ''}
            placeholder="2020"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (optionnel)
        </label>
        <textarea
          name="description"
          defaultValue={formation?.description || ''}
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Mention, spécialisation..."
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
          {formation ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default FormationForm;