
import React, { useState } from 'react';
import { Plus, Minus, ChevronRight, ChevronDown, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserAssignmentDrawer } from './UserAssignmentDrawer';

interface User {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
}

interface OrganizationNode {
  id: string;
  name: string;
  type: 'department' | 'team' | 'position';
  children: OrganizationNode[];
  assignedUsers?: User[];
}

interface NodeInputProps {
  node: OrganizationNode;
  level: number;
  onUpdate: (nodeId: string, updates: Partial<OrganizationNode>) => void;
  onAddChild: (parentId: string) => void;
  onRemove: (nodeId: string) => void;
  canRemove: boolean;
  assignedUsers: Record<string, User[]>;
  onUsersAssigned: (nodeId: string, users: User[]) => void;
}

export const NodeInput: React.FC<NodeInputProps> = ({
  node,
  level,
  onUpdate,
  onAddChild,
  onRemove,
  canRemove,
  assignedUsers,
  onUsersAssigned
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const hasChildren = node.children.length > 0;
  const nodeUsers = assignedUsers[node.id] || [];

  const handleNameChange = (value: string) => {
    onUpdate(node.id, { name: value });
  };

  const handleRemoveUser = (userId: string) => {
    const updatedUsers = nodeUsers.filter(user => user.id !== userId);
    onUsersAssigned(node.id, updatedUsers);
  };

  return (
    <div className="space-y-2">
      <div className={`flex flex-col gap-3 p-3 border rounded-lg bg-white`} style={{ marginLeft: `${level * 24}px` }}>
        <div className="flex items-center gap-2">
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
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDrawerOpen(true)}
            className="px-3"
          >
            <Users className="w-4 h-4 mr-1" />
            Assigner
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddChild(node.id)}
            className="px-2"
          >
            <Plus className="w-4 h-4" />
          </Button>
          
          {level > 0 && canRemove && (
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

        {/* Assigned Users Display */}
        {nodeUsers.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Assignés:</span>
            <TooltipProvider>
              {nodeUsers.map((user) => (
                <Tooltip key={user.id}>
                  <TooltipTrigger asChild>
                    <div className="relative group">
                      <Avatar className="w-8 h-8 cursor-pointer">
                        {user.avatar ? (
                          <AvatarImage src={user.avatar} alt={user.name} />
                        ) : (
                          <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                        )}
                      </Avatar>
                      <button
                        onClick={() => handleRemoveUser(user.id)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{user.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
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
              onRemove={onRemove}
              canRemove={true}
              assignedUsers={assignedUsers}
              onUsersAssigned={onUsersAssigned}
            />
          ))}
        </div>
      )}

      <UserAssignmentDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onUsersSelected={(users) => onUsersAssigned(node.id, users)}
        alreadyAssignedUsers={Object.values(assignedUsers).flat()}
        currentNodeUsers={nodeUsers}
      />
    </div>
  );
};
