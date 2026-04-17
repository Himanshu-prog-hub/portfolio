"use client";

import { useEffect } from 'react';

/**
 * On mount: force scroll to top and disable browser scroll restoration.
 * On unload: scroll to top so the next page load always starts at 0.
 */
export function ScrollToTop() {
  useEffect(() => {
    // Belt-and-suspenders: also scroll to top after hydration
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // When user refreshes, pre-scroll to 0 before the page unloads
    // so the browser has nothing to restore
    const handleBeforeUnload = () => window.scrollTo(0, 0);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return null;
}
