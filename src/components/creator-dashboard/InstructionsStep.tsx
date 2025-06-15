
import React from "react";
import ImageUploader from "./ImageUploader";
import { Button } from "@/components/ui/button";

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
  // Handler for step changes
  const setStepField = (idx: number, field: keyof InstructionStep, value: string) => {
    const nextSteps = steps.map((step, i) =>
      i === idx ? { ...step, [field]: value } : step
    );
    onChange(nextSteps);
  };

  // Handler for "+" (Add Step)
  const handleAddStep = () => {
    onChange([...steps, { ...emptyStep }]);
  };

  // Layout styles to match reference
  return (
    <div className="space-y-8">
      <div className="bg-[#fcfbf8] border border-[#ede7df] rounded p-6 space-y-7">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="border border-[#ede7df] rounded bg-white px-6 py-6 mb-4"
          >
            <div className="mb-2">
              <label className="block font-medium text-[#948268] mb-1">{`Step ${idx + 1}:`}</label>
              <input
                className="w-full bg-[#FAF9F5] border-[#ede7df] rounded px-2 py-1"
                placeholder={`e.g. Prepare the wood`}
                type="text"
                value={step.title}
                onChange={e => setStepField(idx, "title", e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block font-medium text-[#948268] mb-1">Description:</label>
              <input
                className="w-full bg-[#FAF9F5] border-[#ede7df] rounded px-2 py-1"
                placeholder="Description"
                type="text"
                value={step.description}
                onChange={e => setStepField(idx, "description", e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block font-medium text-[#948268] mb-1">Tip:</label>
              <input
                className="w-full bg-[#FAF9F5] border-[#ede7df] rounded px-2 py-1"
                placeholder="Tip"
                type="text"
                value={step.tip}
                onChange={e => setStepField(idx, "tip", e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block font-medium text-[#948268] mb-1">Image:</label>
              <ImageUploader
                value={step.image}
                onChange={img => setStepField(idx, "image", img)}
              />
            </div>
          </div>
        ))}

        {/* + Button mittig */}
        <div className="flex justify-center mt-2">
          <Button
            type="button"
            variant="outline"
            className="rounded-full border p-0 w-9 h-9 text-xl flex items-center justify-center bg-white"
            aria-label="Add Step"
            onClick={handleAddStep}
          >
            +
          </Button>
        </div>
      </div>
      {/* Bottom bar mit Back, Save as Draft, Next */}
      <div className="flex justify-between mt-4">
        <Button
          type="button"
          variant="outline"
          className="border border-[#e3e0da] rounded-md text-[#23211a] px-6 py-2 hover:bg-[#f4f3ef]"
          onClick={onBack}
        >
          ← Back
        </Button>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="border border-[#c4d9b5] bg-[#e9efea] text-[#417147] rounded-md px-6 py-2 hover:bg-[#e8efe9]"
            onClick={onSaveDraft}
          >
            Save as Draft
          </Button>
          <Button
            type="button"
            className="rounded-md px-8 py-2 bg-[#c69c6d] hover:bg-[#b38951] text-white flex items-center gap-2"
            onClick={onNext}
          >
            Next <span className="ml-1 text-lg">{String.fromCharCode(8594)}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsStep;

