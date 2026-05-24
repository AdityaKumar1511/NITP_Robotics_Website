import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ExternalLink, X, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getNotifications, type Notification } from '@/data';

const initialNotifications: Notification[] = getNotifications();

interface NotificationMenuProps {
  isScrolled: boolean;
}

export function NotificationMenu({ isScrolled }: NotificationMenuProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id: number) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const dismissNotification = (id: number) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <div ref={menuRef} className="relative">
      {/* Bell Button */}
      <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen((p) => !p)}
          className={cn(
            'w-10 h-10 rounded-xl transition-all duration-300 relative overflow-hidden group',
            'hover:bg-accent/80 backdrop-blur-sm',
            isScrolled && 'bg-background/60',
            isOpen && 'bg-primary/10 border border-primary/20'
          )}
          aria-label="Notifications"
        >
          {/* Shimmer on hover */}
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-primary/8 to-transparent" />

          <motion.div
            animate={{ rotate: isOpen ? [0, -12, 12, -8, 8, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Bell className={cn('w-5 h-5 relative', isOpen && 'text-primary')} />
          </motion.div>

          {/* Badge */}
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-1 shadow-lg shadow-red-500/40"
              >
                {unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="fixed sm:absolute right-4 sm:right-0 left-4 sm:left-auto top-20 sm:top-full mt-0 sm:mt-2 w-auto sm:w-[380px] max-w-[380px] rounded-2xl border border-border/60 bg-card/95 backdrop-blur-2xl shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden z-50"
          >
            {/* Top shimmer line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-semibold text-sm">Notifications</h3>
                <AnimatePresence>
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                    >
                      {unreadCount} new
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {unreadCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={markAllAsRead}
                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors group"
                >
                  <CheckCheck className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  Mark all read
                </motion.button>
              )}
            </div>

            {/* Notifications list */}
            <div className="max-h-[360px] overflow-y-auto scrollbar-hide">
              {notifications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-14 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3"
                  >
                    <Bell className="w-5 h-5 text-muted-foreground/50" />
                  </motion.div>
                  <p className="text-sm text-muted-foreground">All caught up!</p>
                </motion.div>
              ) : (
                notifications.map((notification, index) => {
                  const Wrapper = notification.link ? 'a' : 'div';
                  const wrapperProps = notification.link
                    ? { href: notification.link, onClick: () => markAsRead(notification.id) }
                    : { onClick: () => markAsRead(notification.id) };

                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      layout
                    >
                      <div
                        className={cn(
                          'relative group border-b border-border/30 last:border-b-0 transition-all duration-200',
                          !notification.read
                            ? 'bg-primary/[0.04] dark:bg-primary/[0.06] hover:bg-primary/[0.07]'
                            : 'hover:bg-accent/60'
                        )}
                      >
                        <Wrapper
                          {...wrapperProps}
                          className="flex items-start gap-3 px-5 py-4 cursor-pointer"
                        >
                          {/* Unread dot */}
                          <div className="mt-1.5 flex-shrink-0">
                            <motion.div
                              animate={!notification.read ? { scale: [1, 1.3, 1] } : {}}
                              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                              className={cn(
                                'w-2 h-2 rounded-full transition-all duration-300',
                                !notification.read
                                  ? 'bg-primary shadow-sm shadow-primary/50'
                                  : 'bg-border'
                              )}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className={cn(
                                'text-sm font-medium truncate transition-colors duration-200',
                                !notification.read
                                  ? 'text-foreground'
                                  : 'text-muted-foreground group-hover:text-foreground'
                              )}>
                                {notification.title}
                              </p>
                              {notification.link && (
                                <ExternalLink className="w-3 h-3 text-muted-foreground/40 flex-shrink-0 group-hover:text-primary transition-colors duration-200" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                              {notification.description}
                            </p>
                            <p className="text-[10px] text-muted-foreground/50 mt-1.5 uppercase tracking-wide font-medium">
                              {notification.time}
                            </p>
                          </div>
                        </Wrapper>

                        {/* Dismiss */}
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            dismissNotification(notification.id);
                          }}
                          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded-lg hover:bg-accent transition-all duration-200"
                        >
                          <X className="w-3.5 h-3.5 text-muted-foreground" />
                        </motion.button>

                        {/* Left border accent for unread */}
                        {!notification.read && (
                          <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-primary" />
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="border-t border-border/40 px-5 py-3">
                <p className="text-xs text-muted-foreground/60 text-center">
                  {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
