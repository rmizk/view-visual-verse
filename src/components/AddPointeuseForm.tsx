import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
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
    
    // Step 4: Configuration finale
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
    onClose();
  };

  const FormContent = () => (
    <div className="space-y-6">
      {/* Steps indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === currentStep 
                ? 'bg-slate-900 text-white' 
                : step < currentStep 
                  ? 'bg-green-500 text-white' 
                  : 'bg-slate-200 text-slate-600'
            }`}>
              {step < currentStep ? <Check className="w-4 h-4" /> : step}
            </div>
            {step < 4 && (
              <div className={`w-16 h-0.5 mx-2 ${
                step < currentStep ? 'bg-green-500' : 'bg-slate-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Informations générales</h3>
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
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Paramètres de connexion</h3>
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
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Localisation & affectation</h3>
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
          
          <div className="space-y-2">
            <Label>Affectation aux départements (optionnel)</Label>
            <div className="grid grid-cols-2 gap-2">
              {['RH', 'IT', 'Comptabilité', 'Marketing', 'Ventes', 'Production'].map((dept) => (
                <label key={dept} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.departements.includes(dept)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, departements: [...formData.departements, dept] });
                      } else {
                        setFormData({ ...formData, departements: formData.departements.filter(d => d !== dept) });
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm">{dept}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Confirmation</h3>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Résumé de la configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="font-medium">Nom:</span> {formData.nom}
              </div>
              {formData.marque && (
                <div>
                  <span className="font-medium">Marque:</span> {formData.marque}
                </div>
              )}
              {formData.reference && (
                <div>
                  <span className="font-medium">Référence:</span> {formData.reference}
                </div>
              )}
              <div>
                <span className="font-medium">Type de connexion:</span> {formData.typeConnexion}
              </div>
              {formData.adresseIP && (
                <div>
                  <span className="font-medium">Adresse IP:</span> {formData.adresseIP}
                </div>
              )}
              <div>
                <span className="font-medium">Localisation:</span> {formData.localisation}
              </div>
              {formData.departements.length > 0 && (
                <div>
                  <span className="font-medium">Départements:</span> {formData.departements.join(', ')}
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="syncAuto"
              checked={formData.syncAuto}
              onCheckedChange={(checked) => setFormData({ ...formData, syncAuto: checked })}
            />
            <Label htmlFor="syncAuto">Synchronisation automatique des données</Label>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={currentStep === 1 ? onClose : () => setCurrentStep(currentStep - 1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {currentStep === 1 ? 'Annuler' : 'Précédent'}
        </Button>
        
        {currentStep < 4 ? (
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle pointeuse</DialogTitle>
        </DialogHeader>
        <FormContent />
      </DialogContent>
    </Dialog>
  );
};

export default AddPointeuseForm;
