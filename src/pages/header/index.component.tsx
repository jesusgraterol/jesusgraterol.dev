import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/shared/shadcn/components/ui/button.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/shadcn/components/ui/tooltip.tsx';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/shadcn/components/ui/sheet.tsx';
import { ConfigService } from '@/shared/services/config/index.service.ts';
import { NavService } from '@/shared/services/nav/index.service.ts';
import {
  GitHubIcon,
  LinkedInIcon,
  KaggleIcon,
  TwitterIcon,
} from '@/shared/components/custom-icons/index.component.tsx';

/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

// the list of action and navigation buttons
const NAV_ITEMS = [
  {
    label: 'Open GitHub Page',
    headingIcon: <GitHubIcon className='w-[1.67rem] h-[1.67rem]' />,
    sidenavIcon: <GitHubIcon className='w-6 h-6' />,
    action: NavService.openGitHubPage,
  },
  {
    label: 'Open LinkedIn Page',
    headingIcon: <LinkedInIcon className='w-6 h-6' />,
    sidenavIcon: <LinkedInIcon className='w-6 h-6' />,
    action: NavService.openLinkedInPage,
  },
  {
    label: 'Open Kaggle Page',
    headingIcon: <KaggleIcon className='w-6 h-6' />,
    sidenavIcon: <KaggleIcon className='w-6 h-6' />,
    action: NavService.openKagglePage,
  },
  {
    label: 'Open Twitter Page',
    headingIcon: <TwitterIcon className='w-[1.40rem] h-[1.40rem]' />,
    sidenavIcon: <TwitterIcon className='w-6 h-6' />,
    action: NavService.openTwitterPage,
  },
];





/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Header Component
 * Component in charge of managing the heading of the app and navigation to external links.
 */
const Header = () => {
  /* **********************************************************************************************
   *                                             STATE                                            *
   ********************************************************************************************** */
  const [isSidenavOpen, setIsSidenavOpen] = useState<boolean>(false);





  /* **********************************************************************************************
   *                                           COMPONENT                                          *
   ********************************************************************************************** */
  return (
    <>
    {/* *********
      * CONTENT *
      ********* */}
      <header
        className='flex justify-between items-center py-2 sm:py-3 px-1'
      >
        {/* ********
          * AVATAR *
          ******** */}
        <button
          className='flex justify-start items-center gap-2 px-2 py-1'
          onClick={NavService.scrollToTop}
          aria-label='Scroll to the top of the app'
        >
          <img
            src={ConfigService.avatarPath}
            alt={`Photo of ${ConfigService.name}`}
            className='w-10 h-10 rounded-full'
            width='40'
            height='40'
          />

          <p
            className='text-lg font-semibold tracking-wide'
          >{ConfigService.urlName}</p>
        </button>



        {/* ************
          * NAVIGATION *
          ************ */}
        <nav
          className='flex justify-end items-center gap-3'
        >
          {
            NAV_ITEMS.map((item, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <Button
                    aria-label={item.label}
                    variant='ghost'
                    size='icon'
                    className='hidden sm:flex'
                    onClick={item.action}
                  >
                    {item.headingIcon}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ))
          }

          <Button
            variant='ghost'
            size='icon'
            className='sm:hidden'
            onClick={() => setIsSidenavOpen(true)}
          >
            <Menu className='w-6 h-6' />
          </Button>
        </nav>
      </header>




    {/* *********
      * SIDENAV *
      ********* */}
    <Sheet open={isSidenavOpen} onOpenChange={setIsSidenavOpen}>
      <SheetContent
        side='right'
        className='w-64 overflow-y-auto p-0'
      >
        <SheetHeader className='pt-3 px-3'>
          <SheetTitle className='text-left'>Menu</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        {
            NAV_ITEMS.map((item, i) => (
              <Button
                key={i}
                aria-label={item.label}
                variant='ghost'
                className='w-full justify-start gap-2 my-0.5'
                onClick={item.action}
              >
              {item.sidenavIcon} {item.label}
            </Button>
            ))
          }
      </SheetContent>
    </Sheet>
    </>
  );
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Header;
