
import React, { useState, useCallback } from 'react';
import { Eye, Edit, Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NodeInput } from './NodeInput';
import { OrganigramView } from './OrganigramView';
import { toast } from '@/components/ui/use-toast';

interface OrganizationNode {
  id: string;
  name: string;
  type: 'department' | 'team' | 'position';
  children: OrganizationNode[];
}

interface StructureBuilderProps {
  onBack: () => void;
  onSave: (structure: OrganizationNode[]) => void;
  initialStructure?: OrganizationNode[];
}

export const StructureBuilder: React.FC<StructureBuilderProps> = ({
  onBack,
  onSave,
  initialStructure = []
}) => {
  const [structure, setStructure] = useState<OrganizationNode[]>(
    initialStructure.length > 0 ? initialStructure : [
      {
        id: '1',
        name: '',
        type: 'department',
        children: []
      }
    ]
  );
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

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

  const addChildNode = useCallback((parentId: string) => {
    const newNode: OrganizationNode = {
      id: Date.now().toString(),
      name: '',
      type: 'department',
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

    setStructure(addToTree(structure));
  }, [structure]);

  const addSiblingNode = useCallback((nodeId: string) => {
    const newNode: OrganizationNode = {
      id: Date.now().toString(),
      name: '',
      type: 'department',
      children: []
    };

    const addSibling = (nodes: OrganizationNode[], targetId: string): OrganizationNode[] => {
      const targetIndex = nodes.findIndex(node => node.id === targetId);
      if (targetIndex !== -1) {
        const newNodes = [...nodes];
        newNodes.splice(targetIndex + 1, 0, newNode);
        return newNodes;
      }
      
      return nodes.map(node => ({
        ...node,
        children: addSibling(node.children, targetId)
      }));
    };

    setStructure(addSibling(structure, nodeId));
  }, [structure]);

  const removeNode = useCallback((nodeId: string) => {
    const removeFromTree = (nodes: OrganizationNode[]): OrganizationNode[] => {
      return nodes.filter(node => node.id !== nodeId).map(node => ({
        ...node,
        children: removeFromTree(node.children)
      }));
    };

    setStructure(removeFromTree(structure));
  }, [structure]);

  const handleNodeUpdate = useCallback((nodeId: string, updates: Partial<OrganizationNode>) => {
    setStructure(updateNode(structure, nodeId, updates));
  }, [structure, updateNode]);

  const handleSave = () => {
    const hasEmptyNames = structure.some(node => !node.name.trim());
    if (hasEmptyNames) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les noms de nœuds avant de sauvegarder.",
        variant: "destructive"
      });
      return;
    }

    onSave(structure);
    toast({
      title: "Structure sauvegardée",
      description: "La structure organisationnelle a été sauvegardée avec succès."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'edit' ? 'default' : 'outline'}
            onClick={() => setViewMode('edit')}
            size="sm"
          >
            <Edit className="w-4 h-4 mr-2" />
            Édition
          </Button>
          <Button
            variant={viewMode === 'preview' ? 'default' : 'outline'}
            onClick={() => setViewMode('preview')}
            size="sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            Aperçu
          </Button>
        </div>
        
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      {viewMode === 'edit' ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Configuration de la structure</h3>
          <div className="space-y-2">
            {structure.map((node, index) => (
              <NodeInput
                key={node.id}
                node={node}
                level={0}
                onUpdate={handleNodeUpdate}
                onAddChild={addChildNode}
                onAddSibling={addSiblingNode}
                onRemove={removeNode}
                canRemove={structure.length > 1}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Aperçu de la structure</h3>
          <OrganigramView nodes={structure} />
        </div>
      )}
    </div>
  );
};
