import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    // Skip custom cursor on touch / mobile devices
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cur = document.getElementById('cur');
    const ring = document.getElementById('cur-r');
    let mx = 0, my = 0, rx = 0, ry = 0;
    let reqId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (cur) { cur.style.left = mx + 'px'; cur.style.top = my + 'px'; }
    };

    const animate = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
      reqId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    reqId = requestAnimationFrame(animate);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .hover-trigger')) {
        document.body.classList.add('hovering');
      } else {
        document.body.classList.remove('hovering');
      }
    };
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-[#111111] text-[#e6e6e6] font-sans selection:bg-white selection:text-black flex flex-col overflow-hidden">
      <div id="cur"></div>
      <div id="cur-r"></div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col md:flex-row items-center md:items-start justify-between px-6 md:px-16 py-6 pointer-events-none gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6 pointer-events-auto w-full md:w-auto">
          <Link to="/" className="font-black text-sm md:text-sm tracking-[0.1em] text-white hover:opacity-70 transition-opacity uppercase">
            WILDFLOWER
          </Link>
          <div className="hidden md:block w-[1px] h-4 bg-white/20"></div>
          <nav className="flex flex-wrap justify-center gap-5 md:gap-6 text-[11px] md:text-xs tracking-[0.32em] uppercase text-white/50 font-bold w-full md:w-auto mt-1 md:mt-0">
            <a href="https://shop.wild-flower.co" className="py-2 md:py-0 hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-1 md:after:-bottom-1 after:left-0 after:right-0 after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">商店</a>
            <Link to="/artists" className={`py-2 md:py-0 hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-1 md:after:-bottom-1 after:left-0 after:right-0 after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left ${location.pathname === '/artists' ? 'text-white after:scale-x-100' : ''}`}>成員</Link>
            <Link to="/projects" className={`py-2 md:py-0 hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-1 md:after:-bottom-1 after:left-0 after:right-0 after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left ${location.pathname === '/projects' ? 'text-white after:scale-x-100' : ''}`}>專案</Link>
            <Link to="/events" className={`py-2 md:py-0 hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-1 md:after:-bottom-1 after:left-0 after:right-0 after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left ${location.pathname === '/events' ? 'text-white after:scale-x-100' : ''}`}>活動</Link>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col h-full w-full relative z-10 pt-24 pb-12">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer id="site-footer" className="fixed bottom-4 left-0 right-0 z-50 flex justify-center md:justify-between items-center px-8 md:px-16 pointer-events-none">
        <div className="pointer-events-auto flex gap-4 md:gap-6 text-[8px] md:text-[10px] tracking-[0.26em] uppercase text-white/40 font-sans">
          <a href="https://www.instagram.com/wldflwrtw/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors hover-trigger">INSTAGRAM</a>
          <a href="https://www.youtube.com/@wldflrtw" target="_blank" rel="noreferrer" className="hover:text-white transition-colors hover-trigger">YOUTUBE</a>
        </div>

        <div className="pointer-events-auto text-[6px] md:text-[8px] tracking-[0.18em] uppercase text-white/40 hidden md:block font-sans">
          © 2026 WILDFLOWER
        </div>
      </footer>
    </div>
  );
}
