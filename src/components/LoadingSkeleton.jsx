import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center">
      <div className="relative flex flex-col items-center justify-center">
        {/* Animated glowing rings */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-32 h-32 rounded-full border border-primary/20 bg-primary/5 blur-sm"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className="absolute w-40 h-40 rounded-full border border-cyanAccent/10 bg-cyanAccent/5 blur-md"
        />
        
        {/* Core processing unit visual */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-cardBg border border-cardBorder rounded-xl flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(168,255,53,0.1)]">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
             />
          </div>
          <div className="flex gap-2 items-center">
             <span className="text-primary font-mono text-xs uppercase tracking-widest font-bold">Initializing Module</span>
             <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
