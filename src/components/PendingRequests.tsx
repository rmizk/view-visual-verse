
import React from 'react';
import { AlertCircle, FileText, UserPlus, Calendar } from 'lucide-react';

interface PendingRequest {
  id: string;
  type: 'leave' | 'document' | 'registration' | 'schedule';
  title: string;
  description: string;
  submittedBy: string;
  submittedAt: string;
  priority: 'high' | 'medium' | 'low';
}

export const PendingRequests: React.FC = () => {
  const pendingRequests: PendingRequest[] = [
    {
      id: '1',
      type: 'leave',
      title: 'Demande de congé',
      description: 'Congé du 25-30 janvier',
      submittedBy: 'Jean Martin',
      submittedAt: '2h',
      priority: 'medium'
    },
    {
      id: '2',
      type: 'document',
      title: 'Document à valider',
      description: 'Certificat médical',
      submittedBy: 'Sarah Connor',
      submittedAt: '4h',
      priority: 'high'
    },
    {
      id: '3',
      type: 'registration',
      title: 'Nouveau compte',
      description: 'Validation inscription',
      submittedBy: 'Paul Durand',
      submittedAt: '1j',
      priority: 'low'
    },
    {
      id: '4',
      type: 'schedule',
      title: 'Modification planning',
      description: 'Changement d\'horaires',
      submittedBy: 'Marie Dubois',
      submittedAt: '3h',
      priority: 'medium'
    }
  ];

  const getRequestIcon = (type: string) => {
    switch (type) {
      case 'leave':
        return Calendar;
      case 'document':
        return FileText;
      case 'registration':
        return UserPlus;
      case 'schedule':
        return Calendar;
      default:
        return AlertCircle;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Urgent';
      case 'medium':
        return 'Moyen';
      case 'low':
        return 'Faible';
      default:
        return priority;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-950">Demandes en attente</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
            {pendingRequests.length}
          </span>
          <button className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
            Voir tout
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {pendingRequests.map((request) => {
          const RequestIcon = getRequestIcon(request.type);
          return (
            <div key={request.id} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
              <div className="p-1.5 bg-slate-100 rounded-lg">
                <RequestIcon className="w-4 h-4 text-slate-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-slate-900">{request.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                    {getPriorityLabel(request.priority)}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-1">{request.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{request.submittedBy}</span>
                  <span>•</span>
                  <span>il y a {request.submittedAt}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
