
import React from "react";
import BasicInfoStep from "./BasicInfoStep";
import MaterialToolsStep, { MaterialToolsState } from "./MaterialToolsStep";
import InstructionsStep from "./InstructionsStep";
import VideoStep from "./VideoStep";

interface StepRendererProps {
  activeTab: number;
  form: any;
  categories: Array<{ value: string; label: string }>;
  difficulties: Array<{ value: string; label: string }>;
  instructionSteps: any[];
  videoDescription: string;
  videoFile: File | null;
  onBasicChange: (field: string, value: any) => void;
  onMatToolStepChange: (stepState: MaterialToolsState) => void;
  onInstructionStepsChange: (steps: any[]) => void;
  onVideoDescriptionChange: (description: string) => void;
  onVideoChange: (file: File | null) => void;
  onBack: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
}

const EditTutorialStepRenderer: React.FC<StepRendererProps> = ({
  activeTab,
  form,
  categories,
  difficulties,
  instructionSteps,
  videoDescription,
  videoFile,
  onBasicChange,
  onMatToolStepChange,
  onInstructionStepsChange,
  onVideoDescriptionChange,
  onVideoChange,
  onBack,
  onNext,
  onSaveDraft,
  onSubmit,
}) => {
  switch (activeTab) {
    case 0:
      return (
        <BasicInfoStep
          form={{
            title: form.title,
            category: form.category,
            difficulty: form.difficulty,
            duration: form.duration,
            description: form.description,
            availability: form.availability,
            price: form.price,
          }}
          categories={categories}
          difficulties={difficulties}
          onChange={onBasicChange}
        />
      );
    case 1:
      return (
        <MaterialToolsStep
          state={{
            materials: form.materials,
            tools: form.tools,
            recommendations: form.recommendations,
            estimatedCostLow: form.estimatedCostLow,
            estimatedCostHigh: form.estimatedCostHigh,
          }}
          onChange={onMatToolStepChange}
          onBack={onBack}
          onSaveDraft={onSaveDraft}
          onNext={onNext}
        />
      );
    case 2:
      return (
        <InstructionsStep
          steps={instructionSteps}
          onChange={onInstructionStepsChange}
          onBack={onBack}
          onSaveDraft={onSaveDraft}
          onNext={onNext}
        />
      );
    case 3:
      return (
        <VideoStep
          description={videoDescription}
          videoFile={videoFile}
          onDescriptionChange={onVideoDescriptionChange}
          onVideoChange={onVideoChange}
          onBack={onBack}
          onSaveDraft={onSaveDraft}
          onSubmit={onSubmit}
        />
      );
    default:
      return null;
  }
};

export default EditTutorialStepRenderer;
