import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, Edit2, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Layout } from '@/components/Layout';
import { HeaderCtaButton } from '@/components/ui/header-cta-button';

interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  employeeCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Ressources Humaines',
    description: 'Gestion du personnel et des talents',
    manager: 'Marie Dubois',
    employeeCount: 12,
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Développement',
    description: 'Équipe de développement logiciel',
    manager: 'Pierre Martin',
    employeeCount: 25,
    status: 'active',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Marketing',
    description: 'Stratégie marketing et communication',
    manager: 'Sophie Laurent',
    employeeCount: 8,
    status: 'active',
    createdAt: '2024-01-20'
  }
];

export default function Departements() {
  const [departments] = useState<Department[]>(mockDepartments);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ctaButton = (
    <HeaderCtaButton onClick={() => console.log('Create department')}>
      <Plus className="w-4 h-4" />
      <span>Nouveau département</span>
    </HeaderCtaButton>
  );

  return (
    <Layout
      pageTitle="Départements"
      breadcrumbItems={[
        { label: "Entreprise" },
        { label: "Départements" }
      ]}
      ctaButton={ctaButton}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher un département..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDepartments.map((department) => (
            <Card key={department.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">{department.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {department.description}
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Manager:</span>
                    <span className="font-medium">{department.manager}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Employés:</span>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{department.employeeCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Statut:</span>
                    <Badge variant={department.status === 'active' ? 'default' : 'secondary'}>
                      {department.status === 'active' ? 'Actif' : 'Inactif'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun département trouvé.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
