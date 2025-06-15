
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TabNavigation from "./TabNavigation";
import FormActions from "./FormActions";
import BasicInfoStep from "./BasicInfoStep";
import MaterialToolsStep, { MaterialToolsState } from "./MaterialToolsStep";
import InstructionsStep from "./InstructionsStep";
import VideoStep from "./VideoStep";
import { tutorialService } from "@/services/tutorial.service";

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

const EditTutorialWizard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState<FormState>({
    title: "",
    category: categories[0].value,
    difficulty: difficulties[0].value,
    duration: 1,
    description: "",
    availability: "free",
    price: "",
    materials: [],
    tools: [],
    recommendations: "",
    estimatedCostLow: "",
    estimatedCostHigh: "",
  });

  const [instructionSteps, setInstructionSteps] = useState([
    { title: "", description: "", tip: "", image: "" }
  ]);

  const [videoDescription, setVideoDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  useEffect(() => {
    const loadTutorial = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const tutorial = await tutorialService.getTutorial(Number(id));
        
        // Fill form with tutorial data
        setForm({
          title: tutorial.title || "",
          category: tutorial.content?.category || categories[0].value,
          difficulty: tutorial.content?.difficulty || difficulties[0].value,
          duration: tutorial.content?.duration || 1,
          description: tutorial.description || "",
          availability: tutorial.content?.availability || "free",
          price: tutorial.content?.price || "",
          materials: tutorial.materials?.map(m => m.name) || [],
          tools: tutorial.content?.tools || [],
          recommendations: tutorial.content?.recommendations || "",
          estimatedCostLow: tutorial.content?.estimatedCostLow || "",
          estimatedCostHigh: tutorial.content?.estimatedCostHigh || "",
        });

        // Fill instruction steps
        if (tutorial.content?.sections) {
          const steps = tutorial.content.sections.map(section => ({
            title: section.title,
            description: section.content,
            tip: "",
            image: section.imageUrl || ""
          }));
          setInstructionSteps(steps);
        }

        // Fill video data if available
        if (tutorial.content?.videoDescription) {
          setVideoDescription(tutorial.content.videoDescription);
        }

      } catch (error) {
        console.error("Error loading tutorial:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTutorial();
  }, [id]);

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

  const handleSubmit = async () => {
    try {
      await tutorialService.updateTutorial(Number(id), {
        title: form.title,
        description: form.description,
        // Add other form fields as needed
      });
      navigate("/creator-dashboard");
    } catch (error) {
      console.error("Error updating tutorial:", error);
    }
  };

  const handleCancel = () => {
    navigate("/creator-dashboard");
  };

  const handleSaveDraft = async () => {
    try {
      await tutorialService.updateTutorial(Number(id), {
        title: form.title,
        description: form.description,
        status: 'draft'
      });
      console.log("Tutorial saved as draft");
    } catch (error) {
      console.error("Error saving draft:", error);
    }
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

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <div className="text-center">
          <p className="text-gray-600">Tutorial wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!id) {
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
          Tutorial bearbeiten: {form.title}
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
