import { Mail, Menu } from 'lucide-react';
import { Button } from '@/shared/shadcn/components/ui/button.tsx';
import { ConfigService } from '@/shared/services/config/index.service.ts';
import { NavService } from '@/shared/services/nav/index.service.ts';
import {
  GitHubIcon,
  LinkedInIcon,
  KaggleIcon,
  TwitterIcon,
} from '@/shared/components/custom-icons/index.component.tsx';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Header Component
 * Component in charge of managing the heading of the app and navigation to external links.
 */
const Header = () => {
  /* **********************************************************************************************
   *                                       REACTIVE VALUES                                        *
   ********************************************************************************************** */

  // the list of action and navigation buttons
  const navItems = [
    {
      label: 'Open GitHub Page',
      icon: <GitHubIcon className='w-[1.67rem] h-[1.67rem]' />,
      action: NavService.openGitHubPage,
    },
    {
      label: 'Open LinkedIn Page',
      icon: <LinkedInIcon className='w-6 h-6' />,
      action: NavService.openLinkedInPage,
    },
    {
      label: 'Open Kaggle Page',
      icon: <KaggleIcon className='w-6 h-6' />,
      action: NavService.openKagglePage,
    },
    {
      label: 'Open Twitter Page',
      icon: <TwitterIcon className='w-[1.40rem] h-[1.40rem]' />,
      action: NavService.openTwitterPage,
    },
    {
      label: `Contact ${ConfigService.name}`,
      icon: <Mail className='w-6 h-6' />,
      action: NavService.openTwitterPage,
    },
  ];





  /* **********************************************************************************************
   *                                        EVENT HANDLERS                                        *
   ********************************************************************************************** */

  const goToTop = (): void => {

  };





  /* **********************************************************************************************
   *                                           COMPONENT                                          *
   ********************************************************************************************** */
  return (
    <header
      className='flex justify-between items-center py-2 sm:py-5 px-1'
    >
      {/* ********
        * AVATAR *
        ******** */}
      <button
        className='flex justify-start items-center gap-2 hover:bg-slate-100 rounded-md px-2 py-1'
        onClick={goToTop}
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
          navItems.map((item, i) => (
            <Button
              key={i}
              aria-label={item.label}
              variant='ghost'
              size='icon'
              className='hidden sm:flex'
              onClick={item.action}
            >
            {item.icon}
          </Button>
          ))
        }



        <Button
          variant='ghost'
          size='icon'
          className='sm:hidden'
        >
          <Menu className='w-6 h-6' />
        </Button>
      </nav>
    </header>
  );
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Header;
