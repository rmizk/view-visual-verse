
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PlanningOverview } from '@/components/planning/PlanningOverview';
import { PlanningCreationForm } from '@/components/planning/PlanningCreationForm';
import { TabNavigation } from '@/components/TabNavigation';
import { PlanningsList } from '@/components/planning/PlanningsList';
import { HeaderCtaButton } from '@/components/ui/header-cta-button';

export default function Planning() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'plannings', label: 'Mes plannings' },
  ];

  const renderContent = () => {
    if (showCreateForm) {
      return <PlanningCreationForm onCancel={() => setShowCreateForm(false)} />;
    }

    switch (activeTab) {
      case 'overview':
        return <PlanningOverview />;
      case 'plannings':
        return <PlanningsList />;
      default:
        return <PlanningOverview />;
    }
  };

  const ctaButton = !showCreateForm ? (
    <HeaderCtaButton onClick={() => setShowCreateForm(true)}>
      <Plus className="w-4 h-4" />
      <span>Nouveau planning</span>
    </HeaderCtaButton>
  ) : null;

  return (
    <Layout
      pageTitle="Planning"
      breadcrumbItems={[
        { label: "Planning" }
      ]}
      ctaButton={ctaButton}
    >
      <div className="space-y-6">
        {!showCreateForm && (
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        )}
        {renderContent()}
      </div>
    </Layout>
  );
}
