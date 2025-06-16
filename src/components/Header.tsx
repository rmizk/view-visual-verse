
import React from 'react';
import { PanelLeft, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeaderProps {
  onToggleSidebar?: () => void;
  pageTitle?: string;
  breadcrumbItems?: BreadcrumbItem[];
}

export const Header: React.FC<HeaderProps> = ({ 
  onToggleSidebar, 
  pageTitle = "Dashboard",
  breadcrumbItems = [
    { label: "Dashboard" },
    { label: "Aperçu général" }
  ]
}) => {
  return (
    <header className="flex justify-between items-center self-stretch bg-slate-50 px-4 py-3 max-sm:px-4 max-sm:py-2">
      <div className="flex items-center gap-4">
        <nav className="flex items-center content-center gap-[4px_8px] flex-wrap" aria-label="Breadcrumb">
          <div className="flex items-center gap-2 pr-2">
            <button
              onClick={onToggleSidebar}
              className="flex justify-center items-center p-1.5 rounded-md hover:bg-slate-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              <PanelLeft className="w-4 h-4 text-slate-700" />
            </button>
            <div className="flex w-0 h-4 flex-col items-start p-0">
              <div className="w-px h-4 bg-slate-200" />
            </div>
          </div>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              <span className={`text-sm font-normal leading-[20.02px] p-0 ${
                index === breadcrumbItems.length - 1 ? 'text-slate-950' : 'text-slate-500'
              }`}>
                {item.label}
              </span>
              {index < breadcrumbItems.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-500" />
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
      <div className="flex w-[290px] h-9 items-center gap-4" />
    </header>
  );
};
