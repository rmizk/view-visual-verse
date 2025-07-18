
import React from 'react';
import { Clock, LogIn, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ClockEvent {
  id: string;
  employeeName: string;
  avatar: string;
  type: 'clock-in' | 'clock-out';
  time: string;
  location: string;
  department: string;
}

export const RecentClockEvents: React.FC = () => {
  const clockEvents: ClockEvent[] = [
    {
      id: '1',
      employeeName: 'Marie Dubois',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
      type: 'clock-in',
      time: '08:30',
      location: 'Pointeuse Bureau 1',
      department: 'Production'
    },
    {
      id: '2',
      employeeName: 'Jean Martin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      type: 'clock-out',
      time: '17:45',
      location: 'Pointeuse Bureau 2',
      department: 'Service Client'
    },
    {
      id: '3',
      employeeName: 'Sarah Connor',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      type: 'clock-in',
      time: '09:00',
      location: 'Pointeuse Mobile',
      department: 'Marketing'
    },
    {
      id: '4',
      employeeName: 'Paul Durand',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      type: 'clock-in',
      time: '08:45',
      location: 'Pointeuse Bureau 1',
      department: 'IT'
    },
    {
      id: '5',
      employeeName: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=32&h=32&fit=crop&crop=face',
      type: 'clock-out',
      time: '18:00',
      location: 'Pointeuse Bureau 3',
      department: 'RH'
    }
  ];

  const getEventIcon = (type: string) => {
    return type === 'clock-in' ? LogIn : LogOut;
  };

  const getEventColor = (type: string) => {
    return type === 'clock-in' ? 'text-green-600' : 'text-blue-600';
  };

  const getEventLabel = (type: string) => {
    return type === 'clock-in' ? 'Arrivée' : 'Départ';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-950">Pointages récents</h3>
        </div>
        <button className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
          Voir tous
        </button>
      </div>
      
      <div className="space-y-2">
        {clockEvents.map((event) => {
          const EventIcon = getEventIcon(event.type);
          return (
            <div key={event.id} className="flex items-center gap-3 px-0 py-1 hover:bg-slate-50 rounded-lg transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src={event.avatar} alt={event.employeeName} />
                <AvatarFallback>{event.employeeName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-slate-900">{event.employeeName}</p>
                  <div className={`flex items-center gap-1 ${getEventColor(event.type)}`}>
                    <EventIcon className="w-3 h-3" />
                    <span className="text-xs font-medium">{getEventLabel(event.type)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{event.time}</span>
                  <span>•</span>
                  <span>{event.location}</span>
                  <span>•</span>
                  <span>{event.department}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
