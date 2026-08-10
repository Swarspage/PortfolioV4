import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { FolderGit2, ExternalLink, Code2, Play, ArrowRight, ArrowLeft } from 'lucide-react';
import projectsJson from '../../All data/data/ProjectsData.json';

const icons = import.meta.glob('../../All data/assets/*.{webp,png,jpg,svg}', { eager: true, query: '?url', import: 'default' });

// Helper to get image URL in Vite
const getImageUrl = (imageSrc) => {
  if (!imageSrc) return null;
  const fileName = imageSrc.split('/').pop();
  const path = `../../All data/assets/${fileName}`;
  return icons[path] || null;
};

export const ProjectsSection = () => {
  const { projectsData } = projectsJson;
  
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projectsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(projectsData.length / projectsPerPage);
  
  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
      setIsAnimating(false);
    }, 300);
  };
  
  const handlePrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
      setIsAnimating(false);
    }, 300);
  };
  
  const currentProjects = projectsData.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  return (
    <section id="projects" className="relative pt-16 pb-12 scroll-mt-24 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="postit" rotate="left" icon={FolderGit2}>
          Portfolio Highlights
        </Badge>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-ink)]">
          Featured Projects
        </h2>
        <p className="text-xl text-[var(--color-ink)]/80 font-handwriting">
          Things I've built that actually leave <code>localhost</code> and make an impact.
        </p>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {currentProjects.map((project, index) => {
          const imagePath = getImageUrl(project.imageSrc);
          
          return (
            <div 
              key={index}
              onClick={() => setActiveProject({
                title: project.name,
                category: project.impactStatement,
                description: project.description,
                imageSrc: imagePath,
                tags: project.technologies,
                liveLink: project.liveLink,
                githubLink: project.githubLink,
                demoLink: project.demoLink
              })}
              className="cursor-pointer group"
            >
              <Card
                decoration={index % 2 === 0 ? 'tape' : 'tack'}
                rotate={index % 2 === 0 ? 'slightLeft' : 'slightRight'}
                className="flex flex-col h-full space-y-5 p-5 sm:p-7 shadow-hard-lg hover:-translate-y-2 transition-transform duration-300"
              >
              {/* Project Image */}
              {imagePath && (
                <div className="relative w-full aspect-video bg-[var(--color-muted)] border-[3px] border-[var(--color-ink)] wobbly-card overflow-hidden group-image">
                  <img
                    src={imagePath}
                    alt={project.name}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                  />
                  {/* Hover Tag */}
                  <div className="absolute top-3 right-3 bg-[var(--color-surface)] border-2 border-[var(--color-ink)] rounded-md px-2 py-1 shadow-hard-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-handwriting text-xs font-bold z-20 transform rotate-3 text-[var(--color-ink)]">
                    Click to enlarge 🔍
                  </div>
                  <div className="absolute inset-0 border-[3px] border-[var(--color-ink)] wobbly-card pointer-events-none" />
                </div>
              )}

              {/* Project Info */}
              <div className="flex-1 flex flex-col space-y-3">
                <h3 className="font-heading text-3xl font-bold text-[var(--color-ink)]">
                  {project.name}
                </h3>
                <p className="font-heading font-bold text-lg text-[#2d5da1] leading-tight">
                  {project.impactStatement}
                </p>
                <p className="text-[var(--color-ink)]/85 font-handwriting text-lg leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies?.map((tech, idx) => (
                    <Badge key={idx} variant="paper" className="text-sm px-2 py-0.5">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t-2 border-dashed border-[var(--color-ink)]/30 flex flex-wrap items-center gap-3">
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="primary" size="sm" className="w-full" icon={ExternalLink}>
                      Live
                    </Button>
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full" icon={Code2}>
                      Code
                    </Button>
                  </a>
                )}
                {project.demoLink && (
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full bg-[var(--color-surface)]" icon={Play}>
                      Demo
                    </Button>
                  </a>
                )}
              </div>
            </Card>
          </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-6 pt-6">
          <Button 
            variant="outline" 
            size="md" 
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="w-32 bg-[var(--color-surface)]"
          >
            <ArrowLeft className="w-5 h-5 mr-1" /> Prev
          </Button>
          
          <span className="font-heading font-bold text-xl text-[var(--color-ink)]">
            {currentPage + 1} / {totalPages}
          </span>
          
          <Button 
            variant="outline" 
            size="md" 
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="w-32 bg-[var(--color-surface)]"
          >
            Next <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      )}

      {/* Interactive Modal */}
      <Modal 
        isOpen={!!activeProject} 
        onClose={() => setActiveProject(null)} 
        data={activeProject}
        type="project"
      />
    </section>
  );
};
