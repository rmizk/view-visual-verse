
import React from 'react';

interface Activity {
  id: string;
  initials: string;
  name: string;
  action: string;
  time: string;
  status: 'late' | 'very-late' | 'on-time' | 'early';
  avatar?: string;
}

const ActivityFeed = () => {
  const activities: Activity[] = [
    {
      id: '1',
      initials: 'HK',
      name: 'Madiha Neifar',
      action: 'Madiha Neifar a pointé à 9:32',
      time: '9:32',
      status: 'late'
    },
    {
      id: '2',
      initials: 'HK',
      name: 'Hassen Knani',
      action: 'Hassen Knani a pointé à 9:31',
      time: '9:31',
      status: 'late'
    },
    {
      id: '3',
      initials: 'HK',
      name: 'Sahar Hdiji',
      action: 'Sahar Hdiji a pointé à 9:25',
      time: '9:25',
      status: 'very-late'
    },
    {
      id: '4',
      initials: 'OT',
      name: 'Omar Trabelsi',
      action: 'Omar Trabelsi a pointé à 8:30',
      time: '8:30',
      status: 'on-time'
    },
    {
      id: '5',
      initials: 'MN',
      name: 'Mahdi Nasri',
      action: 'Mahdi Nasri a pointé à 8:05',
      time: '8:05',
      status: 'on-time'
    },
    {
      id: '6',
      initials: 'RH',
      name: 'Ramzi Hammami',
      action: 'Ramzi Hammami a pointé à 7:57',
      time: '7:57',
      status: 'early',
      avatar: true
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'late':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">en retard</span>;
      case 'very-late':
        return <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">un peu en retard</span>;
      case 'on-time':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">à l'heure</span>;
      case 'early':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">en avance</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Activités récentes</h3>
        <p className="text-sm text-gray-500">Dernières actions dans le système</p>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white ${
                activity.avatar 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                  : 'bg-gray-400'
              }`}>
                {activity.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{activity.name}</p>
                <p className="text-sm text-gray-500">{activity.action}</p>
              </div>
            </div>
            {getStatusBadge(activity.status)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
