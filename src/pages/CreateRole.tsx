
import React, { useState, useCallback, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateRole: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    description: ''
  });
  const [selectedPermissions, setSelectedPermissions] = useState<Record<string, string[]>>({});

  const breadcrumbItems = [
    { label: "Paramètres" },
    { label: "Rôles & Permissions", href: "/parametres/roles-permissions" },
    { label: "Créer un rôle" }
  ];

  const modules = useMemo(() => [
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
  ], []);

  const validateStep1 = useCallback(() => {
    const errors = { name: '', description: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Le nom du rôle est requis';
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = 'La description est requise';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  }, [formData.name, formData.description]);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    setFormErrors(prev => {
      if (prev[field as keyof typeof prev]) {
        return { ...prev, [field]: '' };
      }
      return prev;
    });
  }, []);

  const togglePermission = useCallback((moduleName: string, permissionKey: string) => {
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
  }, []);

  const toggleAllModulePermissions = useCallback((moduleName: string, checked: boolean) => {
    const moduleData = modules.find(m => m.name === moduleName);
    if (!moduleData) return;
    
    setSelectedPermissions(prev => ({
      ...prev,
      [moduleName]: checked ? moduleData.permissions.map(p => p.key) : []
    }));
  }, [modules]);

  const handleNext = useCallback(() => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    }
  }, [currentStep, validateStep1]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      handleNext();
    } else {
      const roleData = {
        ...formData,
        permissions: selectedPermissions
      };
      console.log('Nouveau rôle créé:', roleData);
      navigate('/parametres/roles-permissions');
    }
  }, [currentStep, formData, selectedPermissions, handleNext, navigate]);

  const handleCancel = useCallback(() => {
    navigate('/parametres/roles-permissions');
  }, [navigate]);

  // Memoize module permission states to prevent recalculation on each render
  const moduleStates = useMemo(() => {
    return modules.reduce((acc, module) => {
      const modulePermissions = selectedPermissions[module.name] || [];
      const isFullySelected = modulePermissions.length === module.permissions.length && module.permissions.length > 0;
      const isPartiallySelected = modulePermissions.length > 0 && !isFullySelected;
      
      acc[module.name] = { isFullySelected, isPartiallySelected, modulePermissions };
      return acc;
    }, {} as Record<string, { isFullySelected: boolean; isPartiallySelected: boolean; modulePermissions: string[] }>);
  }, [modules, selectedPermissions]);

  return (
    <Layout pageTitle="Créer un rôle" breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleCancel}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-bold text-slate-900">Créer un nouveau rôle</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
                <CardDescription>
                  Définissez les informations de base pour ce rôle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du rôle</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Ex: Responsable RH, Manager, etc."
                    className="max-w-md"
                  />
                  {formErrors.name && (
                    <p className="text-sm font-medium text-destructive">{formErrors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Décrivez les responsabilités et le périmètre de ce rôle..."
                    className="max-w-2xl"
                    rows={4}
                  />
                  {formErrors.description && (
                    <p className="text-sm font-medium text-destructive">{formErrors.description}</p>
                  )}
                </div>

                {/* Navigation buttons for step 1 */}
                <div className="flex justify-between pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleCancel}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Annuler
                  </Button>
                  
                  <Button 
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 flex items-center gap-2"
                  >
                    Suivant
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
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
                  <Accordion type="multiple" className="space-y-4">
                    {modules.map((module) => {
                      const { isFullySelected, isPartiallySelected, modulePermissions } = moduleStates[module.name];

                      return (
                        <AccordionItem key={module.name} value={module.name} className="border border-slate-200 rounded-lg">
                          <AccordionTrigger className="px-6 py-4 hover:no-underline">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={isFullySelected}
                                    onChange={(e) => toggleAllModulePermissions(module.name, e.target.checked)}
                                    className="h-4 w-4 text-slate-900 focus:ring-slate-500 border-gray-300 rounded"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                                <div className="text-left">
                                  <h4 className="font-semibold text-slate-900 text-lg">{module.name}</h4>
                                  <p className="text-slate-600 text-sm">{module.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {isPartiallySelected && (
                                  <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                                    Partiel
                                  </span>
                                )}
                                {isFullySelected && (
                                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                    Complet
                                  </span>
                                )}
                              </div>
                            </div>
                          </AccordionTrigger>
                          
                          <AccordionContent className="px-6 pb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {module.permissions.map((permission) => {
                                const isSelected = modulePermissions.includes(permission.key);
                                
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
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => {}} // Handled by parent div onClick
                                        className="h-4 w-4 text-slate-900 focus:ring-slate-500 border-gray-300 rounded mt-0.5"
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
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>

                  {/* Navigation buttons for step 2 */}
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
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setCurrentStep(1)}
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Précédent
                      </Button>
                    </div>

                    <Button 
                      type="submit" 
                      className="bg-slate-900 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Créer le rôle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default CreateRole;
