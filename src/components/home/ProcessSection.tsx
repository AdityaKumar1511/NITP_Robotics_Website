import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Explore & Discover',
    description: 'Attend open workshops, hackathons, and orientation sessions. Find the domain that excites you — from embedded systems to machine learning.',
    color: 'bg-blue-500/15 border-blue-500/30 group-hover:border-blue-500/60 group-hover:bg-blue-500/20',
    dot: 'bg-primary',
    numColor: 'text-blue-500/20 group-hover:text-blue-500/35',
  },
  {
    number: '02',
    title: 'Learn & Build',
    description: 'Join a project team and start building. Senior mentors guide you through real engineering challenges with weekly sprints and code reviews.',
    color: 'bg-violet-500/15 border-violet-500/30 group-hover:border-violet-500/60 group-hover:bg-violet-500/20',
    dot: 'bg-primary',
    numColor: 'text-violet-500/20 group-hover:text-violet-500/35',
  },
  {
    number: '03',
    title: 'Compete & Publish',
    description: 'Represent NIT Patna at Robocon, Smart India Hackathon, and IEEE conferences. Turn your project into a competition entry or research paper.',
    color: 'bg-amber-500/15 border-amber-500/30 group-hover:border-amber-500/60 group-hover:bg-amber-500/20',
    dot: 'bg-primary',
    numColor: 'text-amber-500/20 group-hover:text-amber-500/35',
  },
  {
    number: '04',
    title: 'Lead & Mentor',
    description: "As you grow, lead your own project team, mentor newcomers, and shape the club's direction. Your legacy lives through the people you teach.",
    color: 'bg-emerald-500/15 border-emerald-500/30 group-hover:border-emerald-500/60 group-hover:bg-emerald-500/20',
    dot: 'bg-primary',
    numColor: 'text-emerald-500/20 group-hover:text-emerald-500/35',
  },
];

export function ProcessSection() {
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
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl sm:text-5xl font-bold tracking-tight"
          >
            Your journey with us.
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Animated vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-primary/10 md:-translate-x-px origin-top"
            />

            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative flex items-start gap-8 mb-16 last:mb-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot — pulses on hover */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 mt-2 z-10">
                  <motion.div
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                    className="relative"
                  >
                    <div className={`w-4 h-4 rounded-full ${step.dot} border-4 border-background shadow-lg group-hover:shadow-primary/40 group-hover:scale-125 transition-all duration-300`} />
                    {/* Ping ring on hover */}
                    <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-30 group-hover:scale-[2.5] transition-all duration-500" />
                  </motion.div>
                </div>

                {/* Content card */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <motion.div
                    whileHover={{ y: -3, scale: 1.01 }}
                    transition={{ duration: 0.25 }}
                    className={`rounded-2xl border p-6 transition-all duration-400 cursor-default ${step.color} relative overflow-hidden`}
                  >
                    {/* Top shimmer */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <span className={`font-heading text-5xl font-bold block mb-2 transition-colors duration-300 ${step.numColor}`}>
                      {step.number}
                    </span>
                    <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-muted-foreground/90 transition-colors duration-300">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
