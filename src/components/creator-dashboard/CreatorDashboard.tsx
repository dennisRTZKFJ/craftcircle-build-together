
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

// Mock tutorial data
const tutorials = [
  {
    id: 1,
    title: "Rustic Coffee Table",
    difficulty: "Intermediate",
    category: "Furniture Building",
    duration: 6,
    availability: "free",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90",
  },
  {
    id: 2,
    title: "Wall Shelves with Invisible Mounts",
    difficulty: "Beginner",
    category: "Decoration",
    duration: 2,
    availability: "free",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f",
  },
  {
    id: 3,
    title: "Modular Solid Wood Shelving System",
    difficulty: "Beginner",
    category: "Storage space & Organisation",
    duration: 4,
    availability: "buy",
    image: "https://images.unsplash.com/photo-1588200618450-3a5b1d3b9aa5",
  },
  {
    id: 4,
    title: "Rustic Dining Table with Epoxy Resin",
    difficulty: "Advanced",
    category: "Decoration",
    duration: 12,
    availability: "buy",
    image: "https://images.unsplash.com/photo-1604074131665-7a4b13870ab2",
  },
];

const badgeColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-900",
  Intermediate: "bg-yellow-100 text-yellow-900",
  Advanced: "bg-pink-100 text-pink-900",
};

const categoryBadgeColors: Record<string, string> = {
  "Furniture Building": "bg-yellow-50 text-yellow-900",
  "Decoration": "bg-pink-50 text-pink-800",
  "Storage space & Organisation": "bg-blue-50 text-blue-900",
};

const popularTutorials = [
  {
    title: "Modular Solid Wood Shelving System",
    likes: 203,
  },
  {
    title: "Building a Walnut Coffee Table",
    likes: 145,
  },
  {
    title: "Wall Shelves with Invisible Mounts",
    likes: 98,
  },
];

// METRICS MOCK
const mainCategory = "Decoration";
const avgStars = "4.1";
const avgDuration = 3;
const savedTutorials = "1,240";

const IconMainCategory = () => (
  <span className="mr-2 text-amber-700">{/* diamond icon, minimal */} <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2L18 10L10 18L2 10L10 2Z" stroke="#C69C6D" strokeWidth="1.6" strokeLinejoin="round"/></svg></span>
);
const IconStars = () => (
  <span className="mr-2 text-amber-700"><svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 3L12.09 8.26L18 9.27L13.5 13.14L14.82 19.02L10 16.1L5.18 19.02L6.5 13.14L2 9.27L7.91 8.26L10 3Z" stroke="#C69C6D" strokeWidth="1.6" strokeLinejoin="round"/></svg></span>
);
const IconDuration = () => (
  <span className="mr-2 text-amber-700"><svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#C69C6D" strokeWidth="1.6"/><path d="M10 6V10L13 13" stroke="#C69C6D" strokeWidth="1.6" strokeLinecap="round"/></svg></span>
);
const IconSaved = () => (
  <span className="mr-2 text-amber-700"><svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 4L16 16M16 4L4 16" stroke="#C69C6D" strokeWidth="1.6" strokeLinejoin="round"/></svg>
    <span className="sr-only">Saved Tutorials</span>
  </span>
);

