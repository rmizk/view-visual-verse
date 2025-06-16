
import React from 'react';
import { TabNavigation } from '@/components/TabNavigation';
import { EmployeePersonalInfo } from '@/components/EmployeePersonalInfo';
import { EmployeePresence } from '@/components/EmployeePresence';
import { EmployeeHistory } from '@/components/EmployeeHistory';
import { EmployeePermissions } from '@/components/EmployeePermissions';

interface Employee {
  id: string;
  nom: string;
  prenom: string;
  poste: string;
  departement: string;
  statut: 'present' | 'absent' | 'conge';
  email: string;
  telephone: string;
  dateEmbauche: string;
  role: 'admin' | 'manager' | 'employe';
}

interface EmployeeDetailsProps {
  employee: Employee;
  employeeDetailsTab: string;
  setEmployeeDetailsTab: (tab: string) => void;
  selectedMonth: Date;
  setSelectedMonth: (date: Date) => void;
  currentUser: { role: string };
}

export const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
  employee,
  employeeDetailsTab,
  setEmployeeDetailsTab,
  selectedMonth,
  setSelectedMonth,
  currentUser
}) => {
  const employeeDetailsTabs = [
    { id: 'personnel', label: 'Informations personnelles' },
    { id: 'presence', label: 'Présence' },
    { id: 'historique', label: 'Historique du pointage' },
    { id: 'permissions', label: 'Permissions' }
  ];

  return (
    <>
      {/* Employee Details Tab Navigation */}
      <TabNavigation 
        tabs={employeeDetailsTabs.filter(tab => 
          tab.id !== 'permissions' || currentUser.role === 'admin'
        )}
        onTabChange={setEmployeeDetailsTab}
        defaultActiveTab={employeeDetailsTab}
      />

      {/* Employee Details Content */}
      <div className="flex flex-col items-start gap-4 self-stretch">
        {employeeDetailsTab === 'personnel' && (
          <EmployeePersonalInfo employee={employee} />
        )}

        {employeeDetailsTab === 'presence' && (
          <EmployeePresence />
        )}

        {employeeDetailsTab === 'historique' && (
          <EmployeeHistory 
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        )}

        {employeeDetailsTab === 'permissions' && currentUser.role === 'admin' && (
          <EmployeePermissions employee={employee} />
        )}
      </div>
    </>
  );
};
