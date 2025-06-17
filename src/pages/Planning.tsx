
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
      <TabNavigation 
        tabs={planningTabs}
        onTabChange={setActiveTab}
        defaultActiveTab="overview"
      />

      {activeTab === 'overview' && <PlanningOverview />}
      {activeTab === 'plannings' && <PlanningsList />}
    </Layout>
  );
};

export default Planning;
