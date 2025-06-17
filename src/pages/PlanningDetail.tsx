
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PlanningDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 5, 16)); // June 16, 2025

  // Mock data - in real app, this would be fetched based on the ID
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

  const handleBack = () => {
    navigate('/planning');
  };

  // Generate week dates starting from Monday
  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startOfWeek.setDate(diff);
    
    for (let i = 0; i < 6; i++) { // Monday to Saturday
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

  // Mock employee data
  const employees = [
    { id: 'RH', name: 'Ramzi hammami', initials: 'RH', avatar: '/lovable-uploads/68b10412-6551-47cc-babc-21445f54d8a0.png' },
    { id: 'HK', name: 'Hassen Knani', initials: 'HK' },
    { id: 'SH', name: 'Sahar Hdiji', initials: 'SH' },
    { id: 'AA', name: 'Ala Akrout', initials: 'AA' },
    { id: 'AM', name: 'Ahmed ben Mas...', initials: 'AM' },
    { id: 'MN', name: 'Madiha Neifar', initials: 'MN' },
    { id: 'EK', name: 'Emma Kammoun', initials: 'EK' },
    { id: 'NC', name: 'Nour Chaaben', initials: 'NC' }
  ];

  const shifts = [
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
  ];

  const formatDate = (date: Date) => {
    const days = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
    const months = ['janv.', 'févr.', 'mars', 'avril', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  return (
    <Layout pageTitle={planning.name} breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        {/* Header */}
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

        {/* Week Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
            <ChevronLeft className="w-4 h-4" />
            Semaine précédente
          </Button>
          
          <h3 className="text-lg font-semibold">
            Semaine du {weekDates[0]?.toLocaleDateString('fr-FR')} au {weekDates[5]?.toLocaleDateString('fr-FR')}
          </h3>
          
          <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
            Semaine suivante
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Planning Table */}
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
                        <div className="space-y-1">
                          <div className="font-medium text-sm text-slate-900">{shift.name}</div>
                          <div className="text-xs text-slate-600">{shift.time}</div>
                        </div>
                      </td>
                      {weekDates.map((date) => {
                        const dateKey = formatDate(date);
                        const assignedEmployees = shift.assignments[dateKey] || [];
                        
                        return (
                          <td key={dateKey} className="p-2 border-r border-slate-100 h-32 relative align-top">
                            <div className="space-y-1">
                              {assignedEmployees.map((employeeId) => {
                                const employee = employees.find(e => e.id === employeeId);
                                return (
                                  <div key={employeeId} className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-2 text-xs">
                                    <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-medium">
                                      {employee?.initials}
                                    </div>
                                    <span className="text-slate-900 font-medium">{employee?.name}</span>
                                  </div>
                                );
                              })}
                              <button className="w-full flex items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-2 hover:border-slate-400 hover:bg-slate-50 transition-colors text-slate-500 text-xs">
                                + ajouter
                              </button>
                            </div>
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
      </div>
    </Layout>
  );
};

export default PlanningDetail;
