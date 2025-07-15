
import React from 'react';
import { Building, Users, User } from 'lucide-react';

interface OrganizationNode {
  id: string;
  name: string;
  type: 'department' | 'team' | 'position';
  children: OrganizationNode[];
}

interface OrganigramViewProps {
  nodes: OrganizationNode[];
}

export const OrganigramView: React.FC<OrganigramViewProps> = ({ nodes }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'department': return <Building className="w-4 h-4" />;
      case 'team': return <Users className="w-4 h-4" />;
      case 'position': return <User className="w-4 h-4" />;
      default: return <Building className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'department': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'team': return 'bg-green-100 text-green-800 border-green-200';
      case 'position': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderNode = (node: OrganizationNode, level: number = 0) => {
    return (
      <div key={node.id} className="flex flex-col items-center">
        <div className={`
          flex items-center gap-2 px-4 py-2 rounded-lg border-2 shadow-sm
          ${getTypeColor(node.type)}
          ${level === 0 ? 'text-lg font-semibold' : 'text-sm'}
        `}>
          {getTypeIcon(node.type)}
          <span>{node.name}</span>
        </div>
        
        {node.children.length > 0 && (
          <div className="mt-4">
            <div className="w-px h-4 bg-gray-300 mx-auto"></div>
            <div className="flex justify-center gap-8">
              {node.children.map((child, index) => (
                <div key={child.id} className="relative">
                  {index > 0 && (
                    <div className="absolute top-0 left-0 w-full h-px bg-gray-300 -translate-y-4"></div>
                  )}
                  {renderNode(child, level + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <Building className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>Aucun nœud défini</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 rounded-lg min-h-[400px] overflow-auto">
      <div className="space-y-8">
        {nodes.map(node => renderNode(node))}
      </div>
    </div>
  );
};
