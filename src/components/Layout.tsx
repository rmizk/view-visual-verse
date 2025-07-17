
import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  breadcrumbItems: {
    label: string;
    href?: string;
  }[];
  ctaButton?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  pageTitle,
  breadcrumbItems,
  ctaButton
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

  return (
    <div className="flex h-screen w-full bg-white rounded-lg max-md:flex-col">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      <main className="flex flex-col flex-1 min-w-0 max-md:w-full">
        <Header pageTitle={pageTitle} breadcrumbItems={breadcrumbItems} ctaButton={ctaButton} />
        
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
