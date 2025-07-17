
import React from 'react';
import { Building } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8">
      <div className="text-center">
        <Building className="w-16 h-16 text-gray-400 mx-auto mb-6" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Aucune structure organisationnelle définie
        </h3>
        <p className="text-gray-600 mb-6 max-w-md">
          Aucune structure organisationnelle n'a encore été configurée. Cliquez sur le bouton créer pour commencer.
        </p>
      </div>
    </div>
  );
};
