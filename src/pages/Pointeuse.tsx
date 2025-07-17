
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Plus, Search, Edit, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import AddPointeuseForm from '@/components/AddPointeuseForm';

interface Pointeuse {
  id: string;
  nom: string;
  localisation: string;
  type: 'rfid' | 'biometrique' | 'code_pin';
  statut: 'active' | 'inactive' | 'maintenance';
  dernierSync: string;
}

const Pointeuse: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pointeuseSearch, setPointeuseSearch] = useState('');
  const [isAddPointeuseFormOpen, setIsAddPointeuseFormOpen] = useState(false);
  const [pointeuseStatusFilter, setPointeuseStatusFilter] = useState('tous');
  const [pointeuseTypeFilter, setPointeuseTypeFilter] = useState('tous');
  const itemsPerPage = 5;

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

  const pointeuses: Pointeuse[] = [
    { id: '1', nom: 'Pointeuse Entrée Principale', localisation: 'Hall d\'entrée', type: 'rfid', statut: 'active', dernierSync: '02/06/2025 09:30' },
    { id: '2', nom: 'Pointeuse Bureau RH', localisation: 'Étage 2 - RH', type: 'biometrique', statut: 'active', dernierSync: '02/06/2025 09:25' },
    { id: '3', nom: 'Pointeuse Cafétéria', localisation: 'Rez-de-chaussée', type: 'code_pin', statut: 'maintenance', dernierSync: '01/06/2025 16:45' },
    { id: '4', nom: 'Pointeuse Parking', localisation: 'Parking extérieur', type: 'rfid', statut: 'inactive', dernierSync: '30/05/2025 18:00' },
  ];

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
    { label: "Pointeuse" }
  ];

  // Filter pointeuses based on search and filters
  const filteredPointeuses = pointeuses.filter(pointeuse => {
    const matchesSearch = pointeuse.nom.toLowerCase().includes(pointeuseSearch.toLowerCase()) ||
           pointeuse.localisation.toLowerCase().includes(pointeuseSearch.toLowerCase());
    const matchesStatus = pointeuseStatusFilter === 'tous' || pointeuse.statut === pointeuseStatusFilter;
    const matchesType = pointeuseTypeFilter === 'tous' || pointeuse.type === pointeuseTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination for pointeuses
  const pointeusesTotalPages = Math.ceil(filteredPointeuses.length / itemsPerPage);
  const pointeusesStartIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPointeuses = filteredPointeuses.slice(pointeusesStartIndex, pointeusesStartIndex + itemsPerPage);

  return (
    <Layout pageTitle="Pointeuse" breadcrumbItems={breadcrumbItems}>
      {/* Header */}
      <div className="flex h-10 justify-between items-center self-stretch max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:h-auto">
        <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
          Pointeuse
        </h1>
        {!isAddPointeuseFormOpen && (
          <Button 
            onClick={handleAddPointeuse}
            className="bg-slate-900 hover:bg-slate-800"
          >
            <Plus className="w-4 h-4" />
            Ajouter pointeuse
          </Button>
        )}
      </div>

      {/* Search and Filters for pointeuse */}
      {!isAddPointeuseFormOpen && (
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
      {isAddPointeuseFormOpen && (
        <div className="w-full">
          <AddPointeuseForm
            isOpen={true}
            onClose={() => setIsAddPointeuseFormOpen(false)}
            onSubmit={handleAddPointeuseSubmit}
            inline={true}
          />
        </div>
      )}

      {/* Pointeuse Tab Content - only show if form is not open */}
      {!isAddPointeuseFormOpen && (
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

      {/* Add Pointeuse Form Modal */}
      <AddPointeuseForm
        isOpen={isAddPointeuseFormOpen}
        onClose={() => setIsAddPointeuseFormOpen(false)}
        onSubmit={handleAddPointeuseSubmit}
      />
    </Layout>
  );
};

export default Pointeuse;
