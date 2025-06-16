import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { UserPlus, ArrowLeft, Search, Clock, Filter, Plus, Calendar, Eye, Edit, Trash2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getUrlParams } from '@/utils/navigation';
import { StatsCard } from '@/components/StatsCard';

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

interface TimeRecord {
  id: string;
  date: string;
  entree: string;
  sortie: string;
  pause: string;
  heuresTravaillees: string;
  statut: 'present' | 'retard' | 'absence';
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
  const [timeRecordsSearch, setTimeRecordsSearch] = useState('');
  const [timeRecordsDateFrom, setTimeRecordsDateFrom] = useState<Date>();
  const [timeRecordsDateTo, setTimeRecordsDateTo] = useState<Date>();
  const [timeRecordsStatus, setTimeRecordsStatus] = useState('tous');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
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

  const employeeDetailsTabs = [
    { id: 'personnel', label: 'Informations personnelles' },
    { id: 'presence', label: 'Présence' },
    { id: 'historique', label: 'Historique du pointage' },
    { id: 'permissions', label: 'Permissions' }
  ];

  // Mock monthly attendance data
  const monthlyAttendance = [
    {
      date: '2024-06-03',
      workedHours: '08:00',
      requiredHours: '08:00',
      difference: '00:00',
      overtime: '00:00',
      pointages: [
        { time: '08:30', type: 'entry' },
        { time: '12:00', type: 'exit' },
        { time: '13:00', type: 'entry' },
        { time: '17:30', type: 'exit' }
      ]
    },
    {
      date: '2024-06-02',
      workedHours: '07:15',
      requiredHours: '08:00',
      difference: '-00:45',
      overtime: '00:00',
      pointages: [
        { time: '09:15', type: 'entry' },
        { time: '12:00', type: 'exit' },
        { time: '13:00', type: 'entry' },
        { time: '17:30', type: 'exit' }
      ]
    },
    {
      date: '2024-06-01',
      workedHours: '08:30',
      requiredHours: '08:00',
      difference: '+00:30',
      overtime: '00:30',
      pointages: [
        { time: '08:00', type: 'entry' },
        { time: '12:00', type: 'exit' },
        { time: '13:00', type: 'entry' },
        { time: '17:30', type: 'exit' }
      ]
    }
  ];

  // Mock time records data
  const timeRecords: TimeRecord[] = [
    {
      id: '1',
      date: '2024-06-03',
      entree: '08:30',
      sortie: '17:30',
      pause: '01:00',
      heuresTravaillees: '08:00',
      statut: 'present'
    },
    {
      id: '2',
      date: '2024-06-02',
      entree: '09:15',
      sortie: '17:30',
      pause: '01:00',
      heuresTravaillees: '07:15',
      statut: 'retard'
    },
    {
      id: '3',
      date: '2024-06-01',
      entree: '-',
      sortie: '-',
      pause: '-',
      heuresTravaillees: '00:00',
      statut: 'absence'
    },
  ];

