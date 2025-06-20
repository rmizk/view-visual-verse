
import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { EmployeeSidebar } from './EmployeeSidebar';
import { ResponsableSidebar } from './ResponsableSidebar';
import { Header } from './Header';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  breadcrumbItems: {
    label: string;
    href?: string;
  }[];
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  pageTitle,
  breadcrumbItems
}) => {
  const { user } = useAuth();
  
  // Initialize from localStorage or default to false (expanded)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

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
        <Header onToggleSidebar={toggleSidebar} pageTitle={pageTitle} breadcrumbItems={breadcrumbItems} />
        
        <div className="flex flex-col flex-1 overflow-hidden border-t-slate-200 bg-slate-50 border-t border-solid">
          <div className="flex-1 overflow-y-auto">
            <div className="p-8 max-sm:p-4 space-y-6 px-[33px]">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
