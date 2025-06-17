
import React from 'react';
import { Calendar as CalendarIcon, Users, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export const PlanningOverview: React.FC = () => {
  const summaryStats = [
    {
      title: "Plannings actifs",
      value: "12",
      icon: CalendarIcon,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Employés planifiés",
      value: "156",
      icon: Users,
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "Heures planifiées",
      value: "2,840h",
      subtitle: "cette semaine",
      icon: Clock,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      title: "Demandes en attente",
      value: "8",
      subtitle: "échanges de shifts",
      icon: AlertCircle,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  const swapRequests = [
    {
      id: 1,
      employeeFrom: "Marie Dubois",
      employeeTo: "Jean Martin",
      shiftFrom: "Matin - 08:00-16:00",
      shiftTo: "Soir - 16:00-00:00",
      date: "2024-01-20",
      reason: "Rendez-vous médical",
      status: "pending"
    },
    {
      id: 2,
      employeeFrom: "Pierre Durand",
      employeeTo: "Sophie Bernard",
      shiftFrom: "Jour - 09:00-17:00",
      shiftTo: "Matin - 08:00-16:00",
      date: "2024-01-22",
      reason: "Obligations familiales",
      status: "pending"
    },
    {
      id: 3,
      employeeFrom: "Luc Moreau",
      employeeTo: "Emma Petit",
      shiftFrom: "Soir - 16:00-00:00",
      shiftTo: "Jour - 09:00-17:00",
      date: "2024-01-25",
      reason: "Formation",
      status: "pending"
    }
  ];

  const handleApproveSwap = (requestId: number) => {
    toast({
      title: "Demande approuvée",
      description: "L'échange de shift a été approuvé avec succès.",
    });
  };

  const handleRejectSwap = (requestId: number) => {
    toast({
      title: "Demande rejetée",
      description: "L'échange de shift a été rejeté.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => (
          <Card key={index} className="border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm font-medium text-slate-700">{stat.title}</p>
                  {stat.subtitle && (
                    <p className="text-xs text-slate-500">{stat.subtitle}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Shift Swap Requests */}
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">
            Demandes d'échange de shifts en attente
          </CardTitle>
        </CardHeader>
        <CardContent>
          {swapRequests.length > 0 ? (
            <div className="space-y-4">
              {swapRequests.map((request) => (
                <div key={request.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <div className="flex justify-between items-start mb-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{request.employeeFrom}</span>
                        <span className="text-slate-500">→</span>
                        <span className="font-medium text-slate-900">{request.employeeTo}</span>
                      </div>
                      <div className="text-sm text-slate-600">
                        <p><span className="font-medium">De:</span> {request.shiftFrom}</p>
                        <p><span className="font-medium">Vers:</span> {request.shiftTo}</p>
                        <p><span className="font-medium">Date:</span> {new Date(request.date).toLocaleDateString('fr-FR')}</p>
                        <p><span className="font-medium">Raison:</span> {request.reason}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApproveSwap(request.id)}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approuver
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectSwap(request.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Rejeter
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucune demande en attente</h3>
              <p className="text-slate-600">Les demandes d'échange de shifts apparaîtront ici.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
