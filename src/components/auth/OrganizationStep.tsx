
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrganizationStepProps {
  onSubmit: (organizationId: string) => void;
}

export const OrganizationStep: React.FC<OrganizationStepProps> = ({ onSubmit }) => {
  const [organizationId, setOrganizationId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationId.trim()) {
      setError('Organization ID is required');
      return;
    }
    setError('');
    onSubmit(organizationId.trim());
  };

  return (
    <Card className="bg-white shadow-sm border border-slate-200">
      <CardHeader className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 7L12 2L21 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-slate-950">Welcome to Plateforme</CardTitle>
        <p className="text-slate-600">Enter your organization ID to continue</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="organizationId" className="text-sm font-medium text-slate-700">
              Organization ID
            </label>
            <Input
              id="organizationId"
              type="text"
              placeholder="e.g., 123456"
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              className={error ? 'border-red-500' : ''}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
          <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800">
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
