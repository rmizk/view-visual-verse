import React, { useState } from 'react';
import { Search, Filter, Calendar as CalendarIcon, Users, Eye, Edit, Archive } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface PlanningsListProps {
  showCreateButton?: boolean;
}

export const PlanningsList: React.FC<PlanningsListProps> = ({ showCreateButton = false }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const plannings = [
    {
      id: 1,
      name: 'Planning Développement Q1',
      type: 'Shifts',
      employees: 12,
      startDate: '2024-01-15',
      endDate: '2024-03-31',
      status: 'active',
      shifts: ['Matin', 'Jour', 'Soir']
    },
    {
      id: 2,
      name: 'Planning Service Client',
      type: 'Fixe',
      employees: 8,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      shifts: []
    },
    {
      id: 3,
      name: 'Planning Marketing Hiver',
      type: 'Variable',
      employees: 6,
      startDate: '2024-01-01',
      endDate: '2024-02-29',
      status: 'archived',
      shifts: []
    },
    {
      id: 4,
      name: 'Planning Équipe Nuit',
      type: 'Shifts',
      employees: 16,
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      status: 'active',
      shifts: ['Nuit', 'Matin']
    }
  ];

  const filteredPlannings = plannings.filter(planning => {
    const matchesSearch = planning.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || planning.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || planning.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreatePlanning = () => {
    // This will be handled by the parent component
    console.log('Create planning clicked from list');
  };

  const handleViewPlanning = (planningId: number) => {
    navigate(`/planning/${planningId}`);
  };

  const handleEditPlanning = (planningId: number) => {
    navigate(`/planning/${planningId}/edit`);
  };

  const handleArchivePlanning = (planningId: number) => {
    toast({
      title: "Planning archivé",
      description: "Le planning a été archivé avec succès.",
    });
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    if (status === 'active') {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    return `${baseClasses} bg-gray-100 text-gray-800`;
  };

  const getShiftColors = (shift: string) => {
    const colors: { [key: string]: string } = {
      'Matin': 'bg-green-100 text-green-800',
      'Jour': 'bg-blue-100 text-blue-800',
      'Soir': 'bg-orange-100 text-orange-800',
      'Nuit': 'bg-purple-100 text-purple-800'
    };
    return colors[shift] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher un planning..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>
        
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Type de planning" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="Shifts">Shifts</SelectItem>
            <SelectItem value="Fixe">Fixe</SelectItem>
            <SelectItem value="Variable">Variable</SelectItem>
            <SelectItem value="Flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="archived">Archivé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Planning Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlannings.map((planning) => (
          <Card key={planning.id} className="border border-slate-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">{planning.name}</h3>
                    <p className="text-sm text-slate-500">{planning.type}</p>
                  </div>
                </div>
                <span className={getStatusBadge(planning.status)}>
                  {planning.status === 'active' ? 'Actif' : 'Archivé'}
                </span>
              </div>
              
              <div className="space-y-2 mb-6">
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
                
                {planning.shifts.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {planning.shifts.map((shift, index) => (
                      <span key={index} className={`px-2 py-1 rounded text-xs font-medium ${getShiftColors(shift)}`}>
                        {shift}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewPlanning(planning.id)}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Voir
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditPlanning(planning.id)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Modifier
                </Button>
                {planning.status === 'active' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleArchivePlanning(planning.id)}
                    className="text-slate-600 hover:text-slate-700"
                  >
                    <Archive className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlannings.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucun planning trouvé</h3>
          <p className="text-slate-600">Aucun planning ne correspond aux critères de recherche.</p>
        </div>
      )}
    </div>
  );
};
