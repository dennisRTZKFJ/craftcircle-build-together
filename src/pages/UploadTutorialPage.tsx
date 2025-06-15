
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const tabList = [
  'Basic Information',
  'Materials & Tools',
  'Instructions',
  'Video',
];

const categories = [
  { value: 'furniture-building', label: 'Furniture Building' },
  { value: 'storage', label: 'Storage & Organisation' },
  { value: 'decoration', label: 'Decoration' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'upcycling', label: 'Upcycling' },
];

const difficulties = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const UploadTutorialPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  // Initial mock form state for demo UI
  const [form, setForm] = useState({
    title: 'Rustic Coffee Tabel',
    category: categories[0].value,
    difficulty: difficulties[1].value,
    duration: 6,
    description:
      "A DIY project that combines tradition with modern design. This coffee table combines the warmth of reclaimed wood with the clean lines of industrial design. The perfect piece of furniture for your living room – with history and personality.",
    availability: 'free',
    price: '',
  });

  const handleBasicChange = (field: string, value: any) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  // Only adding step 1 ("Basic Information") as per screenshot
  // Add future tab contents as needed for multi-step flow

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
              <CardTitle className="text-xl font-semibold font-serif">Create a New Tutorial</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Tab Navigation */}
              <div className="flex gap-2 mb-6">
                {tabList.map((tab, idx) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 rounded font-medium text-sm transition
                      ${activeTab === idx
                        ? 'bg-[#f5f3ef] text-[#524832]'
                        : 'bg-[#f7f5f2] text-[#bbb4ab]'
                      }
                      ${idx === 0 ? 'ml-0' : ''}
                    `}
                    disabled={idx > 0} // Only first tab enabled as in screenshot
                    onClick={() => setActiveTab(idx)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {/* Tab Content */}
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate('/creator-dashboard/upload/success');
                }}
              >
                {/* Only show Basic Information fields */}
                <div className="space-y-5">
                  {/* --- Tutorial Title --- */}
                  <div>
                    <Label htmlFor="title" className="font-semibold mb-1 block text-[#23211a]">
                      Tutorial Title
                    </Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) => handleBasicChange('title', e.target.value)}
                      className="bg-[#FAF9F5] border-[#e6e1db] rounded-md"
                      required
                    />
                  </div>
                  {/* --- 3 column row: Category, Difficulty, Duration --- */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Category */}
                    <div>
                      <Label className="block font-semibold mb-1 text-[#23211a]">
                        Category
                      </Label>
                      <Select
                        value={form.category}
                        onValueChange={(v) => handleBasicChange('category', v)}
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
                    {/* Difficulty */}
                    <div>
                      <Label className="block font-semibold mb-1 text-[#23211a]">
                        Difficulty Level
                      </Label>
                      <Select
                        value={form.difficulty}
                        onValueChange={(v) => handleBasicChange('difficulty', v)}
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
                    {/* Duration */}
                    <div>
                      <Label className="block font-semibold mb-1 text-[#23211a]">Duration</Label>
                      <div className="flex items-center">
                        <Input
                          type="number"
                          min={1}
                          max={48}
                          step={1}
                          className="w-20 bg-[#FAF9F5] border-[#e6e1db] rounded-md mr-2"
                          value={form.duration}
                          onChange={(e) => handleBasicChange('duration', Number(e.target.value))}
                          required
                        />
                        <span className="text-[#948268] font-medium ml-1">hours</span>
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
                      onChange={(e) => handleBasicChange('description', e.target.value)}
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
                          ${form.availability === 'free'
                            ? 'border-[#c9aa7d] bg-[#fcfaf3] shadow text-[#ad8851]'
                            : 'border-[#e6e1db] bg-white text-[#aaa]'
                          }
                        `}
                        onClick={() => handleBasicChange('availability', 'free')}
                      >
                        <span className="rounded-full w-6 h-6 flex items-center justify-center border border-[#eadcae] bg-white mr-2">
                          <span className={`w-2 h-2 rounded-full block ${form.availability === 'free' ? 'bg-[#c69c6d]' : 'bg-transparent'}`}></span>
                        </span>
                        Free
                      </button>
                      <button
                        type="button"
                        className={`w-full flex items-center gap-2 px-4 py-3 rounded border transition-all
                          ${form.availability === 'paid'
                            ? 'border-[#c9aa7d] bg-[#fcfaf3] shadow text-[#ad8851]'
                            : 'border-[#e6e1db] bg-white text-[#aaa]'
                          }
                        `}
                        onClick={() => handleBasicChange('availability', 'paid')}
                      >
                        <span className="rounded-full w-6 h-6 flex items-center justify-center border border-[#eadcae] bg-white mr-2">
                          <span className={`w-2 h-2 rounded-full block ${form.availability === 'paid' ? 'bg-[#c69c6d]' : 'bg-transparent'}`}></span>
                        </span>
                        available for 2€
                      </button>
                    </div>
                  </div>
                </div>
                {/* --- Bottom Buttons --- */}
                <div className="flex justify-between items-center mt-5">
                  <Button
                    type="button"
                    variant="outline"
                    className="border border-[#e3e0da] rounded-md text-[#23211a] px-5 py-2 hover:bg-[#f4f3ef]"
                  >
                    Cancel
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border border-[#c4d9b5] bg-[#e9efea] text-[#417147] rounded-md px-5 py-2 hover:bg-[#e8efe9]"
                    >
                      Save as Draft
                    </Button>
                    <Button
                      type="submit"
                      className="rounded-md px-7 py-2 bg-[#c69c6d] hover:bg-[#b38951] text-white flex items-center gap-2"
                    >
                      Next <ArrowRight size={17} className="ml-1" />
                    </Button>
                  </div>
                </div>
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
