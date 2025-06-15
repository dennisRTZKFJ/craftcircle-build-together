
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type MaterialToolsState = {
  materials: string[];
  tools: string[];
  recommendations: string;
  estimatedCostLow: string;
  estimatedCostHigh: string;
};

type Props = {
  state: MaterialToolsState;
  onChange: (newState: MaterialToolsState) => void;
  onBack: () => void;
  onSaveDraft: () => void;
  onNext: () => void;
};

const MaterialToolsStep: React.FC<Props> = ({
  state,
  onChange,
  onBack,
  onSaveDraft,
  onNext,
}) => {
  function updateMaterials(index: number, value: string) {
    const updated = [...state.materials];
    updated[index] = value;
    onChange({ ...state, materials: updated });
  }
  function addMaterial() {
    onChange({ ...state, materials: [...state.materials, ""] });
  }
  function updateTools(index: number, value: string) {
    const updated = [...state.tools];
    updated[index] = value;
    onChange({ ...state, tools: updated });
  }
  function addTool() {
    onChange({ ...state, tools: [...state.tools, ""] });
  }

  return (
    <div className="space-y-6">
      {/* --- Materials --- */}
      <div>
        <label className="block font-semibold mb-1 text-[#23211a]">Material Description</label>
        <div className="flex flex-col gap-2">
          {state.materials.map((mat, i) => (
            <Input
              key={i}
              type="text"
              value={mat}
              className="bg-[#FAF9F5]"
              onChange={(e) => updateMaterials(i, e.target.value)}
              placeholder={`e.g. 4-5 pieces wood boards`}
            />
          ))}
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="w-9 p-0 rounded border border-[#ede7df] bg-white text-[#23211a] hover:bg-[#f4f3ef] self-start"
            onClick={addMaterial}
            aria-label="Add new material"
          >
            <Plus size={18} />
          </Button>
        </div>
      </div>
      {/* --- Tools --- */}
      <div>
        <label className="block font-semibold mb-1 text-[#23211a]">Tool Description</label>
        <div className="flex flex-col gap-2">
          {state.tools.map((tool, i) => (
            <Input
              key={i}
              type="text"
              value={tool}
              className="bg-[#FAF9F5]"
              onChange={(e) => updateTools(i, e.target.value)}
              placeholder="e.g. Sander"
            />
          ))}
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="w-9 p-0 rounded border border-[#ede7df] bg-white text-[#23211a] hover:bg-[#f4f3ef] self-start"
            onClick={addTool}
            aria-label="Add new tool"
          >
            <Plus size={18} />
          </Button>
        </div>
      </div>
      {/* --- Recommendations --- */}
      <div>
        <label className="block font-semibold mb-1 text-[#23211a]">Recommendations</label>
        <Textarea
          className="bg-[#FAF9F5]"
          rows={3}
          value={state.recommendations}
          onChange={e => onChange({ ...state, recommendations: e.target.value })}
        />
      </div>
      {/* --- Estimated Cost --- */}
      <div>
        <label className="block font-semibold mb-1 text-[#23211a]">Estimated Cost</label>
        <div className="flex gap-2 items-center max-w-xs">
          <Input
            type="number"
            min={0}
            className="w-16 bg-[#FAF9F5]"
            value={state.estimatedCostLow}
            onChange={e => onChange({ ...state, estimatedCostLow: e.target.value })}
          />
          <span className="text-[#948268]">€  –</span>
          <Input
            type="number"
            min={0}
            className="w-16 bg-[#FAF9F5]"
            value={state.estimatedCostHigh}
            onChange={e => onChange({ ...state, estimatedCostHigh: e.target.value })}
          />
          <span className="text-[#948268]">€</span>
        </div>
      </div>
      {/* --- Bottom Buttons --- */}
      <div className="flex justify-between items-center mt-7">
        <Button
          type="button"
          variant="outline"
          className="border border-[#e3e0da] rounded-md text-[#23211a] px-5 py-2 hover:bg-[#f4f3ef]"
          onClick={onBack}
        >
          ← Back
        </Button>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="border border-[#c4d9b5] bg-[#e9efea] text-[#417147] rounded-md px-5 py-2 hover:bg-[#e8efe9]"
            onClick={onSaveDraft}
          >
            Save as Draft
          </Button>
          <Button
            type="button"
            className="rounded-md px-7 py-2 bg-[#c69c6d] hover:bg-[#b38951] text-white flex items-center gap-2"
            onClick={onNext}
          >
            Next <span className="ml-1 text-lg">{String.fromCharCode(8594)}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export type { MaterialToolsState };
export default MaterialToolsStep;
