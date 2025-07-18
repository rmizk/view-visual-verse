
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { HeaderCtaButton } from '@/components/ui/header-cta-button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PointeuseStats } from '@/components/PointeuseStats';
import AddPointeuseForm from '@/components/AddPointeuseForm';

export default function Pointeuse() {
  const [showAddForm, setShowAddForm] = useState(false);

  const pointeusesData = [
    {
      id: '001',
      nom: 'Pointeuse 001',
      localisation: 'Entrée principale - Bâtiment A',
      statut: 'active',
      derniereActivite: 'Il y a 2 minutes',
      pointagesAujourdhui: 24
    },
    {
      id: '002',
      nom: 'Pointeuse 002',
      localisation: 'Sortie parking - Bâtiment B',
      statut: 'maintenance',
      derniereActivite: 'Il y a 1 heure',
      pointagesAujourdhui: 18
    },
    {
      id: '003',
      nom: 'Pointeuse 003',
      localisation: 'Cafétéria - Étage 2',
      statut: 'offline',
      derniereActivite: 'Il y a 3 heures',
      pointagesAujourdhui: 0
    }
  ];

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'maintenance':
        return <Badge variant="secondary">Maintenance</Badge>;
      case 'offline':
        return <Badge variant="destructive">Hors ligne</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getStatusText = (statut: string) => {
    switch (statut) {
      case 'active':
        return <span className="text-green-600">En ligne</span>;
      case 'maintenance':
        return <span className="text-orange-600">Maintenance</span>;
      case 'offline':
        return <span className="text-red-600">Hors ligne</span>;
      default:
        return <span className="text-gray-600">Inconnu</span>;
    }
  };

  const handleAddPointeuse = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
  };

  const handleSubmitForm = (data: any) => {
    console.log('New pointeuse data:', data);
    // Here you would typically send the data to your backend
    setShowAddForm(false);
  };

  const ctaButton = (
    <HeaderCtaButton onClick={handleAddPointeuse}>
      <Plus className="w-4 h-4" />
      <span>Ajouter pointeuse</span>
    </HeaderCtaButton>
  );

  if (showAddForm) {
    return (
      <Layout
        pageTitle="Pointeuse"
        breadcrumbItems={[
          { label: "Pointeuse" }
        ]}
      >
        <AddPointeuseForm
          isOpen={true}
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
          inline={true}
        />
      </Layout>
    );
  }

  return (
    <Layout
      pageTitle="Pointeuse"
      breadcrumbItems={[
        { label: "Pointeuse" }
      ]}
      ctaButton={ctaButton}
    >
      <div className="space-y-6">
        {/* Statistics Section */}
        <PointeuseStats />

        {/* Pointeuses Table */}
        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Liste des pointeuses</h3>
            <p className="text-sm text-gray-600 mt-1">Gérez vos dispositifs de pointage</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du dispositif</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière activité</TableHead>
                <TableHead>Pointages aujourd'hui</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pointeusesData.map((pointeuse) => (
                <TableRow key={pointeuse.id}>
                  <TableCell className="font-medium">{pointeuse.nom}</TableCell>
                  <TableCell>{pointeuse.localisation}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {getStatusBadge(pointeuse.statut)}
                      
                    </div>
                  </TableCell>
                  <TableCell>{pointeuse.derniereActivite}</TableCell>
                  <TableCell>
                    <span className="font-medium">{pointeuse.pointagesAujourdhui}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm">
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Daily Statistics */}
        {/* <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Statistiques du jour</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">142</div>
              <div className="text-sm text-gray-600">Total pointages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">71</div>
              <div className="text-sm text-gray-600">Arrivées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">71</div>
              <div className="text-sm text-gray-600">Départs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">2</div>
              <div className="text-sm text-gray-600">Anomalies</div>
            </div>
          </div>
        </div> */}
      </div>
    </Layout>
  );
}
