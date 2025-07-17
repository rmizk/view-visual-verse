import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUrlParams } from '@/utils/navigation';
import { EmployeeList } from '@/components/EmployeeList';
import { CreateEmployeeForm } from '@/components/CreateEmployeeForm';
import { EmployeeDetails } from '@/components/EmployeeDetails';

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

const Employes: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tous');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'details'>('list');
  const [employeeDetailsTab, setEmployeeDetailsTab] = useState('personnel');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');
  const [departmentFilter, setDepartmentFilter] = useState('tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const itemsPerPage = 5;

  // Get initial tab from URL params
  useEffect(() => {
    const urlParams = getUrlParams();
    if (urlParams.employeeId && urlParams.tab) {
      const employee = employees.find(emp => emp.id === urlParams.employeeId);
      if (employee) {
        setSelectedEmployee(employee);
        setViewMode('details');
        setEmployeeDetailsTab(urlParams.tab);
      }
    }
  }, []);

  const tabs = [
    { id: 'tous', label: 'Tous les employés' },
    { id: 'presents', label: 'Présents' },
    { id: 'absents', label: 'Absents' }
  ];

  const handleCreateEmployee = () => {
    setShowCreateForm(!showCreateForm);
    setViewMode('list');
    setSelectedEmployee(null);
  };

  const handleViewEmployee = (employee: Employee, activeTab = 'personnel') => {
    setSelectedEmployee(employee);
    setViewMode('details');
    setShowCreateForm(false);
    setEmployeeDetailsTab(activeTab);
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedEmployee(null);
    setShowCreateForm(false);
    // Clear URL params
    window.history.replaceState({}, '', window.location.pathname);
  };

  const employees: Employee[] = [
    { 
      id: '1', 
      nom: 'Dubois', 
      prenom: 'Marie', 
      poste: 'Directrice RH', 
      departement: 'RH', 
      statut: 'present', 
      email: 'marie.dubois@timetrack.com',
      telephone: '+33 1 23 45 67 89',
      dateEmbauche: '15/01/2020',
      role: 'admin'
    },
    { 
      id: '2', 
      nom: 'Martin', 
      prenom: 'Pierre', 
      poste: 'Lead Developer', 
      departement: 'Développement', 
      statut: 'present', 
      email: 'pierre.martin@timetrack.com',
      telephone: '+33 1 23 45 67 90',
      dateEmbauche: '10/03/2019',
      role: 'manager'
    },
    { 
      id: '3', 
      nom: 'Laurent', 
      prenom: 'Sophie', 
      poste: 'Chef Marketing', 
      departement: 'Marketing', 
      statut: 'conge', 
      email: 'sophie.laurent@timetrack.com',
      telephone: '+33 1 23 45 67 91',
      dateEmbauche: '05/07/2021',
      role: 'manager'
    },
    { 
      id: '4', 
      nom: 'Durand', 
      prenom: 'Jean', 
      poste: 'Directeur Commercial', 
      departement: 'Ventes', 
      statut: 'present', 
      email: 'jean.durand@timetrack.com',
      telephone: '+33 1 23 45 67 92',
      dateEmbauche: '20/11/2018',
      role: 'admin'
    },
    { 
      id: '5', 
      nom: 'Bernard', 
      prenom: 'Lucie', 
      poste: 'Comptable', 
      departement: 'Comptabilité', 
      statut: 'absent', 
      email: 'lucie.bernard@timetrack.com',
      telephone: '+33 1 23 45 67 93',
      dateEmbauche: '12/09/2022',
      role: 'employe'
    },
    { 
      id: '6', 
      nom: 'Moreau', 
      prenom: 'Antoine', 
      poste: 'Designer UX', 
      departement: 'Développement', 
      statut: 'present', 
      email: 'antoine.moreau@timetrack.com',
      telephone: '+33 1 23 45 67 94',
      dateEmbauche: '08/04/2023',
      role: 'employe'
    },
  ];

  // Mock current user - in real app this would come from auth context
  const currentUser = { role: 'admin' }; // Change to 'employe' to test permission visibility

  const breadcrumbItems = [
    { label: "Entreprise" },
    { label: "Employés" }
  ];

  const ctaButton = viewMode === 'list' ? (
    <button 
      onClick={handleCreateEmployee}
      className="flex min-w-16 justify-center items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
    >
      <UserPlus className="w-4 h-4 text-slate-50" />
      <span className="text-slate-50 text-sm font-normal leading-[23.94px]">
        Nouvel employé
      </span>
    </button>
  ) : (
    <Button
      variant="outline"
      size="icon"
      onClick={handleBackToList}
      className="h-8 w-8"
    >
      <ArrowLeft className="w-4 h-4" />
    </Button>
  );

  return (
    <Layout
      pageTitle="Entreprise"
      breadcrumbItems={breadcrumbItems}
      ctaButton={ctaButton}
    >
      {/* Tab Navigation - only show in list mode */}
      {viewMode === 'list' && (
        <TabNavigation 
          tabs={tabs}
          onTabChange={setActiveTab}
          defaultActiveTab="tous"
        />
      )}

      {/* Create Employee Form */}
      {showCreateForm && viewMode === 'list' && (
        <CreateEmployeeForm onClose={() => setShowCreateForm(false)} />
      )}

      {/* Employee Details */}
      {viewMode === 'details' && selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          employeeDetailsTab={employeeDetailsTab}
          setEmployeeDetailsTab={setEmployeeDetailsTab}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          currentUser={currentUser}
        />
      )}

      {/* Employee List */}
      {viewMode === 'list' && !showCreateForm && (
        <EmployeeList
          employees={employees}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onViewEmployee={handleViewEmployee}
          itemsPerPage={itemsPerPage}
        />
      )}
    </Layout>
  );
};

export default Employes;
