import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import MaterialToolsStep, { MaterialToolsState } from "@/components/creator-dashboard/MaterialToolsStep";
import BasicInfoStep from "@/components/creator-dashboard/BasicInfoStep";
import InstructionsStep from "@/components/creator-dashboard/InstructionsStep";
import VideoStep from "@/components/creator-dashboard/VideoStep";

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

const UploadTutorialPage = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container max-w-4xl mx-auto py-8 px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-serif font-semibold text-gray-900">
              Upload Tutorial
            </h1>
            <Link to="/creator-dashboard">
              <Button
                variant="outline"
                className="border border-gray-300 bg-white rounded-lg text-gray-700 px-4 py-2 hover:bg-gray-50 text-sm"
              >
                Back to Creator Dashboard
              </Button>
            </Link>
          </div>
          
          {/* FORM CARD */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <div className="mb-8">
              <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">
                Create a New Tutorial
              </h2>
              
              {/* Tabs */}
              <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                {tabList.map((tab, idx) => (
                  <button
                    key={tab}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all
                      ${activeTab === idx
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                      }
                    `}
                    disabled={idx > activeTab}
                    onClick={() => setActiveTab(idx)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            <form className="space-y-0" onSubmit={handleSubmit}>
              {/* STEP 1: Basic Info */}
              {activeTab === 0 && (
                <>
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
                  
                  {/* Button Row */}
                  <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-100">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-lg px-6 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        className="border border-teal-200 bg-teal-100 text-teal-700 rounded-lg px-6 py-2 hover:bg-teal-200 font-medium"
                        variant="outline"
                      >
                        Save as Draft
                      </Button>
                      <Button
                        type="button"
                        className="rounded-lg px-8 py-2 bg-orange-400 hover:bg-orange-500 text-white font-medium flex items-center gap-2"
                        onClick={handleNext}
                      >
                        Next
                        <span className="text-lg">→</span>
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {/* STEP 2: Material & Tools */}
              {activeTab === 1 && (
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
                  onSaveDraft={() => { /* Optionally implement draft logic */ }}
                  onNext={handleNext}
                />
              )}

              {/* STEP 3: Instructions */}
              {activeTab === 2 && (
                <InstructionsStep
                  steps={instructionSteps}
                  onChange={setInstructionSteps}
                  onBack={handleBack}
                  onSaveDraft={() => {/* implement if needed */}}
                  onNext={handleNext}
                />
              )}

              {/* STEP 4: Video */}
              {activeTab === 3 && (
                <VideoStep
                  description={videoDescription}
                  videoFile={videoFile}
                  onDescriptionChange={setVideoDescription}
                  onVideoChange={setVideoFile}
                  onBack={handleBack}
                  onSaveDraft={() => {/* implement if needed */}}
                  onSubmit={handleSubmit}
                />
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UploadTutorialPage;
