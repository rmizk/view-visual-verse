
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { PlanningOverview } from '@/components/planning/PlanningOverview';
import { PlanningsList } from '@/components/planning/PlanningsList';

const Planning: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: "Vue d'ensemble" },
    { id: 'plannings', label: 'Plannings' }
  ];

  const breadcrumbItems = [
    { label: "Planning" }
  ];

  return (
    <Layout pageTitle="Planning" breadcrumbItems={breadcrumbItems}>
      {/* Tab Navigation */}
      <TabNavigation 
        tabs={tabs}
        onTabChange={setActiveTab}
        defaultActiveTab="overview"
      />

      {/* Content based on active tab */}
      {activeTab === 'overview' && <PlanningOverview />}
      {activeTab === 'plannings' && <PlanningsList />}
    </Layout>
  );
};

export default Planning;
