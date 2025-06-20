
import React from 'react';
import { Layout } from '@/components/Layout';

const Notifications: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Notifications' }
  ];

  return (
    <Layout pageTitle="Notifications" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <div className="flex h-10 justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:h-auto">
          <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
            Notifications
          </h1>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900">Nouveau planning assigné</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Vous avez été assigné au shift du matin (8:00 - 14:00) pour demain.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">Il y a 2 heures</p>
                </div>
              </div>
            </div>

            <div className="border-b border-slate-200 pb-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900">Pointage validé</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Votre pointage d'entrée de 8:00 a été validé par votre superviseur.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">Il y a 1 jour</p>
                </div>
              </div>
            </div>

            <div className="pb-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900">Rappel: Formation obligatoire</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    N'oubliez pas votre formation sécurité prévue vendredi à 14:00.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">Il y a 3 jours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
