import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { Download, ArrowLeft, Plus, Search, Edit, Calendar, Eye, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { navigateToEmployeeDetails } from '@/utils/navigation';
import AddPointeuseForm from '@/components/AddPointeuseForm';

interface Employee {
  id: string;
  nom: string;
  prenom: string;
  poste: string;
  departement: string;
  statut: 'present' | 'absent' | 'conge';
  email: string;
}

interface CheckIn {
  id: string;
  date: string;
  heureArrivee: string;
  heureDepart: string;
  duree: string;
  statut: 'complet' | 'en_cours' | 'absent';
}

interface Pointeuse {
  id: string;
  nom: string;
  localisation: string;
  type: 'rfid' | 'biometrique' | 'code_pin';
  statut: 'active' | 'inactive' | 'maintenance';
  dernierSync: string;
}

const Attendance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('presence');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'checkins'>('overview');
  const [currentPage, setCurrentPage] = useState(1);
  const [checkinsCurrentPage, setCheckinsCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');
  const [dateSearch, setDateSearch] = useState('');
  const [pointeuseSearch, setPointeuseSearch] = useState('');
  const [isAddPointeuseFormOpen, setIsAddPointeuseFormOpen] = useState(false);
  const [pointeuseStatusFilter, setPointeuseStatusFilter] = useState('tous');
  const [pointeuseTypeFilter, setPointeuseTypeFilter] = useState('tous');
  const itemsPerPage = 5;

  const tabs = [
    { id: 'presence', label: 'Présence' },
    { id: 'pointeuse', label: 'Pointeuse' }
  ];

  const handleExportData = () => {
    alert('Export des données en cours...');
  };

  const handleViewCheckIns = (employee: Employee) => {
    navigateToEmployeeDetails(employee.id, 'historique');
  };

  const handleBackToOverview = () => {
    setViewMode('overview');
    setSelectedEmployee(null);
  };

  const handleAddCheckIn = () => {
    alert('Ajouter un nouveau pointage...');
  };

  const handleEditTime = (checkInId: string) => {
    alert(`Modifier les heures pour le pointage ${checkInId}...`);
  };

  const handleAddPointeuse = () => {
    setIsAddPointeuseFormOpen(true);
  };

  const handleAddPointeuseSubmit = (data: any) => {
    console.log('New pointeuse data:', data);
    // Here you would typically send the data to your backend
    alert('Pointeuse ajoutée avec succès!');
    setIsAddPointeuseFormOpen(false); // Close the form after submission
  };

  const handleEditPointeuse = (pointeuseId: string) => {
    alert(`Modifier la pointeuse ${pointeuseId}...`);
  };

  const attendanceData = [
    { id: '1', employee: 'Marie Dubois', arrival: '08:45', departure: '17:15', status: 'present', totalHours: '8h30' },
    { id: '2', employee: 'Pierre Martin', arrival: '09:00', departure: '18:00', status: 'present', totalHours: '8h45' },
    { id: '3', employee: 'Sophie Laurent', arrival: '-', departure: '-', status: 'conge', totalHours: '-' },
    { id: '4', employee: 'Jean Durand', arrival: '08:30', departure: '16:30', status: 'present', totalHours: '8h00' },
    { id: '5', employee: 'Lucie Bernard', arrival: '-', departure: '-', status: 'absent', totalHours: '-' },
  ];

  const checkIns: CheckIn[] = [
    { id: '1', date: '02/06/2025', heureArrivee: '08:30', heureDepart: '17:15', duree: '8h 45m', statut: 'complet' },
    { id: '2', date: '01/06/2025', heureArrivee: '08:15', heureDepart: '17:30', duree: '9h 15m', statut: 'complet' },
    { id: '3', date: '31/05/2025', heureArrivee: '09:00', heureDepart: '18:00', duree: '9h 00m', statut: 'complet' },
    { id: '4', date: '30/05/2025', heureArrivee: '08:45', heureDepart: '17:00', duree: '8h 15m', statut: 'complet' },
    { id: '5', date: '29/05/2025', heureArrivee: '08:30', heureDepart: '-', duree: '-', statut: 'en_cours' },
    { id: '6', date: '28/05/2025', heureArrivee: '-', heureDepart: '-', duree: '-', statut: 'absent' },
  ];

  const pointeuses: Pointeuse[] = [
    { id: '1', nom: 'Pointeuse Entrée Principale', localisation: 'Hall d\'entrée', type: 'rfid', statut: 'active', dernierSync: '02/06/2025 09:30' },
    { id: '2', nom: 'Pointeuse Bureau RH', localisation: 'Étage 2 - RH', type: 'biometrique', statut: 'active', dernierSync: '02/06/2025 09:25' },
    { id: '3', nom: 'Pointeuse Cafétéria', localisation: 'Rez-de-chaussée', type: 'code_pin', statut: 'maintenance', dernierSync: '01/06/2025 16:45' },
    { id: '4', nom: 'Pointeuse Parking', localisation: 'Parking extérieur', type: 'rfid', statut: 'inactive', dernierSync: '30/05/2025 18:00' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const getStatusLabel = (status: string) => {
    switch (status) {
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

  const getCheckInStatusColor = (statut: CheckIn['statut']) => {
    switch (statut) {
      case 'complet':
        return 'bg-green-100 text-green-800';
      case 'en_cours':
        return 'bg-blue-100 text-blue-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCheckInStatusLabel = (statut: CheckIn['statut']) => {
    switch (statut) {
      case 'complet':
        return 'Complet';
      case 'en_cours':
        return 'En cours';
      case 'absent':
        return 'Absent';
      default:
        return 'Inconnu';
    }
  };

  const getPointeuseStatusColor = (statut: Pointeuse['statut']) => {
    switch (statut) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPointeuseStatusLabel = (statut: Pointeuse['statut']) => {
    switch (statut) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'maintenance':
        return 'Maintenance';
      default:
        return 'Inconnu';
    }
  };

  const getTypeLabel = (type: Pointeuse['type']) => {
    switch (type) {
      case 'rfid':
        return 'RFID';
      case 'biometrique':
        return 'Biométrique';
      case 'code_pin':
        return 'Code PIN';
      default:
        return 'Inconnu';
    }
  };

  const breadcrumbItems = [
    { label: "Présence et pointage" }
  ];

  // Filter attendance data based on search and status
  const filteredAttendanceData = attendanceData.filter(record => {
    const matchesSearch = record.employee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'tous' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter check-ins based on date search
  const filteredCheckIns = checkIns.filter(checkIn => {
    return dateSearch === '' || checkIn.date.includes(dateSearch);
  });

  // Filter pointeuses based on search and filters
  const filteredPointeuses = pointeuses.filter(pointeuse => {
    const matchesSearch = pointeuse.nom.toLowerCase().includes(pointeuseSearch.toLowerCase()) ||
           pointeuse.localisation.toLowerCase().includes(pointeuseSearch.toLowerCase());
    const matchesStatus = pointeuseStatusFilter === 'tous' || pointeuse.statut === pointeuseStatusFilter;
    const matchesType = pointeuseTypeFilter === 'tous' || pointeuse.type === pointeuseTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination for attendance data
  const totalPages = Math.ceil(filteredAttendanceData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAttendanceData = filteredAttendanceData.slice(startIndex, startIndex + itemsPerPage);

  // Pagination for check-ins
  const checkinsTotalPages = Math.ceil(filteredCheckIns.length / itemsPerPage);
  const checkinsStartIndex = (checkinsCurrentPage - 1) * itemsPerPage;
  const paginatedCheckIns = filteredCheckIns.slice(checkinsStartIndex, checkinsStartIndex + itemsPerPage);

  // Pagination for pointeuses
  const pointeusesTotalPages = Math.ceil(filteredPointeuses.length / itemsPerPage);
  const pointeusesStartIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPointeuses = filteredPointeuses.slice(pointeusesStartIndex, pointeusesStartIndex + itemsPerPage);

  // Dynamic CTA button based on current view/tab
  const getCTAButton = () => {
    if (viewMode === 'checkins') return null;
    
    if (activeTab === 'presence') {
      return (
        <button 
          onClick={handleExportData}
          className="flex min-w-16 justify-center items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          <Download className="w-4 h-4 text-slate-50" />
          <span className="text-slate-50 text-sm font-normal leading-[23.94px]">
            Exporter données
          </span>
        </button>
      );
    }
    
    if (activeTab === 'pointeuse' && !isAddPointeuseFormOpen) {
      return (
        <Button 
          onClick={handleAddPointeuse}
          className="bg-slate-900 hover:bg-slate-800"
        >
          <Plus className="w-4 h-4" />
          Ajouter pointeuse
        </Button>
      );
    }
    
    return null;
  };

  return (
    <Layout 
      pageTitle={viewMode === 'checkins' && selectedEmployee ? `Pointages de ${selectedEmployee.nom}` : 'Présence et pointage'} 
      breadcrumbItems={breadcrumbItems} 
      ctaButton={getCTAButton()}
    >
      {/* Back button for checkins view */}
      {viewMode === 'checkins' && (
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleBackToOverview}
            className="h-8 w-8"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Tab Navigation - only show in overview mode */}
      {viewMode === 'overview' && (
        <TabNavigation 
          tabs={tabs}
          onTabChange={setActiveTab}
          defaultActiveTab="presence"
        />
      )}

      {/* Search and Filters for presence tab */}
      {viewMode === 'overview' && activeTab === 'presence' && (
        <div className="flex justify-between items-center gap-4 w-full">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher un employé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous les statuts</SelectItem>
              <SelectItem value="present">Présent</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
              <SelectItem value="conge">En congé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Search and Filters for pointeuse tab */}
      {viewMode === 'overview' && activeTab === 'pointeuse' && !isAddPointeuseFormOpen && (
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Rechercher une pointeuse..."
              value={pointeuseSearch}
              onChange={(e) => setPointeuseSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={pointeuseStatusFilter} onValueChange={setPointeuseStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous statuts</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={pointeuseTypeFilter} onValueChange={setPointeuseTypeFilter}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous types</SelectItem>
                <SelectItem value="rfid">RFID</SelectItem>
                <SelectItem value="biometrique">Biométrique</SelectItem>
                <SelectItem value="code_pin">Code PIN</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Add Pointeuse Form - show inline */}
      {activeTab === 'pointeuse' && isAddPointeuseFormOpen && (
        <div className="w-full">
          <AddPointeuseForm
            isOpen={true}
            onClose={() => setIsAddPointeuseFormOpen(false)}
            onSubmit={handleAddPointeuseSubmit}
            inline={true}
          />
        </div>
      )}

      {/* Check-ins Table with controls */}
      {viewMode === 'checkins' && selectedEmployee && (
        <div className="flex flex-col items-start gap-4 self-stretch">
          {/* Controls for check-ins view */}
          <div className="flex justify-between items-center gap-4 w-full">
            <Button 
              onClick={handleAddCheckIn}
              className="bg-slate-900 hover:bg-slate-800"
            >
              <Plus className="w-4 h-4" />
              Ajouter un pointage
            </Button>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher par date..."
                value={dateSearch}
                onChange={(e) => setDateSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              />
            </div>
          </div>

          <div className="w-full bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-950 mb-4">Historique des pointages</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Heure d'arrivée
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Heure de départ
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Durée
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
                  {paginatedCheckIns.map((checkIn) => (
                    <tr key={checkIn.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{checkIn.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{checkIn.heureArrivee}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{checkIn.heureDepart}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{checkIn.duree}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCheckInStatusColor(checkIn.statut)}`}>
                          {getCheckInStatusLabel(checkIn.statut)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditTime(checkIn.id)}
                          className="text-slate-600 hover:text-slate-900"
                        >
                          <Edit className="w-4 h-4" />
                          Modifier heures
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination for Check-ins */}
            {checkinsTotalPages > 1 && (
              <div className="w-full flex justify-center mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCheckinsCurrentPage(prev => Math.max(prev - 1, 1))}
                        className={checkinsCurrentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    {Array.from({ length: checkinsTotalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCheckinsCurrentPage(page)}
                          isActive={checkinsCurrentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCheckinsCurrentPage(prev => Math.min(prev + 1, checkinsTotalPages))}
                        className={checkinsCurrentPage === checkinsTotalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pointeuse Tab Content - only show if form is not open */}
      {viewMode === 'overview' && activeTab === 'pointeuse' && !isAddPointeuseFormOpen && (
        <div className="w-full bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Localisation
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Dernière sync
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {paginatedPointeuses.map((pointeuse) => (
                  <tr key={pointeuse.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{pointeuse.nom}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{pointeuse.localisation}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{getTypeLabel(pointeuse.type)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPointeuseStatusColor(pointeuse.statut)}`}>
                        {getPointeuseStatusLabel(pointeuse.statut)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{pointeuse.dernierSync}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPointeuse(pointeuse.id)}
                        className="text-slate-600 hover:text-slate-900"
                      >
                        <Edit className="w-4 h-4" />
                        Modifier
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination for Pointeuses */}
          {pointeusesTotalPages > 1 && (
            <div className="w-full flex justify-center p-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {Array.from({ length: pointeusesTotalPages }, (_, i) => i + 1).map((page) => (
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
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, pointeusesTotalPages))}
                      className={currentPage === pointeusesTotalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}

      {/* Presence Overview Content */}
      {viewMode === 'overview' && activeTab === 'presence' && (
        <>
          {/* Attendance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-600">24</h3>
              <p className="text-sm text-slate-600">Employés présents</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-600">1</h3>
              <p className="text-sm text-slate-600">Employés absents</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-orange-600">1</h3>
              <p className="text-sm text-slate-600">En congé</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600">92%</h3>
              <p className="text-sm text-slate-600">Taux de présence</p>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="w-full bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Employé
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Arrivée
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Départ
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Total heures
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
                  {paginatedAttendanceData.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{record.employee}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.arrival}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.departure}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{record.totalHours}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                          {getStatusLabel(record.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewCheckIns({
                            id: record.id,
                            nom: record.employee.split(' ')[1] || record.employee,
                            prenom: record.employee.split(' ')[0] || '',
                            poste: '',
                            departement: '',
                            statut: record.status as 'present' | 'absent' | 'conge',
                            email: ''
                          })}
                          className="text-slate-600 hover:text-slate-900"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Voir pointages
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination for Attendance */}
            {totalPages > 1 && (
              <div className="w-full flex justify-center p-4">
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
        </>
      )}

      {/* Add Pointeuse Form Modal */}
      <AddPointeuseForm
        isOpen={isAddPointeuseFormOpen}
        onClose={() => setIsAddPointeuseFormOpen(false)}
        onSubmit={handleAddPointeuseSubmit}
      />
    </Layout>
  );
};

export default Attendance;
