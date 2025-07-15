
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { EmptyState } from '@/components/organization/EmptyState';
import { StructureBuilder } from '@/components/organization/StructureBuilder';

interface OrganizationNode {
  id: string;
  name: string;
  type: 'department' | 'team' | 'position';
  children: OrganizationNode[];
}

const OrganizationStructure = () => {
  const [currentView, setCurrentView] = useState<'empty' | 'builder' | 'view'>('empty');
  const [organizationStructure, setOrganizationStructure] = useState<OrganizationNode[]>([]);

  const handleCreateStructure = () => {
    setCurrentView('builder');
  };

  const handleBackToEmpty = () => {
    setCurrentView('empty');
  };

  const handleSaveStructure = (structure: OrganizationNode[]) => {
    setOrganizationStructure(structure);
    setCurrentView('view');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'empty':
        return <EmptyState onCreateStructure={handleCreateStructure} />;
      case 'builder':
        return (
          <StructureBuilder
            onBack={handleBackToEmpty}
            onSave={handleSaveStructure}
            initialStructure={organizationStructure}
          />
        );
      case 'view':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Structure organisationnelle</h2>
              <button
                onClick={() => setCurrentView('builder')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Modifier
              </button>
            </div>
            {/* This would show the saved structure - we can implement this later */}
            <div className="p-8 border rounded-lg bg-gray-50">
              <p className="text-gray-600">Structure sauvegardée avec {organizationStructure.length} nœud(s) racine</p>
            </div>
          </div>
        );
      default:
        return <EmptyState onCreateStructure={handleCreateStructure} />;
    }
  };

  return (
    <Layout
      pageTitle="Structure organisationnelle"
      breadcrumbItems={[
        { label: "Paramètres", href: "/parametres" },
        { label: "Structure organisationnelle" }
      ]}
    >
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default OrganizationStructure;
