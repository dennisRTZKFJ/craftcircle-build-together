
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus } from "lucide-react";

export interface MaterialToolsState {
  materials: string[];
  tools: string[];
  recommendations: string;
  estimatedCostLow: string;
  estimatedCostHigh: string;
}

interface MaterialToolsStepProps {
  state: MaterialToolsState;
  onChange: (state: MaterialToolsState) => void;
  onBack: () => void;
  onSaveDraft: () => void;
  onNext: () => void;
}

const MaterialToolsStep: React.FC<MaterialToolsStepProps> = ({
  state,
  onChange,
  onBack,
  onSaveDraft,
  onNext,
}) => {
  const updateState = (field: keyof MaterialToolsState, value: any) => {
    onChange({ ...state, [field]: value });
  };

  const addMaterial = () => {
    updateState("materials", [...state.materials, ""]);
  };

  const removeMaterial = (index: number) => {
    const newMaterials = state.materials.filter((_, i) => i !== index);
    updateState("materials", newMaterials);
  };

  const updateMaterial = (index: number, value: string) => {
    const newMaterials = [...state.materials];
    newMaterials[index] = value;
    updateState("materials", newMaterials);
  };

  const addTool = () => {
    updateState("tools", [...state.tools, ""]);
  };

  const removeTool = (index: number) => {
    const newTools = state.tools.filter((_, i) => i !== index);
    updateState("tools", newTools);
  };

  const updateTool = (index: number, value: string) => {
    const newTools = [...state.tools];
    newTools[index] = value;
    updateState("tools", newTools);
  };

  return (
    <div className="space-y-8">
      {/* Materials Section */}
      <div>
        <Label className="text-base font-medium text-gray-900 mb-3 block">
          Materials
        </Label>
        <div className="space-y-3">
          {state.materials.map((material, index) => (
            <div key={index} className="flex gap-2">
              <Input
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. 4–5 pieces wood boards"
                value={material}
                onChange={(e) => updateMaterial(index, e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="px-3 border border-gray-200 hover:bg-gray-50"
                onClick={() => removeMaterial(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
            onClick={addMaterial}
          >
            <Plus className="h-4 w-4" />
            Add Material
          </Button>
        </div>
      </div>

      {/* Tools Section */}
      <div>
        <Label className="text-base font-medium text-gray-900 mb-3 block">
          Tools
        </Label>
        <div className="space-y-3">
          {state.tools.map((tool, index) => (
            <div key={index} className="flex gap-2">
              <Input
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Sander"
                value={tool}
                onChange={(e) => updateTool(index, e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="px-3 border border-gray-200 hover:bg-gray-50"
                onClick={() => removeTool(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
            onClick={addTool}
          >
            <Plus className="h-4 w-4" />
            Add Tool
          </Button>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <Label className="text-base font-medium text-gray-900 mb-3 block">
          Recommendations
        </Label>
        <Textarea
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add any recommendations for materials or tools..."
          value={state.recommendations}
          onChange={(e) => updateState("recommendations", e.target.value)}
        />
      </div>

      {/* Estimated Cost */}
      <div>
        <Label className="text-base font-medium text-gray-900 mb-3 block">
          Estimated Cost
        </Label>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">$</span>
            <Input
              className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="80"
              value={state.estimatedCostLow}
              onChange={(e) => updateState("estimatedCostLow", e.target.value)}
            />
          </div>
          <span className="text-sm text-gray-400">to</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">$</span>
            <Input
              className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="120"
              value={state.estimatedCostHigh}
              onChange={(e) => updateState("estimatedCostHigh", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-100">
        <Button
          type="button"
          variant="outline"
          className="rounded-lg px-6 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
          onClick={onBack}
        >
          ← Back
        </Button>
        <div className="flex gap-3">
          <Button
            type="button"
            className="border border-teal-200 bg-teal-100 text-teal-700 rounded-lg px-6 py-2 hover:bg-teal-200 font-medium"
            variant="outline"
            onClick={onSaveDraft}
          >
            Save as Draft
          </Button>
          <Button
            type="button"
            className="rounded-lg px-8 py-2 bg-craft-wood hover:bg-craft-dark-wood text-white font-medium flex items-center gap-2"
            onClick={onNext}
          >
            Next
            <span className="text-lg">→</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MaterialToolsStep;
