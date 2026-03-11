import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import projectsYaml from '../data/projects.yaml?raw';
import YAML from 'yaml';

const projects = YAML.parse(projectsYaml);

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p: any) => p.id === id);

  if (!project) {
    return (
      <div className="h-full w-full flex items-center justify-center text-white">
        Project not found
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="h-full w-full flex flex-col md:flex-row overflow-y-auto"
    >
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative p-8 md:p-16 flex items-center justify-center">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full max-w-md aspect-square object-cover shadow-2xl" 
        />
      </div>
      
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col overflow-y-auto">
        <Link to="/projects" className="text-[10px] tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors mb-8 font-sans w-fit hover-trigger">
          ← BACK TO PROJECTS
        </Link>
        
        <h2 className="font-sans font-bold text-3xl md:text-5xl tracking-wide text-white mb-2">{project.title}</h2>
        {project.artist && (
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-8 border-b border-white/20 pb-4 font-sans">{project.artist}</p>
        )}
        
        {project.description && (
          <p className="font-sans text-sm text-white/90 leading-loose mb-8">
            {project.description}
          </p>
        )}

        {project.credits && (
          <div className="font-sans text-[10px] md:text-xs text-white/80 leading-loose whitespace-pre-wrap mb-12">
            {project.credits}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-auto">
          {project.links?.map((link: any, i: number) => (
            <a key={i} href={link.url} target="_blank" rel="noreferrer" className="font-sans text-[10px] tracking-[0.3em] uppercase border border-white/30 text-white/80 px-6 py-3 hover:bg-white hover:text-black transition-colors w-fit hover-trigger">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
