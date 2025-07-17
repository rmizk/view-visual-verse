import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/DateRangePicker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HeaderCtaButton } from '@/components/ui/header-cta-button';

interface PresenceRecord {
  id: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'early_departure';
  workDuration?: string;
  department: string;
}

const mockPresenceData: PresenceRecord[] = [
  {
    id: '1',
    employeeName: 'Jean Dupont',
    date: '2024-01-15',
    checkIn: '08:30',
    checkOut: '17:30',
    status: 'present',
    workDuration: '8h 30min',
    department: 'Développement'
  },
  {
    id: '2',
    employeeName: 'Marie Martin',
    date: '2024-01-15',
    checkIn: '09:15',
    checkOut: '18:00',
    status: 'late',
    workDuration: '8h 15min',
    department: 'Marketing'
  },
  {
    id: '3',
    employeeName: 'Pierre Dubois',
    date: '2024-01-15',
    checkIn: '08:45',
    status: 'present',
    department: 'RH'
  }
];

export default function Presence() {
  const [presenceData] = useState<PresenceRecord[]>(mockPresenceData);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: new Date()
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      present: { variant: 'default', label: 'Présent' },
      absent: { variant: 'destructive', label: 'Absent' },
      late: { variant: 'secondary', label: 'Retard' },
      early_departure: { variant: 'outline', label: 'Départ anticipé' }
    };
    
    const config = variants[status] || variants.present;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const ctaButton = (
    <HeaderCtaButton onClick={() => console.log('Generate report')}>
      <FileText className="w-4 h-4" />
      <span>Générer rapport</span>
    </HeaderCtaButton>
  );

  return (
    <Layout
      pageTitle="Présence"
      breadcrumbItems={[
        { label: "Présence" }
      ]}
      ctaButton={ctaButton}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total employés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                +2 depuis hier
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Présents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">38</div>
              <p className="text-xs text-muted-foreground">
                84% de présence
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                En retard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                -1 depuis hier
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Absents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                +1 depuis hier
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pointages du jour</CardTitle>
            <CardDescription>
              Liste des pointages pour la date sélectionnée
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Employé</th>
                    <th className="text-left p-2">Département</th>
                    <th className="text-left p-2">Arrivée</th>
                    <th className="text-left p-2">Départ</th>
                    <th className="text-left p-2">Durée</th>
                    <th className="text-left p-2">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {presenceData.map((record) => (
                    <tr key={record.id} className="border-b">
                      <td className="p-2 font-medium">{record.employeeName}</td>
                      <td className="p-2 text-gray-600">{record.department}</td>
                      <td className="p-2">{record.checkIn}</td>
                      <td className="p-2">{record.checkOut || '-'}</td>
                      <td className="p-2">{record.workDuration || '-'}</td>
                      <td className="p-2">{getStatusBadge(record.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
