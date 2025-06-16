
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { Monitor } from 'lucide-react';

const Pointeuses: React.FC = () => {
  const [activeTab, setActiveTab] = useState('actives');

  const tabs = [
    { id: 'actives', label: 'Pointeuses actives' },
    { id: 'configuration', label: 'Configuration' },
    { id: 'maintenance', label: 'Maintenance' }
  ];

  const handleManagePointeuses = () => {
    alert('Gestion des pointeuses...');
  };

  const pointeusesData = [
    { id: '1', nom: 'Pointeuse Entrée Principale', localisation: 'Hall d\'accueil', statut: 'active', dernierPointage: '14:32', employeesUtilises: 23 },
    { id: '2', nom: 'Pointeuse Étage 2', localisation: 'Open Space', statut: 'active', dernierPointage: '14:28', employeesUtilises: 15 },
    { id: '3', nom: 'Pointeuse Cafétéria', localisation: 'Espace pause', statut: 'inactive', dernierPointage: '12:45', employeesUtilises: 8 },
    { id: '4', nom: 'Pointeuse Parking', localisation: 'Extérieur', statut: 'maintenance', dernierPointage: '13:20', employeesUtilises: 12 },
    { id: '5', nom: 'Pointeuse Mobile', localisation: 'Télétravail', statut: 'active', dernierPointage: '14:15', employeesUtilises: 6 },
  ];

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'maintenance':
        return 'Maintenance';
      default:
        return 'Inconnu';
    }
  };

  const breadcrumbItems = [
    { label: "Présence et pointage" },
    { label: "Pointeuses" }
  ];

  return (
    <Layout pageTitle="Présence et pointage" breadcrumbItems={breadcrumbItems}>
      {/* Header */}
      <div className="flex h-10 justify-between items-center self-stretch max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:h-auto">
        <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
          Gestion des pointeuses
        </h1>
        <div className="flex items-start gap-3 max-sm:flex-col max-sm:w-full max-sm:gap-2">
          <button 
            onClick={handleManagePointeuses}
            className="flex min-w-16 justify-center items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            <Monitor className="w-4 h-4 text-slate-50" />
            <span className="text-slate-50 text-sm font-normal leading-[23.94px]">
              Ajouter pointeuse
            </span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNavigation 
        tabs={tabs}
        onTabChange={setActiveTab}
        defaultActiveTab="actives"
      />

      {/* Pointeuses Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-600">3</h3>
          <p className="text-sm text-slate-600">Pointeuses actives</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-600">1</h3>
          <p className="text-sm text-slate-600">Pointeuses inactives</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-orange-600">1</h3>
          <p className="text-sm text-slate-600">En maintenance</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-600">64</h3>
          <p className="text-sm text-slate-600">Pointages aujourd'hui</p>
        </div>
      </div>

      {/* Pointeuses Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {pointeusesData.map((pointeuse) => (
          <div key={pointeuse.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-slate-950 text-lg font-semibold">{pointeuse.nom}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pointeuse.statut)}`}>
                {getStatusLabel(pointeuse.statut)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-slate-500 text-sm">Localisation:</span>
                <span className="text-slate-950 text-sm font-medium">{pointeuse.localisation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-sm">Dernier pointage:</span>
                <span className="text-slate-950 text-sm font-medium">{pointeuse.dernierPointage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-sm">Utilisations:</span>
                <span className="text-slate-950 text-sm font-medium">{pointeuse.employeesUtilises} employés</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
                Configurer
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors">
                Détails
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Pointeuses;
