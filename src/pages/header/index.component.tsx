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
      className='flex just-center items-center'
    >
      {/* ********
        * AVATAR *
        ******** */}
      <Button
        variant='ghost'
        onClick={goToTop}
      >
        <img
          src='avatar/default.jpg'
          alt='Photo of Jesus Graterol'
          className='w-16 h-16 round-sm'
          width='100'
          height='100'
        />

        <p>jesusgraterol</p>
      </Button>

      {/* ************
        * NAVIGATION *
        ************ */}
      <nav>

      </nav>
    </header>
  );
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Header;
