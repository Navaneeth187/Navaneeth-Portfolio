import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-orangeAccent/10 rounded-full flex items-center justify-center mb-8">
          <AlertTriangle className="text-orangeAccent" size={48} />
        </div>
        
        <h1 className="text-6xl font-bold text-textMain mb-4 font-mono">404</h1>
        <h2 className="text-2xl font-bold text-textMain mb-4">Route Not Found</h2>
        <p className="text-textMuted text-lg mb-10 max-w-md">
          The page you're looking for doesn't exist or has been moved. Check the URL or navigate back.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-background font-bold rounded-xl hover:bg-secondary transition-colors focus:outline-none focus:ring-4 focus:ring-primary/40"
          >
            <Home size={18} /> Back to Home
          </Link>
          <Link
            to="/projects"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-cardBg border border-cardBorder text-textMain font-semibold rounded-xl hover:border-primary transition-colors"
          >
            <ArrowLeft size={18} /> View Projects
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
