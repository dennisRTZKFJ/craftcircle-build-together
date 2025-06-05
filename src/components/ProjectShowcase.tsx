import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: "Minimalist Shelf",
    image: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f",
    category: "Beginner",
    duration: "3 hours",
    likes: 214,
    author: "Maria Schmidt",
  },
  {
    title: "Rustic Coffee Table",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90",
    category: "Intermediate",
    duration: "6 hours",
    likes: 342,
    author: "Thomas Weber",
  },
  {
    title: "Modern Sideboard",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126",
    category: "Advanced",
    duration: "8 hours",
    likes: 178,
    author: "Julia Hoffmann",
  },
  {
    title: "Bedside Table with Drawer",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8",
    category: "Beginner",
    duration: "4 hours",
    likes: 156,
    author: "Markus Bauer",
  },
];

const categoryColors = {
  "Beginner": "bg-green-100 text-green-800 border-green-200",
  "Intermediate": "bg-amber-100 text-amber-800 border-amber-200",
  "Advanced": "bg-red-100 text-red-800 border-red-200"
};

const ProjectShowcase = () => {
  return (
    <section id="projects" className="py-24 bg-craft-wood/5">
      <div className="container px-4 md:px-6">
        <div className="flex-between md:items-center flex-col md:flex-row gap-6 mb-12">
          <div>
            <h2 className="header-xl">Popular Projects</h2>
            <p className="muted-text max-w-[600px]">
              Discover our best-rated DIY furniture projects, created by beginners and experts alike.
            </p>
          </div>
          <div className="flex-gap-2">
            <Button variant="outline" size="sm">All</Button>
            <Button variant="outline" size="sm" className="text-green-800">Beginner</Button>
            <Button variant="outline" size="sm" className="text-amber-800">Intermediate</Button>
            <Button variant="outline" size="sm" className="text-red-800">Advanced</Button>
          </div>
        </div>
        
        <div className="grid-cols-1-4">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group bg-background rounded-lg overflow-hidden border border-border hover:shadow-md transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="img-cover image-hover-scale"
                />
              </div>
              <div className="p-4">
                <div className="flex-between mb-2">
                  <Badge variant="outline" className={
                    project.category === "Beginner" ? "badge-green" :
                    project.category === "Intermediate" ? "badge-amber" :
                    "badge-red"
                  }>
                    {project.category}
                  </Badge>
                  <span className="text-sm muted-text">{project.duration}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="small-muted-text-mb-3">By {project.author}</p>
                <div className="flex-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-craft-wood" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"></path>
                    </svg>
                    <span className="ml-1 text-sm">{project.likes}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Instructions
                    <ArrowRight className="icon-margin-right h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button>
            Discover more projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
