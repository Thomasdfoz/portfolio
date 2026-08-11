import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ExternalLink, Tag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ImageModal from '../components/ImageModal';

const resolveAsset = (src: string) => src.startsWith('http')
  ? src
  : encodeURI(`${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`);

const renderDescription = (text: string) => text.split('\n\n').map((block, index) => {
  const lines = block.split('\n').filter(Boolean);
  if (lines.every(line => line.trim().startsWith('- '))) {
    return <ul key={index} className="space-y-3">{lines.map(line => <li key={line} className="flex gap-3 text-gray-700 dark:text-gray-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" /><span>{line.replace(/^- /, '')}</span></li>)}</ul>;
  }
  return <p key={index} className="text-lg leading-8 text-gray-700 dark:text-gray-300">{block}</p>;
});

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useLanguage();
  const project = data.projects.find(p => p.id === id);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!project) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950"><div className="text-center"><h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.labels.projectNotFound}</h2><Link to="/trabalhos" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500">{data.labels.backToWork}</Link></div></div>;
  }

  const allImages = [project.imageUrl, ...project.galleryImages.filter(Boolean)].map(resolveAsset);
  const projectImage = resolveAsset(project.imageUrl);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <button onClick={() => navigate(-1)} className="group mb-8 inline-flex items-center text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-300"><ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />{data.labels.back}</button>
      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-sm dark:border-gray-800 dark:bg-gray-900" onClick={() => setSelectedImageIndex(0)} role="button" tabIndex={0}>
            <img src={projectImage} alt={project.title} className="h-full max-h-[620px] w-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {project.galleryImages.filter(Boolean).map((image, index) => <button key={index} type="button" className="overflow-hidden rounded-md border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900" onClick={() => setSelectedImageIndex(index + 1)}><img src={resolveAsset(image)} alt={`Gallery ${index + 1}`} className="aspect-[16/10] w-full object-cover transition-transform duration-500 hover:scale-105" /></button>)}
          </div>
        </div>
        <div>
          <div className="mb-5 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 dark:bg-gray-900"><Calendar className="mr-2 h-4 w-4 text-indigo-500" />{project.year}</span>
            <span className="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 dark:bg-gray-900"><Tag className="mr-2 h-4 w-4 text-indigo-500" />{project.tags.join(', ')}</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight text-gray-950 dark:text-gray-50 sm:text-5xl">{project.title}</h1>
          <p className="mt-5 text-xl leading-8 text-gray-600 dark:text-gray-400">{project.description}</p>
          <div className="mt-8 space-y-6">{renderDescription(project.longDescription)}</div>
          <div className="mt-9"><h2 className="mb-4 text-lg font-semibold text-gray-950 dark:text-gray-50">{data.labels.technologies}</h2><div className="flex flex-wrap gap-2">{project.technologies.map(tech => <span key={tech} className="rounded-md border border-indigo-100 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-200">{tech}</span>)}</div></div>
          {project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex items-center rounded-md bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"><ExternalLink className="mr-2 h-4 w-4" />{data.labels.viewProject}</a>}
        </div>
      </section>
      {selectedImageIndex !== null && <ImageModal images={allImages} currentIndex={selectedImageIndex} onClose={() => setSelectedImageIndex(null)} onNext={() => setSelectedImageIndex(index => index !== null && index < allImages.length - 1 ? index + 1 : index)} onPrevious={() => setSelectedImageIndex(index => index !== null && index > 0 ? index - 1 : index)} />}
    </motion.div>
  );
};

export default ProjectPage;
