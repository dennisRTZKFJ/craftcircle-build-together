
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
    <div className="min-h-screen bg-[#f8f6f1] flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container max-w-2xl py-12 flex flex-col gap-8">
          <div className="flex items-center justify-between mt-2 mb-6">
            <h1 className="font-serif text-[2.35rem] font-bold text-[#23211a] leading-tight">
              Upload Tutorial
            </h1>
            <Link to="/creator-dashboard">
              <Button
                variant="outline"
                className="border border-[#ded7cd] bg-white rounded-lg text-[#17150a] px-6 py-2 hover:bg-[#f4f3ef] shadow-none text-base font-normal"
              >
                Back to Creator Dashboard
              </Button>
            </Link>
          </div>
          {/* FORM CARD */}
          <div className="bg-white rounded-2xl border border-[#ede7df] shadow-none px-9 py-10 flex flex-col gap-0">
            {/* Tabs */}
            <div className="flex gap-3 mb-7 border-b border-[#f2ede7] pb-4 -mx-2">
              {tabList.map((tab, idx) => (
                <button
                  key={tab}
                  className={`px-7 py-2 rounded-md font-semibold text-base transition 
                    ${activeTab === idx
                      ? "bg-[#fff] text-[#23211a] border border-[#ede7df] shadow-sm"
                      : "bg-[#f6f3ec] text-[#c9baa3] border border-[#f6f3ec]"
                    }
                  `}
                  disabled={idx > activeTab}
                  onClick={() => setActiveTab(idx)}
                >
                  {tab}
                </button>
              ))}
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
                  <div className="flex justify-between pt-9 mt-8 border-t border-[#f3efe8]">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-md px-7 py-2 border border-[#e6e1db] mr-2 text-[#17150a] bg-[#fff]"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="border border-[#c4d9b5] bg-[#e9efea] text-[#417147] rounded-md px-7 py-2 hover:bg-[#e8efe9] font-semibold"
                        // onClick={} // Save as Draft handler optional
                      >
                        Save as Draft
                      </Button>
                      <Button
                        type="button"
                        className="rounded-md px-9 py-2 bg-[#c69c6d] hover:bg-[#b38951] text-white flex items-center gap-2 font-semibold"
                        onClick={handleNext}
                      >
                        Next
                        <span className="ml-1 text-lg">{String.fromCharCode(8594)}</span>
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
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UploadTutorialPage;
