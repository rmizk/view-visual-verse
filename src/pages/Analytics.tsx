
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { DateRangePicker } from '@/components/DateRangePicker';
import { StatsCard } from '@/components/StatsCard';
import { OverviewChart } from '@/components/OverviewChart';

const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const [dateRange, setDateRange] = useState('Oct 17, 2024 - Nov 6, 2024');

  const tabs = [
    { id: 'performance', label: 'Performance' },
    { id: 'tendances', label: 'Tendances' },
    { id: 'comparaison', label: 'Comparaison' }
  ];

  const statsData = [
    {
      title: "Productivité moyenne",
      value: "87%",
      subtitle: "Plus qu'hier",
      trend: { value: "+5%", label: "Plus qu'hier" },
      icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1v6l4 2M14.5 8A6.5 6.5 0 1 1 8 1.5a6.5 6.5 0 0 1 6.5 6.5z" stroke="#020617" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
      title: "Temps de travail moyen",
      value: "7.8h",
      subtitle: "Par employé/jour",
      trend: { value: "+0.3h", label: "Par employé/jour" },
      icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4v4l3 2M14.5 8A6.5 6.5 0 1 1 8 1.5a6.5 6.5 0 0 1 6.5 6.5z" stroke="#020617" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
      title: "Retards ce mois",
      value: "12",
      subtitle: "Incidents de retard",
      trend: { value: "-8", label: "Incidents de retard" },
      icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3v5l3 2M14.5 8A6.5 6.5 0 1 1 8 1.5a6.5 6.5 0 0 1 6.5 6.5z" stroke="#020617" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
      title: "Satisfaction équipe",
      value: "94%",
      subtitle: "Score de satisfaction",
      trend: { value: "+2%", label: "Score de satisfaction" },
      icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7s1 2 3 2 3-2 3-2M9.5 4.5L9 5l.5.5M6.5 4.5L7 5l-.5.5M14.5 8A6.5 6.5 0 1 1 8 1.5a6.5 6.5 0 0 1 6.5 6.5z" stroke="#020617" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    }
  ];

  const breadcrumbItems = [
    { label: "Dashboard" },
    { label: "Analyse" }
  ];

  return (
    <Layout pageTitle="Dashboard" breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col items-start gap-4 flex-[1_0_0] self-stretch border-t-slate-200 bg-slate-50 pt-6 pb-8 px-8 rounded-[0px_0px_8px_8px] border-t border-solid max-sm:p-4">
        {/* Dashboard Header */}
        <div className="flex h-10 justify-between items-center self-stretch max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:h-auto">
          <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
            Analyse des performances
          </h1>
          <div className="flex items-start gap-3 max-sm:flex-col max-sm:w-full max-sm:gap-2">
            <DateRangePicker 
              value={dateRange}
              onChange={setDateRange}
            />
            <button className="flex min-w-16 justify-center items-center bg-slate-900 px-2 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
              <span className="text-slate-50 text-sm font-normal leading-[23.94px] px-1 py-0">
                Exporter
              </span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <TabNavigation 
          tabs={tabs}
          onTabChange={setActiveTab}
          defaultActiveTab="performance"
        />

        {/* Stats Cards */}
        <div className="flex items-start content-start gap-4 self-stretch flex-wrap max-md:flex-col max-sm:gap-2">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Chart */}
        <div className="flex items-start gap-4 self-stretch max-md:flex-col max-sm:gap-2">
          <OverviewChart title="Analyse des performances mensuelles" />
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
