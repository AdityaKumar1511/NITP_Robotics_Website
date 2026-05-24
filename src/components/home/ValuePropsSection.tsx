import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Cpu, Users, Lightbulb, Wrench } from 'lucide-react';
import { useRef } from 'react';

const props = [
  {
    icon: Cpu,
    title: 'Hands-on Building',
    description: 'From PCB design to mechanical assembly — we build real robots, not just simulations.',
    color: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-500/10 dark:bg-blue-500/15',
    glow: 'rgba(59,130,246,0.15)',
    shimmer: 'from-blue-500/0 via-blue-500/10 to-blue-500/0',
  },
  {
    icon: Users,
    title: 'Peer-led Learning',
    description: 'Seniors mentor juniors through structured workshops, code reviews, and project sprints.',
    color: 'text-violet-500 dark:text-violet-400',
    bg: 'bg-violet-500/10 dark:bg-violet-500/15',
    glow: 'rgba(139,92,246,0.15)',
    shimmer: 'from-violet-500/0 via-violet-500/10 to-violet-500/0',
  },
  {
    icon: Lightbulb,
    title: 'Research-driven',
    description: 'We publish papers, file patents, and collaborate with faculty on funded research projects.',
    color: 'text-amber-500 dark:text-amber-400',
    bg: 'bg-amber-500/10 dark:bg-amber-500/15',
    glow: 'rgba(245,158,11,0.15)',
    shimmer: 'from-amber-500/0 via-amber-500/10 to-amber-500/0',
  },
  {
    icon: Wrench,
    title: 'Industry-ready Skills',
    description: 'Members intern at DRDO, ISRO, and top startups — our alumni work at the cutting edge.',
    color: 'text-emerald-500 dark:text-emerald-400',
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    glow: 'rgba(16,185,129,0.15)',
    shimmer: 'from-emerald-500/0 via-emerald-500/10 to-emerald-500/0',
  },
];

function PremiumCard({ item, index }: { item: typeof props[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="group relative h-full rounded-2xl bg-card border border-border/60 p-8 cursor-default overflow-hidden"
      >
        {/* Ambient glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${item.glow} 0%, transparent 70%)` }}
        />

        {/* Shimmer sweep */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl overflow-hidden`}
        >
          <motion.div
            initial={{ x: '-100%' }}
            whileHover={{ x: '200%' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className={`absolute top-0 bottom-0 w-1/2 bg-gradient-to-r ${item.shimmer} skew-x-12`}
          />
        </div>

        {/* Top border highlight on hover */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon — lifts on hover */}
        <motion.div
          style={{ translateZ: 20 }}
          className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl ${item.bg} mb-6 transition-transform duration-300 group-hover:scale-110`}
        >
          <item.icon className={`w-6 h-6 ${item.color} transition-transform duration-300 group-hover:scale-110`} />
        </motion.div>

        <h3 className="relative font-heading text-xl font-semibold mb-3 group-hover:text-foreground transition-colors duration-300">
          {item.title}
        </h3>
        <p className="relative text-muted-foreground leading-relaxed group-hover:text-muted-foreground/90 transition-colors duration-300">
          {item.description}
        </p>

        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/20 transition-colors duration-500 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

export function ValuePropsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-primary tracking-wide uppercase mb-4"
          >
            Why Join Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-6"
          >
            More than a club —{' '}
            <span className="text-muted-foreground">a launchpad.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            We're a tight-knit engineering collective that combines rigorous technical practice with a culture of curiosity and collaboration.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {props.map((item, i) => (
            <PremiumCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
