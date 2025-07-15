
import React, { useState } from 'react';
import { Plus, Minus, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OrganizationNode {
  id: string;
  name: string;
  type: 'department' | 'team' | 'position';
  children: OrganizationNode[];
}

interface NodeInputProps {
  node: OrganizationNode;
  level: number;
  onUpdate: (nodeId: string, updates: Partial<OrganizationNode>) => void;
  onAddChild: (parentId: string) => void;
  onAddSibling: (nodeId: string) => void;
  onRemove: (nodeId: string) => void;
  canRemove: boolean;
}

export const NodeInput: React.FC<NodeInputProps> = ({
  node,
  level,
  onUpdate,
  onAddChild,
  onAddSibling,
  onRemove,
  canRemove
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children.length > 0;

  const handleNameChange = (value: string) => {
    onUpdate(node.id, { name: value });
  };

  const handleTypeChange = (value: 'department' | 'team' | 'position') => {
    onUpdate(node.id, { type: value });
  };

  return (
    <div className="space-y-2">
      <div className={`flex items-center gap-2 p-3 border rounded-lg bg-white ${level > 0 ? 'ml-6' : ''}`}>
        {hasChildren && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 h-6 w-6"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
        )}
        
        <Input
          value={node.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Nom du nœud"
          className="flex-1"
        />
        
        <Select value={node.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="department">Département</SelectItem>
            <SelectItem value="team">Équipe</SelectItem>
            <SelectItem value="position">Poste</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddChild(node.id)}
          className="px-2"
        >
          <Plus className="w-4 h-4" />
        </Button>
        
        {level > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddSibling(node.id)}
            className="px-2"
          >
            <Plus className="w-4 h-4" />
          </Button>
        )}
        
        {canRemove && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRemove(node.id)}
            className="px-2 text-red-600 hover:text-red-700"
          >
            <Minus className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {isExpanded && hasChildren && (
        <div className="space-y-2">
          {node.children.map((child) => (
            <NodeInput
              key={child.id}
              node={child}
              level={level + 1}
              onUpdate={onUpdate}
              onAddChild={onAddChild}
              onAddSibling={onAddSibling}
              onRemove={onRemove}
              canRemove={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};
