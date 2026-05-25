/**
 * useCategoryFromNav
 *
 * Use inside ProjectsPage, EventsPage, GalleryPage.
 * Sets selectedCategory from nav submenu clicks AND scrolls down to
 * the #category-filter section (same behaviour as Team's scroll-to-hash).
 *
 * Sources (in priority order):
 *   1. URL search param  ?category=X   (cross-page nav)
 *   2. sessionStorage 'setCategory'    (fallback)
 *   3. Custom event 'submenu-set-category' (same-page nav)
 */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FILTER_SECTION_ID = 'category-filter';

function scrollToFilter(attempts = 0) {
  const el = document.getElementById(FILTER_SECTION_ID);
  if (el) {
    setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  } else if (attempts < 12) {
    setTimeout(() => scrollToFilter(attempts + 1), 100);
  }
}

export function useCategoryFromNav(setCategory: (c: string) => void) {
  const location = useLocation();
  const navigate = useNavigate();

  // On mount / navigation: read ?category= param or sessionStorage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlCategory = params.get('category');

    if (urlCategory) {
      setCategory(urlCategory);
      scrollToFilter();
      // Clean the URL without adding a history entry
      params.delete('category');
      const newSearch = params.toString();
      navigate(
        { pathname: location.pathname, search: newSearch ? `?${newSearch}` : '' },
        { replace: true }
      );
      return;
    }

    const stored = sessionStorage.getItem('setCategory');
    if (stored) {
      sessionStorage.removeItem('setCategory');
      setCategory(stored);
      scrollToFilter();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);

  // Same-page: listen for custom event dispatched by Header
  useEffect(() => {
    function handler(e: Event) {
      const cat = (e as CustomEvent<string>).detail;
      setCategory(cat);
      scrollToFilter();
    }
    window.addEventListener('submenu-set-category', handler);
    return () => window.removeEventListener('submenu-set-category', handler);
  }, [setCategory]);
}
