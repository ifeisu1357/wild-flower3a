/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Artists from './pages/Artists';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Events from './pages/Events';

export default function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="artists" element={<Artists />} />
            <Route path="projects" element={<Projects />} />
            <Route path="project/:id" element={<ProjectDetail />} />
            <Route path="events" element={<Events />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
