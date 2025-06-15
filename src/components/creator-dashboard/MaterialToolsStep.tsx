
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
        <Label className="text-lg font-medium text-gray-900 mb-4 block">
          Materials Needed
        </Label>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="space-y-3 mb-4">
            {state.materials.map((material, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-gray-600 text-sm mt-2">-</span>
                <Input
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 2 slabs of hardwood (walnut, oak, or maple)"
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
            {state.materials.length === 0 && (
              <p className="text-gray-500 text-sm italic">No materials added yet</p>
            )}
          </div>
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
          <p className="text-sm text-gray-500 mt-2">List one material per line with quantity and specifications</p>
        </div>
      </div>

      {/* Tools Section */}
      <div>
        <Label className="text-lg font-medium text-gray-900 mb-4 block">
          Tools Required
        </Label>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="space-y-3 mb-4">
            {state.tools.map((tool, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-gray-600 text-sm mt-2">-</span>
                <Input
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Table saw or track saw"
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
            {state.tools.length === 0 && (
              <p className="text-gray-500 text-sm italic">No tools added yet</p>
            )}
          </div>
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
          <p className="text-sm text-gray-500 mt-2">List all tools needed for this project</p>
        </div>
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
