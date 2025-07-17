
import React, { useState } from 'react';
import { Download, FileText, Calendar, BarChart3 } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRangePicker } from '@/components/DateRangePicker';
import { HeaderCtaButton } from '@/components/ui/header-cta-button';

export default function Rapports() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });

  const reports = [
    {
      id: '1',
      title: 'Rapport de présence mensuel',
      description: 'Analyse détaillée de la présence pour le mois écoulé',
      type: 'presence',
      icon: Calendar,
      lastGenerated: '2024-01-15'
    },
    {
      id: '2',
      title: 'Rapport d\'activité départemental',
      description: 'Vue d\'ensemble de l\'activité par département',
      type: 'department',
      icon: BarChart3,
      lastGenerated: '2024-01-10'
    },
    {
      id: '3',
      title: 'Rapport des heures supplémentaires',
      description: 'Suivi des heures supplémentaires par employé',
      type: 'overtime',
      icon: FileText,
      lastGenerated: '2024-01-12'
    }
  ];

  const ctaButton = (
    <HeaderCtaButton onClick={() => console.log('Create new report')}>
      <FileText className="w-4 h-4" />
      <span>Nouveau rapport</span>
    </HeaderCtaButton>
  );

  return (
    <Layout
      pageTitle="Rapports"
      breadcrumbItems={[
        { label: "Rapports" }
      ]}
      ctaButton={ctaButton}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter tout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => {
            const IconComponent = report.icon;
            return (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                  </div>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600">
                      Dernière génération: {report.lastGenerated}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <FileText className="w-4 h-4 mr-2" />
                        Générer
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Aperçu des statistiques</CardTitle>
            <CardDescription>
              Résumé des données pour la période sélectionnée
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1,240</div>
                <div className="text-sm text-gray-600">Total pointages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">96.5%</div>
                <div className="text-sm text-gray-600">Taux de présence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">47h</div>
                <div className="text-sm text-gray-600">Heures supplémentaires</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">12</div>
                <div className="text-sm text-gray-600">Anomalies détectées</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
