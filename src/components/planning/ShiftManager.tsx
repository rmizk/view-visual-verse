
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Plus, Trash2 } from 'lucide-react';

interface Shift {
  id: string;
  name: string;
  time: string;
  assignments: { [key: string]: string[] };
}

interface ShiftManagerProps {
  shifts: Shift[];
  onAddShift: (shift: Omit<Shift, 'id' | 'assignments'>) => void;
  onRemoveShift: (shiftId: string) => void;
}

export const ShiftManager: React.FC<ShiftManagerProps> = ({
  shifts,
  onAddShift,
  onRemoveShift
}) => {
  const [isAddingShift, setIsAddingShift] = useState(false);
  const [newShiftName, setNewShiftName] = useState('');
  const [newShiftTime, setNewShiftTime] = useState('');

  const handleAddShift = () => {
    if (newShiftName.trim() && newShiftTime.trim()) {
      onAddShift({
        name: newShiftName.trim(),
        time: newShiftTime.trim()
      });
      setNewShiftName('');
      setNewShiftTime('');
      setIsAddingShift(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Sheet open={isAddingShift} onOpenChange={setIsAddingShift}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Ajouter un shift
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Ajouter un nouveau shift</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shift-name">Nom du shift</Label>
              <Input
                id="shift-name"
                value={newShiftName}
                onChange={(e) => setNewShiftName(e.target.value)}
                placeholder="Ex: Shift du matin"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shift-time">Horaires</Label>
              <Input
                id="shift-time"
                value={newShiftTime}
                onChange={(e) => setNewShiftTime(e.target.value)}
                placeholder="Ex: 8:00 - 14:00"
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button onClick={handleAddShift} disabled={!newShiftName.trim() || !newShiftTime.trim()}>
                Ajouter
              </Button>
              <Button variant="outline" onClick={() => setIsAddingShift(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

interface RemoveShiftButtonProps {
  shift: Shift;
  onRemove: (shiftId: string) => void;
}

export const RemoveShiftButton: React.FC<RemoveShiftButtonProps> = ({ shift, onRemove }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer le shift</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer le shift "{shift.name}" ? 
            Cette action est irréversible et supprimera toutes les assignations associées.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => onRemove(shift.id)}
            className="bg-red-600 hover:bg-red-700"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
