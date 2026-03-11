import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Artists from './pages/Artists';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Events from './pages/Events';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="artists" element={<Artists />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project/:id" element={<ProjectDetail />} />
          <Route path="events" element={<Events />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}