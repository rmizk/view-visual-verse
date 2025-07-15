import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';

const roleSchema = z.object({
  name: z.string().min(1, 'Le nom du rôle est requis'),
  description: z.string().min(1, 'La description est requise'),
  permissions: z.record(z.array(z.string())).default({})
});

const CreateRole: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPermissions, setSelectedPermissions] = useState<Record<string, string[]>>({});

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: { 
      name: '', 
      description: '', 
      permissions: {} 
    }
  });

  const breadcrumbItems = [
    { label: "Paramètres" },
    { label: "Rôles & Permissions", href: "/parametres/roles-permissions" },
    { label: "Créer un rôle" }
  ];

  const modules = [
    {
      name: 'Dashboard',
      description: 'Accès au tableau de bord principal',
      permissions: [
        { key: 'view', label: 'Consulter', description: 'Afficher le dashboard' },
        { key: 'export', label: 'Exporter', description: 'Exporter les données du dashboard' }
      ]
    },
    {
      name: 'Employés',
      description: 'Gestion des employés et de leurs informations',
      permissions: [
        { key: 'view', label: 'Consulter', description: 'Voir la liste des employés' },
        { key: 'create', label: 'Créer', description: 'Ajouter de nouveaux employés' },
        { key: 'edit', label: 'Modifier', description: 'Modifier les informations des employés' },
        { key: 'delete', label: 'Supprimer', description: 'Supprimer des employés' }
      ]
    },
    {
      name: 'Planning',
      description: 'Gestion des plannings et des horaires',
      permissions: [
        { key: 'view', label: 'Consulter', description: 'Voir les plannings' },
        { key: 'create', label: 'Créer', description: 'Créer de nouveaux plannings' },
        { key: 'edit', label: 'Modifier', description: 'Modifier les plannings existants' },
        { key: 'delete', label: 'Supprimer', description: 'Supprimer des plannings' },
        { key: 'assign', label: 'Assigner', description: 'Assigner des employés aux plannings' }
      ]
    },
    {
      name: 'Pointages',
      description: 'Gestion des pointages et validation',
      permissions: [
        { key: 'view', label: 'Consulter', description: 'Voir les pointages' },
        { key: 'validate', label: 'Valider', description: 'Valider les pointages' },
        { key: 'edit', label: 'Modifier', description: 'Corriger les pointages' },
        { key: 'export', label: 'Exporter', description: 'Exporter les données de pointage' }
      ]
    },
    {
      name: 'Rapports',
      description: 'Génération et consultation des rapports',
      permissions: [
        { key: 'view', label: 'Consulter', description: 'Voir les rapports' },
        { key: 'export', label: 'Exporter', description: 'Exporter les rapports' },
        { key: 'create', label: 'Créer', description: 'Créer des rapports personnalisés' }
      ]
    },
    {
      name: 'Départements',
      description: 'Gestion des départements',
      permissions: [
        { key: 'view', label: 'Consulter', description: 'Voir les départements' },
        { key: 'create', label: 'Créer', description: 'Créer de nouveaux départements' },
        { key: 'edit', label: 'Modifier', description: 'Modifier les départements' },
        { key: 'delete', label: 'Supprimer', description: 'Supprimer des départements' }
      ]
    }
  ];

  const togglePermission = (moduleName: string, permissionKey: string) => {
    setSelectedPermissions(prev => {
      const modulePermissions = prev[moduleName] || [];
      const hasPermission = modulePermissions.includes(permissionKey);
      
      if (hasPermission) {
        return {
          ...prev,
          [moduleName]: modulePermissions.filter(p => p !== permissionKey)
        };
      } else {
        return {
          ...prev,
          [moduleName]: [...modulePermissions, permissionKey]
        };
      }
    });
  };

  const toggleAllModulePermissions = (moduleName: string, checked: boolean) => {
    const moduleData = modules.find(m => m.name === moduleName);
    if (moduleData) {
      setSelectedPermissions(prev => ({
        ...prev,
        [moduleName]: checked ? moduleData.permissions.map(p => p.key) : []
      }));
    }
  };

  const isModuleFullySelected = (moduleName: string) => {
    const moduleData = modules.find(m => m.name === moduleName);
    const modulePermissions = selectedPermissions[moduleName] || [];
    return moduleData && modulePermissions.length === moduleData.permissions.length;
  };

  const isModulePartiallySelected = (moduleName: string) => {
    const modulePermissions = selectedPermissions[moduleName] || [];
    return modulePermissions.length > 0 && !isModuleFullySelected(moduleName);
  };

  const onSubmit = (data: z.infer<typeof roleSchema>) => {
    const roleData = {
      ...data,
      permissions: selectedPermissions
    };
    console.log('Nouveau rôle créé:', roleData);
    navigate('/parametres/roles-permissions');
  };

  const handleNext = () => {
    if (currentStep === 1) {
      form.trigger(['name', 'description']).then((isValid) => {
        if (isValid) {
          setCurrentStep(2);
        }
      });
    }
  };

  const handleCancel = () => {
    navigate('/parametres/roles-permissions');
  };

  return (
    <Layout pageTitle="Créer un rôle" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Retour
            </Button>
            <h1 className="text-3xl font-bold text-slate-900">Créer un nouveau rôle</h1>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 1 ? 'bg-slate-900 text-white' : 'bg-slate-200'
            }`}>
              {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <span className="font-medium">Informations générales</span>
          </div>
          
          <div className={`h-px flex-1 ${currentStep > 1 ? 'bg-slate-900' : 'bg-slate-200'}`} />
          
          <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 2 ? 'bg-slate-900 text-white' : 'bg-slate-200'
            }`}>
              2
            </div>
            <span className="font-medium">Sélection des permissions</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Informations générales</CardTitle>
                  <CardDescription>
                    Définissez les informations de base pour ce rôle
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField 
                    control={form.control} 
                    name="name" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom du rôle</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Ex: Responsable RH, Manager, etc."
                            className="max-w-md"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />
                  
                  <FormField 
                    control={form.control} 
                    name="description" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Décrivez les responsabilités et le périmètre de ce rôle..."
                            className="max-w-2xl"
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sélection des permissions</CardTitle>
                    <CardDescription>
                      Définissez les permissions pour chaque module de l'application
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {modules.map((module) => {
                        const isFullySelected = isModuleFullySelected(module.name);
                        const isPartiallySelected = isModulePartiallySelected(module.name);

                        return (
                          <div key={module.name} className="border border-slate-200 rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <Switch
                                    checked={isFullySelected}
                                    onCheckedChange={(checked) => toggleAllModulePermissions(module.name, checked)}
                                    className="data-[state=checked]:bg-slate-900"
                                  />
                                  <h4 className="font-semibold text-slate-900 text-lg">{module.name}</h4>
                                  {isPartiallySelected && (
                                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                                      Partiel
                                    </span>
                                  )}
                                </div>
                                <p className="text-slate-600 text-sm">{module.description}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {module.permissions.map((permission) => {
                                const isSelected = (selectedPermissions[module.name] || []).includes(permission.key);
                                
                                return (
                                  <div
                                    key={permission.key}
                                    className={`relative p-4 border rounded-lg cursor-pointer transition-all hover:border-slate-300 ${
                                      isSelected 
                                        ? 'border-slate-900 bg-slate-50' 
                                        : 'border-slate-200'
                                    }`}
                                    onClick={() => togglePermission(module.name, permission.key)}
                                  >
                                    <div className="flex items-start gap-3">
                                      <Checkbox 
                                        checked={isSelected}
                                        className="mt-0.5"
                                      />
                                      <div className="flex-1">
                                        <h5 className="font-medium text-slate-900 mb-1">
                                          {permission.label}
                                        </h5>
                                        <p className="text-xs text-slate-600">
                                          {permission.description}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between pt-6">
              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCancel}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Annuler
                </Button>
                
                {currentStep > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Précédent
                  </Button>
                )}
              </div>

              {currentStep < 2 ? (
                <Button 
                  type="button" 
                  onClick={handleNext}
                  className="bg-slate-900 hover:bg-slate-800 flex items-center gap-2"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="bg-slate-900 hover:bg-slate-800 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Créer le rôle
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default CreateRole;