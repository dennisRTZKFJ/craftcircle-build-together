
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

interface VideoStepProps {
  description: string;
  videoFile: File | null;
  onDescriptionChange: (description: string) => void;
  onVideoChange: (file: File | null) => void;
  onBack: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
}

const VideoStep: React.FC<VideoStepProps> = ({
  description,
  videoFile,
  onDescriptionChange,
  onVideoChange,
  onBack,
  onSaveDraft,
  onSubmit,
}) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onVideoChange(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] || null;
    if (file && file.type.startsWith('video/')) {
      onVideoChange(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-8">
      {/* Description */}
      <div>
        <Label className="text-base font-medium text-gray-900 mb-3 block">
          Description
        </Label>
        <Textarea
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe your tutorial..."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>

      {/* Upload Section */}
      <div>
        <Label className="text-base font-medium text-gray-900 mb-3 block">
          Upload
        </Label>
        
        <div
          className="relative border-2 border-dashed border-gray-200 rounded-xl p-12 text-center hover:border-gray-300 transition-colors bg-gray-50"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="video-upload"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            
            {videoFile ? (
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">{videoFile.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <>
                <Button
                  type="button"
                  className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-2 font-medium"
                  onClick={() => document.getElementById('video-upload')?.click()}
                >
                  Select Video
                </Button>
                <p className="text-sm text-gray-500">
                  MP4, max. 500MB
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-100">
        <Button
          type="button"
          variant="outline"
          className="rounded-lg px-6 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
          onClick={onBack}
        >
          ← Back
        </Button>
        <div className="flex gap-3">
          <Button
            type="button"
            className="border border-teal-200 bg-teal-100 text-teal-700 rounded-lg px-6 py-2 hover:bg-teal-200 font-medium"
            variant="outline"
            onClick={onSaveDraft}
          >
            Save as Draft
          </Button>
          <Button
            type="button"
            className="rounded-lg px-6 py-2 bg-craft-wood hover:bg-craft-dark-wood text-white font-medium"
            onClick={onSubmit}
          >
            Save & Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoStep;
