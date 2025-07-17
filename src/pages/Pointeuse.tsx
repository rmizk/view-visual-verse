
import React from 'react';
import { Plus } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HeaderCtaButton } from '@/components/ui/header-cta-button';

export default function Pointeuse() {
  const ctaButton = (
    <HeaderCtaButton onClick={() => console.log('Add new time clock')}>
      <Plus className="w-4 h-4" />
      <span>Ajouter pointeuse</span>
    </HeaderCtaButton>
  );

  return (
    <Layout
      pageTitle="Pointeuse"
      breadcrumbItems={[
        { label: "Pointeuse" }
      ]}
      ctaButton={ctaButton}
    >
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Pointeuse 001
                <Badge variant="default">Active</Badge>
              </CardTitle>
              <CardDescription>Entrée principale - Bâtiment A</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dernière activité:</span>
                  <span>Il y a 2 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pointages aujourd'hui:</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statut:</span>
                  <span className="text-green-600">En ligne</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Pointeuse 002
                <Badge variant="secondary">Maintenance</Badge>
              </CardTitle>
              <CardDescription>Sortie parking - Bâtiment B</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dernière activité:</span>
                  <span>Il y a 1 heure</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pointages aujourd'hui:</span>
                  <span className="font-medium">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statut:</span>
                  <span className="text-orange-600">Maintenance</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Pointeuse 003
                <Badge variant="destructive">Hors ligne</Badge>
              </CardTitle>
              <CardDescription>Cafétéria - Étage 2</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dernière activité:</span>
                  <span>Il y a 3 heures</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pointages aujourd'hui:</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statut:</span>
                  <span className="text-red-600">Hors ligne</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg border p-6">
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
        </div>
      </div>
    </Layout>
  );
}
