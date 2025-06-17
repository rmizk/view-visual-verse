
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { PlanningOverview } from '@/components/planning/PlanningOverview';
import { PlanningsList } from '@/components/planning/PlanningsList';
import { PlanningCreationForm } from '@/components/planning/PlanningCreationForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { planningTabs, planningBreadcrumbs } from '@/utils/planningConfig';

const Planning: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreationForm, setShowCreationForm] = useState(false);

  const handleCreatePlanning = () => {
    setShowCreationForm(true);
  };

  const handleCloseForm = () => {
    setShowCreationForm(false);
  };

  return (
    <Layout pageTitle="Planning" breadcrumbItems={planningBreadcrumbs}>
      <div className="space-y-6">
        {/* Page Title with CTA */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">Planning</h1>
          <Button onClick={handleCreatePlanning} className="bg-slate-900 hover:bg-slate-800">
            <Plus className="w-4 h-4 mr-2" />
            Créer un planning
          </Button>
        </div>

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
      </div>
    </Layout>
  );
};

export default Planning;
