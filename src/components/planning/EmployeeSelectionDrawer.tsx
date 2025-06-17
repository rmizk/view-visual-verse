
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Users, Plus } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  initials: string;
  department: string;
  position: string;
  avatar?: string;
}

interface EmployeeSelectionDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEmployeesSelected: (employees: Employee[]) => void;
  trigger?: React.ReactNode;
}

export const EmployeeSelectionDrawer: React.FC<EmployeeSelectionDrawerProps> = ({
  open,
  onOpenChange,
  onEmployeesSelected,
  trigger
}) => {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  // Mock employee data by department
  const employeesByDepartment = {
    'Développement': [
      { id: 'RH', name: 'Ramzi hammami', initials: 'RH', department: 'Développement', position: 'Développeur Senior', avatar: '/lovable-uploads/68b10412-6551-47cc-babc-21445f54d8a0.png' },
      { id: 'HK', name: 'Hassen Knani', initials: 'HK', department: 'Développement', position: 'Développeur Frontend' },
      { id: 'SH', name: 'Sahar Hdiji', initials: 'SH', department: 'Développement', position: 'Développeur Backend' },
    ],
    'Design': [
      { id: 'AA', name: 'Ala Akrout', initials: 'AA', department: 'Design', position: 'UI/UX Designer' },
      { id: 'AM', name: 'Ahmed ben Mas...', initials: 'AM', department: 'Design', position: 'Graphiste' },
    ],
    'Marketing': [
      { id: 'MN', name: 'Madiha Neifar', initials: 'MN', department: 'Marketing', position: 'Marketing Manager' },
      { id: 'EK', name: 'Emma Kammoun', initials: 'EK', department: 'Marketing', position: 'Social Media Manager' },
      { id: 'NC', name: 'Nour Chaaben', initials: 'NC', department: 'Marketing', position: 'Content Creator' },
    ]
  };

  const handleEmployeeToggle = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleConfirm = () => {
    const selectedEmployeeObjects = Object.values(employeesByDepartment)
      .flat()
      .filter(emp => selectedEmployees.includes(emp.id));
    
    onEmployeesSelected(selectedEmployeeObjects);
    setSelectedEmployees([]);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Sélectionner des employés
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          <ScrollArea className="h-[calc(100vh-200px)]">
            {Object.entries(employeesByDepartment).map(([department, employees]) => (
              <div key={department} className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-900">{department}</h3>
                  <Badge variant="secondary">{employees.length}</Badge>
                </div>
                
                <div className="space-y-2">
                  {employees.map((employee) => (
                    <div key={employee.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50">
                      <Checkbox
                        id={employee.id}
                        checked={selectedEmployees.includes(employee.id)}
                        onCheckedChange={() => handleEmployeeToggle(employee.id)}
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center text-slate-700 font-medium text-sm">
                          {employee.initials}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm text-slate-900">{employee.name}</div>
                          <div className="text-xs text-slate-600">{employee.position}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="mt-4" />
              </div>
            ))}
          </ScrollArea>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-slate-600">
              {selectedEmployees.length} employé(s) sélectionné(s)
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button onClick={handleConfirm} disabled={selectedEmployees.length === 0}>
                Confirmer
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
