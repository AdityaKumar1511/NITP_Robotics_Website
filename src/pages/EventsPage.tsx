import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users, ArrowRight, CheckCircle2, X, ZoomIn } from 'lucide-react';
import { getEvents, getEventCategories, getFeaturedEvents } from '@/data';
import { useCategoryFromNav } from '@/hooks/useCategoryFromNav';

export function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  // Wire up submenu navigation
  useCategoryFromNav(setSelectedCategory);

  const events = getEvents();
  const categories = getEventCategories();
  const featuredEvents = getFeaturedEvents();

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter((event) => event.category === selectedCategory);

  const modalEvents = selectedCategory === 'All' ? events : filteredEvents;
  const selectedEvent = events.find((event) => event.id === selectedEventId) ?? null;
  const selectedEventDetails = selectedEvent?.detailedDescription?.trim() || selectedEvent?.description || '';
  const selectedEventDetailBlocks = selectedEventDetails.split('\n\n').map((b) => b.trim()).filter(Boolean);

  const hasRegistrationLink = (registrationLink?: string) =>
    Boolean(registrationLink && registrationLink.trim().length > 0);

  const handlePrevEvent = () => {
    if (selectedEventId === null || modalEvents.length === 0) return;
    const activeList = modalEvents.some((e) => e.id === selectedEventId) ? modalEvents : events;
    const currentIndex = activeList.findIndex((e) => e.id === selectedEventId);
    if (currentIndex === -1) return;
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : activeList.length - 1;
    setSelectedEventId(activeList[prevIndex].id);
  };

  const handleNextEvent = () => {
    if (selectedEventId === null || modalEvents.length === 0) return;
    const activeList = modalEvents.some((e) => e.id === selectedEventId) ? modalEvents : events;
    const currentIndex = activeList.findIndex((e) => e.id === selectedEventId);
    if (currentIndex === -1) return;
    const nextIndex = currentIndex < activeList.length - 1 ? currentIndex + 1 : 0;
    setSelectedEventId(activeList[nextIndex].id);
  };

  useEffect(() => {
    if (selectedEventId === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); handlePrevEvent(); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); handleNextEvent(); }
      else if (event.key === 'Escape') { event.preventDefault(); setSelectedEventId(null); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEventId, modalEvents, events]);

  const upcomingEvents = filteredEvents.filter((e) => e.status === 'Upcoming');
  const pastEvents = filteredEvents.filter((e) => e.status === 'Completed');

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero */}
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
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Year-Round Activities</span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              Upcoming{' '}
              <span className="text-gradient bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">Events</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Join us for workshops, competitions, seminars, and tech festivals throughout the year
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mb-12"
            >
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Don't Miss Out</span>
              <h2 className="text-4xl font-heading font-bold mt-2">Featured Events</h2>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: index * 0.2, ease: 'easeOut' }}
                >
                  <Card className="group h-full border-2 hover:border-primary/30 transition-all duration-500 overflow-hidden hover:shadow-2xl">
                    <div className="relative h-72 overflow-hidden cursor-pointer" onClick={() => setSelectedEventId(event.id)}>
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute left-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <ZoomIn className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      {event.status === 'Upcoming' && event.registrationOpen && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-zinc-950/85 text-white border border-white/35 shadow-lg shadow-black/50 backdrop-blur-md flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                            {hasRegistrationLink(event.registrationLink) ? 'Open for Registration' : 'Will be available soon'}
                          </span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-8">
                      <div className="mb-3">
                        <span className="text-sm font-medium text-primary">{event.category}</span>
                      </div>
                      <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">{event.title}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{event.description}</p>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm"><Calendar className="w-4 h-4 text-primary" /><span className="text-muted-foreground">{event.date}</span></div>
                        <div className="flex items-center gap-3 text-sm"><Clock className="w-4 h-4 text-primary" /><span className="text-muted-foreground">{event.time}</span></div>
                        <div className="flex items-center gap-3 text-sm"><MapPin className="w-4 h-4 text-primary" /><span className="text-muted-foreground">{event.location}</span></div>
                        <div className="flex items-center gap-3 text-sm"><Users className="w-4 h-4 text-primary" /><span className="text-muted-foreground">{event.capacity} participants</span></div>
                      </div>
                      {event.status === 'Upcoming' && event.registrationOpen && hasRegistrationLink(event.registrationLink) && (
                        <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                          <Button size="lg" className="w-full rounded-xl group/btn">Register Now<ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" /></Button>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters + Grid */}
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
              <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
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

          {/* Upcoming */}
          {upcomingEvents.length > 0 && (
            <>
              <motion.h3 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-3xl font-heading font-bold mb-8">
                Upcoming Events
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {upcomingEvents.map((event, index) => (
                  <motion.div key={event.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                    <Card className="group h-full border-2 hover:border-primary/30 transition-all duration-500 overflow-hidden hover:shadow-xl hover:-translate-y-1">
                      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedEventId(event.id)}>
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-60" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute left-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <ZoomIn className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        {event.registrationOpen && (
                          <div className="absolute top-3 right-3">
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-950/85 text-white border border-white/35 shadow-md shadow-black/45 backdrop-blur-md">
                              {hasRegistrationLink(event.registrationLink) ? 'Open' : 'Soon'}
                            </span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <div className="mb-2"><span className="text-xs font-medium text-primary">{event.category}</span></div>
                        <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-xs"><Calendar className="w-3.5 h-3.5 text-primary" /><span className="text-muted-foreground">{event.date}</span></div>
                          <div className="flex items-center gap-2 text-xs"><MapPin className="w-3.5 h-3.5 text-primary" /><span className="text-muted-foreground">{event.location}</span></div>
                        </div>
                        {event.registrationOpen && hasRegistrationLink(event.registrationLink) && (
                          <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="w-full rounded-lg group/btn">Register<ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-0.5 transition-transform" /></Button>
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <>
              <motion.h3 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-3xl font-heading font-bold mb-8">
                Past Events
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map((event, index) => (
                  <motion.div key={event.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                    <Card className="group h-full border-2 hover:border-border transition-all duration-500 overflow-hidden opacity-75">
                      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedEventId(event.id)}>
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute left-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <ZoomIn className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 rounded-full text-xs font-bold bg-muted text-muted-foreground">Completed</span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="mb-2"><span className="text-xs font-medium text-muted-foreground">{event.category}</span></div>
                        <h3 className="text-lg font-heading font-bold mb-2 line-clamp-2">{event.title}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs"><Calendar className="w-3.5 h-3.5 text-muted-foreground" /><span className="text-muted-foreground">{event.date}</span></div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Event Detail Lightbox */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md p-3 sm:p-6"
            onClick={() => setSelectedEventId(null)}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedEventId(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>
            <motion.div
              key={selectedEvent.id}
              initial={{ y: 12, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="mx-auto h-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full rounded-2xl overflow-hidden border border-white/15 bg-zinc-950/90 grid grid-cols-1 lg:grid-cols-2">
                <div className="relative min-h-[260px] lg:min-h-0 bg-zinc-900">
                  <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-lg ring-1 ring-white/20 ${selectedEvent.status === 'Completed' ? 'bg-emerald-900/75 text-emerald-100 border border-emerald-300/35' : 'bg-amber-900/75 text-amber-100 border border-amber-300/35'}`}>
                      {selectedEvent.status}
                    </span>
                    {selectedEvent.registrationOpen && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-lg ring-1 ring-white/20 bg-green-900/75 text-green-100 border border-green-300/35">
                        {hasRegistrationLink(selectedEvent.registrationLink) ? 'Registration Open' : 'Will be available soon'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6 sm:p-8 lg:p-10 overflow-y-auto">
                  <span className="text-xs uppercase tracking-wider text-primary font-semibold">{selectedEvent.category}</span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-2 mb-4">{selectedEvent.title}</h3>
                  <div className="space-y-3 mb-6">
                    {selectedEventDetailBlocks.map((block, index) => (
                      <p key={`${selectedEvent.id}-detail-${index}`} className="text-sm sm:text-base text-zinc-300 leading-relaxed whitespace-pre-line">{block}</p>
                    ))}
                  </div>
                  <div className="space-y-3 mb-7 text-sm">
                    <div className="flex items-center gap-3 text-zinc-200"><Calendar className="w-4 h-4 text-primary" /><span>{selectedEvent.date}</span></div>
                    <div className="flex items-center gap-3 text-zinc-200"><Clock className="w-4 h-4 text-primary" /><span>{selectedEvent.time}</span></div>
                    <div className="flex items-center gap-3 text-zinc-200"><MapPin className="w-4 h-4 text-primary" /><span>{selectedEvent.location}</span></div>
                    <div className="flex items-center gap-3 text-zinc-200"><Users className="w-4 h-4 text-primary" /><span>{selectedEvent.capacity} participants</span></div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {selectedEvent.registrationOpen ? (
                      hasRegistrationLink(selectedEvent.registrationLink) ? (
                        <Button asChild className="rounded-xl">
                          <a href={selectedEvent.registrationLink} target="_blank" rel="noopener noreferrer">Register Now<ArrowRight className="w-4 h-4 ml-2" /></a>
                        </Button>
                      ) : (
                        <Button disabled className="rounded-xl">Will be available soon</Button>
                      )
                    ) : (
                      <Button disabled className="rounded-xl">Registration Closed</Button>
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
