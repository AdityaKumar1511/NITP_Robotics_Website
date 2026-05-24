import { motion } from 'framer-motion';

const logos = [
  'NIT Patna', 'IIT Kharagpur', 'DRDO', 'ISRO', 'DOT', 'Kshitij', 'IEEE', 'NIT Jalandar',
];

export function BrandStripSection() {
  return (
    <section className="py-16 border-y border-border/50 bg-muted/30 dark:bg-muted/10 relative overflow-hidden">
      {/* Subtle radial glow in center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium text-muted-foreground mb-10 tracking-wide uppercase"
        >
          Technical Engagements
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo, i) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{
                y: -3,
                scale: 1.08,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              className="group relative cursor-default select-none"
            >
              {/* Glow behind logo on hover */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />

              <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-muted-foreground/40 group-hover:text-foreground/80 transition-colors duration-300">
                {logo}
              </span>

              {/* Underline accent */}
              <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-center" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
