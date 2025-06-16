
import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Calendar, 
  Clock, 
  BarChart3, 
  AlertTriangle, 
  Settings, 
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const [dashboardExpanded, setDashboardExpanded] = useState(true);
  const [enterpriseExpanded, setEnterpriseExpanded] = useState(false);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: Home,
      expanded: dashboardExpanded,
      onToggle: () => setDashboardExpanded(!dashboardExpanded),
      subItems: [
        { title: 'Aperçu général', active: true },
        { title: 'Analyse' }
      ]
    },
    {
      title: 'Enterprise',
      icon: Users,
      expanded: enterpriseExpanded,
      onToggle: () => setEnterpriseExpanded(!enterpriseExpanded),
      subItems: []
    },
    { title: 'Planning', icon: Calendar },
    { title: 'Présence et pointage', icon: Clock },
    { title: 'Anomalie', icon: AlertTriangle },
    { title: 'Rapports', icon: BarChart3 },
    { title: 'Alerts', icon: AlertTriangle },
    { title: 'Paramètres', icon: Settings }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } w-64`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              T
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">TimeTrack</h1>
              <p className="text-xs text-gray-500">ZetaBox</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform section */}
        <div className="p-4 border-b border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Platform</p>
          
          {/* Menu items */}
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <div key={index}>
                <button
                  onClick={item.subItems ? item.onToggle : undefined}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </div>
                  {item.subItems && (
                    item.expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                
                {/* Sub-items */}
                {item.subItems && item.expanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                          subItem.active 
                            ? 'bg-blue-50 text-blue-700 font-medium' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {subItem.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              RH
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Ramzi Hammami</p>
              <p className="text-xs text-gray-500">Administrateur</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
