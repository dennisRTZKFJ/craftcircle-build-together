
import React from 'react';
import { Button } from "@/components/ui/button";

interface PopularTutorial {
  title: string;
  likes: number;
}

interface PopularTutorialsProps {
  tutorials: PopularTutorial[];
}

const PopularTutorials = ({ tutorials }: PopularTutorialsProps) => {
  const getRankingColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 1:
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 2:
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">Popular Tutorials</h2>
        <p className="text-sm text-gray-600 mt-1">Your most popular content</p>
      </div>
      
      <div className="p-6 space-y-4">
        {tutorials.map((tutorial, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${getRankingColor(index)}`}>
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{tutorial.title}</p>
              <p className="text-sm text-gray-600">{tutorial.likes} likes</p>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-4 border-gray-300 text-gray-700 hover:bg-gray-50">
          View full ranking
        </Button>
      </div>
    </div>
  );
};

export default PopularTutorials;
