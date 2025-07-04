
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { useAuth } from '@/contexts/AuthContext';

interface EmployeeSidebarProps {
  isCollapsed?: boolean;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  isExpanded?: boolean;
  children?: { label: string; href: string }[];
}

export const EmployeeSidebar: React.FC<EmployeeSidebarProps> = ({ isCollapsed = false }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['company']);
  const { logout, user } = useAuth();

  const toggleExpanded = (itemId: string) => {
    if (isCollapsed) return;
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleLogout = () => {
    logout();
  };

  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Accueil',
      icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_4723_25534)"><path d="M14.1399 10.5934C13.7158 11.5964 13.0525 12.4802 12.2079 13.1676C11.3633 13.855 10.3631 14.325 9.2949 14.5366C8.22668 14.7481 7.12289 14.6948 6.08004 14.3813C5.03719 14.0677 4.08703 13.5034 3.31262 12.7378C2.53822 11.9722 1.96315 11.0286 1.6377 9.98935C1.31225 8.95015 1.24632 7.84704 1.44568 6.77647C1.64503 5.70591 2.10361 4.70047 2.78131 3.84807C3.45901 2.99567 4.3352 2.32226 5.33328 1.88672M14 7.99995C14.368 7.99995 14.67 7.70061 14.6333 7.33461C14.4797 5.80406 13.8014 4.37375 12.7136 3.28616C11.6257 2.19857 10.1953 1.52064 8.66468 1.36728C8.29802 1.33061 7.99935 1.63261 7.99935 2.00061V7.33395C7.99935 7.51076 8.06959 7.68033 8.19461 7.80535C8.31964 7.93038 8.4892 8.00061 8.66602 8.00061L14 7.99995Z" stroke="#334155" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_4723_25534"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>',
      children: []
    },
    {
      id: 'company',
      label: 'Entreprise',
      icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_4723_25557)"><path d="M4 14.6667V2.66668C4 2.31305 4.14048 1.97392 4.39052 1.72387C4.64057 1.47382 4.97971 1.33334 5.33333 1.33334H10.6667C11.0203 1.33334 11.3594 1.47382 11.6095 1.72387C11.8595 1.97392 12 2.31305 12 2.66668V14.6667M4 14.6667H12M4 14.6667H2.66667C2.31305 14.6667 1.97391 14.5262 1.72386 14.2762C1.47381 14.0261 1.33333 13.687 1.33333 13.3333V9.33334C1.33333 8.97972 1.47381 8.64058 1.72386 8.39053C1.97391 8.14049 2.31305 8.00001 2.66667 8.00001H4M12 14.6667H13.3333C13.687 14.6667 14.0261 14.5262 14.2761 14.2762C14.5262 14.0261 14.6667 13.687 14.6667 13.3333V7.33334C14.6667 6.97972 14.5262 6.64058 14.2761 6.39053C14.0261 6.14049 13.687 6.00001 13.3333 6.00001H12M6.66667 4.00001H9.33333M6.66667 6.66668H9.33333M6.66667 9.33334H9.33333M6.66667 12H9.33333" stroke="#334155" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_4723_25557"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>',
      children: [
        { label: 'Départements', href: '/entreprise/departements' },
        { label: 'Employés', href: '/entreprise/employes' }
      ]
    },
    {
      id: 'planning',
      label: 'Planning',
      icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.33333 1.33334V4.00001C9.33333 4.35363 9.47381 4.69277 9.72386 4.94282C9.97391 5.19287 10.313 5.33334 10.6667 5.33334H13.3333M6.66667 6.00001H5.33333M10.6667 8.66668H5.33333M10.6667 11.3333H5.33333M10 1.33334H4C3.64638 1.33334 3.30724 1.47382 3.05719 1.72387C2.80714 1.97392 2.66667 2.31305 2.66667 2.66668V13.3333C2.66667 13.687 2.80714 14.0261 3.05719 14.2762C3.30724 14.5262 3.64638 14.6667 4 14.6667H12C12.3536 14.6667 12.6928 14.5262 12.9428 14.2762C13.1929 14.0261 13.3333 13.687 13.3333 13.3333V4.66668L10 1.33334Z" stroke="#020617" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      children: []
    },
    {
      id: 'attendance',
      label: 'Présence et pointage',
      icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_4723_26829)"><path d="M8.00016 6.66668C7.64654 6.66668 7.3074 6.80715 7.05735 7.0572C6.8073 7.30725 6.66682 7.64639 6.66682 8.00001C6.66682 8.68001 6.60016 9.67334 6.49349 10.6667M9.33333 8.74676C9.33333 10.3334 9.33333 13.0001 8.66667 14.6668M11.5267 14.0133C11.6067 13.6133 11.8134 12.48 11.86 12M1.33333 8.00001C1.33333 6.60079 1.77358 5.23705 2.59172 4.10194C3.40986 2.96684 4.5644 2.11793 5.89182 1.67545C7.21923 1.23298 8.65221 1.21939 9.98778 1.63659C11.3234 2.05379 12.4938 2.88064 13.3333 4.00001M1.33333 10.6667H1.34M14.5332 10.6667C14.6665 9.33334 14.6205 7.09734 14.5332 6.66668M3.33333 13C3.66667 12 4 10 4 8.00001C3.99933 7.54592 4.07598 7.09503 4.22667 6.66668M5.7666 14.6667C5.9066 14.2267 6.0666 13.7867 6.1466 13.3333M6 4.5333C6.60827 4.18212 7.29828 3.99729 8.00064 3.99741C8.70301 3.99752 9.39296 4.18257 10.0011 4.53395C10.6093 4.88532 11.1142 5.39064 11.4651 5.99907C11.816 6.60751 12.0005 7.29761 12 7.99997V9.3333" stroke="#334155" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_4723_26829"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>',
      children: []
    }
  ];

  const bottomItems = [
    {
      id: 'notifications',
      label: 'Notifications',
      icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_4709_8680)"><path d="M8 5.33334V8M8 10.6667H8.00667M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33334 8 1.33334C11.6819 1.33334 14.6667 4.3181 14.6667 8Z" stroke="#334155" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_4709_8680"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>'
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14667 1.33334H7.85333C7.49971 1.33334 7.16057 1.47381 6.91053 1.72386C6.66048 1.97391 6.52 2.31305 6.52 2.66667V2.78667C6.51976 3.02049 6.45804 3.25013 6.34103 3.45256C6.22401 3.65499 6.05583 3.82309 5.85333 3.94L5.56667 4.10667C5.36398 4.22369 5.13405 4.2853 4.9 4.2853C4.66595 4.2853 4.43603 4.22369 4.23333 4.10667L4.13333 4.05334C3.82738 3.87684 3.46389 3.82897 3.12267 3.92021C2.78145 4.01145 2.49037 4.23436 2.31333 4.54L2.16667 4.79334C1.99018 5.09929 1.9423 5.46278 2.03354 5.804C2.12478 6.14523 2.34769 6.4363 2.65333 6.61334L2.75333 6.68C2.95485 6.79634 3.12241 6.9634 3.23937 7.16456C3.35632 7.36572 3.4186 7.59398 3.42 7.82667V8.16667C3.42093 8.40162 3.35977 8.63264 3.2427 8.83634C3.12563 9.04005 2.95681 9.2092 2.75333 9.32667L2.65333 9.38667C2.34769 9.5637 2.12478 9.85478 2.03354 10.196C1.9423 10.5372 1.99018 10.9007 2.16667 11.2067L2.31333 11.46C2.49037 11.7656 2.78145 11.9886 3.12267 12.0798C3.46389 12.171 3.82738 12.1232 4.13333 11.9467L4.23333 11.8933C4.43603 11.7763 4.66595 11.7147 4.9 11.7147C5.13405 11.7147 5.36398 11.7763 5.56667 11.8933L5.85333 12.06C6.05583 12.1769 6.22401 12.345 6.34103 12.5474C6.45804 12.7499 6.51976 12.9795 6.52 13.2133V13.3333C6.52 13.687 6.66048 14.0261 6.91053 14.2761C7.16057 14.5262 7.49971 14.6667 7.85333 14.6667H8.14667C8.50029 14.6667 8.83943 14.5262 9.08948 14.2761C9.33953 14.0261 9.48 13.687 9.48 13.3333V13.2133C9.48024 12.9795 9.54196 12.7499 9.65898 12.5474C9.77599 12.345 9.94418 12.1769 10.1467 12.06L10.4333 11.8933C10.636 11.7763 10.866 11.7147 11.1 11.7147C11.3341 11.7147 11.564 11.7763 11.7667 11.8933L11.8667 11.9467C12.1726 12.1232 12.5361 12.171 12.8773 12.0798C13.2186 11.9886 13.5096 11.7656 13.6867 11.46L13.8333 11.2C14.0098 10.894 14.0577 10.5306 13.9665 10.1893C13.8752 9.84811 13.6523 9.55704 13.3467 9.38L13.2467 9.32667C13.0432 9.2092 12.8744 9.04005 12.7573 8.83634C12.6402 8.63264 12.5791 8.40162 12.58 8.16667V7.83334C12.5791 7.59839 12.6402 7.36737 12.7573 7.16366C12.8744 6.95996 13.0432 6.79081 13.2467 6.67334L13.3467 6.61334C13.6523 6.4363 13.8752 6.14523 13.9665 5.804C14.0577 5.46278 14.0098 5.09929 13.8333 4.79334L13.6867 4.54C13.5096 4.23436 13.2186 4.01145 12.8773 3.92021C12.5361 3.82897 12.1726 3.87684 11.8667 4.05334L11.7667 4.10667C11.564 4.22369 11.3341 4.2853 11.1 4.2853C10.866 4.2853 10.636 4.22369 10.4333 4.10667L10.1467 3.94C9.94418 3.82309 9.77599 3.65499 9.65898 3.45256C9.54196 3.25013 9.48024 3.02049 9.48 2.78667V2.66667C9.48 2.31305 9.33953 1.97391 9.08948 1.72386C8.83943 1.47381 8.50029 1.33334 8.14667 1.33334Z" stroke="#334155" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#334155" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    }
  ];

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  const isActiveGroup = (item: NavigationItem) => {
    if (item.children && item.children.length > 0) {
      if (item.id === 'company') {
        return location.pathname.startsWith('/entreprise');
      }
      return item.children.some(child => isActiveRoute(child.href));
    }
    return false;
  };

  const shouldHighlightDepartements = () => {
    return location.pathname === '/entreprise/departements' || location.pathname === '/entreprise/employes';
  };

  return (
    <aside className={`flex flex-col justify-between self-stretch bg-slate-50 border-r border-slate-200 transition-all duration-300 max-md:hidden ${isCollapsed ? 'w-14' : 'w-60'}`}>
      {/* Company Header */}
      <header className="flex flex-col items-start self-stretch p-2">
        <div className={`flex items-center gap-2 self-stretch p-2 rounded-md ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="flex items-center bg-slate-900 p-2 rounded-lg">
            <div dangerouslySetInnerHTML={{
              __html: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.47128 1.92498C2.55317 1.74943 2.68314 1.60067 2.84611 1.49595C3.00908 1.39123 3.1984 1.33484 3.39211 1.33331H13.6379C14.4005 1.33331 14.9005 2.16664 14.5547 2.87497L13.0047 6.09583C12.8379 6.43747 12.538 6.72911 12.1671 6.74991H10.3629L8.38372 13.8958C8.32632 14.1147 8.19852 14.3086 8.02012 14.4479C7.84172 14.5872 7.62259 14.664 7.39626 14.6666H4.59628C3.92128 14.6666 3.42962 14 3.60462 13.325C4.1052 11.3934 4.64978 9.47345 5.23795 7.56658C5.67126 6.22077 7.05466 5.91665 8.37539 5.91665H9.28372C9.04212 5.61663 8.62546 5.49996 8.04212 5.49996H2.36294C1.60045 5.49996 1.10045 4.76665 1.44628 4.05831L2.47128 1.92498ZM10.3629 5.91665H11.8837C11.9677 5.91637 12.0496 5.89079 12.1187 5.84325C12.1879 5.79561 12.2411 5.72824 12.2713 5.64997L13.413 2.73331C13.4373 2.67028 13.4459 2.60229 13.4381 2.53518C13.4303 2.46808 13.4063 2.40389 13.3681 2.34812C13.3301 2.29235 13.2789 2.24669 13.2192 2.21508C13.1595 2.18347 13.093 2.16685 13.0255 2.16664H3.67128C3.58902 2.16706 3.50872 2.19181 3.4405 2.23778C3.37228 2.28375 3.3192 2.34889 3.28794 2.42498L2.60045 4.09164C2.57451 4.15477 2.56448 4.2233 2.57123 4.29121C2.57798 4.35912 2.60132 4.42433 2.63917 4.4811C2.67702 4.53789 2.72825 4.58451 2.78833 4.61685C2.84842 4.64921 2.91554 4.6663 2.98378 4.66664H8.04212C9.33379 4.66664 10.0754 5.32078 10.3629 5.91665ZM9.25039 6.74991H8.20872C7.34632 6.74991 6.50046 6.99998 6.21298 7.89998C5.71296 9.46245 5.09628 11.8874 4.72961 13.3C4.66295 13.5625 4.86294 13.8332 5.13794 13.8332H7.07126C7.26299 13.8332 7.42546 13.6916 7.47539 13.5124L9.25039 6.74991Z" fill="white"/></svg>'
            }} />
          </div>
          {!isCollapsed && (
            <>
              <div className="flex flex-col items-start gap-0.5 flex-[1_0_0]">
                <div className="self-stretch overflow-hidden text-slate-700 text-ellipsis text-sm font-bold leading-[14px]">
                  TimeTrack
                </div>
                <div className="self-stretch overflow-hidden text-slate-700 text-ellipsis text-xs font-normal leading-[15.96px]">
                  ZetaBox
                </div>
              </div>
              <div dangerouslySetInnerHTML={{
                __html: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.66667 10L8 13.3334L11.3333 10M4.66667 6.00002L8 2.66669L11.3333 6.00002" stroke="#334155" stroke-linecap="round" stroke-linejoin="round"/></svg>'
              }} />
            </>
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="flex flex-col items-start gap-2 flex-1 self-stretch">
        <div className="flex flex-col items-start flex-1 self-stretch p-2">
          {!isCollapsed && (
            <div className="text-[rgba(51,65,85,0.7)] text-xs font-normal leading-[20.04px] min-w-32 gap-2 self-stretch px-2 py-1.5">
              Plateforme
            </div>
          )}
          <div className={`flex flex-col items-start self-stretch ${isCollapsed ? 'gap-1' : ''}`}>
            {navigationItems.map((item) => (
              <div key={item.id} className="flex flex-col items-start self-stretch">
                {item.children && item.children.length > 0 ? (
                  <Link
                    to={item.children[0].href}
                    onClick={(e) => {
                      if (!isCollapsed) {
                        e.preventDefault();
                        toggleExpanded(item.id);
                      }
                    }}
                    className={`flex items-center gap-2 self-stretch rounded hover:bg-slate-100 transition-colors w-full text-left ${
                      isActiveGroup(item) ? 'bg-slate-100' : ''
                    } ${
                      isCollapsed 
                        ? 'w-10 h-10 p-2 justify-center mx-auto' 
                        : 'min-w-32 px-2 py-1.5'
                    }`}
                  >
                    <div dangerouslySetInnerHTML={{ __html: item.icon }} />
                    {!isCollapsed && (
                      <>
                        <div className="flex-[1_0_0] overflow-hidden text-slate-700 text-ellipsis text-sm font-normal leading-[20.02px]">
                          {item.label}
                        </div>
                        <div className="transform transition-transform">
                          {expandedItems.includes(item.id) ? (
                            <ChevronDown className="w-4 h-4 text-slate-700" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-700" />
                          )}
                        </div>
                      </>
                    )}
                  </Link>
                ) : (
                  <Link
                    to={item.id === 'dashboard' ? '/' : `/${item.id}`}
                    className={`flex items-center gap-2 self-stretch rounded hover:bg-slate-100 transition-colors w-full text-left ${
                      isActiveRoute(item.id === 'dashboard' ? '/' : `/${item.id}`) ? 'bg-slate-200 text-slate-900 font-medium' : ''
                    } ${
                      isCollapsed 
                        ? 'w-10 h-10 p-2 justify-center mx-auto' 
                        : 'min-w-32 px-2 py-1.5'
                    }`}
                  >
                    <div dangerouslySetInnerHTML={{ __html: item.icon }} />
                    {!isCollapsed && (
                      <div className="flex-[1_0_0] overflow-hidden text-slate-700 text-ellipsis text-sm font-normal leading-[20.02px]">
                        {item.label}
                      </div>
                    )}
                  </Link>
                )}
                {item.children && item.children.length > 0 && expandedItems.includes(item.id) && !isCollapsed && (
                  <div className="flex flex-col items-start self-stretch px-3.5 py-0">
                    <div className="flex flex-col items-start self-stretch border-l-slate-200 px-2.5 py-0.5 border-l border-solid">
                      {item.children.map((child, index) => (
                        <Link
                          key={index}
                          to={child.href}
                          className={`overflow-hidden text-ellipsis text-sm font-normal leading-[20.02px] min-w-32 gap-2 self-stretch rounded px-2 py-1.5 hover:bg-slate-100 transition-colors block ${
                            (child.href === '/entreprise/departements' && shouldHighlightDepartements()) ? 'bg-slate-200 text-slate-900 font-medium' : 
                            isActiveRoute(child.href) ? 'bg-slate-200 text-slate-900 font-medium' : 'text-slate-700'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col items-start self-stretch p-2">
          <div className={`flex flex-col items-start self-stretch ${isCollapsed ? 'gap-1' : ''}`}>
            {bottomItems.map((item) => (
              <Link
                key={item.id}
                to={`/${item.id}`}
                className={`flex items-center gap-2 self-stretch rounded hover:bg-slate-100 transition-colors w-full text-left ${
                  isCollapsed 
                    ? 'w-10 h-10 p-2 justify-center mx-auto' 
                    : 'min-w-32 px-2 py-1.5'
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: item.icon }} />
                {!isCollapsed && (
                  <div className="flex-[1_0_0] overflow-hidden text-slate-700 text-ellipsis text-sm font-normal leading-[20.02px]">
                    {item.label}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <footer className="flex flex-col items-start gap-2.5 self-stretch p-2">
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <Link
              to="/profil"
              className={`flex items-center gap-2 self-stretch rounded-md hover:bg-slate-100 transition-colors ${
                isCollapsed ? 'w-10 h-10 p-2 justify-center mx-auto' : 'p-2'
              }`}
            >
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                  alt={user?.name || 'User'}
                  className="w-8 h-8 rounded-lg object-cover"
                />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col items-start">
                  <div className="text-slate-950 text-sm font-medium leading-[20.02px]">
                    {user?.name || 'Employé'}
                  </div>
                  <div className="text-slate-500 text-xs font-normal leading-[17.18px]">
                    Compte employé
                  </div>
                </div>
              )}
            </Link>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-48">
            <ContextMenuItem onClick={() => window.location.href = '/profil'}>
              Profile Settings
            </ContextMenuItem>
            <ContextMenuItem onClick={handleLogout} className="text-red-600">
              Logout
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </footer>
    </aside>
  );
};
