
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { PlanningOverview } from '@/components/planning/PlanningOverview';
import { PlanningsList } from '@/components/planning/PlanningsList';
import { PlanningCreationForm } from '@/components/planning/PlanningCreationForm';
import { Button } from '@/components/ui/button';
import { Plus, Calendar } from 'lucide-react';
import { planningTabs, planningBreadcrumbs } from '@/utils/planningConfig';
import { useAuth } from '@/contexts/AuthContext';

const Planning: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreationForm, setShowCreationForm] = useState(false);

  const isEmployee = user?.role === 'employee';

  // Employee-specific planning data (only assigned plannings)
  const employeePlannings = [
    {
      id: '1',
      name: 'Planning Matin - Équipe A',
      type: 'Shift',
      duration: '8h',
      workDays: 'Lun-Ven',
      activeDates: '01/11/2024 - 30/11/2024',
      status: 'Actif',
      timeSlot: '08:00 - 16:00',
      location: 'Bureau principal'
    },
    {
      id: '2',
      name: 'Planning Weekend',
      type: 'Variable',
      duration: '6h',
      workDays: 'Sam-Dim',
      activeDates: '02/11/2024 - 30/11/2024',
      status: 'Actif',
      timeSlot: '10:00 - 16:00',
      location: 'Bureau annexe'
    },
    {
      id: '3',
      name: 'Planning Soir - Rotation',
      type: 'Flexible',
      duration: '7h',
      workDays: 'Mer-Ven',
      activeDates: '15/11/2024 - 15/12/2024',
      status: 'Programmé',
      timeSlot: '14:00 - 21:00',
      location: 'Télétravail'
    }
  ];

  const handleCreatePlanning = () => {
    if (!isEmployee) {
      setShowCreationForm(true);
    }
  };

  const handleCloseForm = () => {
    setShowCreationForm(false);
  };

  const getPageTitle = () => {
    return isEmployee ? 'Mes plannings' : 'Planning';
  };

  const getPageDescription = () => {
    return isEmployee ? 'Consultez vos plannings assignés' : 'Gestion des plannings';
  };

  return (
    <Layout pageTitle="Planning" breadcrumbItems={planningBreadcrumbs}>
      <div className="space-y-6">
        {/* Page Title with CTA */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{getPageTitle()}</h1>
            {isEmployee && (
              <p className="text-slate-600 mt-1">{getPageDescription()}</p>
            )}
          </div>
          {!isEmployee && (
            <Button onClick={handleCreatePlanning} className="bg-slate-900 hover:bg-slate-800">
              <Plus className="w-4 h-4 mr-2" />
              Créer un planning
            </Button>
          )}
        </div>

        {/* Employee-specific content */}
        {isEmployee ? (
          <div className="space-y-6">
            {/* Employee Planning Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employeePlannings.map((planning) => (
                <div key={planning.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-950">{planning.name}</h3>
                        <p className="text-sm text-slate-600">{planning.type}</p>
                      </div>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      planning.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {planning.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Horaires:</span>
                      <span className="text-slate-700 font-medium">{planning.timeSlot}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Jours:</span>
                      <span className="text-slate-700 font-medium">{planning.workDays}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Durée:</span>
                      <span className="text-slate-700 font-medium">{planning.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Lieu:</span>
                      <span className="text-slate-700 font-medium">{planning.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Période:</span>
                      <span className="text-slate-700 font-medium">{planning.activeDates}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-md transition-colors">
                    Voir les détails
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Mode employé:</strong> Vous ne pouvez consulter que les plannings qui vous sont assignés. Pour toute modification, contactez votre responsable.
              </p>
            </div>
          </div>
        ) : (
          // Admin/Responsable content
          <>
            {/* Tab Navigation */}
            <TabNavigation 
              tabs={planningTabs}
              onTabChange={setActiveTab}
              defaultActiveTab="overview"
            />

            {/* Planning Creation Form */}
            {showCreationForm && (
              <PlanningCreationForm onClose={handleCloseForm} />
            )}

            {/* Tab Content */}
            {!showCreationForm && (
              <>
                {activeTab === 'overview' && <PlanningOverview />}
                {activeTab === 'plannings' && <PlanningsList showCreateButton={true} />}
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Planning;
