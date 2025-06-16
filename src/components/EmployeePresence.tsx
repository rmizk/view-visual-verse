
import React from 'react';
import { StatsCard } from '@/components/StatsCard';

export const EmployeePresence: React.FC = () => {
  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Heures travaillées ce mois"
          value="152h 30min"
          subtitle="Sur 160h requises"
          icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
        />
        <StatsCard
          title="Heures supplémentaires"
          value="8h 15min"
          subtitle="Ce mois-ci"
          icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>'
        />
        <StatsCard
          title="Retards"
          value="3"
          subtitle="Ce mois-ci"
          icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
        />
        <StatsCard
          title="Absences"
          value="2"
          subtitle="Ce mois-ci"
          icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18 12M6 6l12 12"></path></svg>'
        />
        <StatsCard
          title="Solde congés"
          value="18 jours"
          subtitle="Congés restants"
          icon='<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>'
        />
      </div>
    </div>
  );
};
