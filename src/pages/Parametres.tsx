import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { Save, Building, Settings, Shield, Users, Bell } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Parametres: React.FC = () => {
  const [activeTab, setActiveTab] = useState('entreprise');

  const tabs = [
    { id: 'entreprise', label: 'Informations de l\'entreprise' },
    { id: 'general', label: 'Paramètres généraux' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'securite', label: 'Sécurité' },
    { id: 'utilisateurs', label: 'Gestion des utilisateurs' }
  ];

  const handleSaveSettings = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos paramètres ont été sauvegardés avec succès.",
    });
  };

  const breadcrumbItems = [
    { label: "Paramètres" }
  ];

  const ctaButton = (
    <button 
      onClick={handleSaveSettings}
      className="flex min-w-16 justify-center items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
    >
      <Save className="w-4 h-4 text-slate-50" />
      <span className="text-slate-50 text-sm font-normal leading-[23.94px]">
        Sauvegarder
      </span>
    </button>
  );

  return (
    <Layout pageTitle="Paramètres" breadcrumbItems={breadcrumbItems} ctaButton={ctaButton}>
      {/* Tab Navigation */}
      <TabNavigation 
        tabs={tabs}
        onTabChange={setActiveTab}
        defaultActiveTab="entreprise"
      />

      {/* Settings Content */}
      <div className="flex flex-col items-start gap-4 self-stretch">
        <div className="w-full bg-white border border-slate-200 rounded-lg p-6">
          {activeTab === 'entreprise' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Building className="w-6 h-6 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-950">Informations de l'entreprise</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nom de l'entreprise
                  </label>
                  <input 
                    type="text" 
                    defaultValue="TimeTrack Solutions" 
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Numéro SIRET
                  </label>
                  <input 
                    type="text" 
                    defaultValue="12345678901234" 
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Secteur d'activité
                  </label>
                  <select className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500">
                    <option>Technologie / Informatique</option>
                    <option>Commerce / Vente</option>
                    <option>Industrie / Manufacturing</option>
                    <option>Services / Conseil</option>
                    <option>Santé / Médical</option>
                    <option>Éducation / Formation</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nombre d'employés
                  </label>
                  <select className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500">
                    <option>1-10</option>
                    <option>11-50</option>
                    <option>51-200</option>
                    <option>201-500</option>
                    <option>500+</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Adresse du siège social
                  </label>
                  <textarea 
                    defaultValue="123 Rue de la Technologie, 75001 Paris, France"
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Téléphone principal
                  </label>
                  <input 
                    type="tel" 
                    defaultValue="+33 1 23 45 67 89" 
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email de contact
                  </label>
                  <input 
                    type="email" 
                    defaultValue="contact@timetrack.com" 
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Site web
                  </label>
                  <input 
                    type="url" 
                    defaultValue="https://www.timetrack.com" 
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Code postal
                  </label>
                  <input 
                    type="text" 
                    defaultValue="75001" 
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-950">Paramètres de notification</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Alertes de retard</h4>
                    <p className="text-xs text-slate-500">Recevoir des notifications pour les retards</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Rappels de pointage</h4>
                    <p className="text-xs text-slate-500">Rappels automatiques pour pointer</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Rapports hebdomadaires</h4>
                    <p className="text-xs text-slate-500">Recevoir un résumé hebdomadaire</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-950">Configuration générale</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Fuseau horaire
                  </label>
                  <select className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500">
                    <option>Europe/Paris</option>
                    <option>Europe/London</option>
                    <option>America/New_York</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Heures de travail par semaine
                  </label>
                  <input 
                    type="number" 
                    defaultValue="35" 
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Début de semaine
                  </label>
                  <select className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500">
                    <option>Lundi</option>
                    <option>Dimanche</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Format de date
                  </label>
                  <select className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'securite' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-950">Paramètres de sécurité</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Durée de session (minutes)
                  </label>
                  <input 
                    type="number" 
                    defaultValue="480" 
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Authentification à deux facteurs</h4>
                    <p className="text-xs text-slate-500">Sécurité renforcée pour les connexions</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Journal d'audit</h4>
                    <p className="text-xs text-slate-500">Enregistrer toutes les actions utilisateur</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'utilisateurs' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-950">Gestion des utilisateurs</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Auto-activation des comptes</h4>
                    <p className="text-xs text-slate-500">Activer automatiquement les nouveaux comptes</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Validation par email</h4>
                    <p className="text-xs text-slate-500">Exiger une validation email pour les nouveaux comptes</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Rôle par défaut pour nouveaux utilisateurs
                  </label>
                  <select className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500">
                    <option value="employe">Employé</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Politique de mot de passe
                  </label>
                  <select className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500">
                    <option>Standard (8 caractères min)</option>
                    <option>Renforcée (12 caractères, majuscules, chiffres)</option>
                    <option>Très forte (16 caractères, symboles obligatoires)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Parametres;
