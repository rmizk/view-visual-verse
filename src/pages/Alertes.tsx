
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { Plus } from 'lucide-react';

const Alertes: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recentes');

  const tabs = [
    { id: 'recentes', label: 'Alertes récentes' },
    { id: 'critiques', label: 'Alertes critiques' },
    { id: 'resolues', label: 'Alertes résolues' }
  ];

  const handleCreateAlert = () => {
    alert('Création d\'une nouvelle alerte...');
  };

  const alertes = [
    {
      id: '1',
      type: 'critique',
      titre: 'Retard important détecté',
      description: 'Marie Dubois est en retard de plus de 30 minutes',
      heure: '09:35',
      date: 'Aujourd\'hui',
      statut: 'non-resolu'
    },
    {
      id: '2',
      type: 'avertissement',
      titre: 'Absence non justifiée',
      description: 'Jean Martin n\'a pas pointé ce matin',
      heure: '08:00',
      date: 'Aujourd\'hui',
      statut: 'en-cours'
    },
    {
      id: '3',
      type: 'info',
      titre: 'Fin de contrat proche',
      description: 'Le contrat de Sophie Laurent expire dans 7 jours',
      heure: '14:20',
      date: 'Hier',
      statut: 'resolu'
    }
  ];

  const breadcrumbItems = [
    { label: "Alertes" }
  ];

  return (
    <Layout pageTitle="Alertes" breadcrumbItems={breadcrumbItems}>
      {/* Header */}
      <div className="flex h-10 justify-between items-center self-stretch max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:h-auto">
        <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
          Alertes système
        </h1>
        <div className="flex items-start gap-3 max-sm:flex-col max-sm:w-full max-sm:gap-2">
          <button 
            onClick={handleCreateAlert}
            className="flex min-w-16 justify-center items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            <Plus className="w-4 h-4 text-slate-50" />
            <span className="text-slate-50 text-sm font-normal leading-[23.94px]">
              Nouvelle alerte
            </span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNavigation 
        tabs={tabs}
        onTabChange={setActiveTab}
        defaultActiveTab="recentes"
      />

      {/* Alertes List */}
      <div className="flex flex-col items-start gap-4 self-stretch">
        <div className="w-full bg-white border border-slate-200 rounded-lg p-6">
          <div className="space-y-4">
            {alertes.map((alerte) => (
              <div key={alerte.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alerte.type === 'critique' ? 'bg-red-100 text-red-800' :
                      alerte.type === 'avertissement' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alerte.type}
                    </span>
                    <h3 className="font-semibold text-slate-950">{alerte.titre}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    alerte.statut === 'non-resolu' ? 'bg-red-100 text-red-800' :
                    alerte.statut === 'en-cours' ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {alerte.statut === 'non-resolu' ? 'Non résolu' :
                     alerte.statut === 'en-cours' ? 'En cours' : 'Résolu'}
                  </span>
                </div>
                <p className="text-slate-600 mb-2">{alerte.description}</p>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{alerte.date} à {alerte.heure}</span>
                  <button className="text-blue-600 hover:text-blue-800">
                    Voir détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Alertes;
