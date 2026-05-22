import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import GitHubStats from '../components/GitHubStats';
import { allProjects } from '../data/projects';
import { Sparkles, Code2 } from 'lucide-react';

const filterTags = ['All', 'Generative AI', 'Automation Backend', 'Full Stack AI', 'Data Engineering'];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? allProjects
    : allProjects.filter(p => p.type === activeFilter);

  return (
    <div className="flex flex-col gap-16 pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6 font-mono">
          <Sparkles size={14} />
          <span>Engineering Case Studies</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-textMain mb-6 tracking-tight">Work & Projects</h1>
        <p className="text-textMuted text-lg leading-relaxed">
          Each project below is a real engineering challenge — from architecting data pipelines to building LLM-powered agents. Click into any project to read the full technical case study.
        </p>
      </motion.div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-3" role="tablist" aria-label="Filter projects by category">
        {filterTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            role="tab"
            aria-selected={activeFilter === tag}
            className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
              activeFilter === tag
                ? 'bg-primary text-background border-primary font-bold shadow-[0_0_15px_rgba(168,255,53,0.2)]'
                : 'bg-cardBg text-textMuted border-cardBorder hover:border-textMuted hover:text-textMain'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} {...project} delay={index * 0.1} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-cardBg border border-cardBorder rounded-2xl">
          <Code2 className="text-textDarker mx-auto mb-4" size={40} />
          <p className="text-textMuted">No projects found for this category.</p>
          <button
            onClick={() => setActiveFilter('All')}
            className="text-primary hover:underline mt-3 text-sm font-medium"
          >
            Show All Projects
          </button>
        </div>
      )}

      {/* GitHub Integration */}
      <section className="pt-10 border-t border-cardBorder">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-textMain mb-3">Open Source & Activity</h2>
          <p className="text-textMuted">Live data from my GitHub profile — repositories, contributions, and recent work.</p>
        </div>
        <GitHubStats />
      </section>
    </div>
  );
};

export default Projects;
