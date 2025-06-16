
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import ActivityFeed from '../components/ActivityFeed';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="lg:ml-64 transition-all duration-300">
        <Header onMenuToggle={toggleSidebar} />
        
        <main className="p-6">
          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button className="py-2 px-1 border-b-2 border-blue-500 text-blue-600 font-medium text-sm">
                  Aperçu général
                </button>
                <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm">
                  Analyse
                </button>
              </nav>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Nombre d'employés"
              value="32"
              subtitle="+3 Employés ce mois."
              icon={Users}
              color="blue"
            />
            <StatsCard
              title="Employés présent"
              value="24"
              subtitle="80% Taux de présence"
              icon={UserCheck}
              color="green"
            />
            <StatsCard
              title="Employés Absent"
              value="6"
              subtitle="80% Taux d'absence"
              icon={UserX}
              color="red"
            />
            <StatsCard
              title="Heures de travail"
              value="97%"
              subtitle="+1% plus que le mois dernier"
              icon={Clock}
              color="orange"
            />
          </div>

          {/* Activity Feed */}
          <ActivityFeed />
        </main>
      </div>
    </div>
  );
};

export default Index;
