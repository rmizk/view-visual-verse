
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { RecentActivities } from '@/components/RecentActivities';

const Index: React.FC = () => {
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

  return (
    <div className="flex h-screen w-full bg-white rounded-lg max-md:flex-col">
      <Sidebar isCollapsed={sidebarCollapsed} />
      
      <main className="flex flex-col flex-1 min-w-0 max-md:w-full">
        <Header onToggleSidebar={toggleSidebar} />
        
        <div className="flex flex-col flex-1 overflow-hidden border-t-slate-200 bg-slate-50 border-t border-solid">
          <div className="flex-1 overflow-y-auto">
            <div className="p-8 max-sm:p-4 space-y-6">
              {/* Dashboard Header */}
              <div className="flex h-10 justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:h-auto">
                <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
                  Dashboard
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
                {statsData.map((stat, index) => (
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
