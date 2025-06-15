
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TabNavigation from "./TabNavigation";
import FormActions from "./FormActions";
import BasicInfoStep from "./BasicInfoStep";
import MaterialToolsStep, { MaterialToolsState } from "./MaterialToolsStep";
import InstructionsStep from "./InstructionsStep";
import VideoStep from "./VideoStep";

const tabList = [
  "Basic Information",
  "Material & Tools",
  "Instructions",
  "Video",
];

const categories = [
  { value: "furniture-building", label: "Furniture Building" },
  { value: "storage", label: "Storage & Organisation" },
  { value: "decoration", label: "Decoration" },
  { value: "outdoor", label: "Outdoor" },
  { value: "upcycling", label: "Upcycling" },
];

const difficulties = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

type FormState = {
  title: string;
  category: string;
  difficulty: string;
  duration: number;
  description: string;
  availability: string;
  price: string;
  materials: string[];
  tools: string[];
  recommendations: string;
  estimatedCostLow: string;
  estimatedCostHigh: string;
};

const UploadWizard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    title: "Rustic Coffee Table",
    category: categories[0].value,
    difficulty: difficulties[1].value,
    duration: 6,
    description:
      "A DIY project that combines tradition with modern design. This coffee table combines the warmth of reclaimed wood with the clean lines of industrial design. The perfect piece of furniture for your living room – with history and personality.",
    availability: "free",
    price: "",
    materials: ["4–5 pieces wood boards", "4 pieces Hairpin table legs"],
    tools: ["Sander", "Drill"],
    recommendations: "",
    estimatedCostLow: "80",
    estimatedCostHigh: "120",
  });

  const [instructionSteps, setInstructionSteps] = useState([
    { title: "", description: "", tip: "", image: "" }
  ]);

  const [videoDescription, setVideoDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleBasicChange = (field: keyof FormState, value: any) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleMatToolStepChange = (stepState: MaterialToolsState) => {
    setForm((f) => ({
      ...f,
      materials: stepState.materials,
      tools: stepState.tools,
      recommendations: stepState.recommendations,
      estimatedCostLow: stepState.estimatedCostLow,
      estimatedCostHigh: stepState.estimatedCostHigh,
    }));
  };

  const handleNext = () => setActiveTab((tab) => Math.min(tab + 1, tabList.length - 1));
  const handleBack = () => setActiveTab((tab) => Math.max(tab - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/creator-dashboard/upload/success");
  };

  const handleCancel = () => {
    navigate("/creator-dashboard");
  };

  const handleSaveDraft = () => {
    // Save as draft logic
    console.log("Saving as draft...");
  };

  const renderCurrentStep = () => {
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
            onChange={handleBasicChange}
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
            onChange={handleMatToolStepChange}
            onBack={handleBack}
            onSaveDraft={handleSaveDraft}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <InstructionsStep
            steps={instructionSteps}
            onChange={setInstructionSteps}
            onBack={handleBack}
            onSaveDraft={handleSaveDraft}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <VideoStep
            description={videoDescription}
            videoFile={videoFile}
            onDescriptionChange={setVideoDescription}
            onVideoChange={setVideoFile}
            onBack={handleBack}
            onSaveDraft={handleSaveDraft}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
      <div className="mb-8">
        <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">
          Create a New Tutorial
        </h2>
        
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabList={tabList}
        />
      </div>
      
      <form className="space-y-0" onSubmit={handleSubmit}>
        {/* Render current step without actions for steps 1 & 2 */}
        {(activeTab === 1 || activeTab === 2) ? (
          renderCurrentStep()
        ) : (
          <>
            {renderCurrentStep()}
            
            <FormActions
              showBack={activeTab > 0}
              showNext={activeTab < tabList.length - 1}
              showSubmit={activeTab === tabList.length - 1}
              onBack={handleBack}
              onNext={handleNext}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              onSaveDraft={handleSaveDraft}
            />
          </>
        )}
      </form>
    </div>
  );
};

export default UploadWizard;
