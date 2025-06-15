
import React from "react";
import ImageUploader from "./ImageUploader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface InstructionStep {
  title: string;
  description: string;
  tip: string;
  image: string;
}
interface InstructionsStepProps {
  steps: InstructionStep[];
  onChange: (steps: InstructionStep[]) => void;
  onBack: () => void;
  onSaveDraft: () => void;
  onNext: () => void;
}

const emptyStep: InstructionStep = {
  title: "",
  description: "",
  tip: "",
  image: "",
};

const InstructionsStep: React.FC<InstructionsStepProps> = ({
  steps,
  onChange,
  onBack,
  onSaveDraft,
  onNext,
}) => {
  const setStepField = (idx: number, field: keyof InstructionStep, value: string) => {
    const nextSteps = steps.map((step, i) =>
      i === idx ? { ...step, [field]: value } : step
    );
    onChange(nextSteps);
  };

  const handleAddStep = () => {
    onChange([...steps, { ...emptyStep }]);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-8 space-y-6"
          >
            <div>
              <Label className="text-sm font-medium text-gray-900 mb-2 block">
                Step {idx + 1}:
              </Label>
              <Input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Prepare the wood"
                type="text"
                value={step.title}
                onChange={e => setStepField(idx, "title", e.target.value)}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-900 mb-2 block">
                Description:
              </Label>
              <Textarea
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"
                placeholder="Description"
                rows={3}
                value={step.description}
                onChange={e => setStepField(idx, "description", e.target.value)}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-900 mb-2 block">
                Tip:
              </Label>
              <Input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tip"
                type="text"
                value={step.tip}
                onChange={e => setStepField(idx, "tip", e.target.value)}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-900 mb-2 block">
                Image:
              </Label>
              <ImageUploader
                value={step.image}
                onChange={img => setStepField(idx, "image", img)}
              />
            </div>
          </div>
        ))}

        {/* + Button centered */}
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            className="rounded-full border-2 border-gray-300 p-0 w-12 h-12 text-2xl flex items-center justify-center bg-white hover:bg-gray-50 text-gray-600"
            aria-label="Add Step"
            onClick={handleAddStep}
          >
            +
          </Button>
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
            className="rounded-lg px-8 py-2 bg-craft-wood hover:bg-craft-dark-wood text-white font-medium flex items-center gap-2"
            onClick={onNext}
          >
            Next
            <span className="text-lg">→</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsStep;
