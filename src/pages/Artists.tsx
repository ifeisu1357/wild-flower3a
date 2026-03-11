import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import artistsYaml from '../data/artists.yaml?raw';
import YAML from 'yaml';

const artists = YAML.parse(artistsYaml);

export default function Artists() {
  const [selectedArtist, setSelectedArtist] = useState<any>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="h-full w-full flex flex-col relative"
    >
      <AnimatePresence mode="wait">
        {!selectedArtist ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow flex flex-col px-6 md:px-12 pt-12 pb-32 md:py-12 overflow-y-auto"
          >
            {/* Responsive Grid */}
            <div className="flex flex-wrap justify-center items-start gap-x-5 gap-y-8 md:gap-10 w-full max-w-5xl m-auto">
              {artists.map((artist: any, index: number) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  key={artist.id} 
                  className="group cursor-pointer flex flex-col items-center gap-2 md:gap-4 hover-trigger w-[24%] sm:w-[22%] md:w-[18%] lg:w-[15%]"
                  onClick={() => setSelectedArtist(artist)}
                >
                  <div className="w-full aspect-square overflow-hidden rounded-md bg-zinc-900 relative transition-transform duration-300 group-hover:scale-105">
                    <img 
                      src={artist.profilePicture} 
                      alt={artist.name} 
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                  </div>
                  <span className="text-white/60 group-hover:text-white font-sans font-bold text-[10px] md:text-xs tracking-widest transition-colors text-center uppercase">
                    {artist.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-0 bottom-0 top-6 md:top-0 flex"
            style={{
              backgroundColor: selectedArtist.background?.startsWith('#') ? selectedArtist.background : '#111',
              backgroundImage: selectedArtist.background?.startsWith('http') ? `url(${selectedArtist.background})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Sidebar (Desktop Only) */}
            <div className="hidden md:flex w-[240px] flex-shrink-0 flex-col border-r border-white/10 py-10 overflow-y-auto bg-black/40 backdrop-blur-md z-20">
              <div className="flex flex-col mt-8">
                {artists.map((a: any) => (
                  <button 
                    key={a.id}
                    onClick={() => setSelectedArtist(a)}
                    className={`text-left font-sans font-bold text-sm tracking-widest px-10 py-3 transition-colors relative hover-trigger ${selectedArtist.id === a.id ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                  >
                    {selectedArtist.id === a.id && (
                      <motion.div layoutId="activeIndicator" className="absolute left-0 top-2 bottom-2 w-[2px] bg-white" />
                    )}
                    {a.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto pt-10 pb-12 md:py-12 px-6 md:px-16 lg:px-24 bg-black/20 backdrop-blur-sm z-10 flex flex-col items-center relative">
              {/* Mobile Back Button */}
              <button 
                onClick={() => setSelectedArtist(null)}
                className="md:hidden absolute top-2 left-4 z-50 text-white/50 hover:text-white font-sans text-[10px] tracking-widest uppercase flex items-center gap-1"
              >
                <span>←</span> BACK
              </button>              <motion.div 
                key={selectedArtist.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-6xl flex flex-col gap-4 md:gap-16 mt-2 md:mt-0 relative z-10 flex-grow"
              >
                
                {/* Top Section: Image & Info */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-24 items-start w-full flex-grow">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full md:w-1/2 flex-shrink-0 flex justify-center md:justify-start md:-ml-8 lg:-ml-16"
                  >
                    {/* Uncropped image */}
                    <img src={selectedArtist.profilePicture} alt={selectedArtist.name} className="w-full h-auto max-h-[38vh] md:max-h-[70vh] object-contain" />
                  </motion.div>
                  
                  <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 w-full pt-2 md:pt-12 h-full">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full flex justify-center md:justify-between items-end mb-2 md:mb-8"
                    >
                      <h2 className="font-sans font-black text-3xl md:text-8xl tracking-tighter text-white uppercase leading-none">
                        {selectedArtist.name}
                      </h2>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-wrap gap-2 md:gap-3 mb-3 md:mb-12 w-full justify-center md:justify-end"
                    >
                      {selectedArtist.tag?.split('·').map((t: string, i: number) => (
                        <span key={i} className="text-[9px] md:text-xs tracking-[0.2em] uppercase text-black bg-white px-2 py-0.5 md:px-3 md:py-1 font-bold">
                          {t.trim()}
                        </span>
                      ))}
                    </motion.div>

                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="font-sans text-[11px] md:text-base text-white/90 leading-relaxed max-w-xl mb-4 md:mb-16 drop-shadow-md whitespace-pre-wrap mt-3 md:mt-0"
                    >
                      {selectedArtist.bio}
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-wrap gap-4 md:gap-6 w-full justify-center md:justify-end pt-4 md:pt-8 mt-auto pb-2 md:pb-0"
                    >
                      {selectedArtist.links?.map((link: any, i: number) => (
                        <a key={i} href={link.url} target="_blank" rel="noreferrer" className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors hover-trigger flex items-center gap-1 md:gap-2 drop-shadow-md">
                          {link.label} <span className="text-white/50">↗</span>
                        </a>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
