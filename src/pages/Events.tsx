import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import eventsYaml from '../data/events.yaml?raw';
import YAML from 'yaml';

const events = YAML.parse(eventsYaml);

export default function Events() {
  return (
    <div className="h-full w-full flex items-center justify-center px-4 md:px-12 overflow-y-auto">
      <div className="flex flex-col justify-center w-full max-w-5xl gap-1 md:gap-2 text-xs md:text-sm text-white font-sans font-light">
        {events.map((event: any) => {
          const description = event.description || event.descripttion;
          const hasLink = event.links && event.links.length > 0 && event.links[0].label !== "";
          const firstLink = hasLink ? event.links[0].url : undefined;

          return (
            <div 
              key={event.id}
              className={`flex flex-row py-3 md:py-4 transition-colors gap-3 md:gap-8 items-center w-full hover:bg-white/5 px-2 md:px-4 rounded-lg ${hasLink ? 'cursor-pointer md:cursor-default' : ''}`}
              onClick={() => {
                if (hasLink && window.innerWidth < 768) {
                  window.open(firstLink, '_blank');
                }
              }}
            >
              <div className="w-16 md:w-24 shrink-0 flex flex-col md:flex-row gap-0.5 md:gap-2 items-start md:items-center">
                <span className="tracking-widest font-sans text-[8px] md:text-xs text-white/50 whitespace-nowrap">{event.date}</span>
                {event.time && <span className="tracking-widest font-sans text-[7px] md:text-[10px] text-white/30 whitespace-nowrap">{event.time}</span>}
              </div>
              
              <div className="flex flex-row gap-3 md:gap-6 flex-grow items-center overflow-hidden">
                <span className="tracking-wider text-[10px] md:text-base whitespace-nowrap shrink-0">{event.title}</span>
                
                {description && (
                  <span className="text-white/40 leading-relaxed text-[9px] md:text-sm truncate flex-grow">
                    {description}
                  </span>
                )}

                {hasLink && (
                  <div className="hidden md:flex gap-2 md:gap-4 shrink-0">
                    {event.links.map((link: any, i: number) => (
                      <a 
                        key={i}
                        href={link.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="font-sans text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors hover-trigger underline underline-offset-4 whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}

                {hasLink && (
                  <span className="md:hidden text-white/30 text-[10px] shrink-0 ml-auto">↗</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
