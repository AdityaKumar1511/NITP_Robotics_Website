import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 150 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.005 }}
          className="relative rounded-3xl overflow-hidden cursor-default"
        >
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-violet-600" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />

          {/* Interactive mouse-following glow */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none"
            style={{
              left: useTransform(glowX, [0, 1], ['-10%', '80%']),
              top: useTransform(glowY, [0, 1], ['-20%', '60%']),
              background: 'rgba(255,255,255,0.12)',
            }}
          />

          {/* Static glow orbs */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-500/30 rounded-full blur-[80px]" />

          {/* Shimmer lines on hover — diagonal sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_3s_ease-in-out_infinite]" />
          </motion.div>

          {/* Top border highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="relative px-8 py-20 md:px-16 md:py-28 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6"
            >
              Ready to build the future?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Join 100+ engineers building autonomous systems, winning national competitions, and shaping the future of robotics at NIT Patna.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}>
                  <Button
                    size="lg"
                    className="px-8 py-3.5 text-base font-semibold rounded-xl bg-white dark:bg-white text-primary dark:text-primary hover:bg-white/90 dark:hover:bg-white/90 shadow-xl shadow-black/20 group relative overflow-hidden"
                  >
                    {/* Button shimmer */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    <span className="relative">Apply to join</span>
                    <ArrowRight className="relative ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>

              <Link to="/about">
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-3.5 text-base font-semibold rounded-xl border-2 border-white/60 bg-white/10 text-white hover:bg-white/20 dark:border-white/30 dark:bg-transparent dark:text-white dark:hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group"
                  >
                    <span className="group-hover:tracking-wide transition-all duration-300">Learn more</span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
