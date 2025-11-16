import { useState } from 'react';
import AddAnimalDialog from '../AddAnimalDialog';
import { Button } from '@/components/ui/button';

export default function AddAnimalDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>
        Abrir Dialog
      </Button>
      <AddAnimalDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={(data) => {
          console.log('Animal submitted:', data);
          setOpen(false);
        }}
      />
    </div>
  );
}
