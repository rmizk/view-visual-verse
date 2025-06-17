
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Filter } from 'lucide-react';
import { ShiftCalendarView } from '@/components/planning/ShiftCalendarView';
import { toast } from '@/hooks/use-toast';

const PlanningDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Mock data - in real app, this would be fetched based on the ID
  const planning = {
    id: parseInt(id || '1'),
    name: 'Planning Développement Q1',
    type: 'Shifts',
    startDate: '2024-01-15',
    endDate: '2024-03-31',
    status: 'active'
  };

  const breadcrumbItems = [
    { label: "Planning", href: "/planning" },
    { label: planning.name }
  ];

  const handleBack = () => {
    navigate('/planning');
  };

  return (
    <Layout pageTitle={planning.name} breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{planning.name}</h1>
              <p className="text-slate-600">Type: {planning.type} • Statut: {planning.status}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
            <Button size="sm" className="bg-slate-900 hover:bg-slate-800">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter employé
            </Button>
          </div>
        </div>

        {/* Calendar View for Shifts */}
        {planning.type === 'Shifts' && (
          <ShiftCalendarView 
            planningId={planning.id}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        )}
      </div>
    </Layout>
  );
};

export default PlanningDetail;
