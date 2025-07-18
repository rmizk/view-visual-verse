
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { EmptyState } from '@/components/organization/EmptyState';
import { StructureBuilder } from '@/components/organization/StructureBuilder';
import { OrganigramView } from '@/components/organization/OrganigramView';
import { HeaderCtaButton } from '@/components/ui/header-cta-button';

type ViewType = 'empty' | 'builder' | 'view';

interface OrganizationNode {
  id: string;
  name: string;
  type: 'department' | 'team' | 'position';
  children: OrganizationNode[];
}

export default function OrganizationStructure() {
  const [currentView, setCurrentView] = useState<ViewType>('empty');
  const [organizationStructure, setOrganizationStructure] = useState<OrganizationNode[]>([]);

  const handleCreateStructure = () => {
    setCurrentView('builder');
  };

  const handleStructureSave = (structure: OrganizationNode[]) => {
    setOrganizationStructure(structure);
    setCurrentView('view');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'empty':
        return <EmptyState />;
      case 'builder':
        return <StructureBuilder onSave={handleStructureSave} onBack={() => setCurrentView('empty')} />;
      case 'view':
        return (
          <div className="space-y-6">
            <div className="p-8 border rounded-lg bg-gray-50">
              <p className="text-gray-600">Structure sauvegardée avec {organizationStructure.length} nœud(s) racine</p>
            </div>
            <OrganigramView nodes={organizationStructure} />
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
      <HeaderCtaButton onClick={handleCreateStructure}>
        <Plus className="w-4 h-4" />
        <span>Créer la structure</span>
      </HeaderCtaButton>
    );
  } else if (currentView === 'view') {
    ctaButton = (
      <HeaderCtaButton onClick={() => setCurrentView('builder')}>
        <Plus className="w-4 h-4" />
        <span>Modifier</span>
      </HeaderCtaButton>
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
      <div className="container mx-auto px-0 max-w-6xl">
        {renderContent()}
      </div>
    </Layout>
  );
}
