
import React, { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
} from '@/components/ui/drawer';
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

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[400px]">
        <DrawerHeader className="text-left">
          <div className="flex items-center justify-between">
            <DrawerTitle>Ajouter un pointage - {selectedDate}</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        
        <div className="px-4 space-y-4">
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
          
          <div className="space-y-2">
            <Label>Type de pointage</Label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="entry"
                  checked={type === 'entry'}
                  onChange={(e) => setType(e.target.value as 'entry' | 'exit')}
                />
                <span>Entrée</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="exit"
                  checked={type === 'exit'}
                  onChange={(e) => setType(e.target.value as 'entry' | 'exit')}
                />
                <span>Sortie</span>
              </label>
            </div>
          </div>
        </div>
        
        <DrawerFooter>
          <div className="flex gap-2">
            <Button onClick={handleSubmit} className="flex-1">
              Ajouter le pointage
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Annuler
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
