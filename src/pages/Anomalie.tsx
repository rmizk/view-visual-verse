
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { AlertTriangle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Anomalie: React.FC = () => {
  const [activeTab, setActiveTab] = useState('detectees');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const tabs = [
    { id: 'detectees', label: 'Anomalies détectées' },
    { id: 'resolues', label: 'Anomalies résolues' },
    { id: 'configuration', label: 'Configuration' }
  ];

  const handleCreateAnomaly = () => {
    alert('Signalement d\'une nouvelle anomalie...');
  };

  const anomalies = [
    {
      id: '1',
      type: 'Retard excessif',
      employee: 'Pierre Martin',
      description: 'Retard de plus de 2 heures sans justification',
      date: '15 Nov 2024',
      heure: '10:30',
      statut: 'non-traite',
      severite: 'haute'
    },
    {
      id: '2',
      type: 'Absence non déclarée',
      employee: 'Sophie Laurent',
      description: 'Absence complète sans notification préalable',
      date: '14 Nov 2024',
      heure: '08:00',
      statut: 'en-cours',
      severite: 'critique'
    },
    {
      id: '3',
      type: 'Heures supplémentaires',
      employee: 'Jean Durand',
      description: 'Dépassement de 3 heures supplémentaires autorisées',
      date: '13 Nov 2024',
      heure: '20:00',
      statut: 'resolu',
      severite: 'moyenne'
    }
  ];

  const resolvedAnomalies = [
    {
      id: '4',
      type: 'Retard',
      employee: 'Marie Dubois',
      description: 'Retard de 45 minutes justifié par problème de transport',
      date: '10 Nov 2024',
      heure: '08:45',
      resolvedBy: 'Admin',
      resolvedDate: '10 Nov 2024'
    },
    {
      id: '5',
      type: 'Pointage manquant',
      employee: 'Paul Leroy',
      description: 'Oubli de pointage à la sortie',
      date: '09 Nov 2024',
      heure: '18:00',
      resolvedBy: 'RH',
      resolvedDate: '09 Nov 2024'
    }
  ];

  const getSeverityColor = (severite: string) => {
    switch (severite) {
      case 'critique':
        return 'bg-red-100 text-red-800';
      case 'haute':
        return 'bg-orange-100 text-orange-800';
      case 'moyenne':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'non-traite':
        return 'bg-red-100 text-red-800';
      case 'en-cours':
        return 'bg-orange-100 text-orange-800';
      case 'resolu':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const breadcrumbItems = [
    { label: "Anomalies" }
  ];

  return (
    <Layout pageTitle="Anomalies" breadcrumbItems={breadcrumbItems}>
      {/* Header */}
      <div className="flex h-10 justify-between items-center self-stretch max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:h-auto">
        <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
          Détection d'anomalies
        </h1>
        <div className="flex items-start gap-3 max-sm:flex-col max-sm:w-full max-sm:gap-2">
          <button 
            onClick={handleCreateAnomaly}
            className="flex min-w-16 justify-center items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            <AlertTriangle className="w-4 h-4 text-slate-50" />
            <span className="text-slate-50 text-sm font-normal leading-[23.94px]">
              Signaler anomalie
            </span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNavigation 
        tabs={tabs}
        onTabChange={setActiveTab}
        defaultActiveTab="detectees"
      />

      {/* Anomaly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-600">3</h3>
          <p className="text-sm text-slate-600">Anomalies critiques</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-orange-600">7</h3>
          <p className="text-sm text-slate-600">En cours de traitement</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-600">15</h3>
          <p className="text-sm text-slate-600">Résolues ce mois</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-600">94%</h3>
          <p className="text-sm text-slate-600">Taux de résolution</p>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'detectees' && (
        <div className="space-y-4">
          {anomalies.map((anomalie) => (
            <div key={anomalie.id} className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(anomalie.severite)}`}>
                    {anomalie.severite}
                  </span>
                  <h3 className="font-semibold text-slate-950">{anomalie.type}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(anomalie.statut)}`}>
                  {anomalie.statut === 'non-traite' ? 'Non traité' :
                   anomalie.statut === 'en-cours' ? 'En cours' : 'Résolu'}
                </span>
              </div>
              <p className="text-slate-600 mb-2">{anomalie.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-xs text-slate-500">
                  <span className="font-medium">{anomalie.employee}</span> - {anomalie.date} à {anomalie.heure}
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-xs"
                >
                  Traiter
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'resolues' && (
        <div className="space-y-4">
          {resolvedAnomalies.map((anomalie) => (
            <div key={anomalie.id} className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-950">{anomalie.type}</h3>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Résolu
                </span>
              </div>
              <p className="text-slate-600 mb-2">{anomalie.description}</p>
              <div className="flex justify-between items-center text-xs text-slate-500">
                <div>
                  <span className="font-medium">{anomalie.employee}</span> - {anomalie.date} à {anomalie.heure}
                </div>
                <div>
                  Résolu par {anomalie.resolvedBy} le {anomalie.resolvedDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'configuration' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-950 mb-4">Configuration des règles de détection</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Seuil de retard (minutes)
              </label>
              <Select defaultValue="30">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Limite d'heures supplémentaires (heures/semaine)
              </label>
              <Select defaultValue="10">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 heures</SelectItem>
                  <SelectItem value="10">10 heures</SelectItem>
                  <SelectItem value="15">15 heures</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Notification automatique
              </label>
              <Select defaultValue="immediate">
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immédiate</SelectItem>
                  <SelectItem value="daily">Quotidienne</SelectItem>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="mt-4">
              Enregistrer les paramètres
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Anomalie;
