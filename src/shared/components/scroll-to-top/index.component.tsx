import { MoveUp } from 'lucide-react';
import { Button } from '@/shared/shadcn/components/ui/button.tsx';
import { NavService } from '@/shared/services/nav/index.service.ts';
import { useVerticalScroll } from '@/shared/hooks/vertical-scroll/index.hook.ts';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Scroll To Top
 * Component in charge of providing users a quick way of scrolling all the way up.
 */
const ScrollToTop = () => {
  /* **********************************************************************************************
   *                                             STATE                                            *
   ********************************************************************************************** */
  const verticalScroll = useVerticalScroll();

  /* **********************************************************************************************
   *                                           COMPONENT                                          *
   ********************************************************************************************** */
  return (
    <Button
      className={`fixed bottom-5 right-5 z-10 rounded-full shadow-5 transition-transform duration-500 ${verticalScroll > 200 ? 'translate-y-0' : 'translate-y-20'} dark:bg-slate-950 dark:hover:bg-slate-950/60`}
      size="icon"
      onClick={NavService.scrollToTop}
      aria-label="Scroll to Top"
    >
      <MoveUp color="white" aria-hidden="true" className="w-5 h-5" />
    </Button>
  );
};

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default ScrollToTop;
