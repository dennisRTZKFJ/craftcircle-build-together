
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: "Minimalistisches Regal",
    image: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f",
    category: "Anfänger",
    duration: "3 Stunden",
    likes: 214,
    author: "Maria Schmidt",
  },
  {
    title: "Rustikaler Couchtisch",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90",
    category: "Mittel",
    duration: "6 Stunden",
    likes: 342,
    author: "Thomas Weber",
  },
  {
    title: "Modernes Sideboard",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126",
    category: "Fortgeschritten",
    duration: "8 Stunden",
    likes: 178,
    author: "Julia Hoffmann",
  },
  {
    title: "Nachttisch mit Schublade",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8",
    category: "Anfänger",
    duration: "4 Stunden",
    likes: 156,
    author: "Markus Bauer",
  },
];

const categoryColors = {
  "Anfänger": "bg-green-100 text-green-800 border-green-200",
  "Mittel": "bg-amber-100 text-amber-800 border-amber-200",
  "Fortgeschritten": "bg-red-100 text-red-800 border-red-200"
};

const ProjectShowcase = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Beliebte Projekte</h2>
            <p className="text-muted-foreground max-w-[600px]">
              Entdecke unsere am besten bewerteten DIY-Möbelprojekte, von Anfängern bis zu Profis erstellt.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Alle</Button>
            <Button variant="outline" size="sm" className="text-green-800">Anfänger</Button>
            <Button variant="outline" size="sm" className="text-amber-800">Mittel</Button>
            <Button variant="outline" size="sm" className="text-red-800">Fortgeschritten</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group bg-background rounded-lg overflow-hidden border border-border hover:shadow-md transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className={categoryColors[project.category as keyof typeof categoryColors]}>
                    {project.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{project.duration}</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">Von {project.author}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-craft-wood" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"></path>
                    </svg>
                    <span className="ml-1 text-sm">{project.likes}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Anleitung
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button>
            Mehr Projekte entdecken
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
