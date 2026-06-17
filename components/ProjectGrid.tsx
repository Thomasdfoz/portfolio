import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { useLanguage } from '../contexts/LanguageContext';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const priorityTags = ['Unity', 'Three.js', 'Online', 'Backend', 'WebGL', 'React'];

const ProjectGrid: React.FC = () => {
  const { data, language } = useLanguage();
  const [activeTag, setActiveTag] = useState('All');
  const tags = useMemo(() => {
    const available = new Set(data.projects.flatMap(project => project.tags));
    return priorityTags.filter(tag => available.has(tag));
  }, [data.projects]);
  const filteredProjects = activeTag === 'All' ? data.projects : data.projects.filter(project => project.tags.includes(activeTag));

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => setActiveTag('All')} className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeTag === 'All' ? 'bg-gray-950 text-white dark:bg-white dark:text-gray-950' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'}`}>
          {language === 'br' ? 'Todos' : 'All'}
        </button>
        {tags.map(tag => (
          <button key={tag} type="button" onClick={() => setActiveTag(tag)} className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeTag === tag ? 'bg-gray-950 text-white dark:bg-white dark:text-gray-950' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'}`}>{tag}</button>
        ))}
      </div>
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map(project => <motion.div key={project.id} variants={item}><ProjectCard project={project} /></motion.div>)}
      </motion.div>
    </div>
  );
};

export default ProjectGrid;
