
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface PointageDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: string;
  onAddPointage: (time: string, type: 'entry' | 'exit') => void;
}

export const PointageDrawer: React.FC<PointageDrawerProps> = ({
  open,
  onOpenChange,
  selectedDate,
  onAddPointage
}) => {
  const [time, setTime] = useState('');
  const [type, setType] = useState<'entry' | 'exit'>('entry');

  const handleSubmit = () => {
    if (time) {
      onAddPointage(time, type);
      setTime('');
      setType('entry');
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setTime('');
    setType('entry');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[450px] sm:w-[550px] flex flex-col rounded-l-3xl pt-8 pr-8 pb-8">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">
              Ajouter un pointage - {selectedDate}
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        
        <div className="flex-1 flex flex-col space-y-6 py-6">
          <div className="space-y-2">
            <Label htmlFor="time">Heure</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Sélectionner l'heure"
            />
          </div>
          
          <div className="space-y-3">
            <Label>Type de pointage</Label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  value="entry"
                  checked={type === 'entry'}
                  onChange={(e) => setType(e.target.value as 'entry' | 'exit')}
                  className="w-4 h-4 text-slate-900"
                />
                <span className="font-medium text-slate-900">Entrée</span>
              </label>
              <label className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  value="exit"
                  checked={type === 'exit'}
                  onChange={(e) => setType(e.target.value as 'entry' | 'exit')}
                  className="w-4 h-4 text-slate-900"
                />
                <span className="font-medium text-slate-900">Sortie</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4 space-y-3">
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Annuler
            </Button>
            <Button onClick={handleSubmit} disabled={!time} className="flex-1">
              Ajouter le pointage
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
