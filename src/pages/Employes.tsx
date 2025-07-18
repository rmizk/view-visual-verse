
import React, { useState } from 'react';
import { Plus, Search, Filter, Download, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmployeeList } from '@/components/EmployeeList';
import { CreateEmployeeForm } from '@/components/CreateEmployeeForm';
import { EmployeeDetails } from '@/components/EmployeeDetails';
import { Layout } from '@/components/Layout';
import { HeaderCtaButton } from '@/components/ui/header-cta-button';

interface Employee {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  departement: string;
  poste: string;
  statut: 'present' | 'absent' | 'conge';
  dateEmbauche: string;
  role: 'admin' | 'manager' | 'employe';
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    prenom: 'Jean',
    nom: 'Dupont',
    email: 'jean.dupont@company.com',
    telephone: '+33 1 23 45 67 89',
    departement: 'Développement',
    poste: 'Développeur Senior',
    statut: 'present',
    dateEmbauche: '2023-01-15',
    role: 'employe'
  },
  {
    id: '2',
    prenom: 'Marie',
    nom: 'Martin',
    email: 'marie.martin@company.com',
    telephone: '+33 1 23 45 67 90',
    departement: 'Marketing',
    poste: 'Chef de projet',
    statut: 'absent',
    dateEmbauche: '2023-03-01',
    role: 'manager'
  },
  {
    id: '3',
    prenom: 'Pierre',
    nom: 'Dubois',
    email: 'pierre.dubois@company.com',
    telephone: '+33 1 23 45 67 91',
    departement: 'RH',
    poste: 'Responsable RH',
    statut: 'present',
    dateEmbauche: '2022-11-10',
    role: 'admin'
  }
];

export default function Employes() {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');
  const [departmentFilter, setDepartmentFilter] = useState('tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employeeDetailsTab, setEmployeeDetailsTab] = useState('personnel');
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const itemsPerPage = 10;

  const ctaButton = (
    <HeaderCtaButton onClick={() => setShowCreateForm(true)}>
      <UserPlus className="w-4 h-4" />
      <span>Nouvel employé</span>
    </HeaderCtaButton>
  );

  if (showCreateForm) {
    return (
      <Layout
        pageTitle="Nouvel employé"
        breadcrumbItems={[
          { label: "Entreprise" },
          { label: "Employés", href: "/entreprise/employes" },
          { label: "Nouveau" }
        ]}
      >
        <CreateEmployeeForm onBack={() => setShowCreateForm(false)} />
      </Layout>
    );
  }

  if (selectedEmployee) {
    return (
      <Layout
        pageTitle={`${selectedEmployee.prenom} ${selectedEmployee.nom}`}
        breadcrumbItems={[
          { label: "Entreprise" },
          { label: "Employés", href: "/entreprise/employes" },
          { label: `${selectedEmployee.prenom} ${selectedEmployee.nom}` }
        ]}
      >
        <EmployeeDetails 
          employee={selectedEmployee} 
          employeeDetailsTab={employeeDetailsTab}
          setEmployeeDetailsTab={setEmployeeDetailsTab}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          currentUser={{ role: 'admin' }}
        />
      </Layout>
    );
  }

  return (
    <Layout
      pageTitle="Employés"
      breadcrumbItems={[
        { label: "Entreprise" },
        { label: "Employés" }
      ]}
      ctaButton={ctaButton}
    >
      <div className="space-y-4">
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
          onViewEmployee={setSelectedEmployee}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </Layout>
  );
}
