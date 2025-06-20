
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { Clock, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Pointages: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('historique');

  const tabs = [
    { id: 'historique', label: 'Historique' },
    { id: 'corrections', label: 'Corrections' },
    { id: 'validations', label: 'Validations' }
  ];

  const isEmployee = user?.role === 'employee';

  const handleManagePointage = () => {
    if (isEmployee) {
      alert('Demande de correction envoyée...');
    } else {
      alert('Gestion des pointages...');
    }
  };

  // Employee-specific pointage data
  const employeePointageData = [
    { id: '1', date: '20 Nov 2024', entree: '08:45', sortie: '17:15', duree: '8h30', statut: 'valide', pointages: 2, hasAnomaly: false },
    { id: '2', date: '19 Nov 2024', entree: '08:30', sortie: '17:00', duree: '8h30', statut: 'valide', pointages: 2, hasAnomaly: false },
    { id: '3', date: '18 Nov 2024', entree: '09:15', sortie: '17:00', duree: '7h45', statut: 'en-attente', pointages: 2, hasAnomaly: true },
    { id: '4', date: '17 Nov 2024', entree: '08:15', sortie: '-', duree: '-', statut: 'incomplete', pointages: 1, hasAnomaly: true },
    { id: '5', date: '16 Nov 2024', entree: '08:45', sortie: '17:30', duree: '8h45', statut: 'corrige', pointages: 4, hasAnomaly: false },
  ];

  // Admin pointage data
  const pointageData = [
    { id: '1', employee: 'Marie Dubois', date: '15 Nov 2024', entree: '08:45', sortie: '17:15', duree: '8h30', statut: 'valide' },
    { id: '2', employee: 'Pierre Martin', date: '15 Nov 2024', entree: '09:00', sortie: '18:00', duree: '8h45', statut: 'en-attente' },
    { id: '3', employee: 'Sophie Laurent', date: '15 Nov 2024', entree: '08:30', sortie: '16:45', duree: '8h15', statut: 'corrige' },
    { id: '4', employee: 'Jean Durand', date: '15 Nov 2024', entree: '08:15', sortie: '17:30', duree: '9h15', statut: 'valide' },
    { id: '5', employee: 'Lucie Bernard', date: '15 Nov 2024', entree: '09:15', sortie: '17:45', duree: '8h30', statut: 'en-attente' },
  ];

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'valide':
        return 'bg-green-100 text-green-800';
      case 'en-attente':
        return 'bg-orange-100 text-orange-800';
      case 'corrige':
        return 'bg-blue-100 text-blue-800';
      case 'incomplete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case 'valide':
        return 'Validé';
      case 'en-attente':
        return 'En attente';
      case 'corrige':
        return 'Corrigé';
      case 'incomplete':
        return 'Incomplet';
      default:
        return statut;
    }
  };

  const breadcrumbItems = [
    { label: "Présence et pointage" },
    { label: "Pointages" }
  ];

  const getPageTitle = () => {
    return isEmployee ? 'Mes pointages' : 'Gestion des pointages';
  };

  const getButtonText = () => {
    return isEmployee ? 'Demander une correction' : 'Corriger pointage';
  };

  return (
    <Layout pageTitle="Présence et pointage" breadcrumbItems={breadcrumbItems}>
      {/* Header */}
      <div className="flex h-10 justify-between items-center self-stretch max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:h-auto">
        <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
          {getPageTitle()}
        </h1>
        <div className="flex items-start gap-3 max-sm:flex-col max-sm:w-full max-sm:gap-2">
          <button 
            onClick={handleManagePointage}
            className="flex min-w-16 justify-center items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            <Clock className="w-4 h-4 text-slate-50" />
            <span className="text-slate-50 text-sm font-normal leading-[23.94px]">
              {getButtonText()}
            </span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      {!isEmployee && (
        <TabNavigation 
          tabs={tabs}
          onTabChange={setActiveTab}
          defaultActiveTab="historique"
        />
      )}

      {isEmployee ? (
        /* Employee View */
        <div className="space-y-6">
          {/* Employee Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-600">28</h3>
              <p className="text-sm text-slate-600">Pointages validés ce mois</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-orange-600">2</h3>
              <p className="text-sm text-slate-600">En attente de validation</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600">1</h3>
              <p className="text-sm text-slate-600">Corrections appliquées</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-600">1</h3>
              <p className="text-sm text-slate-600">Pointages incomplets</p>
            </div>
          </div>

          {/* Employee Pointage Table */}
          <div className="w-full bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-950">Historique des pointages</h3>
              <p className="text-sm text-slate-600">Vos pointages des derniers jours</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Entrée
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Sortie
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Durée
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Pointages
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Anomalie
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {employeePointageData.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{record.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.entree}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.sortie}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.duree}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${record.pointages % 2 !== 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {record.pointages} {record.pointages % 2 !== 0 ? '(impair)' : '(pair)'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.statut)}`}>
                          {getStatusLabel(record.statut)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.hasAnomaly && (
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Mode employé:</strong> Vous ne pouvez consulter que vos propres pointages. En cas d'anomalie, vous pouvez demander une correction à votre responsable.
            </p>
          </div>
        </div>
      ) : (
        /* Admin/Responsable View */
        <>
          {/* Pointage Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-600">142</h3>
              <p className="text-sm text-slate-600">Pointages valides</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-orange-600">8</h3>
              <p className="text-sm text-slate-600">En attente de validation</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600">5</h3>
              <p className="text-sm text-slate-600">Corrections apportées</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-600">2</h3>
              <p className="text-sm text-slate-600">Pointages manquants</p>
            </div>
          </div>

          {/* Pointage Table */}
          <div className="w-full bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Employé
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Entrée
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Sortie
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Durée
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {pointageData.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{record.employee}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.entree}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.sortie}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.duree}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.statut)}`}>
                          {record.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Pointages;
