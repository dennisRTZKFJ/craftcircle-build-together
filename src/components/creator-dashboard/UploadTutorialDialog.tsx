
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { Upload } from 'lucide-react';

interface UploadTutorialDialogProps {
  onClose?: () => void;
  onUpload?: () => void;
}

const UploadTutorialDialog = ({ onClose, onUpload }: UploadTutorialDialogProps) => {
  const handleUpload = () => {
    if (onUpload) {
      onUpload();
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Neues Tutorial hochladen</DialogTitle>
        <DialogDescription>
          Erstelle ein neues DIY-Tutorial für die Community.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Titel</Label>
          <Input id="title" placeholder="z.B. Minimalistisches Bücherregal bauen" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Kurzbeschreibung</Label>
          <Input id="description" placeholder="Eine kurze Beschreibung deines Tutorials..." />
        </div>
        <div className="grid gap-2">
          <Label>Titelbild</Label>
          <div className="border-2 border-dashed rounded-md p-6 text-center border-muted-foreground/25">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
            <div className="mt-2">
              <Button variant="secondary" size="sm">Bild auswählen</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">PNG, JPG or WEBP, max. 4MB</p>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={handleCancel}>Abbrechen</Button>
        <Button onClick={handleUpload}>Hochladen & Bearbeiten</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default UploadTutorialDialog;
