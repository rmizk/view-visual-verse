
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, Search, X } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

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

  const filteredEmployees = Object.entries(employeesByDepartment).reduce((acc, [dept, employees]) => {
    if (departmentFilter === 'all' || dept === departmentFilter) {
      const filtered = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[dept] = filtered;
      }
    }
    return acc;
  }, {} as typeof employeesByDepartment);

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
    setSearchQuery('');
    setDepartmentFilter('all');
    onOpenChange(false);
  };

  const handleClose = () => {
    setSelectedEmployees([]);
    setSearchQuery('');
    setDepartmentFilter('all');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[500px] flex flex-col">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
              <Users className="w-5 h-5" />
              Sélectionner des employés
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        
        <div className="flex-1 flex flex-col space-y-4 py-4">
          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="search">Rechercher</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Rechercher par nom..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Département</Label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les départements" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les départements</SelectItem>
                  <SelectItem value="Développement">Développement</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Employee List */}
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {Object.entries(filteredEmployees).map(([department, employees]) => (
                <div key={department} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-slate-900 text-sm">{department}</h3>
                    <Badge variant="secondary" className="text-xs">{employees.length}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {employees.map((employee) => (
                      <div key={employee.id} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                        <Checkbox
                          id={employee.id}
                          checked={selectedEmployees.includes(employee.id)}
                          onCheckedChange={() => handleEmployeeToggle(employee.id)}
                        />
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center text-slate-700 font-medium text-sm">
                            {employee.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-slate-900 truncate">{employee.name}</div>
                            <div className="text-xs text-slate-600 truncate">{employee.position}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {Object.keys(filteredEmployees).length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">Aucun employé trouvé</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        
        {/* Footer */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600">
              {selectedEmployees.length} employé(s) sélectionné(s)
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Annuler
            </Button>
            <Button onClick={handleConfirm} disabled={selectedEmployees.length === 0} className="flex-1">
              Confirmer ({selectedEmployees.length})
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
