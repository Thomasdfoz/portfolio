
import React from 'react';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';

const ProjectGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {PROJECTS.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectGrid;
