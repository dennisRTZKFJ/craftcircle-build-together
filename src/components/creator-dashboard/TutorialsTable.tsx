
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';

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

const badgeColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
};

const categoryColors: Record<string, string> = {
  "Furniture Building": "bg-orange-100 text-orange-800",
  "Decoration": "bg-pink-100 text-pink-800",
  "Storage space & Organisation": "bg-blue-100 text-blue-800",
};

const TutorialsTable = ({ tutorials }: TutorialsTableProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Your Tutorials</h2>
        <p className="text-sm text-gray-500">Manage your published and planned tutorials</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {tutorials.map((tutorial) => (
              <tr key={tutorial.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img 
                      src={tutorial.image} 
                      alt={tutorial.title}
                      className="w-10 h-10 rounded object-cover mr-3"
                    />
                    <span className="font-medium text-gray-900">{tutorial.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={badgeColors[tutorial.difficulty] || "bg-gray-100 text-gray-800"}>
                    {tutorial.difficulty}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge className={categoryColors[tutorial.category] || "bg-gray-100 text-gray-800"}>
                    {tutorial.category}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-gray-600">{tutorial.duration}</td>
                <td className="px-6 py-4">
                  <Badge className={tutorial.availability === 'free' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                    {tutorial.availability}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
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
      
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <p className="text-sm text-gray-500">Showing {tutorials.length} of {tutorials.length} tutorials</p>
      </div>
    </div>
  );
};

export default TutorialsTable;
