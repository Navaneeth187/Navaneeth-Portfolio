import { motion } from 'framer-motion';
import { 
  Award, Briefcase, GraduationCap, Code2, Database, Bot, Wrench, Download, 
  Terminal, Workflow, ServerCog, Cpu, BarChart3, LineChart
} from 'lucide-react';
import photo from '../assets/photo.png';

const TimelineItem = ({ year, title, subtitle, icon: Icon, isLast, bullets }) => (
  <div className="relative pl-8 pb-12">
    {!isLast && <div className="timeline-line"></div>}
    <div className="timeline-dot flex items-center justify-center"></div>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
      <h3 className="text-xl font-bold text-textMain">{title}</h3>
      <span className="text-primary font-mono text-sm mt-1 sm:mt-0 bg-primary/10 px-3 py-1 rounded-full border border-primary/20 shrink-0">{year}</span>
    </div>
    <h4 className="text-lg text-textMuted font-medium mb-4 flex items-center gap-2">
      <Icon size={18} className="text-textDarker" />
      {subtitle}
    </h4>
    {bullets && (
      <ul className="space-y-3 mt-4">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex gap-3 items-start">
            <span className="text-primary mt-1 text-xs">▹</span>
            <span className="text-textMuted text-sm leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const SkillCategory = ({ title, icon: Icon, skills, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4, delay }}
    className="bg-cardBg border border-cardBorder rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_30px_-15px_rgba(168,255,53,0.2)]"
  >
    <div className="flex items-center gap-3 mb-5 border-b border-cardBorder pb-4 group-hover:border-primary/20 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-textMuted group-hover:text-primary group-hover:bg-primary/10 transition-colors">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-bold text-textMain">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map(skill => (
        <span key={skill} className="px-3 py-1.5 bg-background border border-cardBorder rounded-lg text-sm text-textMuted group-hover:border-textMuted/30 transition-colors cursor-default font-mono">
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

const About = () => {
  return (
    <div className="flex flex-col gap-24 pb-10">
      {/* Engineering Philosophy Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row gap-16 items-start"
      >
        <div className="w-full lg:w-1/3">
          <div className="aspect-square bg-[#141722] border border-cardBorder rounded-3xl overflow-hidden relative group p-4 shadow-xl">
             <div className="absolute inset-0 bg-hero-grid opacity-20 group-hover:opacity-30 transition-opacity"></div>
             
             {/* Profile Photo */}
             <div className="w-full h-full relative overflow-hidden rounded-2xl border border-cardBorder group-hover:border-primary/30 transition-colors">
                <img 
                  src={photo} 
                  alt="Navaneeth Babu" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60"></div>
             </div>
          </div>
        </div>
        
        <div className="w-full lg:w-2/3">
          <h1 className="text-4xl md:text-5xl font-bold text-textMain mb-6 tracking-tight">Engineering Philosophy</h1>
          <div className="space-y-6 text-lg text-textMuted leading-relaxed">
            <p>
              I build <strong className="text-textMain font-medium">production-ready AI systems</strong> that automate the repetitive and amplify the meaningful. Currently pursuing my B.Tech at National Institute of Technology Durgapur, my focus is bridging the gap between theoretical ML models and robust, deployable backend architecture.
            </p>
            <p>
              During my time as an AI/Data Intern at <strong className="text-textMain font-medium">Upstride</strong>, I engineered automated ETL pipelines using Pandas and SQL that eliminated 100% of manual transformation errors for super distributors. I don't just write scripts; I design resilient workflows using tools like <strong className="text-primary font-medium">n8n and FastAPI</strong>.
            </p>
            <p>
              I thrive in high-pressure engineering constraints, recently securing <strong className="text-primary font-medium">2nd Place at the IEEE GenAI Hackathon</strong> by architecting a context-aware RAG system in under 48 hours. I'm currently focused on expanding my expertise in Vector Search (Qdrant) and LLM Orchestration (LangChain).
            </p>
          </div>
          
          <div className="mt-10">
            <a
              href="/Navaneeth_Babu_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Navaneeth_Babu_Resume.pdf"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background font-bold rounded-xl hover:bg-secondary transition-all shadow-[0_0_15px_rgba(168,255,53,0.2)] hover:shadow-[0_0_25px_rgba(168,255,53,0.4)]"
            >
              <Download size={20} />
              Download Resume
            </a>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Experience Timeline */}
        <section>
          <div className="flex items-center gap-3 mb-10">
            <Briefcase className="text-primary" size={28} />
            <h2 className="text-3xl font-bold text-textMain">Experience</h2>
          </div>
          <div className="relative">
            <TimelineItem 
              year="Mar - May 2026"
              title="AI & Data Analysis Intern"
              subtitle="Upstride (Remote)"
              icon={ServerCog}
              bullets={[
                "Engineered robust ETL pipelines using Python (Pandas/SQL) to automate raw data ingestion from super distributors, reducing manual processing time significantly.",
                "Built an autonomous reporting engine that integrated directly with the Apex CRM ecosystem, deploying complex data visualization workflows.",
                "Implemented rigorous error-handling and data validation schemas to ensure zero-fault propagation in business intelligence reports."
              ]}
            />
            <TimelineItem 
              year="2024 - Present"
              title="Content & Technical Writer"
              subtitle="National Service Scheme (NSS), NIT Durgapur"
              icon={Terminal}
              bullets={[
                "Authored technical content and orchestrated communication strategies across multiple campus chapters.",
                "Collaborated with cross-functional teams to deliver high-impact social initiatives."
              ]}
            />
            <TimelineItem 
              year="2025 - Present"
              title="Creative Designer"
              subtitle="Entrepreneurship Cell, NIT Durgapur"
              icon={Workflow}
              isLast={true}
              bullets={[
                "Designed visual assets and branding for high-scale entrepreneurial events."
              ]}
            />
          </div>
        </section>

        {/* Education & Achievements */}
        <section className="flex flex-col gap-16">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <GraduationCap className="text-primary" size={28} />
              <h2 className="text-3xl font-bold text-textMain">Education</h2>
            </div>
            <div className="relative">
              <TimelineItem 
                year="2024 - 2028"
                title="B.Tech, Mechanical Engineering"
                subtitle="National Institute of Technology Durgapur"
                icon={GraduationCap}
                bullets={["CGPA: 7.3 | Core focus heavily augmented with self-directed Computer Science and AI/ML coursework."]}
              />
              <TimelineItem 
                year="2023"
                title="Intermediate Board (XII)"
                subtitle="Narayana College, Vishakapatanam"
                icon={GraduationCap}
                isLast={true}
                bullets={["Score: 94.4% | Physics, Chemistry, Mathematics"]}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-primary" size={28} />
              <h2 className="text-3xl font-bold text-textMain">Engineering Achievements</h2>
            </div>
            <div className="bg-cardBg border border-cardBorder rounded-2xl p-8 relative overflow-hidden group hover:border-primary/30 transition-colors">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors"></div>
               <h3 className="text-xl font-bold text-textMain mb-3 flex items-center gap-2">
                 <span className="text-primary text-2xl">🏆</span> 
                 2nd Place - IEEE GenAI Hackathon
               </h3>
               <p className="text-textMuted mb-5 text-sm font-mono border-b border-cardBorder pb-4 inline-block">NIT Durgapur, 2026</p>
               <ul className="space-y-2">
                  <li className="flex gap-2 text-sm text-textMuted"><span className="text-primary">▹</span> Architected "Lumina" (AI wellness companion) in 48 hours.</li>
                  <li className="flex gap-2 text-sm text-textMuted"><span className="text-primary">▹</span> Handled real-time conversational state management and prompt engineering.</li>
               </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Tech Stack */}
      <section className="pt-10 border-t border-cardBorder">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-sm text-primary mb-4 font-mono">
            <Code2 size={16} />
            <span>Production Stack</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-textMain mb-4 tracking-tight">Technical Arsenal</h2>
          <p className="text-textMuted max-w-2xl mx-auto text-lg">A comprehensive breakdown of the tools, languages, and frameworks I use to engineer robust backend systems and AI pipelines.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCategory 
            title="AI & Machine Learning"
            icon={Bot}
            delay={0.1}
            skills={['Generative AI', 'LLMs', 'NLP', 'TF-IDF', 'Gemini API', 'Prompt Engineering']}
          />
          <SkillCategory 
            title="Backend Systems"
            icon={ServerCog}
            delay={0.2}
            skills={['Python', 'FastAPI', 'Node.js', 'REST APIs', 'Async IO']}
          />
          <SkillCategory 
            title="Workflow Automation"
            icon={Workflow}
            delay={0.3}
            skills={['n8n', 'Webhooks', 'API Integrations', 'Cron Jobs']}
          />
          <SkillCategory 
            title="Data Engineering"
            icon={Database}
            delay={0.4}
            skills={['SQL', 'PostgreSQL', 'Pandas', 'ETL Pipelines', 'Data Cleansing']}
          />
          <SkillCategory 
            title="Languages & Core"
            icon={Terminal}
            delay={0.5}
            skills={['Python', 'JavaScript', 'C/C++', 'HTML/CSS']}
          />
          <SkillCategory 
            title="DevOps & Tools"
            icon={Wrench}
            delay={0.6}
            skills={['Git / GitHub', 'Streamlit', 'Vercel', 'Jupyter', 'Postman']}
          />
        </div>
      </section>
    </div>
  );
};

export default About;
