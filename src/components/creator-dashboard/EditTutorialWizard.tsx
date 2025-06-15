
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TabNavigation from "./TabNavigation";
import FormActions from "./FormActions";
import EditTutorialStepRenderer from "./EditTutorialStepRenderer";
import { LoadingState, NotFoundState } from "./EditTutorialStates";
import { useTutorialLoader } from "@/hooks/useTutorialLoader";
import { useEditTutorialForm } from "@/hooks/useEditTutorialForm";
import { tutorialService } from "@/services/tutorial.service";
import { MaterialToolsState } from "./MaterialToolsStep";

const tabList = [
  "Basic Information",
  "Material & Tools", 
  "Instructions",
  "Video",
];

const EditTutorialWizard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, tutorial } = useTutorialLoader(id);
  const {
    form,
    setForm,
    instructionSteps,
    setInstructionSteps,
    videoDescription,
    setVideoDescription,
    videoFile,
    setVideoFile,
    initializeForm,
    categories,
    difficulties
  } = useEditTutorialForm();

  useEffect(() => {
    if (tutorial) {
      initializeForm(tutorial);
    }
  }, [tutorial]);

  const handleBasicChange = (field: string, value: any) => {
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

  if (loading) return <LoadingState loading={loading} />;
  if (!id) return <NotFoundState id={id} />;

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
        {(activeTab === 1 || activeTab === 2) ? (
          <EditTutorialStepRenderer
            activeTab={activeTab}
            form={form}
            categories={categories}
            difficulties={difficulties}
            instructionSteps={instructionSteps}
            videoDescription={videoDescription}
            videoFile={videoFile}
            onBasicChange={handleBasicChange}
            onMatToolStepChange={handleMatToolStepChange}
            onInstructionStepsChange={setInstructionSteps}
            onVideoDescriptionChange={setVideoDescription}
            onVideoChange={setVideoFile}
            onBack={handleBack}
            onNext={handleNext}
            onSaveDraft={handleSaveDraft}
            onSubmit={handleSubmit}
          />
        ) : (
          <>
            <EditTutorialStepRenderer
              activeTab={activeTab}
              form={form}
              categories={categories}
              difficulties={difficulties}
              instructionSteps={instructionSteps}
              videoDescription={videoDescription}
              videoFile={videoFile}
              onBasicChange={handleBasicChange}
              onMatToolStepChange={handleMatToolStepChange}
              onInstructionStepsChange={setInstructionSteps}
              onVideoDescriptionChange={setVideoDescription}
              onVideoChange={setVideoFile}
              onBack={handleBack}
              onNext={handleNext}
              onSaveDraft={handleSaveDraft}
              onSubmit={handleSubmit}
            />
            
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
