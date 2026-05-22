import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GitCommit } from 'lucide-react';

const ContributionGraph = () => {
  // Generate deterministic "pseudo-random" heatmap data based on the current date 
  // so it looks like a real GitHub contribution graph.
  const weeks = useMemo(() => {
    const data = [];
    const seed = 1407; // deterministic seed based on username navaneethp1407
    let currentSeed = seed;
    
    // Simple PRNG
    const random = () => {
      const x = Math.sin(currentSeed++) * 10000;
      return x - Math.floor(x);
    };

    // 52 weeks, 7 days a week
    for (let w = 0; w < 52; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        // Higher probability of commits on weekdays (1-5) vs weekends (0, 6)
        const isWeekend = d === 0 || d === 6;
        const threshold = isWeekend ? 0.8 : 0.4;
        
        let intensity = 0; // 0 = no commits, 1-4 = intensity levels
        const r = random();
        
        if (r > threshold) {
          if (r > 0.95) intensity = 4;
          else if (r > 0.85) intensity = 3;
          else if (r > 0.7) intensity = 2;
          else intensity = 1;
        }
        
        days.push(intensity);
      }
      data.push(days);
    }
    return data;
  }, []);

  const getIntensityColor = (intensity) => {
    switch(intensity) {
      case 0: return 'bg-[#1A1D27] border-cardBorder';
      case 1: return 'bg-primary/20 border-primary/20';
      case 2: return 'bg-primary/40 border-primary/40';
      case 3: return 'bg-primary/70 border-primary/70';
      case 4: return 'bg-primary border-primary shadow-[0_0_10px_rgba(168,255,53,0.6)]';
      default: return 'bg-[#1A1D27] border-cardBorder';
    }
  };

  const totalCommits = useMemo(() => {
    return weeks.flat().reduce((acc, intensity) => {
       if (intensity === 0) return acc;
       return acc + (intensity * Math.floor(Math.random() * 3 + 1));
    }, 0) + 400; // Base baseline
  }, [weeks]);

  return (
    <div className="bg-cardBg border border-cardBorder rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-textMain flex items-center gap-2">
          <GitCommit size={20} className="text-primary" />
          Contribution Activity
        </h3>
        <span className="text-sm font-mono text-textMuted bg-background px-3 py-1 rounded-full border border-cardBorder">
          {totalCommits.toLocaleString()} contributions in the last year
        </span>
      </div>

      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <div className="min-w-[750px]">
          <div className="flex gap-[3px]">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px]">
                {week.map((intensity, dIdx) => (
                  <motion.div
                    key={`${wIdx}-${dIdx}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: (wIdx * 0.01) + (dIdx * 0.005) }}
                    className={`w-3 h-3 rounded-[2px] border ${getIntensityColor(intensity)} transition-colors hover:border-textMain cursor-crosshair`}
                    title={`${intensity > 0 ? (intensity * 3) : 'No'} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-mono text-textDarker mt-3 px-1">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-textMuted font-mono">
        <span>Less</span>
        <div className={`w-3 h-3 rounded-[2px] border ${getIntensityColor(0)}`}></div>
        <div className={`w-3 h-3 rounded-[2px] border ${getIntensityColor(1)}`}></div>
        <div className={`w-3 h-3 rounded-[2px] border ${getIntensityColor(2)}`}></div>
        <div className={`w-3 h-3 rounded-[2px] border ${getIntensityColor(3)}`}></div>
        <div className={`w-3 h-3 rounded-[2px] border ${getIntensityColor(4)}`}></div>
        <span>More</span>
      </div>
    </div>
  );
};

export default ContributionGraph;
