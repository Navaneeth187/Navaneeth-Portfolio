import { motion } from 'framer-motion';
import { ArrowRight, Database, Server, Cpu, Globe, Cloud, Bot, Smartphone } from 'lucide-react';

const iconMap = {
  'client': Globe,
  'mobile': Smartphone,
  'api': Server,
  'db': Database,
  'llm': Bot,
  'cloud': Cloud,
  'processor': Cpu
};

const ArchitectureDiagram = ({ flowSteps = [] }) => {
  if (!flowSteps || flowSteps.length === 0) return null;

  return (
    <div className="w-full bg-[#0F111A] border border-cardBorder rounded-2xl p-8 overflow-x-auto shadow-2xl mt-8 mb-12">
      <h3 className="text-sm font-mono text-textMuted uppercase tracking-widest mb-8 text-center border-b border-cardBorder/50 pb-4">
        System Architecture Flow
      </h3>
      
      <div className="flex items-center justify-center min-w-[600px] gap-4 py-4">
        {flowSteps.map((step, idx) => {
          const Icon = iconMap[step.icon] || Server;
          const isLast = idx === flowSteps.length - 1;
          
          return (
            <div key={idx} className="flex items-center">
              {/* Node */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="flex flex-col items-center gap-3 relative z-10 group"
              >
                <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-lg
                  ${step.highlight 
                    ? 'bg-primary/10 border-primary text-primary shadow-[0_0_20px_rgba(168,255,53,0.3)]' 
                    : 'bg-background border-cardBorder text-textMuted group-hover:border-primary/50 group-hover:text-textMain'
                  }`}
                >
                  <Icon size={28} />
                </div>
                <div className="text-center w-28">
                  <span className="block text-xs font-bold text-textMain">{step.label}</span>
                  <span className="block text-[10px] text-textDarker font-mono mt-1 leading-tight">{step.desc}</span>
                </div>
              </motion.div>

              {/* Edge (Connecting Line) */}
              {!isLast && (
                <div className="w-16 h-0.5 bg-cardBorder mx-2 relative overflow-hidden flex items-center shrink-0 mt-[-40px]">
                  <motion.div
                    animate={{ x: [-20, 60] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: idx * 0.2 }}
                    className="absolute w-8 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent blur-[1px]"
                  />
                  <ArrowRight size={14} className="absolute right-[-2px] text-cardBorder bg-[#0F111A]" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
