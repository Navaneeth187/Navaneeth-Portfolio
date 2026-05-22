import { Code2, Briefcase, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-12 mt-20 border-t border-cardBorder bg-background-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-textMain tracking-tight">
              Navaneeth<span className="text-primary">.</span>
            </h3>
            <p className="text-textMuted text-sm mt-2 max-w-sm">
              Building intelligent systems and automating workflows, one model at a time.
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="https://github.com/Navaneeth187" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-cardBg border border-cardBorder flex items-center justify-center text-textMuted hover:text-primary hover:border-primary transition-all duration-300" aria-label="GitHub Profile">
              <Code2 size={20} />
            </a>
            <a href="https://linkedin.com/in/navaneeth-babu-pandiripalli-9b2447287" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-cardBg border border-cardBorder flex items-center justify-center text-textMuted hover:text-primary hover:border-primary transition-all duration-300" aria-label="LinkedIn Profile">
              <Briefcase size={20} />
            </a>
            <a href="mailto:navaneethp1407@gmail.com" className="w-10 h-10 rounded-full bg-cardBg border border-cardBorder flex items-center justify-center text-textMuted hover:text-primary hover:border-primary transition-all duration-300" aria-label="Email Me">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-cardBorder/50">
          <p className="text-xs text-textDarker">
            &copy; {new Date().getFullYear()} Pandiripalli Navaneeth Babu. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0 text-xs text-textDarker">
            <span>Engineered with React & Vite</span>
            <span>•</span>
            <span>Styled with Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
