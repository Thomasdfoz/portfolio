import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { data } = useLanguage();
  const imageSrc = project.imageUrl.startsWith('http') || project.imageUrl.startsWith('/')
    ? project.imageUrl
    : `${import.meta.env.BASE_URL}${project.imageUrl}`;

  return (
    <Link
      to={`/project/${project.id}`}
      className="group block h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
      aria-label={`${data.labels.viewProjectDetails} ${project.title}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img src={imageSrc} alt={`${data.labels.projectImage} ${project.title}`} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
        <div className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm backdrop-blur dark:bg-gray-950/85 dark:text-gray-100">{project.year}</div>
        <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-gray-900 shadow-sm backdrop-blur transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:bg-gray-950/85 dark:text-gray-100"><ArrowUpRight className="h-4 w-4" /></div>
      </div>
      <div className="flex min-h-[230px] flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map(tag => <span key={tag} className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">{tag}</span>)}
        </div>
        <h3 className="text-xl font-semibold leading-tight text-gray-950 transition-colors group-hover:text-indigo-600 dark:text-gray-50 dark:group-hover:text-indigo-300">{project.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{project.description}</p>
        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map(tech => <span key={tech} className="text-xs text-gray-500 dark:text-gray-500">{tech}</span>)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
