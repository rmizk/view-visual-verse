
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Employee {
  id: string;
  nom: string;
  prenom: string;
  poste: string;
  departement: string;
  statut: 'present' | 'absent' | 'conge';
  email: string;
  telephone: string;
  dateEmbauche: string;
  role: 'admin' | 'manager' | 'employe';
}

interface EmployeePermissionsProps {
  employee: Employee;
}

export const EmployeePermissions: React.FC<EmployeePermissionsProps> = ({ employee }) => {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-lg p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-950 mb-4">Gestion des permissions</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Rôle utilisateur
              </label>
              <Select defaultValue={employee.role}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employe">Employé</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-md font-medium text-slate-900">Permissions spécifiques</h4>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="manage-employees"
                    defaultChecked={employee.role === 'admin'} 
                    className="mt-0.5"
                  />
                  <div className="space-y-1">
                    <label htmlFor="manage-employees" className="text-sm font-medium text-slate-700 cursor-pointer">
                      Gestion des employés
                    </label>
                    <p className="text-xs text-slate-500">
                      Permet de créer, modifier et supprimer des employés
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="manage-departments"
                    defaultChecked={employee.role === 'admin'} 
                    className="mt-0.5"
                  />
                  <div className="space-y-1">
                    <label htmlFor="manage-departments" className="text-sm font-medium text-slate-700 cursor-pointer">
                      Gestion des départements
                    </label>
                    <p className="text-xs text-slate-500">
                      Permet de créer et modifier les départements de l'entreprise
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="manage-planning"
                    defaultChecked={employee.role === 'admin' || employee.role === 'manager'} 
                    className="mt-0.5"
                  />
                  <div className="space-y-1">
                    <label htmlFor="manage-planning" className="text-sm font-medium text-slate-700 cursor-pointer">
                      Gestion des plannings
                    </label>
                    <p className="text-xs text-slate-500">
                      Permet de créer et modifier les plannings de travail
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="view-reports"
                    defaultChecked={employee.role === 'admin' || employee.role === 'manager'} 
                    className="mt-0.5"
                  />
                  <div className="space-y-1">
                    <label htmlFor="view-reports" className="text-sm font-medium text-slate-700 cursor-pointer">
                      Consultation des rapports
                    </label>
                    <p className="text-xs text-slate-500">
                      Permet d'accéder aux rapports de présence et de productivité
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="manage-devices"
                    defaultChecked={employee.role === 'admin'} 
                    className="mt-0.5"
                  />
                  <div className="space-y-1">
                    <label htmlFor="manage-devices" className="text-sm font-medium text-slate-700 cursor-pointer">
                      Gestion des pointeuses
                    </label>
                    <p className="text-xs text-slate-500">
                      Permet de configurer et gérer les pointeuses de l'entreprise
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="system-settings"
                    defaultChecked={employee.role === 'admin'} 
                    className="mt-0.5"
                  />
                  <div className="space-y-1">
                    <label htmlFor="system-settings" className="text-sm font-medium text-slate-700 cursor-pointer">
                      Paramètres système
                    </label>
                    <p className="text-xs text-slate-500">
                      Permet d'accéder aux paramètres généraux du système
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => alert('Permissions mises à jour avec succès !')}
              className="w-full bg-slate-900 hover:bg-slate-800"
            >
              Sauvegarder les permissions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
