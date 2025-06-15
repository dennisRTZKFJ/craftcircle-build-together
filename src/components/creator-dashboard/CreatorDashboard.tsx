import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MetricsOverview from "./MetricsOverview";
import TutorialsTable from "./TutorialsTable";
import PopularTutorials from "./PopularTutorials";

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

const CreatorDashboard = () => {
  return (
    <div className="section-y-space-lg" style={{ backgroundColor: '#fbfaf8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Creator Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your tutorials, earnings and followers</p>
          </div>
          <Link to="/creator-dashboard/upload">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              New Tutorial
            </Button>
          </Link>
        </div>

        {/* Metrics Overview */}
        <MetricsOverview />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tutorials Table - Takes up 3 columns */}
          <div className="lg:col-span-3">
            <TutorialsTable tutorials={tutorials} />
          </div>
          
          {/* Popular Tutorials Sidebar - Takes up 1 column */}
          <div className="lg:col-span-1">
            <PopularTutorials tutorials={popularTutorials} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
