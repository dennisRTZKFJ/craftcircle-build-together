
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import MaterialToolsStep, { MaterialToolsState } from "@/components/creator-dashboard/MaterialToolsStep";
import BasicInfoStep from "@/components/creator-dashboard/BasicInfoStep";
import InstructionsStep from "@/components/creator-dashboard/InstructionsStep";

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
  // Step 2 state
  materials: string[];
  tools: string[];
  recommendations: string;
  estimatedCostLow: string;
  estimatedCostHigh: string;
};

const UploadTutorialPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  // Extended initial state for both steps (with samples for demo)
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

  const handleBasicChange = (field: keyof FormState, value: any) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  // Handlers for MaterialToolsStep
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

  // Navigation
  const handleNext = () => setActiveTab((tab) => Math.min(tab + 1, tabList.length - 1));
  const handleBack = () => setActiveTab((tab) => Math.max(tab - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/creator-dashboard/upload/success");
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container max-w-3xl py-10 flex flex-col gap-6">
          <div className="flex items-center justify-between mt-2 mb-4">
            <h1 className="font-serif text-3xl font-bold text-[#23211a]">
              Upload Tutorial
            </h1>
            <Link to="/creator-dashboard">
              <Button
                variant="outline"
                className="border border-[#ded7cd] bg-white rounded-lg text-[#17150a] px-5 py-2 hover:bg-[#f4f3ef]"
              >
                Back to Creator Dashboard
              </Button>
            </Link>
          </div>
          <Card className="rounded-xl border-[#ede7df] shadow-xs">
            <CardHeader className="pb-1">
              <CardTitle className="text-xl font-semibold font-serif">
                Create a New Tutorial
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Tab Navigation */}
              <div className="flex gap-2 mb-6">
                {tabList.map((tab, idx) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 rounded font-medium text-sm transition
                      ${activeTab === idx
                        ? "bg-[#f5f3ef] text-[#524832]"
                        : "bg-[#f7f5f2] text-[#bbb4ab]"
                      }
                      ${idx === 0 ? "ml-0" : ""}
                    `}
                    disabled={idx > activeTab}
                    onClick={() => setActiveTab(idx)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                    <div className="flex justify-end mt-7">
                      <Button
                        type="button"
                        className="rounded-md px-7 py-2 bg-[#c69c6d] hover:bg-[#b38951] text-white flex items-center gap-2"
                        onClick={handleNext}
                      >
                        Next <span className="ml-1 text-lg">{String.fromCharCode(8594)}</span>
                      </Button>
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

                {/* Add Video step as needed */}
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UploadTutorialPage;
