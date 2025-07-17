
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { EmptyState } from '@/components/organization/EmptyState';
import { StructureBuilder } from '@/components/organization/StructureBuilder';
import { Plus } from 'lucide-react';

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
        return <EmptyState />;
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
            <div className="p-8 border rounded-lg bg-gray-50">
              <p className="text-gray-600">Structure sauvegardée avec {organizationStructure.length} nœud(s) racine</p>
            </div>
          </div>
        );
      default:
        return <EmptyState />;
    }
  };

  // Simplified CTA button logic
  let ctaButton = null;
  
  if (currentView === 'empty') {
    ctaButton = (
      <button
        onClick={handleCreateStructure}
        className="flex min-w-16 justify-center items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
      >
        <Plus className="w-4 h-4 text-slate-50" />
        <span className="text-slate-50 text-sm font-normal leading-[23.94px]">
          Créer la structure
        </span>
      </button>
    );
  } else if (currentView === 'view') {
    ctaButton = (
      <button
        onClick={() => setCurrentView('builder')}
        className="flex min-w-16 justify-center items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
      >
        <Plus className="w-4 h-4 text-slate-50" />
        <span className="text-slate-50 text-sm font-normal leading-[23.94px]">
          Modifier
        </span>
      </button>
    );
  }

  return (
    <Layout
      pageTitle="Structure organisationnelle"
      breadcrumbItems={[
        { label: "Paramètres", href: "/parametres" },
        { label: "Structure organisationnelle" }
      ]}
      ctaButton={ctaButton}
    >
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default OrganizationStructure;
