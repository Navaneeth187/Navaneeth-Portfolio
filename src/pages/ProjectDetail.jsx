import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ExternalLink, Code2, CheckCircle2, Rocket, 
  AlertTriangle, Target, Lightbulb, Wrench, Layers,
  Database, Shield, Scale, ArrowRightLeft
} from 'lucide-react';
import { allProjects } from '../data/projects';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = allProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="text-center py-20 flex flex-col items-center">
        <AlertTriangle className="text-orangeAccent mb-4" size={48} />
        <h2 className="text-2xl font-bold text-textMain mb-4">Project Not Found</h2>
        <p className="text-textMuted mb-8">The project you are looking for doesn't exist or has been moved.</p>
        <Link to="/projects" className="px-6 py-3 bg-cardBg border border-cardBorder rounded-full text-textMain hover:border-primary transition-colors inline-flex items-center gap-2">
          <ArrowLeft size={18} /> Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 pb-10">
      <Link 
        to="/projects" 
        className="inline-flex items-center gap-2 text-textMuted hover:text-textMain transition-colors w-fit px-4 py-2 -ml-4 rounded-lg hover:bg-cardBg"
        aria-label="Back to projects list"
      >
        <ArrowLeft size={18} />
        Back to Projects
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Section */}
        <div className="mb-10">
           <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${project.tagColor}`}>
                {project.type}
              </span>
              <span className="inline-block text-xs font-mono px-3 py-1 rounded-full border border-cardBorder bg-cardBg text-textMuted">
                {project.status || 'Completed'}
              </span>
              <span className="inline-block text-xs font-mono px-3 py-1 rounded-full border border-cardBorder bg-cardBg text-textMuted">
                {project.year}
              </span>
           </div>
           
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-textMain mb-6 tracking-tight">
             {project.title}
           </h1>
           <p className="text-xl md:text-2xl text-primary font-light max-w-3xl">
             {project.subtitle}
           </p>
        </div>

        {/* Hero Visual Area - Technical Terminal */}
        <div className="w-full bg-[#0F111A] border border-cardBorder rounded-2xl overflow-hidden shadow-2xl mb-16 font-mono text-sm">
           <div className="h-10 bg-[#1A1D27] border-b border-cardBorder flex items-center px-4 justify-between">
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs text-textDarker">{project.id}.md</div>
           </div>
           <div className="p-6 md:p-8 text-textMuted">
              <div className="flex gap-4">
                 <span className="text-primary font-bold">❯</span>
                 <span><span className="text-cyanAccent">init</span> <span className="text-textMain">System.Architecture</span></span>
              </div>
              <div className="flex gap-4 mt-2 pl-7 text-textDarker border-l-2 border-cardBorder/50 ml-[5px]">
                 Building stack context...
              </div>
              <div className="flex gap-4 mt-2">
                 <span className="text-primary font-bold">❯</span>
                 <span><span className="text-secondary">print</span> config.tech_stack</span>
              </div>
              <div className="flex gap-4 mt-2 pl-7 flex-wrap">
                 [{project.tech.map(t => `'${t}'`).join(', ')}]
              </div>
              <div className="flex gap-4 mt-6">
                 <span className="text-primary font-bold animate-pulse">_</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Main Case Study Content (Left) */}
           <div className="lg:col-span-2 space-y-16">
              
              {/* Problem Statement */}
              <section>
                 <h2 className="text-2xl font-bold text-textMain mb-6 flex items-center gap-3">
                   <Target className="text-primary" size={24} />
                   Problem Context
                 </h2>
                 <p className="text-lg text-textMuted leading-relaxed mb-6">
                   {project.longDescription}
                 </p>
                 {project.problemStatement && (
                   <div className="p-6 bg-cardBg border-l-4 border-primary rounded-r-2xl text-textMain leading-relaxed italic shadow-md">
                     "{project.problemStatement}"
                   </div>
                 )}
              </section>

              {/* System Architecture Flow */}
              <section>
                 <h2 className="text-2xl font-bold text-textMain mb-6 flex items-center gap-3">
                   <Layers className="text-cyanAccent" size={24} />
                   System Design & Architecture
                 </h2>
                 <p className="text-lg text-textMuted leading-relaxed mb-6">
                   {project.architectureDescription}
                 </p>
                 
                 {/* Visual Flow Representation */}
                 <ArchitectureDiagram flowSteps={project.flowSteps} />
              </section>

              {/* Deep Engineering Analysis Grid */}
              <section>
                <h2 className="text-2xl font-bold text-textMain mb-6">Engineering Decisions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {project.databaseDesign && (
                     <div className="bg-cardBg border border-cardBorder p-6 rounded-xl hover:border-primary/30 transition-colors">
                       <h3 className="flex items-center gap-2 text-textMain font-bold mb-3"><Database size={18} className="text-primary"/> Database Design</h3>
                       <p className="text-sm text-textMuted leading-relaxed">{project.databaseDesign}</p>
                     </div>
                   )}
                   {project.scalingConsiderations && (
                     <div className="bg-cardBg border border-cardBorder p-6 rounded-xl hover:border-cyanAccent/30 transition-colors">
                       <h3 className="flex items-center gap-2 text-textMain font-bold mb-3"><Scale size={18} className="text-cyanAccent"/> Scaling Strategy</h3>
                       <p className="text-sm text-textMuted leading-relaxed">{project.scalingConsiderations}</p>
                     </div>
                   )}
                   {project.tradeoffs && (
                     <div className="bg-cardBg border border-cardBorder p-6 rounded-xl hover:border-orangeAccent/30 transition-colors">
                       <h3 className="flex items-center gap-2 text-textMain font-bold mb-3"><ArrowRightLeft size={18} className="text-orangeAccent"/> Architectural Tradeoffs</h3>
                       <p className="text-sm text-textMuted leading-relaxed">{project.tradeoffs}</p>
                     </div>
                   )}
                   {project.securityMeasures && (
                     <div className="bg-cardBg border border-cardBorder p-6 rounded-xl hover:border-secondary/30 transition-colors">
                       <h3 className="flex items-center gap-2 text-textMain font-bold mb-3"><Shield size={18} className="text-secondary"/> Security Measures</h3>
                       <p className="text-sm text-textMuted leading-relaxed">{project.securityMeasures}</p>
                     </div>
                   )}
                </div>
              </section>

              {/* Technical Challenges */}
              <section>
                 <h2 className="text-2xl font-bold text-textMain mb-6 flex items-center gap-3">
                   <Wrench className="text-orangeAccent" size={24} />
                   Implementation Challenges
                 </h2>
                 <ul className="space-y-4">
                   {project.challenges?.map((challenge, idx) => (
                     <li key={idx} className="flex gap-4 items-start p-4 bg-background border border-cardBorder rounded-xl hover:border-orangeAccent/30 transition-colors">
                       <AlertTriangle className="text-orangeAccent shrink-0 mt-1" size={20} />
                       <span className="text-textMuted leading-relaxed">{challenge}</span>
                     </li>
                   ))}
                 </ul>
              </section>

              {/* Key Features */}
              <section>
                 <h2 className="text-2xl font-bold text-textMain mb-6 flex items-center gap-3">
                   <Lightbulb className="text-secondary" size={24} />
                   Core Features
                 </h2>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {project.features.map((feature, idx) => (
                     <li key={idx} className="flex gap-3 items-start p-4 bg-cardBg border border-cardBorder rounded-xl shadow-sm">
                       <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={18} />
                       <span className="text-textMuted text-sm leading-relaxed">{feature}</span>
                     </li>
                   ))}
                 </ul>
              </section>
           </div>

           {/* Sticky Sidebar (Right) */}
           <div className="space-y-8 lg:sticky lg:top-32 h-fit">
              <div className="bg-cardBg border border-cardBorder p-8 rounded-2xl shadow-xl">
                 <h3 className="text-lg font-bold text-textMain mb-6 flex items-center gap-2">
                   <Rocket size={20} className="text-primary" />
                   Business Impact
                 </h3>
                 <p className="text-textMuted leading-relaxed mb-4">{project.outcomes}</p>
                 <div className="p-4 bg-background border border-primary/20 rounded-xl text-primary font-mono text-sm text-center shadow-[inset_0_0_10px_rgba(168,255,53,0.05)]">
                    {project.keyMetrics}
                 </div>
                 
                 <div className="h-px w-full bg-cardBorder my-8"></div>
                 
                 <h3 className="text-sm font-bold text-textDarker uppercase tracking-wider mb-4">Production Stack</h3>
                 <div className="flex flex-wrap gap-2 mb-8">
                   {project.tech.map(t => (
                     <span key={t} className="px-3 py-1.5 bg-background border border-cardBorder hover:border-textMuted transition-colors rounded-lg text-sm text-textMuted font-mono">
                       {t}
                     </span>
                   ))}
                 </div>

                 <div className="flex flex-col gap-4 mt-8">
                    {project.demo ? (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-background font-bold rounded-xl hover:bg-secondary transition-colors" aria-label="View Live Demo">
                        <ExternalLink size={18} /> Live Demo
                      </a>
                    ) : (
                      <div className="flex items-center justify-center gap-2 w-full py-4 bg-background border border-cardBorder text-textDarker font-semibold rounded-xl cursor-not-allowed group relative" aria-label="Demo Unavailable">
                        <ExternalLink size={18} /> 
                        <span>Deploy Offline</span>
                        <div className="absolute inset-0 bg-cardBg border border-cardBorder rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-xs font-mono">Cost optimized</span>
                        </div>
                      </div>
                    )}
                    
                    {project.github ? (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-transparent border border-cardBorder text-textMain font-bold rounded-xl hover:border-primary transition-colors" aria-label="View Source Code on GitHub">
                        <Code2 size={18} /> Source Code
                      </a>
                    ) : (
                       <div className="flex items-center justify-center gap-2 w-full py-4 bg-background border border-cardBorder text-textDarker font-semibold rounded-xl cursor-not-allowed">
                        <Code2 size={18} /> Proprietary Core
                      </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
