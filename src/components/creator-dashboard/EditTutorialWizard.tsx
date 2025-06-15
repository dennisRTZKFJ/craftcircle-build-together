
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

// Mock tutorial data - in a real app, this would come from an API
const mockTutorials = [
  {
    id: 1,
    title: "Rustic Coffee Table",
    category: "furniture-building",
    difficulty: "intermediate",
    duration: 6,
    description: "A DIY project that combines tradition with modern design. This coffee table combines the warmth of reclaimed wood with the clean lines of industrial design.",
    availability: "free",
    price: "",
    materials: ["4–5 pieces wood boards", "4 pieces Hairpin table legs", "Wood screws", "Wood glue"],
    tools: ["Sander", "Drill", "Measuring tape", "Clamps"],
    recommendations: "Make sure to pre-drill holes to prevent wood splitting. Use wood conditioner before staining for even color.",
    estimatedCostLow: "80",
    estimatedCostHigh: "120",
  },
  {
    id: 2,
    title: "Wall Shelves with Invisible Mounts",
    category: "decoration",
    difficulty: "beginner",
    duration: 2,
    description: "Modern floating shelves that appear to have no visible brackets for a clean, minimalist look.",
    availability: "free",
    price: "",
    materials: ["Wooden shelf boards", "Hidden brackets", "Wall anchors"],
    tools: ["Level", "Drill", "Screwdriver"],
    recommendations: "Always use appropriate wall anchors for your wall type.",
    estimatedCostLow: "25",
    estimatedCostHigh: "45",
  },
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

const EditTutorialWizard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  // Find the tutorial to edit
  const tutorialToEdit = mockTutorials.find(t => t.id === Number(id));
  
  const [form, setForm] = useState<FormState>({
    title: tutorialToEdit?.title || "",
    category: tutorialToEdit?.category || categories[0].value,
    difficulty: tutorialToEdit?.difficulty || difficulties[0].value,
    duration: tutorialToEdit?.duration || 1,
    description: tutorialToEdit?.description || "",
    availability: tutorialToEdit?.availability || "free",
    price: tutorialToEdit?.price || "",
    materials: tutorialToEdit?.materials || [],
    tools: tutorialToEdit?.tools || [],
    recommendations: tutorialToEdit?.recommendations || "",
    estimatedCostLow: tutorialToEdit?.estimatedCostLow || "",
    estimatedCostHigh: tutorialToEdit?.estimatedCostHigh || "",
  });

  const [instructionSteps, setInstructionSteps] = useState([
    { title: "Prepare the wood", description: "Clean and sand the wood boards to prepare them for assembly.", tip: "Use 120-grit sandpaper for best results", image: "" },
    { title: "Attach the legs", description: "Secure the hairpin legs to the underside of the table using the provided screws.", tip: "Pre-drill holes to prevent splitting", image: "" }
  ]);

  const [videoDescription, setVideoDescription] = useState("Complete step-by-step video guide for building this rustic coffee table.");
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

  const handleSubmit = () => {
    console.log("Updating tutorial:", form);
    navigate("/creator-dashboard");
  };

  const handleCancel = () => {
    navigate("/creator-dashboard");
  };

  const handleSaveDraft = () => {
    console.log("Saving tutorial as draft...");
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

  if (!tutorialToEdit) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <div className="text-center">
          <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">
            Tutorial nicht gefunden
          </h2>
          <p className="text-gray-600 mb-6">Das angeforderte Tutorial konnte nicht gefunden werden.</p>
          <button
            onClick={() => navigate("/creator-dashboard")}
            className="bg-craft-wood hover:bg-craft-dark-wood text-white px-6 py-2 rounded-lg"
          >
            Zurück zum Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
      <div className="mb-8">
        <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">
          Tutorial bearbeiten: {tutorialToEdit.title}
        </h2>
        
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabList={tabList}
        />
      </div>
      
      <div className="space-y-0">
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
      </div>
    </div>
  );
};

export default EditTutorialWizard;
