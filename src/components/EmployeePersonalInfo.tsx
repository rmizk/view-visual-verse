
import React from 'react';

interface Employee {
  id: string;
  nom: string;
  prenom: string;
  poste: string;
  departement: string;
  statut: 'present' | 'absent' | 'conge';
  email: string;
  telephone: string;
  dateEmbauche: string;
  role: 'admin' | 'manager' | 'employe';
}

interface EmployeePersonalInfoProps {
  employee: Employee;
}

export const EmployeePersonalInfo: React.FC<EmployeePersonalInfoProps> = ({ employee }) => {
  const getStatusColor = (statut: Employee['statut']) => {
    switch (statut) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'conge':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (statut: Employee['statut']) => {
    switch (statut) {
      case 'present':
        return 'Présent';
      case 'absent':
        return 'Absent';
      case 'conge':
        return 'En congé';
      default:
        return 'Inconnu';
    }
  };

  const getRoleLabel = (role: Employee['role']) => {
    switch (role) {
      case 'admin':
        return 'Administrateur';
      case 'manager':
        return 'Manager';
      case 'employe':
        return 'Employé';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-lg p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center">
            <span className="text-xl font-medium text-slate-700">
              {employee.prenom[0]}{employee.nom[0]}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-950">
              {employee.prenom} {employee.nom}
            </h3>
            <p className="text-slate-600">{employee.poste}</p>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-2 ${getStatusColor(employee.statut)}`}>
              {getStatusLabel(employee.statut)}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Prénom
            </label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-md px-3 py-2 bg-slate-50 cursor-not-allowed"
              value={employee.prenom}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nom
            </label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-md px-3 py-2 bg-slate-50 cursor-not-allowed"
              value={employee.nom}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-slate-300 rounded-md px-3 py-2 bg-slate-50 cursor-not-allowed"
              value={employee.email}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              className="w-full border border-slate-300 rounded-md px-3 py-2 bg-slate-50 cursor-not-allowed"
              value={employee.telephone}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Département
            </label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-md px-3 py-2 bg-slate-50 cursor-not-allowed"
              value={employee.departement}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Poste
            </label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-md px-3 py-2 bg-slate-50 cursor-not-allowed"
              value={employee.poste}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Date d'embauche
            </label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-md px-3 py-2 bg-slate-50 cursor-not-allowed"
              value={employee.dateEmbauche}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Rôle
            </label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-md px-3 py-2 bg-slate-50 cursor-not-allowed"
              value={getRoleLabel(employee.role)}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};
