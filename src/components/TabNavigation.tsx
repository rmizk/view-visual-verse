
import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  isActive?: boolean;
}

interface TabNavigationProps {
  tabs: Tab[];
  onTabChange?: (tabId: string) => void;
  defaultActiveTab?: string;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ 
  tabs, 
  onTabChange, 
  defaultActiveTab 
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="flex flex-col items-start gap-2.5 self-stretch">
      <div className="flex items-start bg-slate-100 p-1 rounded-lg gap-1" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`text-center text-sm font-normal leading-[20.02px] px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-slate-950 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] bg-white'
                : 'text-slate-500 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
