import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TabNavigation } from '@/components/TabNavigation';
import { Plus, Users, Building, Edit, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Department {
  id: string;
  nom: string;
  manager: string;
  employes: number;
  statut: 'actif' | 'inactif';
  description?: string;
  budget?: string;
  localisation?: string;
}

const Departements: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tous');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'details' | 'edit'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'tous', label: 'Tous les départements' },
    { id: 'actifs', label: 'Actifs' },
    { id: 'configuration', label: 'Configuration' }
  ];

  const handleCreateDepartment = () => {
    setShowCreateForm(!showCreateForm);
    setViewMode('list');
    setSelectedDepartment(null);
  };

  const handleViewDetails = (department: Department) => {
    setSelectedDepartment(department);
    setViewMode('details');
    setShowCreateForm(false);
  };

  const handleEditDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setViewMode('edit');
    setShowCreateForm(false);
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedDepartment(null);
    setShowCreateForm(false);
  };

  const departments: Department[] = [
    { 
      id: '1', 
      nom: 'Ressources Humaines', 
      manager: 'Marie Dubois', 
      employes: 8, 
      statut: 'actif',
      description: 'Gestion du personnel, recrutement et formation',
      budget: '150 000€',
      localisation: 'Bâtiment A - 2ème étage'
    },
    { 
      id: '2', 
      nom: 'Développement', 
      manager: 'Pierre Martin', 
      employes: 15, 
      statut: 'actif',
      description: 'Développement logiciel et applications',
      budget: '300 000€',
      localisation: 'Bâtiment B - 1er étage'
    },
    { 
      id: '3', 
      nom: 'Marketing', 
      manager: 'Sophie Laurent', 
      employes: 6, 
      statut: 'actif',
      description: 'Stratégie marketing et communication',
      budget: '120 000€',
      localisation: 'Bâtiment A - 3ème étage'
    },
    { 
      id: '4', 
      nom: 'Ventes', 
      manager: 'Jean Durand', 
      employes: 12, 
      statut: 'actif',
      description: 'Ventes et relation client',
      budget: '200 000€',
      localisation: 'Bâtiment C - Rez-de-chaussée'
    },
    { 
      id: '5', 
      nom: 'Comptabilité', 
      manager: 'Lucie Bernard', 
      employes: 4, 
      statut: 'actif',
      description: 'Gestion financière et comptabilité',
      budget: '80 000€',
      localisation: 'Bâtiment A - 1er étage'
    },
  ];

  const breadcrumbItems = [
    { label: "Entreprise" },
    { label: "Départements" }
  ];

  // Filter departments based on search
  const filteredDepartments = departments.filter(dept => 
    searchQuery === '' || 
    dept.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ctaButton = viewMode === 'list' && (
    <div className="flex items-start gap-3 max-sm:flex-col max-sm:w-full max-sm:gap-2">
      <button 
        onClick={handleCreateDepartment}
        className="flex min-w-16 justify-center items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
      >
        <Plus className="w-4 h-4 text-slate-50" />
        <span className="text-slate-50 text-sm font-normal leading-[23.94px]">
          Nouveau département
        </span>
      </button>
    </div>
  );

  return (
    <Layout pageTitle="Entreprise" breadcrumbItems={breadcrumbItems} ctaButton={ctaButton}>
      {/* Back button for non-list views */}
      {viewMode !== 'list' && (
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleBackToList}
            className="h-8 w-8"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-slate-950 text-3xl font-bold leading-9 tracking-[-0.75px]">
            {viewMode === 'details' ? 'Détails du département' : 
             viewMode === 'edit' ? 'Modifier le département' : 'Départements'}
          </h1>
        </div>
      )}

      {/* Tab Navigation - only show in list mode */}
      {viewMode === 'list' && (
        <TabNavigation 
          tabs={tabs}
          onTabChange={setActiveTab}
          defaultActiveTab="tous"
        />
      )}

      {/* Search Field - only show in list mode */}
      {viewMode === 'list' && (
        <div className="flex justify-start items-center w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Rechercher un département..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      )}

      {/* Create Department Form */}
      {showCreateForm && viewMode === 'list' && (
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="w-full bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-950 mb-4">Créer un nouveau département</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nom du département
                </label>
                <input 
                  type="text" 
                  placeholder="Entrez le nom du département"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Manager
                </label>
                <input 
                  type="text" 
                  placeholder="Nom du manager"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea 
                  placeholder="Description du département"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Budget annuel
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: 150 000€"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Localisation
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: Bâtiment A - 2ème étage"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button 
                onClick={() => {
                  alert('Département créé avec succès !');
                  setShowCreateForm(false);
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800"
              >
                Créer le département
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Department Details View */}
      {viewMode === 'details' && selectedDepartment && (
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="w-full bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-950 mb-2">{selectedDepartment.nom}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedDepartment.statut === 'actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {selectedDepartment.statut}
                </span>
              </div>
              <button
                onClick={() => handleEditDepartment(selectedDepartment)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800"
              >
                <Edit className="w-4 h-4" />
                Modifier
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-500">Manager</label>
                  <p className="text-slate-950 font-medium">{selectedDepartment.manager}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-500">Nombre d'employés</label>
                  <p className="text-slate-950 font-medium flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {selectedDepartment.employes}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-500">Budget annuel</label>
                  <p className="text-slate-950 font-medium">{selectedDepartment.budget}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-500">Localisation</label>
                  <p className="text-slate-950 font-medium flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    {selectedDepartment.localisation}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-500">Description</label>
                  <p className="text-slate-950">{selectedDepartment.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Department Edit Form */}
      {viewMode === 'edit' && selectedDepartment && (
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="w-full bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-950 mb-4">Modifier le département</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nom du département
                </label>
                <input 
                  type="text" 
                  defaultValue={selectedDepartment.nom}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Manager
                </label>
                <input 
                  type="text" 
                  defaultValue={selectedDepartment.manager}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea 
                  defaultValue={selectedDepartment.description}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Budget annuel
                </label>
                <input 
                  type="text" 
                  defaultValue={selectedDepartment.budget}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Statut
                </label>
                <select 
                  defaultValue={selectedDepartment.statut}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Localisation
                </label>
                <input 
                  type="text" 
                  defaultValue={selectedDepartment.localisation}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleBackToList}
                className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button 
                onClick={() => {
                  alert('Département modifié avec succès !');
                  handleBackToList();
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Departments List */}
      {viewMode === 'list' && (
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {filteredDepartments.map((dept) => (
              <div key={dept.id} className="flex flex-col items-start border border-slate-200 bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start self-stretch mb-4">
                  <h3 className="text-slate-950 text-lg font-semibold">{dept.nom}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    dept.statut === 'actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {dept.statut}
                  </span>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-sm">Manager:</span>
                    <span className="text-slate-950 text-sm font-medium">{dept.manager}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-sm">Employés:</span>
                    <span className="text-slate-950 text-sm font-medium">{dept.employes}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 w-full">
                  <button 
                    onClick={() => handleViewDetails(dept)}
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
                  >
                    Voir détails
                  </button>
                  <button 
                    onClick={() => handleEditDepartment(dept)}
                    className="flex-1 px-3 py-2 text-sm bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Departements;
