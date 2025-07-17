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
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
  hireDate: string;
  salary?: number;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@company.com',
    phone: '+33 1 23 45 67 89',
    department: 'Développement',
    position: 'Développeur Senior',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    hireDate: '2023-01-15',
    salary: 65000
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@company.com',
    phone: '+33 1 23 45 67 90',
    department: 'Marketing',
    position: 'Chef de projet',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    hireDate: '2023-03-01',
    salary: 55000
  },
  {
    id: '3',
    firstName: 'Pierre',
    lastName: 'Dubois',
    email: 'pierre.dubois@company.com',
    phone: '+33 1 23 45 67 91',
    department: 'RH',
    position: 'Responsable RH',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    hireDate: '2022-11-10',
    salary: 60000
  }
];

export default function Employes() {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter(employee =>
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <CreateEmployeeForm onCancel={() => setShowCreateForm(false)} />
      </Layout>
    );
  }

  if (selectedEmployee) {
    return (
      <Layout
        pageTitle={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
        breadcrumbItems={[
          { label: "Entreprise" },
          { label: "Employés", href: "/entreprise/employes" },
          { label: `${selectedEmployee.firstName} ${selectedEmployee.lastName}` }
        ]}
      >
        <EmployeeDetails 
          employee={selectedEmployee} 
          onBack={() => setSelectedEmployee(null)} 
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
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher un employé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>

        <EmployeeList 
          employees={filteredEmployees}
          onEmployeeSelect={setSelectedEmployee}
        />
      </div>
    </Layout>
  );
}
