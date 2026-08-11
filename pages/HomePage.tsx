import React from 'react';
import { motion } from 'framer-motion';
import ProjectGrid from '../components/ProjectGrid';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const { data, language } = useLanguage();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <section className="mb-12 grid gap-8 border-b border-gray-200 pb-10 dark:border-gray-800 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <motion.p initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
            {language === 'br' ? 'Portfólio atualizado' : 'Updated portfolio'}
          </motion.p>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-4xl text-4xl font-bold leading-tight text-gray-950 dark:text-gray-50 sm:text-5xl lg:text-6xl">{data.home.title}</motion.h1>
        </div>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg">{data.home.description}</motion.p>
      </section>
      <ProjectGrid />
    </motion.div>
  );
};

export default HomePage;
