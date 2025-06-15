
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Tutorial {
  id: number;
  title: string;
  difficulty: string;
  category: string;
  duration: number;
  availability: string;
  image: string;
}

interface TutorialsTableProps {
  tutorials: Tutorial[];
}

const TutorialsTable = ({ tutorials }: TutorialsTableProps) => {
  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return "bg-green-100 text-green-700 border-green-200";
      case 'Intermediate':
        return "bg-amber-100 text-amber-700 border-amber-200";
      case 'Advanced':
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Furniture Building":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Decoration":
        return "bg-pink-100 text-pink-700 border-pink-200";
      case "Storage space & Organisation":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">Your Tutorials</h2>
        <p className="text-sm text-gray-600 mt-1">Manage your published and planned tutorials</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Availability</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tutorials.map((tutorial) => (
              <tr key={tutorial.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img 
                      src={tutorial.image} 
                      alt={tutorial.title}
                      className="w-12 h-12 rounded-lg object-cover mr-3 border border-gray-200"
                    />
                    <span className="font-medium text-gray-900">{tutorial.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={getDifficultyBadgeColor(tutorial.difficulty)}>
                    {tutorial.difficulty}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge className={getCategoryBadgeColor(tutorial.category)}>
                    {tutorial.category}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-gray-700">{tutorial.duration}</td>
                <td className="px-6 py-4">
                  <Badge className={tutorial.availability === 'free' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-700 border-amber-200'}>
                    {tutorial.availability}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Link to={`/creator-dashboard/edit/${tutorial.id}`}>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-gray-600">Showing {tutorials.length} of {tutorials.length} tutorials</p>
      </div>
    </div>
  );
};

export default TutorialsTable;
