import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import projectsYaml from '../data/projects.yaml?raw';
import YAML from 'yaml';

const projects = YAML.parse(projectsYaml);

import { Lock } from 'lucide-react';

const getTargetTime = (dateStr: string) => {
  let targetString = dateStr;
  if (targetString.endsWith('Z')) {
    targetString = targetString.slice(0, -1) + '+08:00';
  } else if (!targetString.includes('+') && !targetString.includes('-')) {
    targetString += '+08:00';
  }
  return new Date(targetString).getTime();
};

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const target = getTargetTime(targetDate);

    const update = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft('');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${days}D ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <div className="mt-2">
      <span className="text-white font-mono text-[10px] md:text-sm tracking-widest">{timeLeft}</span>
    </div>
  );
}

export default function Projects() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '專案 - WILDFLOWER野花';

    const description = 'WILDFLOWER RUN THIS WORLD';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  const handleProjectClick = (project: any) => {
    if (project.publishDate) {
      const isFuture = getTargetTime(project.publishDate) > new Date().getTime();
      if (isFuture) return; // Disable click if countdown is active
    }
    navigate(`/project/${project.id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="h-full w-full flex flex-col px-8 md:px-16 overflow-y-auto"
    >
      <div className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0 w-full max-w-3xl mx-auto shadow-lg md:shadow-2xl shadow-black/50">
          {projects.map((project: any, index: number) => {
            const isFuture = project.publishDate && getTargetTime(project.publishDate) > new Date().getTime();

            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                key={project.id} 
                className={`aspect-square relative group overflow-hidden bg-[#151515] ${isFuture ? 'cursor-default' : 'hover-trigger cursor-pointer'}`}
                onClick={() => handleProjectClick(project)}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6 z-20">
                  <h3 className="font-sans font-bold text-sm md:text-lg tracking-widest text-white mb-1">{project.title}</h3>
                  {project.artist && (
                    <p className="text-[8px] md:text-[10px] tracking-[0.2em] text-white/70 uppercase font-sans">{project.artist}</p>
                  )}
                  {isFuture && <Countdown targetDate={project.publishDate} />}
                </div>
              </motion.div>
            );
          })}

          {/* COMING SOON BLOCK */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: projects.length * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-square bg-[#161616] flex items-center justify-center"
          >
            <span className="text-white/30 tracking-[0.2em] text-[9px] md:text-sm uppercase font-sans">COMING SOON</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
