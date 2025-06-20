
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Users } from 'lucide-react';

const Departements: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const departmentsData = [
    {
      id: '1',
      name: 'Ressources Humaines',
      responsible: 'Sarah Bentahar',
      employeeCount: 8,
      description: 'Gestion du personnel et recrutement'
    },
    {
      id: '2',
      name: 'Développement',
      responsible: 'Marc Dubois',
      employeeCount: 12,
      description: 'Développement logiciel et applications'
    },
    {
      id: '3',
      name: 'Marketing',
      responsible: 'Claire Martin',
      employeeCount: 6,
      description: 'Communication et marketing digital'
    },
    {
      id: '4',
      name: 'Administration',
      responsible: 'Ramzi Hammami',
      employeeCount: 4,
      description: 'Gestion administrative et financière'
    },
    {
      id: '5',
      name: 'Support Client',
      responsible: 'Julie Moreau',
      employeeCount: 5,
      description: 'Support technique et relation client'
    }
  ];

  const filteredDepartments = departmentsData.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.responsible.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const breadcrumbItems = [
    { label: "Entreprise" },
    { label: "Départements" }
  ];

  const isEmployee = user?.role === 'employee';

  return (
    <Layout pageTitle="Entreprise" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex h-10 justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:h-auto">
          <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
            Départements
          </h1>
          {!isEmployee && (
            <div className="flex items-start gap-3 max-sm:flex-col max-sm:w-full max-sm:gap-2">
              <button className="flex min-w-16 justify-center items-center bg-slate-900 px-2 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                <span className="text-slate-50 text-sm font-normal leading-[23.94px] px-1 py-0">
                  Ajouter département
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher un département..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          />
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <div key={department.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">{department.name}</h3>
                    <p className="text-sm text-slate-600">{department.employeeCount} employé(s)</p>
                  </div>
                </div>
                {!isEmployee && (
                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 3.33334C8.36667 3.33334 8.66667 3.03334 8.66667 2.66668C8.66667 2.30001 8.36667 2.00001 8 2.00001C7.63333 2.00001 7.33333 2.30001 7.33333 2.66668C7.33333 3.03334 7.63333 3.33334 8 3.33334ZM8 8.66668C8.36667 8.66668 8.66667 8.36668 8.66667 8.00001C8.66667 7.63334 8.36667 7.33334 8 7.33334C7.63333 7.33334 7.33333 7.63334 7.33333 8.00001C7.33333 8.36668 7.63333 8.66668 8 8.66668ZM8 14C8.36667 14 8.66667 13.7 8.66667 13.3333C8.66667 12.9667 8.36667 12.6667 8 12.6667C7.63333 12.6667 7.33333 12.9667 7.33333 13.3333C7.33333 13.7 7.63333 14 8 14Z" fill="currentColor"/>
                    </svg>
                  </button>
                )}
              </div>
              
              <p className="text-sm text-slate-600 mb-4">{department.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Responsable:</span>
                  <span className="text-slate-700 font-medium">{department.responsible}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isEmployee && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Mode lecture seule:</strong> Vous pouvez consulter les informations des départements mais ne pouvez pas les modifier.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Departements;
