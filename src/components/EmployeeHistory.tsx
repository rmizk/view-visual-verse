
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { StatsCard } from '@/components/StatsCard';
import { PointageDrawer } from '@/components/PointageDrawer';

interface EmployeeHistoryProps {
  selectedMonth: Date;
  setSelectedMonth: (date: Date) => void;
}

export const EmployeeHistory: React.FC<EmployeeHistoryProps> = ({
  selectedMonth,
  setSelectedMonth
}) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Mock monthly attendance data
  const monthlyAttendance = [
    {
      date: '2024-06-03',
      workedHours: '08:20',
      requiredHours: '08:00',
      difference: '+00:20',
      overtime: '00:20',
      pointageCount: 4,
      pointages: [
        { time: '08:30', type: 'entry' },
        { time: '12:00', type: 'exit' },
        { time: '13:00', type: 'entry' },
        { time: '17:30', type: 'exit' }
      ]
    },
    {
      date: '2024-06-02',
      workedHours: '07:15',
      requiredHours: '08:00',
      difference: '-00:45',
      overtime: '00:00',
      pointageCount: 3,
      pointages: [
        { time: '09:15', type: 'entry' },
        { time: '12:00', type: 'exit' },
        { time: '13:00', type: 'entry' }
      ]
    },
    {
      date: '2024-06-01',
      workedHours: '08:30',
      requiredHours: '08:00',
      difference: '+00:30',
      overtime: '00:30',
      pointageCount: 4,
      pointages: [
        { time: '08:00', type: 'entry' },
        { time: '12:00', type: 'exit' },
        { time: '13:00', type: 'entry' },
        { time: '17:30', type: 'exit' }
      ]
    }
  ];

  const handleAddPointage = (time: string, type: 'entry' | 'exit') => {
    console.log('Adding pointage:', { time, type, date: selectedDay });
    // Here you would typically update the data
  };

  if (selectedDay) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSelectedDay(null)}
              className="h-8 w-8"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h3 className="text-lg font-semibold">Pointages du {selectedDay}</h3>
          </div>
          <Button 
            onClick={() => setDrawerOpen(true)}
            className="bg-slate-900 hover:bg-slate-800"
          >
            <Plus className="w-4 h-4" />
            Ajouter un pointage
          </Button>
        </div>
        
        <div className="w-full bg-white border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Heure
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Type de pointage
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {monthlyAttendance.find(record => record.date === selectedDay)?.pointages.map((pointage, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{pointage.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      pointage.type === 'entry' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {pointage.type === 'entry' ? 'Entrée' : 'Sortie'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => alert(`Modifier le pointage de ${pointage.time}`)}
                        className="h-8"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (confirm(`Supprimer le pointage de ${pointage.time} ?`)) {
                            alert('Pointage supprimé');
                          }
                        }}
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <PointageDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          selectedDate={selectedDay}
          onAddPointage={handleAddPointage}
        />
      </div>
    );
  }

  return (
    <>
      {/* Header with month selector and CTA button */}
      <div className="flex justify-between items-center gap-4 w-full">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-48">
                <Calendar className="w-4 h-4 mr-2" />
                {format(selectedMonth, 'MMMM yyyy', { locale: fr })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={selectedMonth}
                onSelect={(date) => date && setSelectedMonth(date)}
                locale={fr}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button 
          onClick={() => alert('Ajouter un jour de travail...')}
          className="bg-slate-900 hover:bg-slate-800"
        >
          <Plus className="w-4 h-4" />
          Ajouter un jour de travail
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <StatsCard
          title="Heures travaillées ce mois"
          value="152h 30min"
          subtitle="Temps total travaillé"
          icon='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>'
        />
        <StatsCard
          title="Heures supplémentaires"
          value="8h 45min"
          subtitle="Heures au-delà de 35h/semaine"
          icon='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>'
        />
        <StatsCard
          title="Absences"
          value="2 jours"
          subtitle="Jours d'absence ce mois"
          icon='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>'
        />
        <StatsCard
          title="Solde congés"
          value="12 jours"
          subtitle="Jours de congés restants"
          icon='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>'
        />
      </div>

      {/* Monthly table */}
      <div className="w-full bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Nombre de pointage
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Heures travaillées
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Écart
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Validité
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {monthlyAttendance.map((record) => (
              <tr key={record.date} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{record.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{record.pointageCount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{record.workedHours}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${record.difference.startsWith('+') ? 'text-green-600' : record.difference.startsWith('-') ? 'text-red-600' : 'text-slate-900'}`}>
                    {record.difference}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={record.pointageCount % 2 === 0 ? "default" : "destructive"}>
                    {record.pointageCount % 2 === 0 ? "Valide" : "Invalide"}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDay(record.date)}
                      className="h-8"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Modifier
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        if (confirm(`Supprimer l'enregistrement du ${record.date} ?`)) {
                          alert('Enregistrement supprimé');
                        }
                      }}
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
