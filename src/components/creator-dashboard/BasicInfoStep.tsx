
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Category = { value: string, label: string };
type Difficulty = { value: string, label: string };

type Props = {
  form: {
    title: string;
    category: string;
    difficulty: string;
    duration: number;
    description: string;
    availability: string;
    price: string;
  };
  categories: Category[];
  difficulties: Difficulty[];
  onChange: (field: keyof Props["form"], value: any) => void;
};

const BasicInfoStep: React.FC<Props> = ({
  form,
  categories,
  difficulties,
  onChange
}) => (
  <div className="space-y-6">
    {/* --- Tutorial Title --- */}
    <div>
      <Label htmlFor="title" className="text-sm font-medium text-gray-900 mb-2 block">
        Tutorial Title
      </Label>
      <Input
        id="title"
        value={form.title}
        onChange={(e) => onChange("title", e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>

    {/* --- Category, Difficulty, Duration --- */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label className="text-sm font-medium text-gray-900 mb-2 block">
          Category
        </Label>
        <Select
          value={form.category}
          onValueChange={(v) => onChange("category", v)}
        >
          <SelectTrigger className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem value={c.value} key={c.value} className="text-sm">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium text-gray-900 mb-2 block">
          Difficulty Level
        </Label>
        <Select
          value={form.difficulty}
          onValueChange={(v) => onChange("difficulty", v)}
        >
          <SelectTrigger className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map((d) => (
              <SelectItem value={d.value} key={d.value} className="text-sm">
                {d.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-sm font-medium text-gray-900 mb-2 block">
          Duration
        </Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min={1}
            max={48}
            step={1}
            className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={form.duration}
            onChange={(e) => onChange("duration", Number(e.target.value))}
            required
          />
          <span className="text-sm text-gray-600 font-medium">
            hours
          </span>
        </div>
      </div>
    </div>

    {/* --- Description --- */}
    <div>
      <Label htmlFor="description" className="text-sm font-medium text-gray-900 mb-2 block">
        Description
      </Label>
      <Textarea
        id="description"
        value={form.description}
        rows={4}
        onChange={(e) => onChange("description", e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"
        required
      />
    </div>

    {/* --- Availability --- */}
    <div>
      <Label className="text-sm font-medium text-gray-900 mb-3 block">
        Availability
      </Label>
      <div className="flex gap-4">
        <button
          type="button"
          className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all
            ${form.availability === "free"
              ? "border-orange-300 bg-orange-50"
              : "border-gray-200 bg-white hover:border-gray-300"
            }
          `}
          onClick={() => onChange("availability", "free")}
        >
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
            ${form.availability === "free" ? "border-orange-400" : "border-gray-300"}
          `}>
            {form.availability === "free" && (
              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
            )}
          </div>
          <span className={`text-sm font-medium ${form.availability === "free" ? "text-orange-700" : "text-gray-700"}`}>
            Free
          </span>
        </button>
        
        <button
          type="button"
          className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all
            ${form.availability === "paid"
              ? "border-orange-300 bg-orange-50"
              : "border-gray-200 bg-white hover:border-gray-300"
            }
          `}
          onClick={() => onChange("availability", "paid")}
        >
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
            ${form.availability === "paid" ? "border-orange-400" : "border-gray-300"}
          `}>
            {form.availability === "paid" && (
              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
            )}
          </div>
          <span className={`text-sm font-medium ${form.availability === "paid" ? "text-orange-700" : "text-gray-700"}`}>
            available for 2€
          </span>
        </button>
      </div>
    </div>
  </div>
);

export default BasicInfoStep;
