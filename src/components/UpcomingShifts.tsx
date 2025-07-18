
import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';

interface Shift {
  id: string;
  title: string;
  time: string;
  duration: string;
  employees: number;
  department: string;
  status: 'upcoming' | 'in-progress' | 'completed';
}

export const UpcomingShifts: React.FC = () => {
  const shifts: Shift[] = [
    {
      id: '1',
      title: 'Équipe Matin - Production',
      time: '08:00',
      duration: '8h',
      employees: 12,
      department: 'Production',
      status: 'in-progress'
    },
    {
      id: '2',
      title: 'Équipe Service Client',
      time: '09:00',
      duration: '7h',
      employees: 8,
      department: 'Service Client',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'Équipe Après-midi - Production',
      time: '14:00',
      duration: '8h',
      employees: 10,
      department: 'Production',
      status: 'upcoming'
    },
    {
      id: '4',
      title: 'Équipe Nuit - Sécurité',
      time: '22:00',
      duration: '10h',
      employees: 3,
      department: 'Sécurité',
      status: 'upcoming'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'En cours';
      case 'upcoming':
        return 'À venir';
      case 'completed':
        return 'Terminé';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-950">Équipes d'aujourd'hui</h3>
        </div>
        <button className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
          Voir planning
        </button>
      </div>
      
      <div className="space-y-3">
        {shifts.map((shift) => (
          <div key={shift.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="font-medium text-slate-900">{shift.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shift.status)}`}>
                  {getStatusLabel(shift.status)}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{shift.time} • {shift.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{shift.employees} employés</span>
                </div>
                <span>• {shift.department}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
