import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { EventsPage } from './pages/EventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AwardsPage } from './pages/AwardsPage';
import { ThemeProvider } from './hooks/use-theme';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="awards" element={<AwardsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
