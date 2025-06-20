
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Filter, User } from 'lucide-react';

const Employes: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const employeesData = [
    {
      id: '1',
      name: 'Hassen Knani',
      email: 'employe@gmail.com',
      department: 'Développement',
      function: 'Développeur Frontend',
      status: 'Actif',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Sarah Bentahar',
      email: 'responsable@gmail.com',
      department: 'Ressources Humaines',
      function: 'Responsable RH',
      status: 'Actif',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Ramzi Hammami',
      email: 'rmiz@gmail.com',
      department: 'Administration',
      function: 'Administrateur',
      status: 'Actif',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Marie Dubois',
      email: 'marie.dubois@company.com',
      department: 'Marketing',
      function: 'Chef de projet Marketing',
      status: 'Actif',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: '5',
      name: 'Pierre Martin',
      email: 'pierre.martin@company.com',
      department: 'Support Client',
      function: 'Technicien Support',
      status: 'Actif',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
    }
  ];

  const departments = ['Tous', 'Développement', 'Ressources Humaines', 'Administration', 'Marketing', 'Support Client'];

  const filteredEmployees = employeesData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.function.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === '' || selectedDepartment === 'Tous' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const breadcrumbItems = [
    { label: "Entreprise" },
    { label: "Employés" }
  ];

  const isEmployee = user?.role === 'employee';

  return (
    <Layout pageTitle="Entreprise" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex h-10 justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:h-auto">
          <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
            Employés
          </h1>
          {!isEmployee && (
            <div className="flex items-start gap-3 max-sm:flex-col max-sm:w-full max-sm:gap-2">
              <button className="flex min-w-16 justify-center items-center bg-slate-900 px-2 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                <span className="text-slate-50 text-sm font-normal leading-[23.94px] px-1 py-0">
                  Ajouter employé
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 flex-wrap">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher un employé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="pl-10 pr-8 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent appearance-none bg-white"
            >
              {departments.map(dept => (
                <option key={dept} value={dept === 'Tous' ? '' : dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Employees Table */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Employé
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Département
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Fonction
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Statut
                  </th>
                  {!isEmployee && (
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="text-sm font-medium text-slate-900">{employee.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{employee.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{employee.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{employee.function}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {employee.status}
                      </span>
                    </td>
                    {!isEmployee && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">Modifier</button>
                        <button className="text-red-600 hover:text-red-800">Supprimer</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isEmployee && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Mode lecture seule:</strong> Vous pouvez consulter la liste des employés mais ne pouvez pas les modifier.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Employes;
