import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getFeaturedProjects } from '@/data';

export function ProjectsShowcaseSection() {
  const getExternalUrl = (url?: string) => {
    if (!url) return null;
    const trimmedUrl = url.trim();
    if (!trimmedUrl || trimmedUrl === '#') return null;
    const withProtocol = /^https?:\/\//i.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`;
    try {
      const parsedUrl = new URL(withProtocol);
      if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') return parsedUrl.toString();
      return null;
    } catch { return null; }
  };

  const projects = getFeaturedProjects().map((p) => ({
    title: p.title,
    category: p.category,
    description: p.description,
    image: p.image,
    tags: p.tags,
    github: p.github,
    demo: p.demo,
  }));

  return (
    <section className="section-padding bg-muted/40 dark:bg-muted/10 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-semibold text-primary tracking-wide uppercase mb-4"
            >
              Featured Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl sm:text-5xl font-bold tracking-tight"
            >
              Projects that <span className="text-muted-foreground">push boundaries.</span>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link to="/projects">
              <Button variant="outline" className="rounded-xl group">
                View all projects
                <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Project Cards */}
        <div className="space-y-8">
          {projects.map((project, i) => {
            const githubUrl = getExternalUrl(project.github);
            const demoUrl = getExternalUrl(project.demo);

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-card border border-border/60 group-hover:border-primary/25 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/5">
                  
                  {/* Image panel */}
                  <div className={`relative overflow-hidden h-64 lg:h-auto ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                    />
                    {/* Image overlay — darkens slightly on hover for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500" />
                    
                    {/* Category badge floating on image */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-background/80 backdrop-blur-md text-foreground border border-border/40 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-400">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content panel */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                    {/* Ambient glow behind content on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/[0.03] group-hover:to-violet-500/[0.03] transition-all duration-700 pointer-events-none" />

                    <span className="relative text-sm font-medium text-primary mb-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      {project.category}
                    </span>

                    <h3 className="relative font-heading text-2xl sm:text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-400">
                      {project.title}
                    </h3>

                    <p className="relative text-muted-foreground leading-relaxed mb-6 group-hover:text-muted-foreground/90 transition-colors duration-300">
                      {project.description}
                    </p>

                    {/* Tags — stagger reveal on hover */}
                    <div className="relative flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag, tagIdx) => (
                        <motion.span
                          key={tag}
                          initial={false}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground group-hover:bg-secondary/80 transition-colors duration-200 cursor-default"
                          style={{ transitionDelay: `${tagIdx * 20}ms` }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action buttons — slide up subtly */}
                    <div className="relative flex items-center gap-3 translate-y-0 group-hover:-translate-y-0.5 transition-transform duration-300">
                      {githubUrl && (
                        <Button asChild variant="outline" size="sm" className="rounded-lg group-hover:border-border group-hover:bg-accent/50 transition-all duration-200">
                          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Source
                          </a>
                        </Button>
                      )}
                      {demoUrl && (
                        <Button asChild size="sm" className="rounded-lg shadow-sm group-hover:shadow-primary/25 group-hover:shadow-md transition-shadow duration-300">
                          <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                            View project
                            <ArrowUpRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card lift shadow */}
                <div className="absolute inset-0 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-2xl shadow-black/20 translate-y-2" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
