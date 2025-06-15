
import { useState } from 'react';

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

export const useEditTutorialForm = () => {
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

  const initializeForm = (tutorial: any) => {
    setForm({
      title: tutorial.title || "",
      category: tutorial.content?.category || categories[0].value,
      difficulty: tutorial.content?.difficulty || difficulties[0].value,
      duration: tutorial.content?.duration || 1,
      description: tutorial.description || "",
      availability: tutorial.content?.availability || "free",
      price: tutorial.content?.price || "",
      materials: tutorial.materials?.map((m: any) => m.name) || [],
      tools: tutorial.content?.tools || [],
      recommendations: tutorial.content?.recommendations || "",
      estimatedCostLow: tutorial.content?.estimatedCostLow || "",
      estimatedCostHigh: tutorial.content?.estimatedCostHigh || "",
    });

    if (tutorial.content?.sections) {
      const steps = tutorial.content.sections.map((section: any) => ({
        title: section.title,
        description: section.content,
        tip: "",
        image: section.imageUrl || ""
      }));
      setInstructionSteps(steps);
    }

    if (tutorial.content?.videoDescription) {
      setVideoDescription(tutorial.content.videoDescription);
    }
  };

  return {
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
  };
};
