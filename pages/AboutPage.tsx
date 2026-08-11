import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Box, Code2, Cpu, Network, Terminal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const icons = [Cpu, Network, Box, Terminal, Code2];

const AboutPage: React.FC = () => {
  const { data, language } = useLanguage();
  const { profile, skills } = data;
  const highlights = ['Unity/C#', 'Online & Backend', 'Three.js/WebGL', 'VR/AR'];
  const avatarSrc = profile.avatarUrl.startsWith('http') || profile.avatarUrl.startsWith('/')
    ? profile.avatarUrl
    : `${import.meta.env.BASE_URL}${profile.avatarUrl}`;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
          <img src={avatarSrc} alt={profile.name} className="h-full min-h-[360px] w-full object-cover" />
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">{language === 'br' ? 'Desenvolvedor de sistemas interativos' : 'Interactive systems developer'}</p>
          <h1 className="text-4xl font-bold leading-tight text-gray-950 dark:text-gray-50 sm:text-5xl">{profile.name}</h1>
          <p className="mt-4 text-xl font-medium text-gray-800 dark:text-gray-200">{profile.role}</p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">{profile.headline}</p>
          <div className="mt-7 flex flex-wrap gap-2">{highlights.map(item => <span key={item} className="rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">{item}</span>)}</div>
          <Link to="/trabalhos" className="mt-8 inline-flex items-center rounded-md bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200">
            {data.labels.viewProjects}<ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
      <section className="mt-16 grid gap-8 border-y border-gray-200 py-12 dark:border-gray-800 lg:grid-cols-[0.75fr_1.25fr]">
        <h2 className="text-2xl font-semibold text-gray-950 dark:text-gray-50">{language === 'br' ? 'Perfil técnico curto e direto' : 'Short technical profile'}</h2>
        <div className="space-y-5">{profile.about.map((paragraph, index) => <p key={index} className="text-base leading-7 text-gray-600 dark:text-gray-300">{paragraph}</p>)}</div>
      </section>
      <section className="mt-14">
        <div className="mb-7 flex items-center gap-3"><Terminal className="h-6 w-6 text-indigo-500" /><h2 className="text-2xl font-semibold text-gray-950 dark:text-gray-50">{data.labels.skills}</h2></div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(skills).map(([category, items], index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div key={category} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-4 flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-md bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"><Icon className="h-5 w-5" /></div><h3 className="text-base font-semibold text-gray-950 dark:text-gray-50">{category}</h3></div>
                <div className="flex flex-wrap gap-2">{items.map(skill => <span key={skill} className="rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">{skill}</span>)}</div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;
