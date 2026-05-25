import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { NotificationMenu } from '@/components/NotificationMenu';

// ─── Types ────────────────────────────────────────────────────────────────────
type SubmenuItem =
  | { label: string; path: string; type: 'hash'; hash: string }
  | { label: string; path: string; type: 'category'; category: string }
  | { label: string; path: string; type: 'link' };

// ─── Submenu config ───────────────────────────────────────────────────────────
// Team  → scroll-to-section (type: 'hash')
// Projects / Events / Gallery → category filter (type: 'category')
const submenus: Record<string, SubmenuItem[]> = {
  '/team': [
    { label: 'Professor In Charge', path: '/team', type: 'hash', hash: 'professor-in-charge' },
    { label: 'Executive Committee', path: '/team', type: 'hash', hash: 'executive-committee' },
    { label: 'Core Team',           path: '/team', type: 'hash', hash: 'core-team'           },
    { label: 'Active Members',      path: '/team', type: 'hash', hash: 'active-members'      },
  ],
  '/projects': [
    { label: 'All',         path: '/projects', type: 'category', category: 'All'         },
    { label: 'Autonomous',  path: '/projects', type: 'category', category: 'Autonomous'  },
    { label: 'Robotics',    path: '/projects', type: 'category', category: 'Robotics'    },
    { label: 'Drone',       path: '/projects', type: 'category', category: 'Drone'       },
    { label: 'Fabrication', path: '/projects', type: 'category', category: 'Fabrication' },
    { label: 'Navigation',  path: '/projects', type: 'category', category: 'Navigation'  },
  ],
  '/events': [
    { label: 'All',         path: '/events', type: 'category', category: 'All'         },
    { label: 'Competition', path: '/events', type: 'category', category: 'Competition' },
    { label: 'Hackathon',   path: '/events', type: 'category', category: 'Hackathon'   },
    { label: 'Orientation', path: '/events', type: 'category', category: 'Orientation' },
    { label: 'Workshop',    path: '/events', type: 'category', category: 'Workshop'    },
    { label: 'Fest',        path: '/events', type: 'category', category: 'Fest'        },
  ],
  '/gallery': [
    { label: 'All',          path: '/gallery', type: 'category', category: 'All'          },
    { label: 'Competitions', path: '/gallery', type: 'category', category: 'Competitions' },
    { label: 'Workshops',    path: '/gallery', type: 'category', category: 'Workshops'    },
    { label: 'Events',       path: '/gallery', type: 'category', category: 'Events'       },
    { label: 'Team',         path: '/gallery', type: 'category', category: 'Team'         },
  ],
};

const navItems = [
  { name: 'Home',     path: '/'        },
  { name: 'About',    path: '/about'   },
  { name: 'Team',     path: '/team'    },
  { name: 'Projects', path: '/projects'},
  { name: 'Events',   path: '/events'  },
  { name: 'Awards',   path: '/awards'  },
  { name: 'Gallery',  path: '/gallery' },
  { name: 'Contact',  path: '/contact' },
];

