
import React from 'react';
import { Monitor, Wifi, AlertTriangle, Activity } from 'lucide-react';

export const PointeuseStats: React.FC = () => {
  const statsData = [
    {
      title: "Total pointeuses",
      value: "3",
      subtitle: "Dispositifs configurés",
      trend: { value: "+1", label: "ce mois" },
      icon: Monitor,
      color: "text-blue-600"
    },
    {
      title: "Actives aujourd'hui",
      value: "1",
      subtitle: "En fonctionnement",
      trend: { value: "33%", label: "du total" },
      icon: Wifi,
      color: "text-green-600"
    },
    {
      title: "En maintenance",
      value: "1",
      subtitle: "Nécessite attention",
      trend: { value: "1", label: "depuis hier" },
      icon: AlertTriangle,
      color: "text-orange-600"
    },
    {
      title: "Hors ligne",
      value: "1",
      subtitle: "Non opérationnelles",
      trend: { value: "1", label: "depuis 3h" },
      icon: Activity,
      color: "text-red-600"
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
