
import React, { useState, useCallback } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Users, Building, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface OrganizationNode {
  id: string;
  name: string;
  type: 'department' | 'team' | 'position';
  parentId?: string;
  assignedRoles: string[];
  children: OrganizationNode[];
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

const OrganizationStructure = () => {
  const [organizationTree, setOrganizationTree] = useState<OrganizationNode[]>([
    {
      id: '1',
      name: 'Direction Générale',
      type: 'department',
      assignedRoles: [],
      children: [
        {
          id: '2',
          name: 'Ressources Humaines',
          type: 'department',
          parentId: '1',
          assignedRoles: [],
          children: []
        },
        {
          id: '3',
          name: 'Informatique',
          type: 'department',
          parentId: '1',
          assignedRoles: [],
          children: []
        }
      ]
    }
  ]);

  const [availableRoles] = useState<Role[]>([
    { id: '1', name: 'Administrateur', permissions: ['all'] },
    { id: '2', name: 'Manager', permissions: ['manage_team', 'view_reports'] },
    { id: '3', name: 'Employé', permissions: ['view_schedule', 'mark_attendance'] },
    { id: '4', name: 'RH Responsable', permissions: ['manage_employees', 'view_reports'] }
  ]);

  const [editingNode, setEditingNode] = useState<OrganizationNode | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeType, setNewNodeType] = useState<'department' | 'team' | 'position'>('department');
  const [selectedParentId, setSelectedParentId] = useState<string>('');

  const findNodeById = useCallback((nodes: OrganizationNode[], id: string): OrganizationNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
    return null;
  }, []);

  const updateNode = useCallback((nodes: OrganizationNode[], nodeId: string, updates: Partial<OrganizationNode>): OrganizationNode[] => {
    return nodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, ...updates };
      }
      return {
        ...node,
        children: updateNode(node.children, nodeId, updates)
      };
    });
  }, []);

  const addNode = useCallback((parentId: string) => {
    if (!newNodeName.trim()) return;

    const newNode: OrganizationNode = {
      id: Date.now().toString(),
      name: newNodeName,
      type: newNodeType,
      parentId,
      assignedRoles: [],
      children: []
    };

    const addToTree = (nodes: OrganizationNode[]): OrganizationNode[] => {
      return nodes.map(node => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...node.children, newNode]
          };
        }
        return {
          ...node,
          children: addToTree(node.children)
        };
      });
    };

    setOrganizationTree(addToTree(organizationTree));
    setNewNodeName('');
    setIsAddDialogOpen(false);
    toast({
      title: "Nœud ajouté",
      description: `${newNodeName} a été ajouté avec succès.`
    });
  }, [newNodeName, newNodeType, organizationTree]);

  const deleteNode = useCallback((nodeId: string) => {
    const deleteFromTree = (nodes: OrganizationNode[]): OrganizationNode[] => {
      return nodes.filter(node => node.id !== nodeId).map(node => ({
        ...node,
        children: deleteFromTree(node.children)
      }));
    };

    setOrganizationTree(deleteFromTree(organizationTree));
    toast({
      title: "Nœud supprimé",
      description: "Le nœud a été supprimé avec succès."
    });
  }, [organizationTree]);

  const assignRole = useCallback((nodeId: string, roleId: string) => {
    const node = findNodeById(organizationTree, nodeId);
    if (!node) return;

    const updatedRoles = node.assignedRoles.includes(roleId)
      ? node.assignedRoles.filter(id => id !== roleId)
      : [...node.assignedRoles, roleId];

    setOrganizationTree(updateNode(organizationTree, nodeId, { assignedRoles: updatedRoles }));
  }, [organizationTree, findNodeById, updateNode]);

  const saveNodeName = useCallback((nodeId: string, newName: string) => {
    setOrganizationTree(updateNode(organizationTree, nodeId, { name: newName }));
    setEditingNode(null);
    toast({
      title: "Nom mis à jour",
      description: `Le nom a été modifié avec succès.`
    });
  }, [organizationTree, updateNode]);

  const renderNode = (node: OrganizationNode, level: number = 0) => {
    const getTypeIcon = (type: string) => {
      switch (type) {
        case 'department': return <Building className="w-4 h-4" />;
        case 'team': return <Users className="w-4 h-4" />;
        case 'position': return <Users className="w-4 h-4" />;
        default: return <Building className="w-4 h-4" />;
      }
    };

    const getTypeColor = (type: string) => {
      switch (type) {
        case 'department': return 'bg-blue-100 text-blue-800';
        case 'team': return 'bg-green-100 text-green-800';
        case 'position': return 'bg-purple-100 text-purple-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div key={node.id} className={`ml-${level * 6}`}>
        <Card className="mb-4 border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getTypeIcon(node.type)}
                {editingNode?.id === node.id ? (
                  <Input
                    value={editingNode.name}
                    onChange={(e) => setEditingNode({ ...editingNode, name: e.target.value })}
                    onBlur={() => saveNodeName(node.id, editingNode.name)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        saveNodeName(node.id, editingNode.name);
                      } else if (e.key === 'Escape') {
                        setEditingNode(null);
                      }
                    }}
                    className="font-semibold"
                    autoFocus
                  />
                ) : (
                  <CardTitle className="text-lg">{node.name}</CardTitle>
                )}
                <Badge className={getTypeColor(node.type)}>
                  {node.type === 'department' ? 'Département' : 
                   node.type === 'team' ? 'Équipe' : 'Poste'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingNode(node)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajouter un sous-élément</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Nom du nouvel élément"
                        value={newNodeName}
                        onChange={(e) => setNewNodeName(e.target.value)}
                      />
                      <Select value={newNodeType} onValueChange={(value: 'department' | 'team' | 'position') => setNewNodeType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="department">Département</SelectItem>
                          <SelectItem value="team">Équipe</SelectItem>
                          <SelectItem value="position">Poste</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={() => addNode(node.id)} className="w-full">
                        Ajouter
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                {level > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNode(node.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-2">Rôles assignés:</h4>
                <div className="flex flex-wrap gap-2">
                  {node.assignedRoles.map(roleId => {
                    const role = availableRoles.find(r => r.id === roleId);
                    return role ? (
                      <Badge key={roleId} variant="secondary">
                        {role.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Assigner un rôle:</h4>
                <div className="flex flex-wrap gap-2">
                  {availableRoles.map(role => (
                    <Button
                      key={role.id}
                      variant={node.assignedRoles.includes(role.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => assignRole(node.id, role.id)}
                    >
                      {role.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {node.children.map(child => renderNode(child, level + 1))}
      </div>
    );
  };

  return (
    <Layout
      pageTitle="Structure organisationnelle"
      breadcrumbItems={[
        { label: "Paramètres", href: "/parametres" },
        { label: "Structure organisationnelle" }
      ]}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Structure organisationnelle</h1>
            <p className="text-gray-600 mt-1">
              Définissez la structure de votre organisation et assignez les rôles appropriés
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedParentId('')}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter département principal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un département principal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Nom du département"
                  value={newNodeName}
                  onChange={(e) => setNewNodeName(e.target.value)}
                />
                <Select value={newNodeType} onValueChange={(value: 'department' | 'team' | 'position') => setNewNodeType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="department">Département</SelectItem>
                    <SelectItem value="team">Équipe</SelectItem>
                    <SelectItem value="position">Poste</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => {
                  const newNode: OrganizationNode = {
                    id: Date.now().toString(),
                    name: newNodeName,
                    type: newNodeType,
                    assignedRoles: [],
                    children: []
                  };
                  setOrganizationTree([...organizationTree, newNode]);
                  setNewNodeName('');
                  setIsAddDialogOpen(false);
                  toast({
                    title: "Département ajouté",
                    description: `${newNodeName} a été ajouté avec succès.`
                  });
                }} className="w-full">
                  Ajouter
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {organizationTree.length === 0 ? (
              <div className="text-center py-12">
                <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune structure définie
                </h3>
                <p className="text-gray-600 mb-4">
                  Commencez par ajouter votre premier département
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un département
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {organizationTree.map(node => renderNode(node))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrganizationStructure;
