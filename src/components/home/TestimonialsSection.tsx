import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Quote } from 'lucide-react';
import { getTestimonials } from '@/data';
import { useRef } from 'react';

function TestimonialCard({ t, index }: { t: ReturnType<typeof getTestimonials>[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 250 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['20%', '80%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['20%', '80%']);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="group h-full rounded-2xl bg-card border border-border/60 p-8 flex flex-col relative overflow-hidden cursor-default"
      >
        {/* Dynamic spotlight that follows mouse */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(var(--primary-rgb, 99,102,241), 0.08) 0%, transparent 60%)`,
          }}
        />

        {/* Top shimmer line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Quote icon — spins subtly on hover */}
        <motion.div
          whileHover={{ rotate: [0, -10, 0], scale: 1.2 }}
          transition={{ duration: 0.4 }}
          className="w-8 h-8 mb-6 flex-shrink-0"
        >
          <Quote className="w-8 h-8 text-primary/30 group-hover:text-primary/50 transition-colors duration-300" />
        </motion.div>

        {/* Quote text — slightly brightens on hover */}
        <blockquote className="text-foreground/80 group-hover:text-foreground/95 leading-relaxed mb-8 flex-1 text-[15px] transition-colors duration-300">
          "{t.quote}"
        </blockquote>

        {/* Author section — slides up slightly */}
        <motion.div
          style={{ translateZ: 10 }}
          className="border-t border-border/60 pt-6 group-hover:border-border transition-colors duration-300"
        >
          <div className="font-heading font-semibold text-sm group-hover:text-foreground transition-colors duration-200">{t.name}</div>
          <div className="text-sm text-muted-foreground mt-0.5">{t.role}</div>
          <div className="text-xs text-primary mt-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300">{t.company}</div>
        </motion.div>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-primary/5 to-transparent rounded-2xl" />
        </div>

        {/* Border glow on hover */}
        <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/15 transition-colors duration-500 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const testimonials = getTestimonials();

  return (
    <section className="section-padding bg-muted/40 dark:bg-muted/10 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-primary tracking-wide uppercase mb-4"
          >
            Voices
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl sm:text-5xl font-bold tracking-tight"
          >
            From those who've been here.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
