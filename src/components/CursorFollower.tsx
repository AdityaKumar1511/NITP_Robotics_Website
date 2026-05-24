import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CursorFollower() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springFast = { damping: 28, stiffness: 200, mass: 0.4 };
  const springMed  = { damping: 32, stiffness: 140, mass: 0.6 };
  const springSlow = { damping: 38, stiffness: 90,  mass: 0.8 };

  const cursorX = useSpring(0, springFast);
  const cursorY = useSpring(0, springFast);
  const ringX   = useSpring(0, springMed);
  const ringY   = useSpring(0, springMed);
  const trailX  = useSpring(0, springSlow);
  const trailY  = useSpring(0, springSlow);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(
        t.tagName === 'A' ||
        t.tagName === 'BUTTON' ||
        !!t.closest('a') ||
        !!t.closest('button') ||
        t.classList.contains('cursor-pointer')
      );
    };

    const onDown = () => setIsClicking(true);
    const onUp   = () => setIsClicking(false);
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [cursorX, cursorY, ringX, ringY, trailX, trailY, isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Dot — sharpest tracking */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.6 : isHovering ? 1.8 : 1,
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          <div className="w-2.5 h-2.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>

      {/* Ring — medium lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.7 : isHovering ? 2.2 : 1,
            opacity: isHovering ? 0.8 : 0.35,
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <div className={`w-10 h-10 rounded-full border-2 transition-colors duration-300 ${isHovering ? 'border-primary' : 'border-primary/60'}`} />
        </motion.div>
      </motion.div>

      {/* Ambient glow — slowest, most diffuse */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{ x: trailX, y: trailY }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.7 : 0.4,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="w-24 h-24 bg-primary/15 rounded-full blur-2xl" />
        </motion.div>
      </motion.div>

      {/* Click ripple */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9996]"
          style={{ x: cursorX, y: cursorY }}
        >
          <motion.div
            className="-translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0.5, opacity: 0.6 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="w-8 h-8 rounded-full border border-primary/50" />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
