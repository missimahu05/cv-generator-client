import React from 'react';

const CertificationsForm = ({ certification, onSave, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSave({
      id: certification?.id,
      nom: formData.get('nom'),
      organisme: formData.get('organisme'),
      date: formData.get('date')
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">
        {certification ? 'Modifier' : 'Ajouter'} une certification
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom de la certification
        </label>
        <input
          type="text"
          name="nom"
          defaultValue={certification?.nom || ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="ex: Certification UX"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Organisme
        </label>
        <input
          type="text"
          name="organisme"
          defaultValue={certification?.organisme || ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="ex: Google"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date d'obtention
        </label>
        <input
          type="text"
          name="date"
          defaultValue={certification?.date || ''}
          placeholder="2023"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
          {certification ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default CertificationsForm;