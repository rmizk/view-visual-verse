
import React from 'react';

interface CreateEmployeeFormProps {
  onBack: () => void;
}

export const CreateEmployeeForm: React.FC<CreateEmployeeFormProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col items-start gap-4 self-stretch">
      <div className="w-full bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-950 mb-4">Créer un nouvel employé</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Prénom
            </label>
            <input 
              type="text" 
              placeholder="Prénom de l'employé"
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nom
            </label>
            <input 
              type="text" 
              placeholder="Nom de l'employé"
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input 
              type="email" 
              placeholder="email@timetrack.com"
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Poste
            </label>
            <input 
              type="text" 
              placeholder="Poste de l'employé"
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Département
            </label>
            <select className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500">
              <option>Sélectionner le département...</option>
              <option>Développement</option>
              <option>Marketing</option>
              <option>RH</option>
              <option>Ventes</option>
              <option>Comptabilité</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Statut
            </label>
            <select className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500">
              <option value="present">Présent</option>
              <option value="absent">Absent</option>
              <option value="conge">En congé</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button 
            onClick={onBack}
            className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
          >
            Annuler
          </button>
          <button 
            onClick={() => {
              alert('Employé créé avec succès !');
              onBack();
            }}
            className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800"
          >
            Créer l'employé
          </button>
        </div>
      </div>
    </div>
  );
};
