import { useSyncExternalStore } from 'react';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Vertical Scroll Hook
 * Subscribes to the Client's Scroll Event.
 * @returns () => number
 */
const useVerticalScroll: () => number = () => useSyncExternalStore(
  (callback) => {
    window.addEventListener('scroll', callback);
    return () => {
      window.removeEventListener('scroll', callback);
    };
  },
  () => window.scrollY,
);





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  useVerticalScroll,
};
