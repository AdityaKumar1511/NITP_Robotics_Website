import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ArrowRight, Sparkles, X, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProjects, getProjectCategories, getFeaturedProjects } from '@/data';
import { useCategoryFromNav } from '@/hooks/useCategoryFromNav';


export function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  // Wire up submenu navigation
  useCategoryFromNav(setSelectedCategory);

  const getExternalUrl = (url?: string) => {
    if (!url) return null;

    const trimmedUrl = url.trim();
    if (!trimmedUrl || trimmedUrl === '#') return null;

    const withProtocol = /^https?:\/\//i.test(trimmedUrl)
      ? trimmedUrl
      : `https://${trimmedUrl}`;

    try {
      const parsedUrl = new URL(withProtocol);
      if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
        return parsedUrl.toString();
      }
      return null;
    } catch {
      return null;
    }
  };

  const projects = getProjects();
  const categories = getProjectCategories();
  const featuredProjects = getFeaturedProjects();

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === selectedCategory);

  const selectedProject = filteredProjects.find((project) => project.id === selectedProjectId) ?? null;
  const selectedProjectGithubUrl = getExternalUrl(selectedProject?.github);
  const selectedProjectDemoUrl = getExternalUrl(selectedProject?.demo);
  const selectedProjectDetails =
    selectedProject?.detailedDescription?.trim() || selectedProject?.description || '';
  const selectedProjectDetailBlocks = selectedProjectDetails
    .split('\n\n')
    .map((block) => block.trim())
    .filter(Boolean);

  const handlePrevProject = () => {
    if (selectedProjectId === null || filteredProjects.length === 0) return;
    const currentIndex = filteredProjects.findIndex((project) => project.id === selectedProjectId);
    if (currentIndex === -1) return;
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredProjects.length - 1;
    setSelectedProjectId(filteredProjects[prevIndex].id);
  };

  const handleNextProject = () => {
    if (selectedProjectId === null || filteredProjects.length === 0) return;
    const currentIndex = filteredProjects.findIndex((project) => project.id === selectedProjectId);
    if (currentIndex === -1) return;
    const nextIndex = currentIndex < filteredProjects.length - 1 ? currentIndex + 1 : 0;
    setSelectedProjectId(filteredProjects[nextIndex].id);
  };

  useEffect(() => {
    if (selectedProjectId === null) return;
    const stillVisible = filteredProjects.some((project) => project.id === selectedProjectId);
    if (!stillVisible) setSelectedProjectId(null);
  }, [filteredProjects, selectedProjectId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedProjectId === null) return;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevProject();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNextProject();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        setSelectedProjectId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectId, filteredProjects]);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
        <div className="absolute top-20 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-background/70 to-background" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Innovation Showcase</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              Our{' '}
              <span className="text-gradient bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of innovative robotics, AI, and automation projects built by talented students
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12"
            >
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Featured Work</span>
              <h2 className="text-4xl font-heading font-bold mt-2">Spotlight Projects</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => {
                const githubUrl = getExternalUrl(project.github);
                const demoUrl = getExternalUrl(project.demo);

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                  >
                    <Card className="group h-full border-2 hover:border-primary/30 transition-all duration-500 overflow-hidden hover:shadow-2xl">
                      <div
                        className="relative h-72 overflow-hidden cursor-pointer"
                        onClick={() => setSelectedProjectId(project.id)}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute left-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <ZoomIn className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-lg ring-1 ring-white/20 ${
                            project.status === 'Completed' 
                              ? 'bg-emerald-900/75 text-emerald-100 border border-emerald-300/35' 
                              : 'bg-amber-900/75 text-amber-100 border border-amber-300/35'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-8">
                        <div className="mb-3">
                          <span className="text-sm font-medium text-primary">{project.category}</span>
                        </div>
                        <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          {githubUrl && (
                            <Button asChild variant="outline" size="sm" className="flex-1 rounded-xl group/btn">
                              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                Code
                              </a>
                            </Button>
                          )}
                          {demoUrl && (
                            <Button asChild size="sm" className="flex-1 rounded-xl group/btn">
                              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                                View Demo
                                <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section id="category-filter" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 flex-wrap mb-12"
          >
            {categories.map((category) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full px-6 transition-all duration-300"
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* All Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => {
                const githubUrl = getExternalUrl(project.github);
                const demoUrl = getExternalUrl(project.demo);

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card className="group h-full border-2 hover:border-primary/30 transition-all duration-500 overflow-hidden hover:shadow-xl hover:-translate-y-1">
                      <div
                        className="relative h-52 overflow-hidden cursor-pointer"
                        onClick={() => setSelectedProjectId(project.id)}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-60" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute left-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <ZoomIn className="w-4.5 h-4.5 text-white" />
                          </div>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-md ring-1 ring-white/20 ${
                            project.status === 'Completed' 
                              ? 'bg-emerald-900/75 text-emerald-100 border border-emerald-300/35' 
                              : 'bg-amber-900/75 text-amber-100 border border-amber-300/35'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="mb-2">
                          <span className="text-xs font-medium text-primary">{project.category}</span>
                        </div>
                        <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {githubUrl && (
                            <Button asChild variant="outline" size="sm" className="flex-1 rounded-lg">
                              <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub repository`}>
                                <Github className="w-3.5 h-3.5" />
                              </a>
                            </Button>
                          )}
                          {demoUrl && (
                            <Button asChild size="sm" className="flex-1 rounded-lg group/btn">
                              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                                Demo
                                <ExternalLink className="w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 via-purple-500/10 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our team and bring your innovative ideas to life with cutting-edge technology
            </p>
            <Link to="/contact">
              <Button size="lg" className="px-8 py-3.5 text-base font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 group">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md p-3 sm:p-6"
            onClick={() => setSelectedProjectId(null)}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedProjectId(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>

            <motion.div
              key={selectedProject.id}
              initial={{ y: 12, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="mx-auto h-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full rounded-2xl overflow-hidden border border-white/15 bg-zinc-950/90 grid grid-cols-1 lg:grid-cols-2">
                <div className="relative min-h-[260px] lg:min-h-0 bg-zinc-900">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-lg ring-1 ring-white/20 ${
                      selectedProject.status === 'Completed'
                        ? 'bg-emerald-900/75 text-emerald-100 border border-emerald-300/35'
                        : 'bg-amber-900/75 text-amber-100 border border-amber-300/35'
                    }`}>
                      {selectedProject.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 lg:p-10 overflow-y-auto">
                  <span className="text-xs uppercase tracking-wider text-primary font-semibold">{selectedProject.category}</span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-2 mb-4">
                    {selectedProject.title}
                  </h3>

                  <div className="space-y-3 mb-6">
                    {selectedProjectDetailBlocks.map((block, index) => (
                      <p
                        key={`${selectedProject.id}-detail-${index}`}
                        className="text-sm sm:text-base text-zinc-300 leading-relaxed whitespace-pre-line"
                      >
                        {block}
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-7">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-zinc-200 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {selectedProjectGithubUrl && (
                      <Button asChild variant="outline" className="rounded-xl border-white/25 text-white hover:bg-white/10 hover:text-white">
                        <a href={selectedProjectGithubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </a>
                      </Button>
                    )}
                    {selectedProjectDemoUrl && (
                      <Button asChild className="rounded-xl">
                        <a href={selectedProjectDemoUrl} target="_blank" rel="noopener noreferrer">
                          Open Demo
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
