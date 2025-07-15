
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Search, ChevronRight, ChevronLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const roleSchema = z.object({
  name: z.string().min(1, 'Le nom du rôle est requis'),
  description: z.string().min(1, 'La description est requise'),
  permissions: z.record(z.array(z.string())).default({})
});

const RoleCreationForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: { name: '', description: '', permissions: {} }
  });

  const modules = [
    { name: 'Dashboard', permissions: ['view', 'export'] },
    { name: 'Employés', permissions: ['view', 'create', 'edit', 'delete'] },
    { name: 'Planning', permissions: ['view', 'create', 'edit', 'delete'] },
    { name: 'Pointages', permissions: ['view', 'validate', 'edit'] },
    { name: 'Rapports', permissions: ['view', 'export', 'create'] }
  ];

  const onSubmit = (data: z.infer<typeof roleSchema>) => {
    console.log('Nouveau rôle créé:', data);
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations générales</h3>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du rôle</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sélection des permissions</h3>
            {modules.map((module) => (
              <div key={module.name} className="space-y-2">
                <h4 className="font-medium">{module.name}</h4>
                <div className="flex gap-4 flex-wrap">
                  {module.permissions.map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Checkbox id={`${module.name}-${permission}`} />
                      <Label htmlFor={`${module.name}-${permission}`}>{permission}</Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between">
          {currentStep > 1 && (
            <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
              <ChevronLeft className="w-4 h-4 mr-2" />Précédent
            </Button>
          )}
          {currentStep < 2 ? (
            <Button type="button" onClick={() => setCurrentStep(2)} className="ml-auto">
              Suivant<ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" className="ml-auto">Créer le rôle</Button>
          )}
        </div>
      </form>
    </Form>
  );
};

const RolesPermissions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    console.log('Créer un nouveau rôle');
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-slate-900 hover:bg-slate-800">
                <Plus className="w-4 h-4 mr-2" />
                Créer un rôle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer un nouveau rôle</DialogTitle>
                <DialogDescription>Définissez les informations et permissions pour ce rôle.</DialogDescription>
              </DialogHeader>
              <RoleCreationForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
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
