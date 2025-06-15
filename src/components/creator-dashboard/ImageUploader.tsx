
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ImageUploaderProps {
  value?: string; // base64 or object url
  onChange: (value: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | undefined>(value);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const src = reader.result as string;
        setPreview(src);
        onChange(src);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {preview && (
        <img
          src={preview}
          alt="Instruction Step"
          className="max-w-md w-full rounded-sm object-contain border border-[#e6e1db] bg-white mb-2"
          style={{ maxHeight: 220 }}
        />
      )}
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2"
        aria-label="Upload Image"
      >
        <Plus size={18} /> {preview ? "Change Image" : "Upload Image"}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
