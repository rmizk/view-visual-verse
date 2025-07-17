import React, { useState } from 'react';
import { Clock, Download, Filter } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/DateRangePicker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HeaderCtaButton } from '@/components/ui/header-cta-button';

interface AttendanceRecord {
  id: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'early_departure';
  workDuration?: string;
  department: string;
}

const mockAttendanceData: AttendanceRecord[] = [
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
  }
];

export default function Attendance() {
  const [attendanceData] = useState<AttendanceRecord[]>(mockAttendanceData);
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
    <HeaderCtaButton onClick={() => console.log('Export attendance')}>
      <Download className="w-4 h-4" />
      <span>Exporter</span>
    </HeaderCtaButton>
  );

  return (
    <Layout
      pageTitle="Pointages"
      breadcrumbItems={[
        { label: "Pointages" }
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
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total pointages
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">
                +180 depuis la semaine dernière
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historique des pointages</CardTitle>
            <CardDescription>
              Liste des pointages pour la période sélectionnée
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Employé</th>
                    <th className="text-left p-2">Département</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Arrivée</th>
                    <th className="text-left p-2">Départ</th>
                    <th className="text-left p-2">Durée</th>
                    <th className="text-left p-2">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((record) => (
                    <tr key={record.id} className="border-b">
                      <td className="p-2 font-medium">{record.employeeName}</td>
                      <td className="p-2 text-gray-600">{record.department}</td>
                      <td className="p-2">{record.date}</td>
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
