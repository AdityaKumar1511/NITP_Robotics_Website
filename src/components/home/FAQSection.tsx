import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

const faqs = [
  {
    q: 'Who can join the Robotics Club?',
    a: 'Any student of NIT Patna, regardless of branch or year, can join. We welcome freshers with zero experience — all you need is curiosity and willingness to learn.',
  },
  {
    q: 'Do I need prior robotics experience?',
    a: "Not at all. We run beginner-friendly workshops at the start of each semester covering electronics, programming, and mechanical basics. You'll be assigned a mentor to guide you.",
  },
  {
    q: 'What is the time commitment?',
    a: 'Typically 6–8 hours per week, including weekly meetings, workshop sessions, and project work. During competition season, it can be more intensive but always rewarding.',
  },
  {
    q: 'How are project teams formed?',
    a: 'We form cross-functional teams based on interest and skill level. Each team has a mix of experienced and new members, with a senior lead overseeing progress.',
  },
  {
    q: 'Are there any membership fees?',
    a: 'No, there are no membership fees. Club participation is free for students, and major project expenses are supported through institute resources, events, and sponsorships when needed.',
  },
];

function FAQItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={`group border-b border-border/60 last:border-0 transition-colors duration-300 ${isOpen ? 'border-primary/20' : ''}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        {/* Question */}
        <span
          className={`font-heading font-semibold text-base pr-8 transition-colors duration-300 ${
            isOpen ? 'text-primary' : 'group-hover:text-primary'
          }`}
        >
          {item.q}
        </span>

        {/* Icon — morphs between plus and chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            {/* Animated left accent bar */}
            <div className="flex gap-4 pb-6 pr-12">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="w-0.5 flex-shrink-0 bg-gradient-to-b from-primary to-primary/20 rounded-full origin-top"
                style={{ minHeight: '100%' }}
              />
              <p className="text-muted-foreground leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-semibold text-primary tracking-wide uppercase mb-4"
            >
              FAQ
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-6"
            >
              Got questions? <br />
              <span className="text-muted-foreground">We've got answers.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground leading-relaxed"
            >
              Everything you need to know about joining and participating in the Robotics Club at NIT Patna.
            </motion.p>

            {/* Decorative element */}
            <div className="mt-10 hidden lg:flex items-center gap-3 text-sm text-muted-foreground/50">
              <span className="text-2xl font-heading font-bold text-primary/20">{faqs.length}</span>
              <span>questions answered</span>
            </div>
          </div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-card/50 border border-border/40 p-6 sm:p-8"
          >
            {faqs.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                index={i}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
