
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const RecentActivities: React.FC = () => {
  const activities = [
    {
      id: 1,
      user: 'Marie Dubois',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
      action: 'a pointé à l\'arrivée',
      time: '08:30',
      status: 'success'
    },
    {
      id: 2,
      user: 'Jean Martin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      action: 'a demandé un congé',
      time: '08:15',
      status: 'pending'
    },
    {
      id: 3,
      user: 'Sarah Connor',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      action: 'a modifié son planning',
      time: '07:45',
      status: 'info'
    },
    {
      id: 4,
      user: 'Paul Durand',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      action: 'a signalé une anomalie',
      time: '07:30',
      status: 'warning'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'pending':
        return 'text-orange-600';
      case 'warning':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-950">Activités récentes</h3>
        <button className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
          Voir tout
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.avatar} alt={activity.user} />
              <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-900">
                <span className="font-medium">{activity.user}</span>
                <span className="ml-1">{activity.action}</span>
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">{activity.time}</span>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status).replace('text-', 'bg-')}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
