
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { Users, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Presence: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('temps-reel');

  const tabs = [
    { id: 'temps-reel', label: 'Temps réel' },
    { id: 'hebdomadaire', label: 'Vue hebdomadaire' },
    { id: 'mensuelle', label: 'Vue mensuelle' }
  ];

  const isEmployee = user?.role === 'employee';

  const handleViewPresence = () => {
    alert('Affichage de la présence en temps réel...');
  };

  // Employee-specific presence data
  const employeePresenceData = [
    { date: '20 Nov 2024', status: 'present', arrival: '08:45', departure: '17:15', totalHours: '8h30', difference: '+15min', hasAnomaly: false },
    { date: '19 Nov 2024', status: 'present', arrival: '08:30', departure: '17:00', totalHours: '8h30', difference: '0', hasAnomaly: false },
    { date: '18 Nov 2024', status: 'present', arrival: '09:15', departure: '17:00', totalHours: '7h45', difference: '-45min', hasAnomaly: true },
    { date: '17 Nov 2024', status: 'absent', arrival: '-', departure: '-', totalHours: '0h', difference: '-8h', hasAnomaly: true },
    { date: '16 Nov 2024', status: 'present', arrival: '08:45', departure: '17:30', totalHours: '8h45', difference: '+30min', hasAnomaly: false },
  ];

  // Admin presence data
  const presenceData = [
    { id: '1', employee: 'Marie Dubois', status: 'present', arrival: '08:45', location: 'Bureau principal' },
    { id: '2', employee: 'Pierre Martin', status: 'present', arrival: '09:00', location: 'Télétravail' },
    { id: '3', employee: 'Sophie Laurent', status: 'absent', arrival: '-', location: '-' },
    { id: '4', employee: 'Jean Durand', status: 'pause', arrival: '08:30', location: 'Bureau principal' },
    { id: '5', employee: 'Lucie Bernard', status: 'present', arrival: '08:15', location: 'Bureau annexe' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'pause':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present':
        return 'Présent';
      case 'absent':
        return 'Absent';
      case 'pause':
        return 'En pause';
      default:
        return 'Inconnu';
    }
  };

  const breadcrumbItems = [
    { label: "Présence et pointage" },
    { label: "Présence" }
  ];

  const getPageTitle = () => {
    return isEmployee ? 'Ma présence' : 'Présence en temps réel';
  };

  return (
    <Layout pageTitle="Présence et pointage" breadcrumbItems={breadcrumbItems}>
      {/* Header */}
      <div className="flex h-10 justify-between items-center self-stretch max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:h-auto">
        <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
          {getPageTitle()}
        </h1>
        {!isEmployee && (
          <div className="flex items-start gap-3 max-sm:flex-col max-sm:w-full max-sm:gap-2">
            <button 
              onClick={handleViewPresence}
              className="flex min-w-16 justify-center items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              <Users className="w-4 h-4 text-slate-50" />
              <span className="text-slate-50 text-sm font-normal leading-[23.94px]">
                Actualiser
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      {!isEmployee && (
        <TabNavigation 
          tabs={tabs}
          onTabChange={setActiveTab}
          defaultActiveTab="temps-reel"
        />
      )}

      {isEmployee ? (
        /* Employee View */
        <div className="space-y-6">
          {/* Employee Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-600">142h</h3>
              <p className="text-sm text-slate-600">Heures ce mois</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600">4/5</h3>
              <p className="text-sm text-slate-600">Jours présents cette semaine</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-orange-600">2</h3>
              <p className="text-sm text-slate-600">Anomalies à justifier</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-600">8h30</h3>
              <p className="text-sm text-slate-600">Moyenne quotidienne</p>
            </div>
          </div>

          {/* Employee Presence Table */}
          <div className="w-full bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-950">Historique de présence</h3>
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
                      Statut
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Arrivée
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Départ
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Écart
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Anomalie
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {employeePresenceData.map((record, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{record.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                          {getStatusLabel(record.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.arrival}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.departure}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.totalHours}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${record.difference.includes('-') ? 'text-red-600' : record.difference.includes('+') ? 'text-green-600' : 'text-slate-900'}`}>
                          {record.difference}
                        </div>
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
        </div>
      ) : (
        /* Admin/Responsable View */
        <>
          {/* Presence Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-600">18</h3>
              <p className="text-sm text-slate-600">Employés présents</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-600">3</h3>
              <p className="text-sm text-slate-600">Employés absents</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-orange-600">2</h3>
              <p className="text-sm text-slate-600">En pause</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600">78%</h3>
              <p className="text-sm text-slate-600">Taux de présence</p>
            </div>
          </div>

          {/* Presence Table */}
          <div className="w-full bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Employé
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Arrivée
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Localisation
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {presenceData.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{record.employee}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                          {getStatusLabel(record.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.arrival}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.location}</div>
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

export default Presence;
