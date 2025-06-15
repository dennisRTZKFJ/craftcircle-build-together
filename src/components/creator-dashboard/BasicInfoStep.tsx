
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
  <div className="space-y-7">
    {/* --- Tutorial Title --- */}
    <div>
      <Label htmlFor="title" className="font-semibold mb-2 block text-[#23211a] text-base">
        Tutorial Title
      </Label>
      <Input
        id="title"
        value={form.title}
        onChange={(e) => onChange("title", e.target.value)}
        className="bg-[#faf8f4] border border-[#e6e1db] rounded-md focus:ring-2 focus:ring-[#eadcae] px-4 py-2 text-base placeholder:text-[#b3a590] font-sans"
        required
      />
    </div>
    {/* --- Category, Difficulty, Duration --- */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <Label className="block font-semibold mb-2 text-[#23211a] text-base">
          Category
        </Label>
        <Select
          value={form.category}
          onValueChange={(v) => onChange("category", v)}
        >
          <SelectTrigger className="bg-[#faf8f4] border border-[#e6e1db] rounded-md px-4 py-2 min-w-[180px] text-base font-sans">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem value={c.value} key={c.value} className="text-base">
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="block font-semibold mb-2 text-[#23211a] text-base">
          Difficulty Level
        </Label>
        <Select
          value={form.difficulty}
          onValueChange={(v) => onChange("difficulty", v)}
        >
          <SelectTrigger className="bg-[#faf8f4] border border-[#e6e1db] rounded-md px-4 py-2 min-w-[170px] text-base font-sans">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map((d) => (
              <SelectItem value={d.value} key={d.value} className="text-base">
                {d.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="block font-semibold mb-2 text-[#23211a] text-base">
          Duration
        </Label>
        <div className="flex items-center">
          <Input
            type="number"
            min={1}
            max={48}
            step={1}
            className="w-20 bg-[#faf8f4] border border-[#e6e1db] rounded-md mr-2 px-3 py-2 text-base font-sans"
            value={form.duration}
            onChange={(e) => onChange("duration", Number(e.target.value))}
            required
          />
          <span className="text-[#948268] font-medium ml-1 text-base">
            hours
          </span>
        </div>
      </div>
    </div>
    {/* --- Description --- */}
    <div>
      <Label htmlFor="description" className="font-semibold mb-2 block text-[#23211a] text-base">
        Description
      </Label>
      <Textarea
        id="description"
        value={form.description}
        rows={4}
        onChange={(e) => onChange("description", e.target.value)}
        className="bg-[#faf8f4] border border-[#e6e1db] rounded-md px-4 py-2 text-base placeholder:text-[#b3a590] font-sans"
        required
      />
    </div>
    {/* --- Availability --- */}
    <div>
      <Label className="block font-semibold mb-2 text-[#23211a] text-base">
        Availability
      </Label>
      <div className="flex gap-4">
        <button
          type="button"
          className={`flex-1 flex items-center gap-3 px-4 py-4 rounded-xl border transition-all justify-start text-base font-semibold focus:outline-none
            ${form.availability === "free"
              ? "border-[#eadcae] bg-[#fdf7ec] text-[#ad8851] shadow-md"
              : "border-[#e6e1db] bg-[#fff] text-[#b8a998]"
            }
          `}
          onClick={() => onChange("availability", "free")}
        >
          {/* Radio-circle */}
          <span className={`rounded-full w-6 h-6 flex items-center justify-center border bg-white border-[#eadcae] mr-3`}>
            <span className={`w-3 h-3 rounded-full block transition-all duration-100 ${form.availability === "free" ? "bg-[#c69c6d]" : "bg-transparent"}`}></span>
          </span>
          Free
        </button>
        <button
          type="button"
          className={`flex-1 flex items-center gap-3 px-4 py-4 rounded-xl border transition-all justify-start text-base font-semibold focus:outline-none
            ${form.availability === "paid"
              ? "border-[#eadcae] bg-[#fdf7ec] text-[#ad8851] shadow-md"
              : "border-[#e6e1db] bg-[#fff] text-[#b8a998]"
            }
          `}
          onClick={() => onChange("availability", "paid")}
        >
          {/* Radio-circle */}
          <span className={`rounded-full w-6 h-6 flex items-center justify-center border bg-white border-[#eadcae] mr-3`}>
            <span className={`w-3 h-3 rounded-full block transition-all duration-100 ${form.availability === "paid" ? "bg-[#c69c6d]" : "bg-transparent"}`}></span>
          </span>
          available for 2€
        </button>
      </div>
    </div>
  </div>
);

export default BasicInfoStep;
