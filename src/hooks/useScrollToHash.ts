/**
 * useScrollToHash
 *
 * Call this once at the top of any page that has submenu anchors.
 * It handles two cases:
 *   1. URL hash  (/team#core-team)     → scrolls to element with that id
 *   2. sessionStorage 'scrollToHash'   → scrolls to element (cross-page navigation)
 *
 * For category filter pages (Projects, Events, Gallery) the submenu sets
 * sessionStorage 'setCategory' instead of scrollToHash. The page reads it.
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
        } else if (attempts < 12) {
          setTimeout(() => tryScroll(attempts + 1), 100);
        }
      };
      tryScroll();
      return;
    }

    const pending = sessionStorage.getItem('scrollToHash');
    if (pending) {
      sessionStorage.removeItem('scrollToHash');
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(pending);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
        } else if (attempts < 12) {
          setTimeout(() => tryScroll(attempts + 1), 100);
        }
      };
      tryScroll();
    }
  }, [location.pathname, location.hash]);
}
