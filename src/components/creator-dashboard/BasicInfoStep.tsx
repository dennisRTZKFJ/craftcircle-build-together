
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
  <div className="space-y-5">
    {/* --- Tutorial Title --- */}
    <div>
      <Label htmlFor="title" className="font-semibold mb-1 block text-[#23211a]">
        Tutorial Title
      </Label>
      <Input
        id="title"
        value={form.title}
        onChange={(e) => onChange("title", e.target.value)}
        className="bg-[#FAF9F5] border-[#e6e1db] rounded-md"
        required
      />
    </div>
    {/* --- 3 column row: Category, Difficulty, Duration --- */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label className="block font-semibold mb-1 text-[#23211a]">
          Category
        </Label>
        <Select
          value={form.category}
          onValueChange={(v) => onChange("category", v)}
        >
          <SelectTrigger className="bg-[#FAF9F5] border-[#e6e1db] rounded-md">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem value={c.value} key={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="block font-semibold mb-1 text-[#23211a]">
          Difficulty Level
        </Label>
        <Select
          value={form.difficulty}
          onValueChange={(v) => onChange("difficulty", v)}
        >
          <SelectTrigger className="bg-[#FAF9F5] border-[#e6e1db] rounded-md">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map((d) => (
              <SelectItem value={d.value} key={d.value}>
                {d.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="block font-semibold mb-1 text-[#23211a]">
          Duration
        </Label>
        <div className="flex items-center">
          <Input
            type="number"
            min={1}
            max={48}
            step={1}
            className="w-20 bg-[#FAF9F5] border-[#e6e1db] rounded-md mr-2"
            value={form.duration}
            onChange={(e) =>
              onChange("duration", Number(e.target.value))
            }
            required
          />
          <span className="text-[#948268] font-medium ml-1">
            hours
          </span>
        </div>
      </div>
    </div>
    {/* --- Description --- */}
    <div>
      <Label htmlFor="description" className="font-semibold mb-1 block text-[#23211a]">
        Description
      </Label>
      <Textarea
        id="description"
        value={form.description}
        rows={4}
        onChange={(e) =>
          onChange("description", e.target.value)
        }
        className="bg-[#FAF9F5] border-[#e6e1db] rounded-md"
        required
      />
    </div>
    {/* --- Availability --- */}
    <div>
      <Label className="block font-semibold mb-1 text-[#23211a]">
        Availability
      </Label>
      <div className="flex gap-4">
        <button
          type="button"
          className={`w-full flex items-center gap-2 px-4 py-3 rounded border transition-all
            ${form.availability === "free"
              ? "border-[#c9aa7d] bg-[#fcfaf3] shadow text-[#ad8851]"
              : "border-[#e6e1db] bg-white text-[#aaa]"
            }
          `}
          onClick={() => onChange("availability", "free")}
        >
          <span className="rounded-full w-6 h-6 flex items-center justify-center border border-[#eadcae] bg-white mr-2">
            <span
              className={`w-2 h-2 rounded-full block ${form.availability === "free"
                  ? "bg-[#c69c6d]"
                  : "bg-transparent"
                }`}
            ></span>
          </span>
          Free
        </button>
        <button
          type="button"
          className={`w-full flex items-center gap-2 px-4 py-3 rounded border transition-all
            ${form.availability === "paid"
              ? "border-[#c9aa7d] bg-[#fcfaf3] shadow text-[#ad8851]"
              : "border-[#e6e1db] bg-white text-[#aaa]"
            }
          `}
          onClick={() => onChange("availability", "paid")}
        >
          <span className="rounded-full w-6 h-6 flex items-center justify-center border border-[#eadcae] bg-white mr-2">
            <span className={`w-2 h-2 rounded-full block ${form.availability === "paid" ? "bg-[#c69c6d]" : "bg-transparent"}`}></span>
          </span>
          available for 2€
        </button>
      </div>
    </div>
  </div>
);

export default BasicInfoStep;
