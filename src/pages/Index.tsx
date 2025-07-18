
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { RecentActivities } from '@/components/RecentActivities';
import { DashboardStats } from '@/components/DashboardStats';
import { UpcomingShifts } from '@/components/UpcomingShifts';
import { RecentClockEvents } from '@/components/RecentClockEvents';
import { PendingRequests } from '@/components/PendingRequests';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const ctaButton = (
    <button className="flex min-w-16 justify-center items-center bg-slate-900 px-2 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
      <span className="text-slate-50 text-sm font-normal leading-[23.94px] px-1 py-0">
        Exporter
      </span>
    </button>
  );

  return (
    <div className="flex h-screen w-full bg-white rounded-lg max-md:flex-col">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      <main className="flex flex-col flex-1 min-w-0 max-md:w-full">
        <Header ctaButton={ctaButton} />
        
        <div className="flex flex-col flex-1 overflow-hidden border-t-slate-200 bg-slate-50 border-t border-solid">
          <div className="flex-1 overflow-y-auto">
            <div className="p-8 max-sm:p-4 space-y-6">
              {/* Dashboard Stats */}
              <DashboardStats />

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Takes 2/3 on large screens */}
                <div className="lg:col-span-2 space-y-6">
                  <UpcomingShifts />
                  <RecentClockEvents />
                </div>

                {/* Right Column - Takes 1/3 on large screens */}
                <div className="space-y-6">
                  <RecentActivities />
                  <PendingRequests />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
