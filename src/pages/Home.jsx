import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Cpu } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { allProjects } from '../data/projects';

const InteractiveTerminal = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([
    { type: 'system', content: 'NAV-OS v2.4.1 initialized.' },
    { type: 'system', content: 'Establishing secure connection to AI Systems Engineer profile...' },
    { type: 'system', content: 'Connection established. Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isTyping]);

  const commands = {
    help: 'Available commands: whoami, skills, projects, contact, clear',
    whoami: 'Navaneeth Babu. AI / LLM Systems Engineer & Automation Architect. Specializing in FastAPI, n8n, and Production ML.',
    skills: 'Loading tech stack...\n[CORE]: Python, JavaScript, C++\n[AI/ML]: GenAI, LLMs, NLP, TF-IDF\n[BACKEND]: FastAPI, Node.js, PostgreSQL\n[OPS]: n8n workflows, Git, Docker',
    projects: 'Routing to case studies...',
    contact: 'Routing to secure channel...',
    clear: ''
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === '') return;

    setHistory(prev => [...prev, { type: 'user', content: trimmedCmd }]);
    
    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    setIsTyping(true);
    
    setTimeout(() => {
      if (commands[trimmedCmd]) {
        setHistory(prev => [...prev, { type: 'response', content: commands[trimmedCmd] }]);
        if (trimmedCmd === 'projects') setTimeout(() => navigate('/projects'), 1000);
        if (trimmedCmd === 'contact') setTimeout(() => navigate('/contact'), 1000);
      } else {
        setHistory(prev => [...prev, { type: 'error', content: `Command not found: ${trimmedCmd}. Type "help" for available commands.` }]);
      }
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="w-full bg-[#0F111A] border border-cardBorder rounded-xl overflow-hidden shadow-[0_10px_40px_-15px_rgba(168,255,53,0.3)] flex flex-col font-mono text-sm md:text-base h-[350px]">
      {/* Terminal Header */}
      <div className="h-10 bg-[#1A1D27] border-b border-cardBorder flex items-center px-4 gap-2 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="ml-4 text-xs text-textDarker flex-1 text-center pr-12">navaneeth@production-env:~</div>
      </div>
      
      {/* Terminal Body */}
      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2 relative">
        <div className="absolute inset-0 bg-hero-grid opacity-10 pointer-events-none"></div>
        {history.map((line, idx) => (
          <div key={idx} className="relative z-10">
            {line.type === 'user' && (
              <div className="flex gap-3 text-textMain">
                <span className="text-primary font-bold">❯</span>
                {line.content}
              </div>
            )}
            {line.type === 'response' && (
              <div className="text-textMuted whitespace-pre-wrap pl-5 border-l border-cardBorder/50 py-1 my-1">
                {line.content}
              </div>
            )}
            {line.type === 'error' && (
              <div className="text-red-400 pl-5">
                {line.content}
              </div>
            )}
            {line.type === 'system' && (
              <div className="text-cyanAccent/70 italic">
                {line.content}
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3 text-textMuted relative z-10">
            <span className="text-primary font-bold">❯</span>
            <span className="flex gap-1 items-center">
              Processing<span className="animate-pulse">...</span>
            </span>
          </div>
        )}

        <form 
          onSubmit={(e) => { e.preventDefault(); handleCommand(input); setInput(''); }}
          className="flex gap-3 text-textMain relative z-10 mt-1"
        >
          <span className="text-primary font-bold">❯</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            className="flex-1 bg-transparent outline-none border-none focus:ring-0 p-0 m-0 caret-primary"
            autoFocus
            autoComplete="off"
            spellCheck="false"
            aria-label="Terminal command input"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

const Home = () => {
  const featuredProjects = allProjects.slice(0, 3);

  return (
    <div className="flex flex-col gap-32 pb-10">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col justify-center relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 overflow-hidden hero-grid">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
        </div>

        <div className="z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-12">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-8 font-mono shadow-[0_0_15px_rgba(168,255,53,0.1)]">
              <Cpu size={16} />
              <span>AI Engineer & Automation Architect</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
              <span className="block text-textMain">Navaneeth Babu</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-cyanAccent animate-gradient-shift bg-300%">
                AI & Systems Engineer
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-textMuted max-w-xl mb-10 font-light leading-relaxed">
              I am an AI Systems Engineer specializing in building production-grade <strong className="text-textMain font-medium">FastAPI backends</strong>, orchestrating complex <strong className="text-textMain font-medium">n8n workflows</strong>, and architecting <strong className="text-textMain font-medium">context-aware LLM agents</strong> that solve real business bottlenecks.
            </p>
            
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 items-stretch sm:items-center">
              <Link
                to="/projects"
                className="group w-full sm:w-auto px-8 py-4 bg-primary text-background font-bold rounded-xl hover:bg-secondary transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,255,53,0.2)] hover:shadow-[0_0_30px_rgba(168,255,53,0.4)] focus:outline-none focus:ring-4 focus:ring-primary/40"
              >
                View Engineering Case Studies
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Interactive Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full mt-10 lg:mt-0"
          >
             <InteractiveTerminal />
          </motion.div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-textMain mb-3">Featured Engineering Work</h2>
            <p className="text-textMuted max-w-xl">Deep dives into system architecture, data pipelines, and workflow automation challenges I've solved.</p>
          </div>
          <Link to="/projects" className="text-primary font-medium hover:underline hidden sm:flex items-center gap-1 group focus:outline-none focus:ring-2 focus:ring-primary rounded-sm">
            View All Projects
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} {...project} delay={index * 0.1} />
          ))}
        </div>
        
        <div className="mt-10 text-center sm:hidden">
          <Link to="/projects" className="inline-flex px-6 py-3 border border-cardBorder rounded-xl text-primary hover:bg-cardBg transition-colors font-medium">
            View All Projects &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