const CreatorDashboard = () => {
  return (
    <div className="bg-[#F5F4F1] min-h-screen py-0 px-0 w-full">
      <div className="max-w-6xl mx-auto pt-10 pb-14">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#20201F]">Creator Dashboard</h1>
            <p className="text-[#AFA8A4] mt-1 text-base">Manage your tutorials, earnings and followers</p>
          </div>
          <Button
            className="bg-[#C69C6D] text-white rounded-md px-6 py-2 shadow-sm text-base font-medium hover:bg-[#AD8851]"
            style={{ boxShadow: "none" }}
          >
            + New Tutorial
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          <div className="bg-white rounded-lg px-7 py-6 shadow-sm flex flex-col gap-0 border border-[#F0ECE6]">
            <div className="flex items-center mb-1">
              <IconMainCategory />
              <span className="uppercase text-xs font-semibold tracking-wide text-[#B29985]">Main Category</span>
            </div>
            <div className="font-bold text-xl text-[#AD8851]">{mainCategory}</div>
          </div>
          <div className="bg-white rounded-lg px-7 py-6 shadow-sm flex flex-col gap-0 border border-[#F0ECE6]">
            <div className="flex items-center mb-1">
              <IconStars />
              <span className="uppercase text-xs font-semibold tracking-wide text-[#B29985]">Avg. Stars</span>
            </div>
            <div className="font-bold text-xl text-[#AD8851]">{avgStars}</div>
          </div>
          <div className="bg-white rounded-lg px-7 py-6 shadow-sm flex flex-col gap-0 border border-[#F0ECE6]">
            <div className="flex items-center mb-1">
              <IconDuration />
              <span className="uppercase text-xs font-semibold tracking-wide text-[#B29985]">Avg. Duration</span>
            </div>
            <div className="font-bold text-xl text-[#AD8851]">{avgDuration}</div>
          </div>
          <div className="bg-white rounded-lg px-7 py-6 shadow-sm flex flex-col gap-0 border border-[#F0ECE6]">
            <div className="flex items-center mb-1">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M7 10.17L9.59 13.17C9.83913 13.4683 10.2823 13.5375 10.5858 13.2929C10.8892 13.0483 10.9585 12.6051 10.71 12.29L9 10.17V5C9 4.44772 9.44772 4 10 4C10.5523 4 11 4.44772 11 5V10.17L9.29 12.29C9.04151 12.6051 9.11078 13.0483 9.41421 13.2929C9.71764 13.5375 10.1609 13.4683 10.41 13.17L13 10.17V7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V10.17L7 10.17Z" stroke="#C69C6D" strokeWidth="1.6" strokeLinejoin="round"/></svg>
              <span className="uppercase text-xs font-semibold tracking-wide text-[#B29985] ml-2">Saved Tutorials</span>
            </div>
            <div className="font-bold text-xl text-[#AD8851]">{savedTutorials}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Tutorials Table */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl p-7 shadow-md border border-[#EBE8E6]">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-[#1E1712]">Your Tutorials</h2>
                <p className="text-[#AFA8A4] text-sm">Manage your published and planned tutorials</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{background: "transparent"}} className="">
                      <th className="text-left px-0 pb-2 font-medium text-[#B29985]">Title</th>
                      <th className="text-left px-0 pb-2 font-medium text-[#B29985]">Difficulty</th>
                      <th className="text-left px-0 pb-2 font-medium text-[#B29985]">Category</th>
                      <th className="text-left px-0 pb-2 font-medium text-[#B29985]">Duration</th>
                      <th className="text-left px-0 pb-2 font-medium text-[#B29985]">Availability</th>
                      <th className="text-left px-0 pb-2 font-medium text-[#B29985]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tutorials.map((tut) => (
                      <tr
                        className="transition hover:bg-[#F5F4F1] border-0"
                        key={tut.id}
                        style={{ border: "none" }}
                      >
                        <td className="py-3 px-0 align-middle">
                          <div className="flex items-center gap-3">
                            <img
                              src={tut.image}
                              alt={tut.title}
                              className="w-12 h-12 rounded object-cover border border-[#ECE7E1]"
                            />
                            <span className="font-medium text-[#20201F]">{tut.title}</span>
                          </div>
                        </td>
                        <td className="py-3 px-0 align-middle">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-semibold ${badgeColors[tut.difficulty] || "bg-gray-100 text-gray-700"}`}
                          >
                            {tut.difficulty}
                          </span>
                        </td>
                        <td className="py-3 px-0 align-middle">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-semibold ${categoryBadgeColors[tut.category] || "bg-gray-100 text-gray-900"}`}
                          >
                            {tut.category}
                          </span>
                        </td>
                        <td className="py-3 px-0 align-middle text-[#948268]">{tut.duration}</td>
                        <td className="py-3 px-0 align-middle">
                          {tut.availability === "free" ? (
                            <Badge className="bg-green-100 text-green-800 border-none">free</Badge>
                          ) : (
                            <Badge className="bg-amber-50 text-[#AB855C] border-none">buy</Badge>
                          )}
                        </td>
                        <td className="py-3 px-0 align-middle whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="p-2" aria-label="Edit">
                              <Edit className="h-4 w-4 mr-1" />
                              <span className="text-xs font-semibold text-[#595146]">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="p-2" aria-label="Delete">
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-xs text-[#AFA8A4] mt-2">
                  Showing {tutorials.length} of {tutorials.length} tutorials
                </div>
              </div>
            </div>
          </div>

          {/* Popular Tutorials */}
          <div className="">
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#EBE8E6]">
              <div>
                <h2 className="text-base font-semibold text-[#1E1712] mb-1">Popular Tutorials</h2>
                <p className="text-[#AFA8A4] text-sm mb-2">Your most popular content</p>
              </div>
              <div className="flex flex-col gap-3">
                {popularTutorials.map((tut, idx) => (
                  <div className="flex items-center gap-3" key={idx}>
                    <div
                      className={`w-7 h-7 flex items-center justify-center rounded-full font-semibold text-base ${
                        idx === 0
                          ? "bg-[#FFF5DC] text-[#B29985]"
                          : idx === 1
                          ? "bg-gray-200 text-gray-900"
                          : "bg-[#FCF2DF] text-[#B29985]"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[#20201F]">{tut.title}</div>
                      <div className="text-xs text-[#AFA8A4]">{tut.likes} likes</div>
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-3 bg-white border border-[#E5E1D6] text-[#AD8851] hover:bg-[#FAF9F4]">
                  View full ranking
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;

