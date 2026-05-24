import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { getMetrics } from '@/data';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function MetricCard({ m, index }: { m: { label: string; value: number; suffix?: string; description: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);
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
      initial={{ opacity: 0, y: 20 }}
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
        whileHover={{ scale: 1.06, y: -6 }}
        transition={{ duration: 0.25 }}
        className="group relative text-center cursor-default rounded-2xl p-6 transition-colors duration-300 hover:bg-white/5 dark:hover:bg-white/5"
      >
        {/* Mouse-following spotlight */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.08) 0%, transparent 65%)`,
          }}
        />

        {/* Top shimmer line */}
        <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Bottom accent line */}
        <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

        {/* Counter number — lifts on hover */}
        <motion.div
          style={{ translateZ: 20 }}
          className="font-heading text-5xl sm:text-6xl font-bold text-background dark:text-foreground mb-2 group-hover:text-white dark:group-hover:text-foreground transition-colors duration-300"
        >
          <AnimatedCounter target={m.value} suffix={m.suffix ?? ''} />
        </motion.div>

        {/* Label */}
        <div className="text-base font-semibold text-background/80 dark:text-foreground/80 mb-1 group-hover:text-white/90 dark:group-hover:text-foreground/90 transition-colors duration-300">
          {m.label}
        </div>

        {/* Description — fades up slightly */}
        <div className="text-sm text-background/50 dark:text-muted-foreground group-hover:text-background/70 dark:group-hover:text-muted-foreground/80 transition-colors duration-300 translate-y-0 group-hover:-translate-y-0.5 transition-transform">
          {m.description}
        </div>

        {/* Border glow ring */}
        <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/15 dark:group-hover:border-primary/20 transition-colors duration-500 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

export function MetricsSection() {
  const metrics = getMetrics();

  return (
    <section className="section-padding bg-foreground dark:bg-card relative overflow-hidden">
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* Ambient center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_65%)] dark:bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06)_0%,transparent_65%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-primary-foreground/60 dark:text-primary tracking-wide uppercase mb-4"
          >
            By the Numbers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-background dark:text-foreground"
          >
            Impact that speaks for itself.
          </motion.h2>
        </div>

        {/* Divider grid lines */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 max-w-5xl mx-auto relative">
          {/* Vertical dividers */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute top-4 bottom-4 w-px bg-white/10 dark:bg-border/40 hidden lg:block"
              style={{ left: `${(i / 4) * 100}%` }}
            />
          ))}

          {metrics.map((m, i) => (
            <MetricCard key={m.label} m={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
