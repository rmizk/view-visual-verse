
import React from 'react';
import { Users, Building2, Clock, Calendar } from 'lucide-react';

export const DashboardStats: React.FC = () => {
  const statsData = [
    {
      title: "Total employés",
      value: "35",
      subtitle: "Employés actifs",
      trend: { value: "+3", label: "ce mois" },
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Départements",
      value: "8",
      subtitle: "Départements actifs",
      trend: { value: "+1", label: "récemment" },
      icon: Building2,
      color: "text-green-600"
    },
    {
      title: "Présents aujourd'hui",
      value: "31",
      subtitle: "Taux de présence 88.6%",
      trend: { value: "31/35", label: "employés" },
      icon: Clock,
      color: "text-orange-600"
    },
    {
      title: "Équipes planifiées",
      value: "12",
      subtitle: "Aujourd'hui",
      trend: { value: "3", label: "en cours" },
      icon: Calendar,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-slate-50 ${stat.color}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="text-right">
                <span className="text-xs text-green-600 font-medium">{stat.trend.value}</span>
                <p className="text-xs text-slate-500">{stat.trend.label}</p>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-950">{stat.value}</h3>
              <p className="text-sm font-medium text-slate-700">{stat.title}</p>
              <p className="text-xs text-slate-500">{stat.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
