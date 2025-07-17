import React, { useState } from 'react';
import { Plus, Users, Shield, Settings } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeaderCtaButton } from '@/components/ui/header-cta-button';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  color: string;
}

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Administrateur',
    description: 'Accès complet à toutes les fonctionnalités',
    permissions: ['read', 'write', 'delete', 'admin'],
    userCount: 2,
    color: 'bg-red-100 text-red-800'
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Gestion d\'équipe et de département',
    permissions: ['read', 'write', 'manage_team'],
    userCount: 8,
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: '3',
    name: 'Employé',
    description: 'Accès aux fonctionnalités de base',
    permissions: ['read', 'self_manage'],
    userCount: 35,
    color: 'bg-green-100 text-green-800'
  }
];

export default function RolesPermissions() {
  const [roles] = useState<Role[]>(mockRoles);

  const ctaButton = (
    <HeaderCtaButton onClick={() => console.log('Create new role')}>
      <Plus className="w-4 h-4" />
      <span>Nouveau rôle</span>
    </HeaderCtaButton>
  );

  return (
    <Layout
      pageTitle="Rôles & Permissions"
      breadcrumbItems={[
        { label: "Paramètres", href: "/parametres" },
        { label: "Rôles & Permissions" }
      ]}
      ctaButton={ctaButton}
    >
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <Card key={role.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    {role.name}
                  </CardTitle>
                  <Badge className={role.color}>
                    {role.userCount} utilisateur{role.userCount > 1 ? 's' : ''}
                  </Badge>
                </div>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Permissions:</h4>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm">
                      <Users className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Matrice des permissions</CardTitle>
            <CardDescription>
              Vue d'ensemble des permissions par rôle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Permission</th>
                    <th className="text-center p-2">Administrateur</th>
                    <th className="text-center p-2">Manager</th>
                    <th className="text-center p-2">Employé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Lecture</td>
                    <td className="text-center p-2">✅</td>
                    <td className="text-center p-2">✅</td>
                    <td className="text-center p-2">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Écriture</td>
                    <td className="text-center p-2">✅</td>
                    <td className="text-center p-2">✅</td>
                    <td className="text-center p-2">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Suppression</td>
                    <td className="text-center p-2">✅</td>
                    <td className="text-center p-2">❌</td>
                    <td className="text-center p-2">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Administration</td>
                    <td className="text-center p-2">✅</td>
                    <td className="text-center p-2">❌</td>
                    <td className="text-center p-2">❌</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
