
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

const CreatorDashboard = () => {
  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-white border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-1">Creator Dashboard</h1>
          <p className="text-muted-foreground mb-6">
            Manage your tutorials, earnings and followers
          </p>
          {/* Metric cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border border-amber-100 shadow-none">
              <CardContent className="p-4">
                <div className="text-xs mb-2 flex items-center gap-1">
                  <span className="text-amber-700 font-semibold">🏷️ Main Category</span>
                </div>
                <div className="font-bold text-lg text-amber-700">{mainCategory}</div>
              </CardContent>
            </Card>
            <Card className="border border-amber-100 shadow-none">
              <CardContent className="p-4">
                <div className="text-xs mb-2 flex items-center gap-1">
                  <span className="text-amber-700 font-semibold">⭐ Avg. Stars</span>
                </div>
                <div className="font-bold text-lg text-amber-700">{avgStars}</div>
              </CardContent>
            </Card>
            <Card className="border border-amber-100 shadow-none">
              <CardContent className="p-4">
                <div className="text-xs mb-2 flex items-center gap-1">
                  <span className="text-amber-700 font-semibold">⏱️ Avg. Duration</span>
                </div>
                <div className="font-bold text-lg text-amber-700">{avgDuration}</div>
              </CardContent>
            </Card>
            <Card className="border border-amber-100 shadow-none">
              <CardContent className="p-4">
                <div className="text-xs mb-2 flex items-center gap-1">
                  <span className="text-amber-700 font-semibold">📦 Saved Tutorials</span>
                </div>
                <div className="font-bold text-lg text-amber-700">{savedTutorials}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
        {/* Left: Tutorials Table */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Your Tutorials</CardTitle>
              <p className="text-muted-foreground text-sm">Manage your published and planned tutorials</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-2 font-medium">Title</th>
                      <th className="text-left px-4 py-2 font-medium">Difficulty</th>
                      <th className="text-left px-4 py-2 font-medium">Category</th>
                      <th className="text-left px-4 py-2 font-medium">Duration</th>
                      <th className="text-left px-4 py-2 font-medium">Availability</th>
                      <th className="text-left px-4 py-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tutorials.map((tut) => (
                      <tr className="border-b last:border-b-0" key={tut.id}>
                        <td className="flex items-center gap-3 px-4 py-3">
                          <img
                            src={tut.image}
                            alt={tut.title}
                            className="w-12 h-12 rounded object-cover border"
                          />
                          <span className="font-medium">{tut.title}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-semibold ${badgeColors[tut.difficulty] || "bg-gray-200 text-gray-700"}`}
                          >
                            {tut.difficulty}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-semibold ${categoryBadgeColors[tut.category] || "bg-gray-100 text-gray-900"}`}
                          >
                            {tut.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">{tut.duration}</td>
                        <td className="px-4 py-3">
                          {tut.availability === "free" ? (
                            <Badge className="bg-green-100 text-green-800 border-none">free</Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-900 border-none">buy</Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Button variant="ghost" size="icon" className="mr-1" aria-label="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" aria-label="Delete">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-xs text-muted-foreground mt-3">
                  Showing {tutorials.length} of {tutorials.length} tutorials
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right: Popular Tutorials */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Popular Tutorials</CardTitle>
              <p className="text-muted-foreground text-sm">Your most popular content</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {popularTutorials.map((tut, idx) => (
                  <div className="flex items-center gap-3" key={idx}>
                    <div
                      className={`w-8 h-8 rounded-full font-bold flex items-center justify-center ${
                        idx === 0
                          ? "bg-amber-100 text-amber-900"
                          : idx === 1
                          ? "bg-gray-200 text-gray-900"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{tut.title}</div>
                      <div className="text-xs text-muted-foreground">{tut.likes} likes</div>
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-4" variant="outline" size="sm">
                  View full ranking
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Footer (optional, can be moved to a shared layout) */}
      {/* <Footer /> */}
    </div>
  );
};

export default CreatorDashboard;
