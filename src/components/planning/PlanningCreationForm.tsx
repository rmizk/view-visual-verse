
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Plus, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { EmployeeSelectionDrawer } from './EmployeeSelectionDrawer';

interface PlanningCreationFormProps {
  onClose: () => void;
}

interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  employees: string[];
}

interface DaySchedule {
  day: string;
  startTime: string;
  endTime: string;
}

interface TimeSlot {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
}

export const PlanningCreationForm: React.FC<PlanningCreationFormProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [fixedSchedule, setFixedSchedule] = useState({
    startTime: '',
    endTime: '',
    lunchBreak: ''
  });
  const [variableSchedule, setVariableSchedule] = useState<DaySchedule[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<any[]>([]);
  const [employeeDrawerOpen, setEmployeeDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const weekDays = [
    { id: 'monday', label: 'Lundi' },
    { id: 'tuesday', label: 'Mardi' },
    { id: 'wednesday', label: 'Mercredi' },
    { id: 'thursday', label: 'Jeudi' },
    { id: 'friday', label: 'Vendredi' },
    { id: 'saturday', label: 'Samedi' },
    { id: 'sunday', label: 'Dimanche' }
  ];

  const departments = ['Développement', 'Design', 'Marketing'];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Planning créé",
      description: "Le planning a été créé avec succès.",
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDayToggle = (dayId: string) => {
    setSelectedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId]
    );
  };

  const addShift = () => {
    const newShift: Shift = {
      id: `shift-${Date.now()}`,
      name: '',
      startTime: '',
      endTime: '',
      employees: []
    };
    setShifts(prev => [...prev, newShift]);
  };

  const removeShift = (shiftId: string) => {
    setShifts(prev => prev.filter(shift => shift.id !== shiftId));
  };

  const updateShift = (shiftId: string, field: string, value: string) => {
    setShifts(prev => prev.map(shift => 
      shift.id === shiftId ? { ...shift, [field]: value } : shift
    ));
  };

  const addTimeSlot = () => {
    const newTimeSlot: TimeSlot = {
      id: `slot-${Date.now()}`,
      name: '',
      startTime: '',
      endTime: ''
    };
    setTimeSlots(prev => [...prev, newTimeSlot]);
  };

  const removeTimeSlot = (slotId: string) => {
    setTimeSlots(prev => prev.filter(slot => slot.id !== slotId));
  };

  const updateTimeSlot = (slotId: string, field: string, value: string) => {
    setTimeSlots(prev => prev.map(slot => 
      slot.id === slotId ? { ...slot, [field]: value } : slot
    ));
  };

  const updateVariableSchedule = (day: string, field: string, value: string) => {
    setVariableSchedule(prev => {
      const existing = prev.find(schedule => schedule.day === day);
      if (existing) {
        return prev.map(schedule => 
          schedule.day === day ? { ...schedule, [field]: value } : schedule
        );
      } else {
        return [...prev, { day, startTime: field === 'startTime' ? value : '', endTime: field === 'endTime' ? value : '' }];
      }
    });
  };

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Configurez les informations de base de votre planning";
      case 2:
        return "Définissez les horaires et la structure de votre planning";
      case 3:
        return "Sélectionnez et assignez les employés à votre planning";
      default:
        return "";
    }
  };

  const renderStep2Content = () => {
    switch (formData.type) {
      case 'Fixe':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Sélectionner les jours de travail</Label>
              <div className="grid grid-cols-2 gap-2">
                {weekDays.map(day => (
                  <div key={day.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={day.id}
                      checked={selectedDays.includes(day.id)}
                      onCheckedChange={() => handleDayToggle(day.id)}
                    />
                    <Label htmlFor={day.id} className="text-sm">{day.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Heure de début</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={fixedSchedule.startTime}
                  onChange={(e) => setFixedSchedule(prev => ({ ...prev, startTime: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Heure de fin</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={fixedSchedule.endTime}
                  onChange={(e) => setFixedSchedule(prev => ({ ...prev, endTime: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lunchBreak">Pause déjeuner</Label>
              <Input
                id="lunchBreak"
                value={fixedSchedule.lunchBreak}
                onChange={(e) => setFixedSchedule(prev => ({ ...prev, lunchBreak: e.target.value }))}
                placeholder="Ex: 12:00 - 13:00"
              />
            </div>
          </div>
        );

      case 'Variable':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Sélectionner les jours de travail</Label>
              <div className="grid grid-cols-2 gap-2">
                {weekDays.map(day => (
                  <div key={day.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={day.id}
                      checked={selectedDays.includes(day.id)}
                      onCheckedChange={() => handleDayToggle(day.id)}
                    />
                    <Label htmlFor={day.id} className="text-sm">{day.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            {selectedDays.map(dayId => {
              const day = weekDays.find(d => d.id === dayId);
              const schedule = variableSchedule.find(s => s.day === dayId);
              return (
                <div key={dayId} className="border border-slate-200 rounded-lg p-4">
                  <h4 className="font-medium mb-3">{day?.label}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Heure de début</Label>
                      <Input
                        type="time"
                        value={schedule?.startTime || ''}
                        onChange={(e) => updateVariableSchedule(dayId, 'startTime', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Heure de fin</Label>
                      <Input
                        type="time"
                        value={schedule?.endTime || ''}
                        onChange={(e) => updateVariableSchedule(dayId, 'endTime', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'Shifts':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Sélectionner les jours de travail</Label>
              <div className="grid grid-cols-2 gap-2">
                {weekDays.map(day => (
                  <div key={day.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={day.id}
                      checked={selectedDays.includes(day.id)}
                      onCheckedChange={() => handleDayToggle(day.id)}
                    />
                    <Label htmlFor={day.id} className="text-sm">{day.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium">Shifts</Label>
                <Button onClick={addShift} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un shift
                </Button>
              </div>
              {shifts.map(shift => (
                <div key={shift.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium">Shift</h4>
                    <Button
                      onClick={() => removeShift(shift.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Nom du shift</Label>
                      <Input
                        value={shift.name}
                        onChange={(e) => updateShift(shift.id, 'name', e.target.value)}
                        placeholder="Ex: Shift du matin"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Heure de début</Label>
                        <Input
                          type="time"
                          value={shift.startTime}
                          onChange={(e) => updateShift(shift.id, 'startTime', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Heure de fin</Label>
                        <Input
                          type="time"
                          value={shift.endTime}
                          onChange={(e) => updateShift(shift.id, 'endTime', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Flexible':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Sélectionner les jours de travail</Label>
              <div className="grid grid-cols-2 gap-2">
                {weekDays.map(day => (
                  <div key={day.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={day.id}
                      checked={selectedDays.includes(day.id)}
                      onCheckedChange={() => handleDayToggle(day.id)}
                    />
                    <Label htmlFor={day.id} className="text-sm">{day.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium">Créneaux fixes</Label>
                <Button onClick={addTimeSlot} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un créneau
                </Button>
              </div>
              {timeSlots.map(slot => (
                <div key={slot.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium">Créneau</h4>
                    <Button
                      onClick={() => removeTimeSlot(slot.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Nom du créneau</Label>
                      <Input
                        value={slot.name}
                        onChange={(e) => updateTimeSlot(slot.id, 'name', e.target.value)}
                        placeholder="Ex: Créneau matin"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Heure de début</Label>
                        <Input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => updateTimeSlot(slot.id, 'startTime', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Heure de fin</Label>
                        <Input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => updateTimeSlot(slot.id, 'endTime', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-slate-500">
            Veuillez sélectionner un type de planning à l'étape précédente
          </div>
        );
    }
  };

  return (
    <Card className="border border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-2">
          <CardTitle className="text-lg font-semibold text-slate-900">
            Créer un nouveau planning
          </CardTitle>
          <div className="space-y-1">
            <div className="text-sm text-slate-600">Étape {step} sur 3</div>
            <div className="text-sm text-slate-500">{getStepDescription()}</div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du planning</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ex: Planning Équipe Développement"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type de planning</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Shifts">Shifts</SelectItem>
                    <SelectItem value="Fixe">Fixe</SelectItem>
                    <SelectItem value="Variable">Variable</SelectItem>
                    <SelectItem value="Flexible">Flexible (avec créneaux fixes)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Date de début</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Date de fin</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && renderStep2Content()}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="search">Rechercher un employé</Label>
                <Input
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher par nom..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Filtrer par département</Label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les départements" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les départements</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={() => setEmployeeDrawerOpen(true)}
                variant="outline"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Sélectionner des employés
              </Button>
            </div>

            {formData.type === 'Shifts' && shifts.length > 0 && (
              <div className="space-y-4">
                <Label className="text-base font-medium">Assignation par shift</Label>
                {shifts.map(shift => (
                  <div key={shift.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">{shift.name || 'Shift sans nom'}</h4>
                      <Button
                        onClick={() => setEmployeeDrawerOpen(true)}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Assigner
                      </Button>
                    </div>
                    <div className="text-sm text-slate-600">
                      {shift.employees.length} employé(s) assigné(s)
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedEmployees.length > 0 && (
              <div className="space-y-2">
                <Label>Employés sélectionnés ({selectedEmployees.length})</Label>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {selectedEmployees.map(employee => (
                    <div key={employee.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                      <div className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center text-xs">
                        {employee.initials}
                      </div>
                      <span className="text-sm">{employee.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Description (optionnel)</Label>
              <textarea
                id="description"
                className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Ajoutez une description pour ce planning..."
              />
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={step === 1 ? onClose : handlePrevious}
          >
            {step === 1 ? 'Annuler' : 'Précédent'}
          </Button>
          <div className="flex gap-2">
            {step < 3 ? (
              <Button onClick={handleNext}>
                Suivant
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-slate-900 hover:bg-slate-800">
                Créer le planning
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      <EmployeeSelectionDrawer
        open={employeeDrawerOpen}
        onOpenChange={setEmployeeDrawerOpen}
        onEmployeesSelected={(employees) => {
          setSelectedEmployees(prev => {
            const newEmployees = employees.filter(emp => 
              !prev.some(existing => existing.id === emp.id)
            );
            return [...prev, ...newEmployees];
          });
        }}
      />
    </Card>
  );
};