  // Copy email to clipboard function
  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      alert('Email copié dans le presse-papiers !');
    }).catch(() => {
      alert('Erreur lors de la copie de l\'email');
    });
  };

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

  const getStatusColor = (statut: Employee['statut']) => {
    switch (statut) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'conge':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (statut: Employee['statut']) => {
    switch (statut) {
      case 'present':
        return 'Présent';
      case 'absent':
        return 'Absent';
      case 'conge':
        return 'En congé';
      default:
        return 'Inconnu';
    }
  };

  const getRoleLabel = (role: Employee['role']) => {
    switch (role) {
      case 'admin':
        return 'Administrateur';
      case 'manager':
        return 'Manager';
      case 'employe':
        return 'Employé';
      default:
        return 'Inconnu';
    }
  };

  const getTimeRecordStatusColor = (statut: TimeRecord['statut']) => {
    switch (statut) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'retard':
        return 'bg-orange-100 text-orange-800';
      case 'absence':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeRecordStatusLabel = (statut: TimeRecord['statut']) => {
    switch (statut) {
      case 'present':
        return 'Présent';
      case 'retard':
        return 'Retard';
      case 'absence':
        return 'Absence';
      default:
        return 'Inconnu';
    }
  };

  // Mock current user - in real app this would come from auth context
  const currentUser = { role: 'admin' }; // Change to 'employe' to test permission visibility

  const breadcrumbItems = [
    { label: "Entreprise" },
    { label: "Employés" }
  ];

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = searchQuery === '' || 
      `${employee.prenom} ${employee.nom}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.poste.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'tous' || employee.statut === statusFilter;
    const matchesDepartment = departmentFilter === 'tous' || employee.departement === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  // Get unique departments for filter
  const departments = Array.from(new Set(employees.map(emp => emp.departement)));

  return (
    <Layout pageTitle="Entreprise" breadcrumbItems={breadcrumbItems}>
      {/* Header */}
      <div className="flex h-10 justify-between items-center self-stretch max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:h-auto">
        <div className="flex items-center gap-3">
          {viewMode === 'details' && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleBackToList}
              className="h-8 w-8"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
            {viewMode === 'details' && selectedEmployee 
              ? `${selectedEmployee.prenom} ${selectedEmployee.nom}` 
              : 'Employés'}
          </h1>
        </div>
        {viewMode === 'list' && (
          <div className="flex items-start gap-3 max-sm:flex-col max-sm:w-full max-sm:gap-2">
            <button 
              onClick={handleCreateEmployee}
              className="flex min-w-16 justify-center items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              <UserPlus className="w-4 h-4 text-slate-50" />
              <span className="text-slate-50 text-sm font-normal leading-[23.94px]">
                Nouvel employé
              </span>
            </button>
          </div>
        )}
        {viewMode === 'details' && employeeDetailsTab === 'historique' && (
          <Button 
            onClick={() => alert('Ajouter un nouveau pointage...')}
            className="bg-slate-900 hover:bg-slate-800"
          >
            <Plus className="w-4 h-4" />
            Ajouter un pointage
          </Button>
        )}
      </div>

      {/* Tab Navigation - only show in list mode */}
      {viewMode === 'list' && (
        <TabNavigation 
          tabs={tabs}
          onTabChange={setActiveTab}
          defaultActiveTab="tous"
        />
      )}

      {/* Search and Filters - only show in list mode */}
      {viewMode === 'list' && (
        <div className="flex justify-between items-center gap-4 w-full">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un employé..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les statuts</SelectItem>
                <SelectItem value="present">Présent</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="conge">En congé</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tous les départements" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les départements</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Employee Details Tab Navigation */}
      {viewMode === 'details' && (
        <TabNavigation 
          tabs={employeeDetailsTabs.filter(tab => 
            tab.id !== 'permissions' || currentUser.role === 'admin'
          )}
          onTabChange={setEmployeeDetailsTab}
          defaultActiveTab={employeeDetailsTab}
        />
      )}

      {/* Month selector for historique tab */}
      {viewMode === 'details' && employeeDetailsTab === 'historique' && (
        <div className="flex justify-between items-center gap-4 w-full">
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-48">
                  <Calendar className="w-4 h-4 mr-2" />
                  {format(selectedMonth, 'MMMM yyyy', { locale: fr })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedMonth}
                  onSelect={(date) => date && setSelectedMonth(date)}
                  locale={fr}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button 
            onClick={() => alert('Ajouter un nouveau pointage...')}
            className="bg-slate-900 hover:bg-slate-800"
          >
            <Plus className="w-4 h-4" />
            Ajouter un pointage
          </Button>
        </div>
      )}

      {/* Create Employee Form */}
      {showCreateForm && viewMode === 'list' && (
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="w-full bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-950 mb-4">Créer un nouvel employé</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Prénom
                </label>
                <input 
                  type="text" 
                  placeholder="Prénom de l'employé"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nom
                </label>
                <input 
                  type="text" 
                  placeholder="Nom de l'employé"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  placeholder="email@timetrack.com"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Poste
                </label>
                <input 
                  type="text" 
                  placeholder="Poste de l'employé"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Département
                </label>
                <select className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500">
                  <option>Sélectionner le département...</option>
                  <option>Développement</option>
                  <option>Marketing</option>
                  <option>RH</option>
                  <option>Ventes</option>
                  <option>Comptabilité</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Statut
                </label>
                <select className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500">
                  <option value="present">Présent</option>
                  <option value="absent">Absent</option>
                  <option value="conge">En congé</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button 
                onClick={() => {
                  alert('Employé créé avec succès !');
                  setShowCreateForm(false);
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800"
              >
                Créer l'employé
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Employee Details */}
      {viewMode === 'details' && selectedEmployee && (
        <div className="flex flex-col items-start gap-4 self-stretch">
          {employeeDetailsTab === 'personnel' && (
            <div className="w-full bg-white border border-slate-200 rounded-lg p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center">
                    <span className="text-xl font-medium text-slate-700">
                      {selectedEmployee.prenom[0]}{selectedEmployee.nom[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">
                      {selectedEmployee.prenom} {selectedEmployee.nom}
                    </h3>
                    <p className="text-slate-600">{selectedEmployee.poste}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-2 ${getStatusColor(selectedEmployee.statut)}`}>
                      {getStatusLabel(selectedEmployee.statut)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 bg-slate-50 cursor-not-allowed"
                      value={selectedEmployee.prenom}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 bg-slate-50 cursor-not-allowed"
                      value={selectedEmployee.nom}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 bg-slate-50 cursor-not-allowed"
                      value={selectedEmployee.email}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 bg-slate-50 cursor-not-allowed"
                      value={selectedEmployee.telephone}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Département
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 bg-slate-50 cursor-not-allowed"
                      value={selectedEmployee.departement}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Poste
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 bg-slate-50 cursor-not-allowed"
                      value={selectedEmployee.poste}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Date d'embauche
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 bg-slate-50 cursor-not-allowed"
                      value={selectedEmployee.dateEmbauche}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Rôle
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 bg-slate-50 cursor-not-allowed"
                      value={getRoleLabel(selectedEmployee.role)}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {employeeDetailsTab === 'presence' && (
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
          )}

          {employeeDetailsTab === 'historique' && !selectedDay && (
            <div className="w-full bg-white border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Heures travaillées
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Écart requis
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Heures sup.
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {monthlyAttendance.map((record) => (
                    <tr key={record.date} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.workedHours}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${record.difference.startsWith('+') ? 'text-green-600' : record.difference.startsWith('-') ? 'text-red-600' : 'text-slate-900'}`}>
                          {record.difference}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.overtime}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedDay(record.date)}
                          className="h-8"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Modifier
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {employeeDetailsTab === 'historique' && selectedDay && (
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSelectedDay(null)}
                    className="h-8 w-8"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <h3 className="text-lg font-semibold">Pointages du {selectedDay}</h3>
                </div>
                <Button 
                  onClick={() => alert('Ajouter un pointage pour cette journée...')}
                  className="bg-slate-900 hover:bg-slate-800"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter un pointage
                </Button>
              </div>
              
              <div className="w-full bg-white border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Heure
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Type de pointage
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {monthlyAttendance.find(record => record.date === selectedDay)?.pointages.map((pointage, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{pointage.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            pointage.type === 'entry' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {pointage.type === 'entry' ? 'Entrée' : 'Sortie'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => alert(`Modifier le pointage de ${pointage.time}`)}
                              className="h-8"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Modifier
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                if (confirm(`Supprimer le pointage de ${pointage.time} ?`)) {
                                  alert('Pointage supprimé');
                                }
                              }}
                              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {employeeDetailsTab === 'permissions' && currentUser.role === 'admin' && (
            <div className="w-full bg-white border border-slate-200 rounded-lg p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950 mb-4">Gestion des permissions</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Rôle utilisateur
                      </label>
                      <Select defaultValue={selectedEmployee.role}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employe">Employé</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="admin">Administrateur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-md font-medium text-slate-900">Permissions spécifiques</h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            id="manage-employees"
                            defaultChecked={selectedEmployee.role === 'admin'} 
                            className="mt-0.5"
                          />
                          <div className="space-y-1">
                            <label htmlFor="manage-employees" className="text-sm font-medium text-slate-700 cursor-pointer">
                              Gestion des employés
                            </label>
                            <p className="text-xs text-slate-500">
                              Permet de créer, modifier et supprimer des employés
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            id="manage-departments"
                            defaultChecked={selectedEmployee.role === 'admin'} 
                            className="mt-0.5"
                          />
                          <div className="space-y-1">
                            <label htmlFor="manage-departments" className="text-sm font-medium text-slate-700 cursor-pointer">
                              Gestion des départements
                            </label>
                            <p className="text-xs text-slate-500">
                              Permet de créer et modifier les départements de l'entreprise
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            id="manage-planning"
                            defaultChecked={selectedEmployee.role === 'admin' || selectedEmployee.role === 'manager'} 
                            className="mt-0.5"
                          />
                          <div className="space-y-1">
                            <label htmlFor="manage-planning" className="text-sm font-medium text-slate-700 cursor-pointer">
                              Gestion des plannings
                            </label>
                            <p className="text-xs text-slate-500">
                              Permet de créer et modifier les plannings de travail
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            id="view-reports"
                            defaultChecked={selectedEmployee.role === 'admin' || selectedEmployee.role === 'manager'} 
                            className="mt-0.5"
                          />
                          <div className="space-y-1">
                            <label htmlFor="view-reports" className="text-sm font-medium text-slate-700 cursor-pointer">
                              Consultation des rapports
                            </label>
                            <p className="text-xs text-slate-500">
                              Permet d'accéder aux rapports de présence et de productivité
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            id="manage-devices"
                            defaultChecked={selectedEmployee.role === 'admin'} 
                            className="mt-0.5"
                          />
                          <div className="space-y-1">
                            <label htmlFor="manage-devices" className="text-sm font-medium text-slate-700 cursor-pointer">
                              Gestion des pointeuses
                            </label>
                            <p className="text-xs text-slate-500">
                              Permet de configurer et gérer les pointeuses de l'entreprise
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            id="system-settings"
                            defaultChecked={selectedEmployee.role === 'admin'} 
                            className="mt-0.5"
                          />
                          <div className="space-y-1">
                            <label htmlFor="system-settings" className="text-sm font-medium text-slate-700 cursor-pointer">
                              Paramètres système
                            </label>
                            <p className="text-xs text-slate-500">
                              Permet d'accéder aux paramètres généraux du système
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => alert('Permissions mises à jour avec succès !')}
                      className="w-full bg-slate-900 hover:bg-slate-800"
                    >
                      Sauvegarder les permissions
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Employees Table */}
      {viewMode === 'list' && (
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="w-full bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Employé
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Poste
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Département
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {paginatedEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                              <span className="text-sm font-medium text-slate-700">
                                {employee.prenom[0]}{employee.nom[0]}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900">
                              {employee.prenom} {employee.nom}
                            </div>
                            <div className="text-sm text-slate-500 flex items-center gap-2">
                              {employee.email}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(employee.email);
                                }}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                                title="Copier l'email"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{employee.poste}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{employee.departement}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.statut)}`}>
                          {getStatusLabel(employee.statut)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewEmployee(employee);
                            }}
                            className="h-8"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Voir détails
                          </Button>
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(`Modification de ${employee.prenom} ${employee.nom}`);
                            }}
                            className="h-8"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Modifier
                          </Button>
                          <Button 
                            variant="outline"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Êtes-vous sûr de vouloir supprimer ${employee.prenom} ${employee.nom} ?`)) {
                                alert(`${employee.prenom} ${employee.nom} supprimé`);
                              }
                            }}
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="w-full flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Employes;
