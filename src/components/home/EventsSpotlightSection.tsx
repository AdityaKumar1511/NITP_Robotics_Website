import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getLatestUpcomingEvents, getFeaturedEvents } from '@/data';
import { useRef } from 'react';

export function EventsSpotlightSection() {
  const latestEvents = getLatestUpcomingEvents(3);
  const featuredEventIds = new Set(getFeaturedEvents().map((e) => e.id));

  const events = latestEvents.map((e) => ({
    title: e.title,
    date: e.date,
    location: e.location,
    category: e.category,
    description: e.description,
    image: e.image,
    featured: featuredEventIds.has(e.id),
  }));

  const featured = events.find((e) => e.featured) || events[0];
  const rest = events.filter((e) => e !== featured);

  return (
    <section className="section-padding relative overflow-hidden">
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
              Upcoming Events
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl sm:text-5xl font-bold tracking-tight"
            >
              Don't miss what's next.
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link to="/events">
              <Button variant="outline" className="rounded-xl group">
                All events
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Featured + Side Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Featured Event */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="lg:col-span-3 group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden h-full min-h-[400px] bg-card border border-border/60 group-hover:border-primary/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10">
                {/* Image with enhanced parallax zoom */}
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Gradient — enriches on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/0 group-hover:from-black/90 group-hover:via-black/40 transition-all duration-500" />

                {/* Top shimmer line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Content — slides up on hover */}
                <div className="relative h-full flex flex-col justify-end p-8 lg:p-10">
                  <motion.span
                    layout
                    className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground w-fit mb-4 group-hover:bg-white group-hover:text-primary transition-colors duration-400"
                  >
                    {featured.category}
                  </motion.span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-white transition-none">
                    {featured.title}
                  </h3>
                  <p className="text-white/70 mb-4 max-w-lg group-hover:text-white/85 transition-colors duration-300">
                    {featured.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />{featured.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />{featured.location}
                    </span>
                  </div>

                  {/* CTA arrow — appears on hover */}
                  <div className="absolute right-8 bottom-8 lg:right-10 lg:bottom-10 w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/15 border border-white/0 group-hover:border-white/30 flex items-center justify-center transition-all duration-400 backdrop-blur-sm">
                    <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-400 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Side events */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {rest.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group flex-1 cursor-pointer"
              >
                <div className="rounded-2xl overflow-hidden h-full bg-card border border-border/60 group-hover:border-primary/25 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-primary/5">
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500" />

                    {/* Top shimmer */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-background/80 backdrop-blur-md text-foreground border border-border/30 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-400">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 relative overflow-hidden">
                    {/* Ambient glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/[0.04] transition-all duration-500 pointer-events-none" />

                    <h3 className="relative font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="relative text-sm text-muted-foreground mb-4 line-clamp-2 group-hover:text-muted-foreground/90 transition-colors duration-300">
                      {event.description}
                    </p>
                    <div className="relative flex items-center gap-3 text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />{event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />{event.location}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
