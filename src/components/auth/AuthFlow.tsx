
import React, { useState } from 'react';
import { OrganizationStep } from './OrganizationStep';
import { LoginStep } from './LoginStep';

export const AuthFlow: React.FC = () => {
  const [step, setStep] = useState<'organization' | 'login'>('organization');
  const [organizationId, setOrganizationId] = useState('');

  const handleOrganizationSubmit = (orgId: string) => {
    setOrganizationId(orgId);
    setStep('login');
  };

  const handleBackToOrganization = () => {
    setStep('organization');
    setOrganizationId('');
  };

  return (
    <div className="flex h-screen w-full bg-slate-50">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          {step === 'organization' ? (
            <OrganizationStep onSubmit={handleOrganizationSubmit} />
          ) : (
            <LoginStep 
              organizationId={organizationId}
              onBack={handleBackToOrganization}
            />
          )}
        </div>
      </div>
    </div>
  );
};
