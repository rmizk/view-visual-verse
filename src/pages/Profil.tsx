import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LogOut } from 'lucide-react';
const Profil: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personnel');
  const {
    logout
  } = useAuth();
  const tabs = [{
    id: 'personnel',
    label: 'Informations personnelles'
  }, {
    id: 'parametres',
    label: 'Paramètres du profil'
  }, {
    id: 'securite',
    label: 'Sécurité'
  }];
  const breadcrumbItems = [{
    label: "Profil utilisateur"
  }];
  const handleLogout = () => {
    logout();
  };
  return <Layout pageTitle="Profil" breadcrumbItems={breadcrumbItems}>
      {/* Header */}
      <div className="flex h-10 justify-between items-center self-stretch max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:h-auto">
        <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
          Mon profil
        </h1>
        <div className="flex items-start gap-3 max-sm:flex-col max-sm:w-full max-sm:gap-2">
          <button className="flex min-w-16 justify-center items-center bg-slate-900 px-2 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
            <span className="text-slate-50 text-sm font-normal leading-[23.94px] px-1 py-0">
              Sauvegarder
            </span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNavigation tabs={tabs} onTabChange={setActiveTab} defaultActiveTab="personnel" />

      {/* Profile Content */}
      <div className="flex flex-col items-start gap-4 self-stretch">
        <div className="w-full bg-white border border-slate-200 rounded-lg p-6">
          {activeTab === 'personnel' && <div className="space-y-6">
              <div className="flex items-center gap-6 mb-6">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" alt="Photo de profil" className="w-20 h-20 rounded-md object-cover" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">Ramzi Hammami</h3>
                  <p className="text-slate-600">Administrateur</p>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                    Changer la photo
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Prénom
                  </label>
                  <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500" defaultValue="Ramzi" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nom
                  </label>
                  <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500" defaultValue="Hammami" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input type="email" className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500" defaultValue="ramzi.hammami@zetabox.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Téléphone
                  </label>
                  <input type="tel" className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500" defaultValue="+33 1 23 45 67 89" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Département
                  </label>

                   {/*  <select className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500">
                    <option>Administration</option>
                    <option>Développement</option>
                    <option>Marketing</option>
                    </select> 
                    */}

                   <Select>
                               <SelectTrigger className="w-full text-md font-normal mb-2">
                                 <SelectValue placeholder="Sélectionner le département ..." />
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="administration">Administration</SelectItem>
                                 <SelectItem value="développement">Développement</SelectItem>
                                 <SelectItem value="ux/ui design">UX/UI Design</SelectItem>
                                 <SelectItem value="vente">Venteee</SelectItem>
                               </SelectContent>
                             </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Poste
                  </label>
                  <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500" defaultValue="Administrateur système" />
                </div>
              </div>
            </div>}

          {activeTab === 'parametres' && <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-950 mb-4">Paramètres du profil</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Langue préférée
                    </label>
                    <select className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500">
                      <option>Français</option>
                      <option>English</option>
                      <option>Español</option>
                    </select>
                  </div>
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Notifications par email</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Notifications push</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                </div>
              </div>
            </div>}

          {activeTab === 'securite' && <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-950 mb-4">Sécurité du compte</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Mot de passe actuel
                    </label>
                    <input type="password" className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nouveau mot de passe
                    </label>
                    <input type="password" className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Confirmer le nouveau mot de passe
                    </label>
                    <input type="password" className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Authentification à deux facteurs</span>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Changer le mot de passe
                  </button>
                </div>
              </div>
            </div>}
        </div>

        {/* Logout Section */}
        <div className="w-full bg-white border border-slate-200 rounded-lg p-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-950 mb-4">Zone de déconnexion</h3>
            <p className="text-sm text-slate-600 mb-4">
              Déconnectez-vous de votre compte pour sécuriser votre session.
            </p>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex min-w-16 justify-center items-center bg-slate-900 px-4 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <LogOut size={16} />
                  Se déconnecter
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmation de déconnexion</AlertDialogTitle>
                  <AlertDialogDescription>
                    Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à votre compte.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout} className="flex min-w-16 justify-center items-center bg-slate-900 px-4 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                    Se déconnecter
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </Layout>;
};
export default Profil;