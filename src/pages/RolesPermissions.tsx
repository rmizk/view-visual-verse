
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Search, ChevronRight, ChevronLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const RolesPermissions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Paramètres" },
    { label: "Rôles & Permissions" }
  ];

  // Mock data for roles
  const rolesData = [
    {
      id: '1',
      name: 'Administrateur',
      userCount: 5,
      permissions: 'Accès complet, Gestion utilisateurs, Configuration système'
    },
    {
      id: '2',
      name: 'Responsable',
      userCount: 12,
      permissions: 'Gestion équipe, Planning, Validation absences'
    },
    {
      id: '3',
      name: 'Employé',
      userCount: 85,
      permissions: 'Consultation planning, Pointage, Demandes congés'
    },
    {
      id: '4',
      name: 'RH',
      userCount: 3,
      permissions: 'Gestion employés, Rapports, Administration'
    }
  ];

  const handleCreateRole = () => {
    navigate('/parametres/roles-permissions/create');
  };

  const handleEditRole = (roleId: string) => {
    console.log('Modifier le rôle:', roleId);
  };

  const handleDeleteRole = (roleId: string) => {
    console.log('Supprimer le rôle:', roleId);
  };

  return (
    <Layout pageTitle="Rôles & Permissions" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">Rôles & Permissions</h1>
          <Button 
            onClick={handleCreateRole}
            className="bg-slate-900 hover:bg-slate-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            Créer un rôle
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="roles" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="roles">Rôles</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="space-y-6">
            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher un rôle ou un utilisateur"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                />
              </div>
              <select className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500">
                <option value="">Filtrer par permissions</option>
                <option value="admin">Administration</option>
                <option value="planning">Planning</option>
                <option value="rh">Ressources Humaines</option>
                <option value="pointage">Pointage</option>
              </select>
            </div>

            {/* Roles Table */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom du rôle</TableHead>
                    <TableHead>Nombre d'utilisateurs assignés</TableHead>
                    <TableHead>Résumé des permissions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rolesData.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.userCount}</TableCell>
                      <TableCell className="max-w-xs truncate">{role.permissions}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditRole(role.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteRole(role.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Gestion des permissions</h3>
              <p className="text-slate-600">
                Cette section permettra de gérer les permissions individuelles et de les associer aux rôles.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RolesPermissions;
