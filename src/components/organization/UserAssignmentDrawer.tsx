
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Search } from 'lucide-react';

interface User {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
}

interface UserAssignmentDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUsersSelected: (users: User[]) => void;
  alreadyAssignedUsers: User[];
  currentNodeUsers: User[];
}

export const UserAssignmentDrawer: React.FC<UserAssignmentDrawerProps> = ({
  open,
  onOpenChange,
  onUsersSelected,
  alreadyAssignedUsers,
  currentNodeUsers
}) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>(
    currentNodeUsers.map(user => user.id)
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Mock user data - replace with real data
  const allUsers: User[] = [
    { id: 'RH', name: 'Ramzi Hammami', initials: 'RH', avatar: '/lovable-uploads/68b10412-6551-47cc-babc-21445f54d8a0.png' },
    { id: 'HK', name: 'Hassen Knani', initials: 'HK' },
    { id: 'SH', name: 'Sahar Hdiji', initials: 'SH' },
    { id: 'AA', name: 'Ala Akrout', initials: 'AA' },
    { id: 'AM', name: 'Ahmed ben Masoud', initials: 'AM' },
    { id: 'MN', name: 'Madiha Neifar', initials: 'MN' },
    { id: 'EK', name: 'Emma Kammoun', initials: 'EK' },
    { id: 'NC', name: 'Nour Chaaben', initials: 'NC' },
  ];

  // Filter available users (exclude already assigned to other nodes, but include current node users)
  const alreadyAssignedIds = alreadyAssignedUsers.map(user => user.id);
  const currentNodeUserIds = currentNodeUsers.map(user => user.id);
  
  const availableUsers = allUsers.filter(user => 
    !alreadyAssignedIds.includes(user.id) || currentNodeUserIds.includes(user.id)
  );

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserToggle = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleConfirm = () => {
    const selectedUserObjects = allUsers.filter(user => selectedUsers.includes(user.id));
    onUsersSelected(selectedUserObjects);
    onOpenChange(false);
  };

  const handleClose = () => {
    setSelectedUsers(currentNodeUsers.map(user => user.id));
    setSearchQuery('');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] sm:w-[600px] flex flex-col rounded-xl mt-8 mr-8 mb-8 h-[calc(100vh-64px)]">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
            <Users className="w-5 h-5" />
            Assigner des utilisateurs
          </SheetTitle>
          <p className="text-sm text-slate-600 mt-2">Choisissez les utilisateurs à assigner à ce nœud.</p>
        </SheetHeader>
        
        <div className="flex-1 flex flex-col space-y-4 py-4 min-h-0">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Rechercher</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                id="search"
                placeholder="Rechercher par nom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {/* User List - Scrollable */}
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-2">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                  <Checkbox
                    id={user.id}
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => handleUserToggle(user.id)}
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="w-8 h-8">
                      {user.avatar ? (
                        <AvatarImage src={user.avatar} alt={user.name} />
                      ) : (
                        <AvatarFallback className="text-sm">{user.initials}</AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-slate-900 truncate">{user.name}</div>
                      <div className="text-xs text-slate-600 truncate">{user.initials}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">Aucun utilisateur disponible</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        
        {/* Footer - Sticky to bottom */}
        <div className="border-t pt-4 space-y-3 mt-auto">
          <div className="text-center">
            <span className="text-sm text-slate-600">
              {selectedUsers.length} utilisateur(s) sélectionné(s)
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Annuler
            </Button>
            <Button onClick={handleConfirm} className="flex-1">
              Confirmer ({selectedUsers.length})
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
