import { Link } from 'react-router-dom';
import { ArrowUpRight, Code2, Server, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ id, title, subtitle, type, tagColor, description, tech, status, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-cardBg border border-cardBorder rounded-2xl overflow-hidden hover:border-primary transition-all duration-300 card-hover flex flex-col h-full shadow-lg"
    >
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <div className="flex justify-between items-start mb-4 gap-2">
          <div>
            <h3 className="text-xl font-bold text-textMain group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </h3>
            <p className="text-sm text-textMuted font-medium mt-1">{subtitle}</p>
          </div>
          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border whitespace-nowrap shrink-0 ${tagColor}`}>
            {type}
          </span>
        </div>
        
        <p className="text-textMuted text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
          {description}
        </p>

        {/* Technical complexity row */}
        {status && (
          <div className="flex items-center gap-2 mb-4">
             <div className="flex items-center gap-1.5 text-xs font-mono px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded">
                <Server size={12} />
                {status}
             </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {tech && tech.slice(0, 3).map((t, index) => (
            <span key={index} className="text-xs font-mono px-2 py-1 bg-background border border-cardBorder rounded text-textDarker group-hover:border-textMuted/50 transition-colors">
              {t}
            </span>
          ))}
          {tech && tech.length > 3 && (
            <span className="text-xs font-mono px-2 py-1 bg-background border border-cardBorder rounded text-textDarker flex items-center justify-center min-w-[28px]">
              +{tech.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-cardBorder mt-auto">
          <Link
            to={`/projects/${id}`}
            className="text-sm font-bold text-textMain group-hover:text-primary flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-sm"
            aria-label={`View detailed case study for ${title}`}
          >
            Read Case Study <ArrowUpRight size={16} />
          </Link>
          
          <div className="flex gap-3">
             <a 
               href={`https://github.com/Navaneeth187/${id}`} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-textMuted hover:text-textMain transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-sm" 
               aria-label={`View ${title} repository on GitHub`}
             >
                <Code2 size={18} />
             </a>
          </div>
        </div>
      </div>
      
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

export default ProjectCard;
