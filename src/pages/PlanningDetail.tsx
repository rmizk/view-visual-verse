
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { EmployeeSelectionDrawer } from '@/components/planning/EmployeeSelectionDrawer';
import { ShiftManager, RemoveShiftButton } from '@/components/planning/ShiftManager';
import { toast } from '@/hooks/use-toast';

interface Employee {
  id: string;
  name: string;
  initials: string;
  department: string;
  position: string;
  avatar?: string;
}

interface Shift {
  id: string;
  name: string;
  time: string;
  assignments: { [key: string]: string[] };
}

const PlanningDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 5, 16));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ shiftId: string; date: string } | null>(null);

  const planning = {
    id: parseInt(id || '1'),
    name: 'Planning workers',
    type: 'Shifts',
    startDate: '2025-06-16',
    endDate: '2025-06-22',
    status: 'active'
  };

  const breadcrumbItems = [
    { label: "Entreprise", href: "/entreprise" },
    { label: "Planning", href: "/planning" },
    { label: planning.name }
  ];

  const [shifts, setShifts] = useState<Shift[]>([
    { 
      id: 'morning', 
      name: 'Shift du matin', 
      time: '8:00 - 14:00',
      assignments: {
        'lun. 16 juin': ['RH', 'HK', 'SH', 'AA'],
        'mar. 17 juin': ['RH', 'HK', 'SH'],
        'mer. 18 juin': ['RH', 'HK', 'SH'],
        'jeu. 19 juin': ['RH', 'HK', 'SH', 'AA', 'NC'],
        'ven. 20 juin': ['RH', 'HK', 'SH', 'AA'],
        'sam. 21 juin': ['RH', 'HK', 'SH']
      }
    },
    { 
      id: 'afternoon', 
      name: 'Shift de l\'après-midi', 
      time: '14:00 - 20:00',
      assignments: {
        'lun. 16 juin': ['AM'],
        'mar. 17 juin': ['AM'],
        'mer. 18 juin': ['AM', 'MN'],
        'jeu. 19 juin': ['AM', 'MN'],
        'ven. 20 juin': ['AM', 'MN', 'EK'],
        'sam. 21 juin': ['AM', 'MN', 'EK']
      }
    }
  ]);

  const employees: Employee[] = [
    { id: 'RH', name: 'Ramzi hammami', initials: 'RH', department: 'Développement', position: 'Développeur Senior', avatar: '/lovable-uploads/68b10412-6551-47cc-babc-21445f54d8a0.png' },
    { id: 'HK', name: 'Hassen Knani', initials: 'HK', department: 'Développement', position: 'Développeur Frontend' },
    { id: 'SH', name: 'Sahar Hdiji', initials: 'SH', department: 'Développement', position: 'Développeur Backend' },
    { id: 'AA', name: 'Ala Akrout', initials: 'AA', department: 'Design', position: 'UI/UX Designer' },
    { id: 'AM', name: 'Ahmed ben Mas...', initials: 'AM', department: 'Design', position: 'Graphiste' },
    { id: 'MN', name: 'Madiha Neifar', initials: 'MN', department: 'Marketing', position: 'Marketing Manager' },
    { id: 'EK', name: 'Emma Kammoun', initials: 'EK', department: 'Marketing', position: 'Social Media Manager' },
    { id: 'NC', name: 'Nour Chaaben', initials: 'NC', department: 'Marketing', position: 'Content Creator' }
  ];

  const handleBack = () => {
    navigate('/planning');
  };

  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    
    for (let i = 0; i < 6; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      week.push(currentDay);
    }
    return week;
  };

  const weekDates = getWeekDates(selectedDate);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date) => {
    const days = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
    const months = ['janv.', 'févr.', 'mars', 'avril', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    if (!destination) return;
    
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const [sourceShiftId, sourceDate] = source.droppableId.split('-');
    const [destShiftId, destDate] = destination.droppableId.split('-');
    
    setShifts(prevShifts => {
      const newShifts = [...prevShifts];
      
      // Remove from source
      const sourceShift = newShifts.find(s => s.id === sourceShiftId);
      if (sourceShift && sourceShift.assignments[sourceDate]) {
        sourceShift.assignments[sourceDate] = sourceShift.assignments[sourceDate].filter(emp => emp !== draggableId);
      }
      
      // Add to destination
      const destShift = newShifts.find(s => s.id === destShiftId);
      if (destShift) {
        if (!destShift.assignments[destDate]) {
          destShift.assignments[destDate] = [];
        }
        destShift.assignments[destDate].push(draggableId);
      }
      
      return newShifts;
    });
    
    toast({
      title: "Employé déplacé",
      description: "L'assignation a été mise à jour avec succès.",
    });
  };

  const handleAddEmployee = (shiftId: string, date: string) => {
    setSelectedCell({ shiftId, date });
    setDrawerOpen(true);
  };

  const handleEmployeesSelected = (selectedEmployees: Employee[]) => {
    if (!selectedCell) return;
    
    setShifts(prevShifts => {
      const newShifts = [...prevShifts];
      const shift = newShifts.find(s => s.id === selectedCell.shiftId);
      
      if (shift) {
        if (!shift.assignments[selectedCell.date]) {
          shift.assignments[selectedCell.date] = [];
        }
        
        selectedEmployees.forEach(emp => {
          if (!shift.assignments[selectedCell.date].includes(emp.id)) {
            shift.assignments[selectedCell.date].push(emp.id);
          }
        });
      }
      
      return newShifts;
    });
    
    toast({
      title: "Employés ajoutés",
      description: `${selectedEmployees.length} employé(s) ajouté(s) au planning.`,
    });
  };

  const handleAddShift = (newShift: Omit<Shift, 'id' | 'assignments'>) => {
    const shift: Shift = {
      ...newShift,
      id: `shift-${Date.now()}`,
      assignments: {}
    };
    
    setShifts(prev => [...prev, shift]);
    toast({
      title: "Shift ajouté",
      description: `Le shift "${newShift.name}" a été ajouté avec succès.`,
    });
  };

  const handleRemoveShift = (shiftId: string) => {
    setShifts(prev => prev.filter(s => s.id !== shiftId));
    toast({
      title: "Shift supprimé",
      description: "Le shift a été supprimé avec succès.",
    });
  };

  return (
    <Layout pageTitle={planning.name} breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-slate-900">{planning.name}</h1>
          </div>
          
          <ShiftManager 
            shifts={shifts}
            onAddShift={handleAddShift}
            onRemoveShift={handleRemoveShift}
          />
        </div>

        {/* Week Navigation */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Semaine du {weekDates[0]?.toLocaleDateString('fr-FR')} au {weekDates[5]?.toLocaleDateString('fr-FR')}
          </h3>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
              <ChevronLeft className="w-4 h-4" />
              Semaine précédente
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
              Semaine suivante
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Planning Table */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="p-4 text-left font-medium text-slate-700 bg-slate-50 sticky left-0 z-10 min-w-48">
                        Postes / Shifts
                      </th>
                      {weekDates.map((date, index) => (
                        <th key={index} className="p-4 text-center font-medium text-slate-700 bg-slate-50 min-w-32">
                          {formatDate(date)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {shifts.map((shift) => (
                      <tr key={shift.id} className="border-b border-slate-100">
                        <td className="p-4 sticky left-0 z-10 bg-white border-r border-slate-200">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="font-medium text-sm text-slate-900">{shift.name}</div>
                              <div className="text-xs text-slate-600">{shift.time}</div>
                            </div>
                            <RemoveShiftButton shift={shift} onRemove={handleRemoveShift} />
                          </div>
                        </td>
                        {weekDates.map((date) => {
                          const dateKey = formatDate(date);
                          const assignedEmployees = shift.assignments[dateKey] || [];
                          const droppableId = `${shift.id}-${dateKey}`;
                          
                          return (
                            <td key={dateKey} className="p-2 border-r border-slate-100 h-32 relative align-top">
                              <Droppable droppableId={droppableId}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`space-y-1 min-h-28 ${snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg' : ''}`}
                                  >
                                    {assignedEmployees.map((employeeId, index) => {
                                      const employee = employees.find(e => e.id === employeeId);
                                      return (
                                        <Draggable key={employeeId} draggableId={employeeId} index={index}>
                                          {(provided, snapshot) => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className={`flex items-center gap-2 bg-slate-50 border border-white rounded-lg p-1 text-xs cursor-move ${
                                                snapshot.isDragging ? 'shadow-lg bg-white' : 'hover:bg-slate-100'
                                              }`}
                                            >
                                              <div className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center text-slate-700 font-medium text-xs">
                                                {employee?.initials}
                                              </div>
                                              <span className="text-slate-900 font-medium text-xs truncate">
                                                {employee?.name}
                                              </span>
                                            </div>
                                          )}
                                        </Draggable>
                                      );
                                    })}
                                    {provided.placeholder}
                                    <button 
                                      onClick={() => handleAddEmployee(shift.id, dateKey)}
                                      className="w-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg p-2 hover:border-slate-400 hover:bg-slate-50 transition-colors text-slate-500 text-xs"
                                    >
                                      + Ajouter
                                    </button>
                                  </div>
                                )}
                              </Droppable>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </DragDropContext>

        <EmployeeSelectionDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          onEmployeesSelected={handleEmployeesSelected}
        />
      </div>
    </Layout>
  );
};

export default PlanningDetail;
