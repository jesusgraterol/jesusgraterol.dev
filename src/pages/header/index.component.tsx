import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { Button } from '@/shared/shadcn/components/ui/button.tsx';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Header Component
 * Component in charge of managing the heading of the app and navigation to external links.
 */
const Header = () => {
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
      className='flex justify-between items-center py-5'
    >
      {/* ********
        * AVATAR *
        ******** */}
      <button
        className='flex justify-start items-center gap-2 hover:bg-slate-100 rounded-md px-2 py-1'
        onClick={goToTop}
      >
        <img
          src='avatar/default.png'
          alt='Photo of Jesus Graterol'
          className='w-11 h-11 rounded-full'
          width='100'
          height='100'
        />

        <p
          className='text-lg font-medium'
        >jesusgraterol.dev</p>
      </button>

      {/* ************
        * NAVIGATION *
        ************ */}
      <nav
        className='flex justify-end items-center gap-2'
      >
        <Button
          variant='ghost'
          size='icon'
        >
          <GitHubLogoIcon className='w-6 h-6' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
        >
          <LinkedInLogoIcon className='w-6 h-6' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
        >
          <LinkedInLogoIcon className='w-6 h-6' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
        >
          <LinkedInLogoIcon className='w-6 h-6' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
        >
          <LinkedInLogoIcon className='w-6 h-6' />
        </Button>
      </nav>
    </header>
  );
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Header;
