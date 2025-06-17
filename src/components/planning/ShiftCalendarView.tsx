
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Employee {
  id: string;
  name: string;
  avatar?: string;
  position: string;
}

interface ShiftAssignment {
  employeeId: string;
  shiftId: string;
  date: string;
}

interface ShiftCalendarViewProps {
  planningId: number;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const ShiftCalendarView: React.FC<ShiftCalendarViewProps> = ({
  planningId,
  selectedDate,
  onDateChange
}) => {
  const [draggedEmployee, setDraggedEmployee] = useState<string | null>(null);
  const [draggedFromCell, setDraggedFromCell] = useState<string | null>(null);

  // Mock data
  const shifts = [
    { id: 'morning', name: 'Équipe Matin', time: '08:00-16:00', color: 'bg-green-100 border-green-300' },
    { id: 'day', name: 'Équipe Jour', time: '09:00-17:00', color: 'bg-blue-100 border-blue-300' },
    { id: 'evening', name: 'Équipe Soir', time: '16:00-00:00', color: 'bg-orange-100 border-orange-300' }
  ];

  const positions = [
    'Développeur Frontend',
    'Développeur Backend', 
    'Designer UX/UI',
    'Chef de projet'
  ];

  const employees: Employee[] = [
    { id: '1', name: 'Marie Dubois', position: 'Développeur Frontend' },
    { id: '2', name: 'Jean Martin', position: 'Développeur Backend' },
    { id: '3', name: 'Sophie Bernard', position: 'Designer UX/UI' },
    { id: '4', name: 'Pierre Durand', position: 'Chef de projet' },
    { id: '5', name: 'Luc Moreau', position: 'Développeur Frontend' },
    { id: '6', name: 'Emma Petit', position: 'Développeur Backend' }
  ];

  const [assignments, setAssignments] = useState<ShiftAssignment[]>([
    { employeeId: '1', shiftId: 'morning', date: '2024-01-15' },
    { employeeId: '2', shiftId: 'day', date: '2024-01-15' },
    { employeeId: '3', shiftId: 'evening', date: '2024-01-15' },
    { employeeId: '4', shiftId: 'morning', date: '2024-01-16' },
    { employeeId: '5', shiftId: 'day', date: '2024-01-16' },
  ]);

  // Generate dates for the current week
  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Start on Monday
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(selectedDate);

  const getAssignedEmployee = (shiftId: string, date: string, position: string) => {
    const assignment = assignments.find(a => 
      a.shiftId === shiftId && 
      a.date === date
    );
    
    if (assignment) {
      const employee = employees.find(e => e.id === assignment.employeeId && e.position === position);
      return employee;
    }
    return null;
  };

  const handleDragStart = (employeeId: string, fromCell: string) => {
    setDraggedEmployee(employeeId);
    setDraggedFromCell(fromCell);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, shiftId: string, date: string, position: string) => {
    e.preventDefault();
    
    if (!draggedEmployee || !draggedFromCell) return;

    const targetCell = `${shiftId}-${date}-${position}`;
    const existingEmployee = getAssignedEmployee(shiftId, date, position);
    
    if (existingEmployee && existingEmployee.id !== draggedEmployee) {
      // Suggest swap
      toast({
        title: "Échange proposé",
        description: `Voulez-vous échanger ${employees.find(e => e.id === draggedEmployee)?.name} avec ${existingEmployee.name}?`,
      });
      
      // In a real app, this would open a confirmation dialog
      // For now, we'll perform the swap automatically
      performSwap(draggedEmployee, existingEmployee.id, draggedFromCell, targetCell);
    } else {
      // Simple move
      performMove(draggedEmployee, draggedFromCell, targetCell, shiftId, date);
    }
    
    setDraggedEmployee(null);
    setDraggedFromCell(null);
  };

  const performMove = (employeeId: string, fromCell: string, toCell: string, shiftId: string, date: string) => {
    setAssignments(prev => {
      // Remove from old position
      const filtered = prev.filter(a => a.employeeId !== employeeId);
      // Add to new position
      return [...filtered, { employeeId, shiftId, date }];
    });
    
    toast({
      title: "Employé déplacé",
      description: "L'assignation a été mise à jour avec succès.",
    });
  };

  const performSwap = (employeeId1: string, employeeId2: string, cell1: string, cell2: string) => {
    // In a real implementation, this would handle the complex swap logic
    toast({
      title: "Échange effectué",
      description: "Les employés ont été échangés avec succès.",
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 7 : -7));
    onDateChange(newDate);
  };

  return (
    <div className="space-y-4">
      {/* Week Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
          <ChevronLeft className="w-4 h-4" />
          Semaine précédente
        </Button>
        
        <h3 className="text-lg font-semibold">
          Semaine du {weekDates[0].toLocaleDateString('fr-FR')} au {weekDates[6].toLocaleDateString('fr-FR')}
        </h3>
        
        <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
          Semaine suivante
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Calendar Table */}
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
                      {date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {positions.map((position) => (
                  <React.Fragment key={position}>
                    <tr className="border-b border-slate-100">
                      <td colSpan={8} className="p-3 bg-slate-50 font-medium text-slate-800 sticky left-0 z-10">
                        {position}
                      </td>
                    </tr>
                    {shifts.map((shift) => (
                      <tr key={`${position}-${shift.id}`} className="border-b border-slate-100">
                        <td className="p-4 sticky left-0 z-10 bg-white border-r border-slate-200">
                          <div className={`p-2 rounded-md border-2 ${shift.color}`}>
                            <div className="font-medium text-sm">{shift.name}</div>
                            <div className="text-xs text-slate-600">{shift.time}</div>
                          </div>
                        </td>
                        {weekDates.map((date) => {
                          const dateStr = date.toISOString().split('T')[0];
                          const assignedEmployee = getAssignedEmployee(shift.id, dateStr, position);
                          const cellId = `${shift.id}-${dateStr}-${position}`;
                          
                          return (
                            <td 
                              key={dateStr}
                              className="p-2 border-r border-slate-100 h-24 relative"
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, shift.id, dateStr, position)}
                            >
                              {assignedEmployee ? (
                                <div
                                  draggable
                                  onDragStart={() => handleDragStart(assignedEmployee.id, cellId)}
                                  className="bg-white border border-slate-200 rounded-lg p-2 cursor-move hover:shadow-md transition-shadow h-full flex items-center justify-center"
                                >
                                  <div className="text-center">
                                    <User className="w-6 h-6 text-slate-600 mx-auto mb-1" />
                                    <div className="text-xs font-medium text-slate-900 truncate">
                                      {assignedEmployee.name}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <button className="w-full h-full flex items-center justify-center border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors">
                                  <Plus className="w-5 h-5 text-slate-400" />
                                </button>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
