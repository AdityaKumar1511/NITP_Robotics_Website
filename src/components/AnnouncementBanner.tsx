import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, ArrowRight } from 'lucide-react';

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-primary to-violet-600"
        >
          {/* Animated shimmer sweep */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {/* Top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="container mx-auto px-4 py-2.5 flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {/* Pulsing bell */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="flex-shrink-0"
              >
                <Bell size={16} className="text-white/90" />
              </motion.div>

              {/* Text */}
              <p className="text-sm font-medium text-white/90 truncate">
                <span className="font-bold text-white">New Event!</span>
                {' '}Join us for the Annual Robotics Fest 2026 — Register Now!
              </p>

              {/* Inline CTA — desktop */}
              <motion.button
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.96 }}
                className="hidden sm:inline-flex items-center gap-1.5 flex-shrink-0 text-xs font-semibold text-white/90 bg-white/15 hover:bg-white/25 border border-white/25 hover:border-white/40 rounded-full px-3 py-1 transition-all duration-200 backdrop-blur-sm"
              >
                Register
                <motion.span
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight size={12} />
                </motion.span>
              </motion.button>
            </div>

            {/* Dismiss */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsVisible(false)}
              className="ml-3 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200"
              aria-label="Dismiss announcement"
            >
              <X size={15} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
