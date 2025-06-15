
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
  return (
    <div className="bg-white rounded-lg border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Popular Tutorials</h2>
        <p className="text-sm text-gray-500">Your most popular content</p>
      </div>
      
      <div className="p-6 space-y-4">
        {tutorials.map((tutorial, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              index === 0 ? 'bg-yellow-100 text-yellow-800' :
              index === 1 ? 'bg-gray-100 text-gray-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{tutorial.title}</p>
              <p className="text-sm text-gray-500">{tutorial.likes} likes</p>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-4">
          View full ranking
        </Button>
      </div>
    </div>
  );
};

export default PopularTutorials;