// ─── Shared click handler logic ───────────────────────────────────────────────
function useSubmenuClick(onSelect: () => void) {
  const navigate  = useNavigate();
  const location  = useLocation();

  return function handleClick(item: SubmenuItem) {
    onSelect();

    if (item.type === 'category') {
      if (location.pathname === item.path) {
        // Same page → dispatch event so the page updates instantly
        window.dispatchEvent(
          new CustomEvent('submenu-set-category', { detail: item.category }),
        );
      } else {
        // Different page → navigate with ?category= search param (reliable across all cases)
        navigate(`${item.path}?category=${encodeURIComponent(item.category)}`);
      }
      return;
    }

    if (item.type === 'hash') {
      if (location.pathname === item.path) {
        // Same page → scroll directly
        const el = document.getElementById(item.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Different page → store hash, navigate
        sessionStorage.setItem('scrollToHash', item.hash);
        navigate(item.path);
      }
      return;
    }

    // type === 'link'
    navigate(item.path);
  };
}

// ─── Desktop Submenu Dropdown ─────────────────────────────────────────────────
function SubmenuDropdown({
  items,
  onSelect,
}: {
  items: SubmenuItem[];
  onSelect: () => void;
}) {
  const handleClick = useSubmenuClick(onSelect);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[190px] rounded-2xl border border-border/60 bg-card/95 backdrop-blur-2xl shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden z-50"
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="p-1.5">
        {items.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15, delay: i * 0.03 }}
            onClick={() => handleClick(item)}
            className="w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/70 transition-all duration-200 relative overflow-hidden group"
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-primary/5 to-transparent transition-transform duration-500" />
            <span className="relative">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Mobile Submenu Item ──────────────────────────────────────────────────────
function MobileSubmenuItem({
  item,
  onSelect,
}: {
  item: SubmenuItem;
  onSelect: () => void;
}) {
  const handleClick = useSubmenuClick(onSelect);

  return (
    <button
      onClick={() => handleClick(item)}
      className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
    >
      {item.label}
    </button>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
export function Header() {
  const [isScrolled, setIsScrolled]             = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu]           = useState<string | null>(null);
  const hoverTimerRef                           = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location                                = useLocation();
  const { resolvedTheme, setTheme }             = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenSubmenu(null);
  }, [location.pathname]);

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  function handleNavMouseEnter(path: string) {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (submenus[path]) setOpenSubmenu(path);
  }

  function handleNavMouseLeave() {
    hoverTimerRef.current = setTimeout(() => setOpenSubmenu(null), 120);
  }

  function handleDropdownMouseEnter() {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  }

  function handleDropdownMouseLeave() {
    hoverTimerRef.current = setTimeout(() => setOpenSubmenu(null), 120);
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/70 backdrop-blur-2xl border-b border-border/40 shadow-lg shadow-black/5'
          : 'bg-background/30 backdrop-blur-md'
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group relative z-10">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="relative w-11 h-11 rounded-2xl flex items-center justify-center"
            >
              <img src="/assets/logo.png" alt="Robotics Club Logo" className="w-full h-full object-contain" />
            </motion.div>
            <div className="hidden sm:block">
              <div className="font-heading font-bold text-lg tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">Robotics Club</div>
              <div className="text-[10px] text-muted-foreground -mt-0.5 tracking-[0.2em] uppercase font-medium">NIT Patna</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-background/40 backdrop-blur-md rounded-2xl px-2 py-1.5 border border-border/50 shadow-sm">
            {navItems.map((item) => {
              const isActive      = location.pathname === item.path;
              const hasSubmenu    = Boolean(submenus[item.path]);
              const isSubmenuOpen = openSubmenu === item.path;

              return (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => handleNavMouseEnter(item.path)}
                  onMouseLeave={handleNavMouseLeave}
                >
                  <Link to={item.path} tabIndex={-1}>
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          'relative text-sm font-medium transition-all duration-300 rounded-xl h-9 overflow-hidden group',
                          hasSubmenu ? 'px-3' : 'px-4',
                          isActive
                            ? 'text-foreground bg-primary/10 shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                        )}
                      >
                        {!isActive && (
                          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-primary/5 to-transparent transition-transform duration-500 ease-in-out" />
                        )}
                        <span className="relative flex items-center gap-1">
                          {item.name}
                          {hasSubmenu && (
                            <ChevronDown
                              className={cn(
                                'w-3.5 h-3.5 transition-transform duration-200',
                                isSubmenuOpen ? 'rotate-180' : ''
                              )}
                            />
                          )}
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="navbar-indicator"
                            className="absolute inset-0 bg-primary/5 border border-primary/20 rounded-xl"
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                          />
                        )}
                      </Button>
                    </motion.div>
                  </Link>

                  {/* Submenu dropdown */}
                  <AnimatePresence>
                    {hasSubmenu && isSubmenuOpen && (
                      <div
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        <SubmenuDropdown
                          items={submenus[item.path]}
                          onSelect={() => setOpenSubmenu(null)}
                        />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-6 relative z-10">
            <NotificationMenu isScrolled={isScrolled} />

            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={cn(
                  'w-10 h-10 rounded-xl transition-all duration-300 overflow-hidden group',
                  'hover:bg-accent/80 backdrop-blur-sm',
                  isScrolled && 'bg-background/60'
                )}
                aria-label="Toggle theme"
              >
                <span className="absolute inset-0 rounded-xl bg-primary/10 scale-0 group-active:scale-100 transition-transform duration-200" />
                <AnimatePresence mode="wait" initial={false}>
                  {resolvedTheme === 'dark' ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0, scale: 0.8 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }}>
                      <Sun className="w-5 h-5 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0, scale: 0.8 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }}>
                      <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-2.5 rounded-xl transition-all duration-300 relative overflow-hidden group',
                'hover:bg-accent/80 backdrop-blur-sm',
                isScrolled && 'bg-background/60',
                isMobileMenuOpen && 'bg-primary/10 border border-primary/20'
              )}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="lg:hidden bg-background/95 backdrop-blur-2xl border-b border-border/40 shadow-xl overflow-y-auto max-h-[80vh]"
          >
            <div className="container mx-auto px-4 py-6 space-y-1">
              {navItems.map((item, index) => {
                const isActive   = location.pathname === item.path;
                const hasSubmenu = Boolean(submenus[item.path]);
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                  >
                    <Link to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className={cn(
                          'w-full justify-start rounded-xl text-base h-12 transition-all duration-300 relative overflow-hidden group',
                          isActive
                            ? 'bg-primary/10 text-foreground font-semibold border border-primary/20 shadow-sm'
                            : 'hover:bg-accent/80 text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {!isActive && (
                          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-primary/5 to-transparent transition-transform duration-500" />
                        )}
                        {isActive && <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-primary" />}
                        <span className="relative pl-1">{item.name}</span>
                      </Button>
                    </Link>

                    {/* Mobile submenu items */}
                    {hasSubmenu && (
                      <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-border/50 pl-3">
                        {submenus[item.path].map((sub) => (
                          <MobileSubmenuItem
                            key={sub.label}
                            item={sub}
                            onSelect={() => setIsMobileMenuOpen(false)}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
