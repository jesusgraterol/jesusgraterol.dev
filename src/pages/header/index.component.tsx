import { Github, Linkedin, TwitterIcon, Mail, FileUser, Menu } from 'lucide-react';
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
          src='avatar/default.png'
          alt='Photo of Jesus Graterol'
          className='w-10 h-10 rounded-full'
          width='40'
          height='40'
        />

        <p
          className='text-lg font-semibold tracking-wide'
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
          className='hidden sm:flex'
        >
          <Github className='w-6 h-6' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='hidden sm:flex'
        >
          <Linkedin className='w-6 h-6' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='hidden sm:flex'
        >
          <TwitterIcon className='w-6 h-6' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='hidden sm:flex'
        >
          <Linkedin className='w-6 h-6' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='hidden sm:flex'
        >
          <FileUser className='w-6 h-6' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='hidden sm:flex'
        >
          <Mail className='w-6 h-6' />
        </Button>
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
