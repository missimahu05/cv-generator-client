import React from 'react';

const CentresInteretForm = ({ centre, onSave, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSave({
      id: centre?.id,
      nom: formData.get('nom')
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">
        {centre ? 'Modifier' : 'Ajouter'} un centre d'intérêt
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Centre d'intérêt
        </label>
        <input
          type="text"
          name="nom"
          defaultValue={centre?.nom || ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="ex: Photographie, Voyages, Lecture..."
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
          {centre ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default CentresInteretForm;