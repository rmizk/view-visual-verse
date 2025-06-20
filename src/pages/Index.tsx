
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { EmployeeSidebar } from '@/components/EmployeeSidebar';
import { ResponsableSidebar } from '@/components/ResponsableSidebar';
import { Header } from '@/components/Header';
import { RecentActivities } from '@/components/RecentActivities';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const statsData = [
    {
      title: "Nombre d'employés",
      value: "35",
      subtitle: "Employés actifs",
      trend: { value: "+6", label: "ce mois" },
    },
    {
      title: "Employés présents",
      value: "31",
      subtitle: "Taux de présence",
      trend: { value: "88.6%", label: "aujourd'hui" },
    },
    {
      title: "Employés absents",
      value: "4",
      subtitle: "Taux d'absence",
      trend: { value: "11.4%", label: "aujourd'hui" },
    },
    {
      title: "Heures travaillées",
      value: "268h",
      subtitle: "cette semaine",
      trend: { value: "+32h", label: "vs semaine dernière" },
    }
  ];

  // Employee-specific stats
  const employeeStatsData = [
    {
      title: "Heures travaillées",
      value: "37h",
      subtitle: "cette semaine",
      trend: { value: "+2h", label: "vs semaine dernière" },
    },
    {
      title: "Jours présents",
      value: "4",
      subtitle: "cette semaine",
      trend: { value: "100%", label: "taux de présence" },
    },
    {
      title: "Plannings assignés",
      value: "2",
      subtitle: "cette semaine",
      trend: { value: "Matin & Soir", label: "shifts" },
    },
    {
      title: "Heures supplémentaires",
      value: "2h",
      subtitle: "ce mois",
      trend: { value: "+2h", label: "vs mois dernier" },
    }
  ];

  // Responsable-specific stats
  const responsableStatsData = [
    {
      title: "Équipe sous supervision",
      value: "15",
      subtitle: "Employés gérés",
      trend: { value: "+2", label: "ce mois" },
    },
    {
      title: "Présents aujourd'hui",
      value: "13",
      subtitle: "Taux de présence",
      trend: { value: "86.7%", label: "équipe" },
    },
    {
      title: "Demandes en attente",
      value: "3",
      subtitle: "À valider",
      trend: { value: "Congés & Absences", label: "type" },
    },
    {
      title: "Heures d'équipe",
      value: "142h",
      subtitle: "cette semaine",
      trend: { value: "+18h", label: "vs semaine dernière" },
    }
  ];

  const getCurrentStatsData = () => {
    if (user?.role === 'employee') return employeeStatsData;
    if (user?.role === 'responsable') return responsableStatsData;
    return statsData;
  };

  const getPageTitle = () => {
    if (user?.role === 'employee') return 'Accueil';
    if (user?.role === 'responsable') return 'Tableau de bord - Responsable';
    return 'Dashboard';
  };

  const currentStatsData = getCurrentStatsData();

  // Render appropriate sidebar based on user role
  const renderSidebar = () => {
    if (user?.role === 'employee') {
      return <EmployeeSidebar isCollapsed={sidebarCollapsed} />;
    }
    if (user?.role === 'responsable') {
      return <ResponsableSidebar isCollapsed={sidebarCollapsed} />;
    }
    return <Sidebar isCollapsed={sidebarCollapsed} />;
  };

  return (
    <div className="flex h-screen w-full bg-white rounded-lg max-md:flex-col">
      {renderSidebar()}
      
      <main className="flex flex-col flex-1 min-w-0 max-md:w-full">
        <Header onToggleSidebar={toggleSidebar} />
        
        <div className="flex flex-col flex-1 overflow-hidden border-t-slate-200 bg-slate-50 border-t border-solid">
          <div className="flex-1 overflow-y-auto">
            <div className="p-8 max-sm:p-4 space-y-6">
              {/* Dashboard Header */}
              <div className="flex h-10 justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:h-auto">
                <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
                  {getPageTitle()}
                </h1>
                <div className="flex items-start gap-3 max-sm:flex-col max-sm:w-full max-sm:gap-2">
                  <button className="flex min-w-16 justify-center items-center bg-slate-900 px-2 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                    <span className="text-slate-50 text-sm font-normal leading-[23.94px] px-1 py-0">
                      Download
                    </span>
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                {currentStatsData.map((stat, index) => (
                  <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-slate-950">{stat.value}</h3>
                      <span className="text-xs text-green-600 font-medium">{stat.trend.value}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-700">{stat.title}</p>
                    <p className="text-xs text-slate-500">{stat.trend.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Activities */}
              <div className="w-full">
                <RecentActivities />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
