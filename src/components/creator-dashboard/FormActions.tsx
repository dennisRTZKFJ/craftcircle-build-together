
import React from "react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  showBack: boolean;
  showNext: boolean;
  showSubmit: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  onSaveDraft: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  showBack,
  showNext,
  showSubmit,
  onBack,
  onNext,
  onSubmit,
  onCancel,
  onSaveDraft,
}) => {
  return (
    <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-100">
      {showBack ? (
        <Button
          type="button"
          variant="outline"
          className="rounded-lg px-6 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
          onClick={onBack}
        >
          ← Back
        </Button>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="rounded-lg px-6 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
          onClick={onCancel}
        >
          Cancel
        </Button>
      )}
      
      <div className="flex gap-3">
        <Button
          type="button"
          className="border border-teal-200 bg-teal-100 text-teal-700 rounded-lg px-6 py-2 hover:bg-teal-200 font-medium"
          variant="outline"
          onClick={onSaveDraft}
        >
          Save as Draft
        </Button>
        
        {showNext && (
          <Button
            type="button"
            className="rounded-lg px-8 py-2 bg-craft-wood hover:bg-craft-dark-wood text-white font-medium flex items-center gap-2"
            onClick={onNext}
          >
            Next
            <span className="text-lg">→</span>
          </Button>
        )}
        
        {showSubmit && (
          <Button
            type="button"
            className="rounded-lg px-6 py-2 bg-craft-wood hover:bg-craft-dark-wood text-white font-medium"
            onClick={onSubmit}
          >
            Save & Publish
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormActions;
