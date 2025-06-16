
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface EmployeeHistoryProps {
  selectedMonth: Date;
  setSelectedMonth: (date: Date) => void;
}

export const EmployeeHistory: React.FC<EmployeeHistoryProps> = ({
  selectedMonth,
  setSelectedMonth
}) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Mock monthly attendance data
  const monthlyAttendance = [
    {
      date: '2024-06-03',
      workedHours: '08:00',
      requiredHours: '08:00',
      difference: '00:00',
      overtime: '00:00',
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
      pointages: [
        { time: '09:15', type: 'entry' },
        { time: '12:00', type: 'exit' },
        { time: '13:00', type: 'entry' },
        { time: '17:30', type: 'exit' }
      ]
    },
    {
      date: '2024-06-01',
      workedHours: '08:30',
      requiredHours: '08:00',
      difference: '+00:30',
      overtime: '00:30',
      pointages: [
        { time: '08:00', type: 'entry' },
        { time: '12:00', type: 'exit' },
        { time: '13:00', type: 'entry' },
        { time: '17:30', type: 'exit' }
      ]
    }
  ];

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
            onClick={() => alert('Ajouter un pointage pour cette journée...')}
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
      </div>
    );
  }

  return (
    <>
      {/* Month selector */}
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
          onClick={() => alert('Ajouter un nouveau pointage...')}
          className="bg-slate-900 hover:bg-slate-800"
        >
          <Plus className="w-4 h-4" />
          Ajouter un pointage
        </Button>
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
                Heures travaillées
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Écart requis
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Heures sup.
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
                  <div className="text-sm text-slate-900">{record.workedHours}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${record.difference.startsWith('+') ? 'text-green-600' : record.difference.startsWith('-') ? 'text-red-600' : 'text-slate-900'}`}>
                    {record.difference}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{record.overtime}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDay(record.date)}
                    className="h-8"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Modifier
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
