
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UploadTutorialDialogProps {
  onClose?: () => void;
  onUpload?: () => void;
}

const UploadTutorialDialog = ({ onClose, onUpload }: UploadTutorialDialogProps) => {
  const navigate = useNavigate();

  const handleUpload = () => {
    if (onUpload) {
      onUpload();
    } else {
      // Direct navigation as fallback if no callback provided
      navigate('/creator-dashboard/upload');
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
        <DialogTitle>Upload New Tutorial</DialogTitle>
        <DialogDescription>
          Create a new DIY tutorial for the community.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="e.g. Minimalist Bookshelf Build" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Short Description</Label>
          <Input id="description" placeholder="A short description of your tutorial..." />
        </div>
        <div className="grid gap-2">
          <Label>Thumbnail Image</Label>
          <div className="border-2 border-dashed rounded-md p-6 text-center border-muted-foreground/25">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
            <div className="mt-2">
              <Button variant="secondary" size="sm">Choose Image</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">PNG, JPG or WEBP, max. 4MB</p>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleUpload}>Upload & Edit</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default UploadTutorialDialog;
