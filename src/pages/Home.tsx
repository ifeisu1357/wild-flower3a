import { useEffect } from 'react';
import { motion } from 'motion/react';
import homeYaml from '../data/home.yaml?raw';
import YAML from 'yaml';

const homeData = YAML.parse(homeYaml);

export default function Home() {
  useEffect(() => {
    document.title = 'WILDFLOWER野花';

    const description = 'WILDFLOWER RUN THIS WORLD';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex-grow flex items-center justify-center relative w-full h-full overflow-hidden"
    >
      {homeData.videoUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {homeData.linkUrl ? (
            <a href={homeData.linkUrl} target="_blank" rel="noreferrer" className="block w-full h-full cursor-pointer">
              <video src={homeData.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50 hover:opacity-70 transition-opacity" />
            </a>
          ) : (
            <video src={homeData.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50 pointer-events-none" />
          )}
        </div>
      )}

      <div className="absolute bottom-12 right-6 md:bottom-24 md:right-24 pointer-events-none flex items-end gap-3 md:gap-10 z-10">
        <span className="text-white text-sm md:text-lg tracking-[0.1em] font-sans font-bold whitespace-nowrap mb-0.5 md:mb-2">一個概念。</span>
        <img src="/logo/logo.png" alt="WILDFLOWER" className="w-28 md:w-48 lg:w-64 object-contain" />
      </div>
    </motion.div>
  );
}
