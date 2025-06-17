
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { PlanningOverview } from '@/components/planning/PlanningOverview';
import { PlanningsList } from '@/components/planning/PlanningsList';
import { planningTabs, planningBreadcrumbs } from '@/utils/planningConfig';

const Planning: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Layout pageTitle="Planning" breadcrumbItems={planningBreadcrumbs}>
      <div className="space-y-6">
        {/* Page Title */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">Planning</h1>
        </div>

        {/* Tab Navigation */}
        <TabNavigation 
          tabs={planningTabs}
          onTabChange={setActiveTab}
          defaultActiveTab="overview"
        />

        {/* Tab Content */}
        {activeTab === 'overview' && <PlanningOverview />}
        {activeTab === 'plannings' && <PlanningsList />}
      </div>
    </Layout>
  );
};

export default Planning;
