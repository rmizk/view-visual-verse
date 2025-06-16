
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Check, Wifi, Cable, Server, Cloud, TestTube2 } from 'lucide-react';

interface AddPointeuseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  inline?: boolean;
}

const AddPointeuseForm: React.FC<AddPointeuseFormProps> = ({ isOpen, onClose, onSubmit, inline = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Informations générales
    nom: '',
    marque: '',
    reference: '',
    description: '',
    
    // Step 2: Paramètres de connexion
    typeConnexion: '',
    adresseIP: '',
    port: '',
    protocole: '',
    
    // Step 3: Localisation & affectation
    localisation: '',
    departements: [] as string[],
    syncAuto: true
  });

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.nom !== '';
    }
    if (currentStep === 2) {
      return formData.typeConnexion !== '';
    }
    if (currentStep === 3) {
      return formData.localisation !== '';
    }
    return true;
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const FormContent = () => (
    <div className="space-y-8">
      {/* Steps indicator */}
      <div className="flex items-center justify-center space-x-2 mb-8">
        {[1, 2, 3].map((step, index) => (
          <React.Fragment key={step}>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-medium transition-colors ${
              step === currentStep 
                ? 'border-slate-900 bg-slate-900 text-white' 
                : step < currentStep 
                  ? 'border-green-500 bg-green-500 text-white' 
                  : 'border-slate-300 bg-white text-slate-500'
            }`}>
              {step < currentStep ? <Check className="w-5 h-5" /> : step}
            </div>
            {index < 2 && (
              <div className={`w-12 h-0.5 ${
                step < currentStep ? 'bg-green-500' : 'bg-slate-300'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step content */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-900">Informations générales</h3>
            <p className="text-sm text-slate-600 mt-2">Renseignez les informations de base de la pointeuse</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom de la pointeuse *</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                placeholder="Ex: Pointeuse Entrée Principale"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="marque">Marque</Label>
              <Select value={formData.marque} onValueChange={(value) => setFormData({ ...formData, marque: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une marque" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zkteco">ZKTeco</SelectItem>
                  <SelectItem value="anviz">Anviz</SelectItem>
                  <SelectItem value="hikvision">Hikvision</SelectItem>
                  <SelectItem value="suprema">Suprema</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reference">Référence ou modèle</Label>
            <Input
              id="reference"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              placeholder="Ex: ZK-F18"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description optionnelle de la pointeuse..."
              rows={3}
            />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-900">Paramètres de connexion</h3>
            <p className="text-sm text-slate-600 mt-2">Configurez la connexion à la pointeuse</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="typeConnexion">Type de connexion *</Label>
              <Select value={formData.typeConnexion} onValueChange={(value) => setFormData({ ...formData, typeConnexion: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type de connexion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tcpip">
                    <div className="flex items-center gap-2">
                      <Cable className="w-4 h-4" />
                      TCP/IP
                    </div>
                  </SelectItem>
                  <SelectItem value="wifi">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4" />
                      Wi-Fi
                    </div>
                  </SelectItem>
                  <SelectItem value="serie">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      Port série
                    </div>
                  </SelectItem>
                  <SelectItem value="cloud">
                    <div className="flex items-center gap-2">
                      <Cloud className="w-4 h-4" />
                      API Cloud
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {(formData.typeConnexion === 'tcpip' || formData.typeConnexion === 'wifi') && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adresseIP">Adresse IP / Nom d'hôte *</Label>
                  <Input
                    id="adresseIP"
                    value={formData.adresseIP}
                    onChange={(e) => setFormData({ ...formData, adresseIP: e.target.value })}
                    placeholder="192.168.1.100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">Port</Label>
                  <Input
                    id="port"
                    value={formData.port}
                    onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                    placeholder="4370"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="protocole">Protocole de communication</Label>
              <Select value={formData.protocole} onValueChange={(value) => setFormData({ ...formData, protocole: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le protocole" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zkteco">ZKTeco</SelectItem>
                  <SelectItem value="anviz">Anviz</SelectItem>
                  <SelectItem value="biotime">BioTime</SelectItem>
                  <SelectItem value="api_generique">API Générique</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-4">
              <Button variant="outline" className="w-full">
                <TestTube2 className="w-4 h-4 mr-2" />
                Tester la connexion
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-900">Localisation & configuration</h3>
            <p className="text-sm text-slate-600 mt-2">Définissez l'emplacement et les options de synchronisation</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="localisation">Site / Localisation physique *</Label>
              <Select value={formData.localisation} onValueChange={(value) => setFormData({ ...formData, localisation: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la localisation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hall_entree">Hall d'entrée</SelectItem>
                  <SelectItem value="etage_2">Étage 2 - Bureau</SelectItem>
                  <SelectItem value="cafeteria">Cafétéria</SelectItem>
                  <SelectItem value="parking">Parking</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label>Affectation aux départements (optionnel)</Label>
              <div className="grid grid-cols-2 gap-3">
                {['RH', 'IT', 'Comptabilité', 'Marketing', 'Ventes', 'Production'].map((dept) => (
                  <div key={dept} className="flex items-center space-x-2">
                    <Checkbox
                      id={dept}
                      checked={formData.departements.includes(dept)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({ ...formData, departements: [...formData.departements, dept] });
                        } else {
                          setFormData({ ...formData, departements: formData.departements.filter(d => d !== dept) });
                        }
                      }}
                    />
                    <Label htmlFor={dept} className="text-sm font-normal cursor-pointer">{dept}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="syncAuto"
                  checked={formData.syncAuto}
                  onCheckedChange={(checked) => setFormData({ ...formData, syncAuto: !!checked })}
                />
                <Label htmlFor="syncAuto" className="cursor-pointer">
                  Synchronisation automatique des données
                </Label>
              </div>
              <p className="text-xs text-slate-500 mt-1 ml-6">
                Les données de pointage seront synchronisées automatiquement toutes les 15 minutes
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-8 border-t">
        <Button
          variant="outline"
          onClick={currentStep === 1 ? onClose : () => setCurrentStep(currentStep - 1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {currentStep === 1 ? 'Annuler' : 'Précédent'}
        </Button>
        
        {currentStep < 3 ? (
          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!canProceed()}
          >
            Suivant
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            <Check className="w-4 h-4 mr-2" />
            Enregistrer et connecter
          </Button>
        )}
      </div>
    </div>
  );

  if (inline) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Ajouter une nouvelle pointeuse</CardTitle>
        </CardHeader>
        <CardContent>
          <FormContent />
        </CardContent>
      </Card>
    );
  }

  return null; // Remove modal functionality completely
};

export default AddPointeuseForm;
