import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { Plus, Search, Calendar as CalendarIcon, Users, Clock, Edit, Eye, ChevronDown, Bell } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

const Planning: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [planningData, setPlanningData] = useState({
    name: '',
    type: '',
    startDate: '',
    endDate: '',
    employees: [] as string[],
    shifts: [{ name: 'Équipe du matin', startTime: '08:00', endTime: '16:00', employees: [] as string[] }],
    fixedSchedule: { startTime: '09:00', endTime: '17:00', breakTime: '12:00-13:00' },
    variableSchedule: {
      monday: { startTime: '09:00', endTime: '17:00' },
      tuesday: { startTime: '09:00', endTime: '17:00' },
      wednesday: { startTime: '09:00', endTime: '17:00' },
      thursday: { startTime: '09:00', endTime: '17:00' },
      friday: { startTime: '09:00', endTime: '17:00' },
      saturday: { startTime: '', endTime: '' },
      sunday: { startTime: '', endTime: '' }
    },
    flexibleSchedule: {
      totalDailyHours: 8,
      fixedTimeSlots: [
        { startTime: '10:00', endTime: '12:00', name: 'Slot 1' },
        { startTime: '14:00', endTime: '16:00', name: 'Slot 2' }
      ]
    }
  });

  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const tabs = [
    { id: 'overview', label: "Vue d'ensemble" },
    { id: 'active', label: 'Plannings actifs' },
    { id: 'archived', label: 'Plannings archivés' }
  ];

  const activePlannings = [
    {
      id: 1,
      name: 'Planning Équipe Développement',
      type: 'Fixe',
      employees: 12,
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      status: 'Actif'
    },
    {
      id: 2,
      name: 'Planning Service Client',
      type: 'Shifts',
      employees: 8,
      startDate: '2024-01-10',
      endDate: '2024-02-28',
      status: 'Actif'
    },
    {
      id: 3,
      name: 'Planning Marketing',
      type: 'Variable',
      employees: 6,
      startDate: '2024-01-20',
      endDate: '2024-04-20',
      status: 'Actif'
    }
  ];

  const mockEmployees = [
    { id: '1', name: 'Jean Dupont', department: 'Développement' },
    { id: '2', name: 'Marie Martin', department: 'Marketing' },
    { id: '3', name: 'Pierre Durand', department: 'Ventes' },
    { id: '4', name: 'Sophie Bernard', department: 'RH' },
    { id: '5', name: 'Luc Moreau', department: 'Développement' },
    { id: '6', name: 'Emma Petit', department: 'Marketing' }
  ];

  const departments = ['Développement', 'Marketing', 'Ventes', 'RH'];

  const handleEmployeeSelect = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleShiftEmployeeSelect = (shiftIndex: number, employeeId: string) => {
    const newShifts = [...planningData.shifts];
    const shift = newShifts[shiftIndex];
    
    if (shift.employees.includes(employeeId)) {
      shift.employees = shift.employees.filter(id => id !== employeeId);
    } else {
      shift.employees = [...shift.employees, employeeId];
    }
    
    setPlanningData({...planningData, shifts: newShifts});
  };

  const getAssignedEmployees = () => {
    const assigned = new Set<string>();
    planningData.shifts.forEach(shift => {
      shift.employees.forEach(empId => assigned.add(empId));
    });
    return assigned;
  };

  const getAvailableEmployeesForShift = (currentShiftIndex: number) => {
    const assignedEmployees = getAssignedEmployees();
    const currentShiftEmployees = planningData.shifts[currentShiftIndex]?.employees || [];
    
    return mockEmployees.filter(employee => {
      const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
      const isNotAssignedToOtherShifts = !assignedEmployees.has(employee.id) || currentShiftEmployees.includes(employee.id);
      return matchesDepartment && isNotAssignedToOtherShifts;
    });
  };

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    return matchesDepartment;
  });

  const handleCreatePlanning = () => {
    setShowCreateForm(true);
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    toast({
      title: "Planning créé avec succès",
      description: `Le planning "${planningData.name}" a été créé et est maintenant actif.`,
    });
    setShowCreateForm(false);
    setCurrentStep(1);
    setPlanningData({
      name: '',
      type: '',
      startDate: '',
      endDate: '',
      employees: [],
      shifts: [{ name: 'Équipe du matin', startTime: '08:00', endTime: '16:00', employees: [] }],
      fixedSchedule: { startTime: '09:00', endTime: '17:00', breakTime: '12:00-13:00' },
      variableSchedule: {
        monday: { startTime: '09:00', endTime: '17:00' },
        tuesday: { startTime: '09:00', endTime: '17:00' },
        wednesday: { startTime: '09:00', endTime: '17:00' },
        thursday: { startTime: '09:00', endTime: '17:00' },
        friday: { startTime: '09:00', endTime: '17:00' },
        saturday: { startTime: '', endTime: '' },
        sunday: { startTime: '', endTime: '' }
      },
      flexibleSchedule: {
        totalDailyHours: 8,
        fixedTimeSlots: [
          { startTime: '10:00', endTime: '12:00', name: 'Slot 1' },
          { startTime: '14:00', endTime: '16:00', name: 'Slot 2' }
        ]
      }
    });
  };

  const handleViewDetails = (planningId: number) => {
    toast({
      title: "Détails du planning",
      description: `Affichage des détails du planning ID: ${planningId}`,
    });
  };

  const handleManage = (planningId: number) => {
    toast({
      title: "Gestion du planning",
      description: `Ouverture de la gestion du planning ID: ${planningId}`,
    });
  };

  const filteredPlannings = activePlannings.filter(planning =>
    planning.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const breadcrumbItems = [
    { label: "Planning" }
  ];

  const calendarEvents = [
    {
      date: new Date(),
      shifts: [
        { name: 'Équipe du matin', startTime: '08:00', endTime: '16:00', employees: 6, color: 'blue' },
        { name: 'Équipe de jour', startTime: '09:00', endTime: '17:00', employees: 8, color: 'green' },
        { name: 'Équipe de soir', startTime: '14:00', endTime: '22:00', employees: 4, color: 'orange' }
      ]
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      shifts: [
        { name: 'Équipe du matin', startTime: '08:00', endTime: '16:00', employees: 5, color: 'blue' },
        { name: 'Équipe de jour', startTime: '09:00', endTime: '17:00', employees: 7, color: 'green' },
        { name: 'Équipe de soir', startTime: '14:00', endTime: '22:00', employees: 3, color: 'orange' }
      ]
    }
  ];

  const getShiftsForSelectedDate = () => {
    if (!selectedDate) return [];
    
    const event = calendarEvents.find(event => 
      event.date.toDateString() === selectedDate.toDateString()
    );
    
    return event ? event.shifts : [];
  };

  const selectedDateShifts = getShiftsForSelectedDate();

  return (
    <Layout pageTitle="Planning" breadcrumbItems={breadcrumbItems}>
      {!showCreateForm ? (
        <>
          {/* Header */}
          <div className="flex h-10 justify-between items-center self-stretch max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:h-auto">
            <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
              Gestion des plannings
            </h1>
            <div className="flex items-start gap-3 max-sm:flex-col max-sm:w-full max-sm:gap-2">
              <button 
                onClick={handleCreatePlanning}
                className="flex min-w-16 justify-center items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                <Plus className="w-4 h-4 text-slate-50" />
                <span className="text-slate-50 text-sm font-normal leading-[23.94px]">
                  Nouveau planning
                </span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <TabNavigation 
            tabs={tabs}
            onTabChange={setActiveTab}
            defaultActiveTab="overview"
          />

          {/* Quick Stats - moved under tabs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Plannings actifs</p>
                  <p className="text-2xl font-bold text-slate-900">3</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Employés planifiés</p>
                  <p className="text-2xl font-bold text-slate-900">26</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Heures planifiées</p>
                  <p className="text-2xl font-bold text-slate-900">1,040h</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Shifts actifs</p>
                  <p className="text-2xl font-bold text-slate-900">8</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col items-start gap-4 self-stretch">
            {activeTab === 'overview' && (
              <div className="w-full space-y-6">
                {/* Enhanced Calendar Overview */}
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-950 mb-4">Planning du mois</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Calendar - larger section */}
                    <div className="lg:col-span-3">
                      <div className="grid grid-cols-7 gap-4 mb-4">
                        {/* Week headers */}
                        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                          <div key={day} className="text-center text-sm font-medium text-slate-600 py-2">
                            {day}
                          </div>
                        ))}
                        
                        {/* Calendar days with shift info */}
                        {Array.from({ length: 35 }, (_, i) => {
                          const date = new Date();
                          date.setDate(date.getDate() - date.getDay() + 1 + i);
                          const isToday = date.toDateString() === new Date().toDateString();
                          const isSelected = selectedDate?.toDateString() === date.toDateString();
                          
                          return (
                            <div
                              key={i}
                              onClick={() => setSelectedDate(date)}
                              className={`
                                p-2 h-24 border border-slate-200 rounded-lg cursor-pointer transition-colors
                                ${isToday ? 'bg-blue-50 border-blue-200' : ''}
                                ${isSelected ? 'bg-slate-100 border-slate-400' : ''}
                                hover:bg-slate-50
                              `}
                            >
                              <div className="text-sm font-medium text-slate-700 mb-1">
                                {date.getDate()}
                              </div>
                              <div className="space-y-1">
                                <div className="w-full h-1 bg-blue-200 rounded"></div>
                                <div className="w-full h-1 bg-green-200 rounded"></div>
                                <div className="w-full h-1 bg-orange-200 rounded"></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Day Details - smaller section */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-900">
                        {selectedDate ? selectedDate.toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          day: 'numeric',
                          month: 'short'
                        }) : 'Sélectionnez une date'}
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">Équipe du matin</span>
                          </div>
                          <p className="text-xs text-blue-700">08:00 - 16:00</p>
                          <p className="text-xs text-blue-600">6 employés</p>
                        </div>
                        
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-900">Équipe de jour</span>
                          </div>
                          <p className="text-xs text-green-700">09:00 - 17:00</p>
                          <p className="text-xs text-green-600">8 employés</p>
                        </div>
                        
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-orange-600" />
                            <span className="text-sm font-medium text-orange-900">Équipe de soir</span>
                          </div>
                          <p className="text-xs text-orange-700">14:00 - 22:00</p>
                          <p className="text-xs text-orange-600">4 employés</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'active' && (
              <div className="w-full space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher un planning..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>

                {/* Planning Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlannings.map((planning) => (
                    <div key={planning.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                            <CalendarIcon className="w-6 h-6 text-slate-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 text-lg">{planning.name}</h3>
                            <p className="text-sm text-slate-500">{planning.type}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                          {planning.status}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-600">{planning.employees} employés</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-600">
                            {new Date(planning.startDate).toLocaleDateString('fr-FR')} - {new Date(planning.endDate).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleViewDetails(planning.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          Voir détails
                        </button>
                        <button
                          onClick={() => handleManage(planning.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
                        >
                          <Edit className="w-4 h-4" />
                          Gérer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'archived' && (
              <div className="w-full bg-white border border-slate-200 rounded-lg p-8 text-center">
                <CalendarIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucun planning archivé</h3>
                <p className="text-slate-600">Les plannings archivés apparaîtront ici.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="w-full bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {currentStep === 1 && "Créer un nouveau planning"}
                {currentStep === 2 && "Configuration des horaires"}
                {currentStep === 3 && "Sélection des employés"}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {currentStep === 1 && "Définissez les informations de base de votre planning"}
                {currentStep === 2 && "Configurez les horaires selon le type de planning choisi"}
                {currentStep === 3 && planningData.type === 'Shifts' ? "Assignez les employés à chaque shift" : "Sélectionnez les employés qui seront assignés à ce planning"}
              </p>
            </div>
            <button 
              onClick={() => setShowCreateForm(false)}
              className="text-slate-500 hover:text-slate-700"
            >
              ✕
            </button>
          </div>
          
          {/* Step indicators */}
          <div className="flex items-center mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}>1</div>
            <div className={`h-1 flex-1 ${currentStep >= 2 ? 'bg-slate-900' : 'bg-slate-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}>2</div>
            <div className={`h-1 flex-1 ${currentStep >= 3 ? 'bg-slate-900' : 'bg-slate-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}>3</div>
          </div>
          
          {/* Step 1: General Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nom du planning
                  </label>
                  <input 
                    type="text" 
                    value={planningData.name}
                    onChange={(e) => setPlanningData({...planningData, name: e.target.value})}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="Ex: Planning équipe développement"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Type de planning
                  </label>
                  <Select value={planningData.type} onValueChange={(value) => setPlanningData({...planningData, type: value})}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fixe">Fixe</SelectItem>
                      <SelectItem value="Variable">Variable</SelectItem>
                      <SelectItem value="Shifts">Shifts</SelectItem>
                      <SelectItem value="Flexible">Horaires flexibles avec créneaux fixes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Date de début
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {planningData.startDate ? new Date(planningData.startDate).toLocaleDateString('fr-FR') : <span>Sélectionner une date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={planningData.startDate ? new Date(planningData.startDate) : undefined}
                        onSelect={(date) => setPlanningData({...planningData, startDate: date?.toISOString().split('T')[0] || ''})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Date de fin
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {planningData.endDate ? new Date(planningData.endDate).toLocaleDateString('fr-FR') : <span>Sélectionner une date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={planningData.endDate ? new Date(planningData.endDate) : undefined}
                        onSelect={(date) => setPlanningData({...planningData, endDate: date?.toISOString().split('T')[0] || ''})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Schedule Configuration */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {planningData.type === 'Fixe' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-900">Horaire fixe</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Heure de début
                      </label>
                      <input 
                        type="time" 
                        value={planningData.fixedSchedule.startTime}
                        onChange={(e) => setPlanningData({
                          ...planningData, 
                          fixedSchedule: {...planningData.fixedSchedule, startTime: e.target.value}
                        })}
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Heure de fin
                      </label>
                      <input 
                        type="time" 
                        value={planningData.fixedSchedule.endTime}
                        onChange={(e) => setPlanningData({
                          ...planningData, 
                          fixedSchedule: {...planningData.fixedSchedule, endTime: e.target.value}
                        })}
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Pause déjeuner
                      </label>
                      <input 
                        type="text" 
                        value={planningData.fixedSchedule.breakTime}
                        onChange={(e) => setPlanningData({
                          ...planningData, 
                          fixedSchedule: {...planningData.fixedSchedule, breakTime: e.target.value}
                        })}
                        placeholder="Ex: 12:00-13:00"
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {planningData.type === 'Variable' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-900">Horaire variable par jour</h3>
                  
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                    <div key={day} className="grid grid-cols-3 gap-4 items-center">
                      <div className="text-sm font-medium text-slate-700">
                        {day === 'monday' && 'Lundi'}
                        {day === 'tuesday' && 'Mardi'}
                        {day === 'wednesday' && 'Mercredi'}
                        {day === 'thursday' && 'Jeudi'}
                        {day === 'friday' && 'Vendredi'}
                        {day === 'saturday' && 'Samedi'}
                        {day === 'sunday' && 'Dimanche'}
                      </div>
                      <div>
                        <input 
                          type="time" 
                          value={(planningData.variableSchedule as any)[day].startTime}
                          onChange={(e) => {
                            const newSchedule = {...planningData.variableSchedule};
                            (newSchedule as any)[day].startTime = e.target.value;
                            setPlanningData({...planningData, variableSchedule: newSchedule});
                          }}
                          className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                      </div>
                      <div>
                        <input 
                          type="time" 
                          value={(planningData.variableSchedule as any)[day].endTime}
                          onChange={(e) => {
                            const newSchedule = {...planningData.variableSchedule};
                            (newSchedule as any)[day].endTime = e.target.value;
                            setPlanningData({...planningData, variableSchedule: newSchedule});
                          }}
                          className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {planningData.type === 'Shifts' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-slate-900">Configuration des shifts</h3>
                    <button 
                      onClick={() => setPlanningData({
                        ...planningData, 
                        shifts: [...planningData.shifts, { name: '', startTime: '', endTime: '', employees: [] }]
                      })}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Ajouter un shift
                    </button>
                  </div>
                  
                  {planningData.shifts.map((shift, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-slate-200 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Nom du shift
                        </label>
                        <input 
                          type="text" 
                          value={shift.name}
                          onChange={(e) => {
                            const newShifts = [...planningData.shifts];
                            newShifts[index].name = e.target.value;
                            setPlanningData({...planningData, shifts: newShifts});
                          }}
                          placeholder="Ex: Équipe du matin"
                          className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Heure de début
                        </label>
                        <input 
                          type="time" 
                          value={shift.startTime}
                          onChange={(e) => {
                            const newShifts = [...planningData.shifts];
                            newShifts[index].startTime = e.target.value;
                            setPlanningData({...planningData, shifts: newShifts});
                          }}
                          className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Heure de fin
                        </label>
                        <input 
                          type="time" 
                          value={shift.endTime}
                          onChange={(e) => {
                            const newShifts = [...planningData.shifts];
                            newShifts[index].endTime = e.target.value;
                            setPlanningData({...planningData, shifts: newShifts});
                          }}
                          className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                      </div>
                      
                      <div className="flex items-end">
                        {planningData.shifts.length > 1 && (
                          <button 
                            onClick={() => {
                              const newShifts = planningData.shifts.filter((_, i) => i !== index);
                              setPlanningData({...planningData, shifts: newShifts});
                            }}
                            className="px-3 py-2 text-red-600 hover:text-red-800 text-sm"
                          >
                            Supprimer
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {planningData.type === 'Flexible' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-slate-900">Horaires flexibles avec créneaux fixes</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Nombre d'heures de travail par jour
                      </label>
                      <input 
                        type="number" 
                        min="1"
                        max="12"
                        value={planningData.flexibleSchedule.totalDailyHours}
                        onChange={(e) => setPlanningData({
                          ...planningData, 
                          flexibleSchedule: {
                            ...planningData.flexibleSchedule, 
                            totalDailyHours: parseInt(e.target.value) || 8
                          }
                        })}
                        className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        placeholder="8"
                      />
                      <p className="text-xs text-slate-500 mt-1">Nombre total d'heures à effectuer par jour</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-medium text-slate-900">Créneaux de présence obligatoire</h4>
                      <button 
                        onClick={() => setPlanningData({
                          ...planningData, 
                          flexibleSchedule: {
                            ...planningData.flexibleSchedule,
                            fixedTimeSlots: [
                              ...planningData.flexibleSchedule.fixedTimeSlots, 
                              { startTime: '', endTime: '', name: `Créneau ${planningData.flexibleSchedule.fixedTimeSlots.length + 1}` }
                            ]
                          }
                        })}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        Ajouter un créneau
                      </button>
                    </div>
                    
                    {planningData.flexibleSchedule.fixedTimeSlots.map((slot, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-slate-200 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Nom du créneau
                          </label>
                          <input 
                            type="text" 
                            value={slot.name}
                            onChange={(e) => {
                              const newSlots = [...planningData.flexibleSchedule.fixedTimeSlots];
                              newSlots[index].name = e.target.value;
                              setPlanningData({
                                ...planningData, 
                                flexibleSchedule: {
                                  ...planningData.flexibleSchedule,
                                  fixedTimeSlots: newSlots
                                }
                              });
                            }}
                            placeholder="Ex: Réunion équipe"
                            className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Heure de début
                          </label>
                          <input 
                            type="time" 
                            value={slot.startTime}
                            onChange={(e) => {
                              const newSlots = [...planningData.flexibleSchedule.fixedTimeSlots];
                              newSlots[index].startTime = e.target.value;
                              setPlanningData({
                                ...planningData, 
                                flexibleSchedule: {
                                  ...planningData.flexibleSchedule,
                                  fixedTimeSlots: newSlots
                                }
                              });
                            }}
                            className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Heure de fin
                          </label>
                          <input 
                            type="time" 
                            value={slot.endTime}
                            onChange={(e) => {
                              const newSlots = [...planningData.flexibleSchedule.fixedTimeSlots];
                              newSlots[index].endTime = e.target.value;
                              setPlanningData({
                                ...planningData, 
                                flexibleSchedule: {
                                  ...planningData.flexibleSchedule,
                                  fixedTimeSlots: newSlots
                                }
                              });
                            }}
                            className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                          />
                        </div>
                        
                        <div className="flex items-end">
                          {planningData.flexibleSchedule.fixedTimeSlots.length > 1 && (
                            <button 
                              onClick={() => {
                                const newSlots = planningData.flexibleSchedule.fixedTimeSlots.filter((_, i) => i !== index);
                                setPlanningData({
                                  ...planningData, 
                                  flexibleSchedule: {
                                    ...planningData.flexibleSchedule,
                                    fixedTimeSlots: newSlots
                                  }
                                });
                              }}
                              className="px-3 py-2 text-red-600 hover:text-red-800 text-sm"
                            >
                              Supprimer
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-blue-900 mb-2">Comment ça fonctionne ?</h5>
                      <p className="text-sm text-blue-700">
                        Les employés peuvent choisir leurs heures d'arrivée et de départ, mais ils doivent obligatoirement être présents pendant les créneaux fixes définis ci-dessus. 
                        Le temps total de travail quotidien doit respecter la durée configurée ({planningData.flexibleSchedule.totalDailyHours}h).
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Step 3: Employee Selection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {planningData.type === 'Shifts' ? (
                <div className="space-y-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-slate-900">Assignation des employés par shift</h3>
                    <div className="flex items-center gap-4">
                      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Tous les départements" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les départements</SelectItem>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {planningData.shifts.map((shift, shiftIndex) => (
                    <div key={shiftIndex} className="border border-slate-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900">{shift.name}</h4>
                          <p className="text-sm text-slate-600">
                            {shift.startTime} - {shift.endTime}
                          </p>
                        </div>
                        <div className="text-sm text-slate-600">
                          {shift.employees.length} employé(s) assigné(s)
                        </div>
                      </div>
                      
                      <div className="border border-slate-200 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-slate-200">
                          <thead className="bg-slate-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Assigner
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Nom
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Département
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-slate-200">
                            {getAvailableEmployeesForShift(shiftIndex).map((employee) => (
                              <tr key={employee.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <Checkbox 
                                    checked={shift.employees.includes(employee.id)}
                                    onCheckedChange={() => handleShiftEmployeeSelect(shiftIndex, employee.id)}
                                  />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-slate-900">{employee.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-slate-500">{employee.department}</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-slate-900">Sélection des employés</h3>
                    <div className="flex items-center gap-4">
                      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Tous les départements" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les départements</SelectItem>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Sélectionner
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Nom
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Département
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {filteredEmployees.map((employee) => (
                          <tr key={employee.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Checkbox 
                                checked={selectedEmployees.includes(employee.id)}
                                onCheckedChange={() => handleEmployeeSelect(employee.id)}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-slate-900">{employee.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-slate-500">{employee.department}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-600">
                      {selectedEmployees.length} employé(s) sélectionné(s)
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={currentStep === 1 ? () => setShowCreateForm(false) : handlePrevStep}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50"
            >
              {currentStep === 1 ? 'Annuler' : 'Précédent'}
            </button>
            
            <button 
              onClick={currentStep === 3 ? handleSubmit : handleNextStep}
              className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800"
              disabled={currentStep === 1 && (!planningData.name || !planningData.type || !planningData.startDate || !planningData.endDate)}
            >
              {currentStep === 3 ? 'Créer le planning' : 'Suivant'}
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Planning;
