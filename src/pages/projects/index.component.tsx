import { useState } from 'react';
import { Button } from '@/shared/shadcn/components/ui/button.tsx';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Projects Component
 * Component in charge of ...
 */
const Projects = () => {
  /* **********************************************************************************************
   *                                             REFS                                             *
   ********************************************************************************************** */



  /* **********************************************************************************************
   *                                             STATE                                            *
   ********************************************************************************************** */
  const [active, setActive] = useState();




  /* **********************************************************************************************
   *                                       REACTIVE VALUES                                        *
   ********************************************************************************************** */





  /* **********************************************************************************************
   *                                         SIDE EFFECTS                                         *
   ********************************************************************************************** */





  /* **********************************************************************************************
   *                                        EVENT HANDLERS                                        *
   ********************************************************************************************** */





  /* **********************************************************************************************
   *                                           COMPONENT                                          *
   ********************************************************************************************** */
  return (
    <section>
      <header
        className='flex justify-between items-center'
      >
        <h2
          className='text-2xl font-semibold leading-none tracking-tight'
        >Projects</h2>

        <Button
          variant='link'
          className='text-xs sm:text-sm text-light p-0'
        >
          View repositories
        </Button>
      </header>

      <p className='mt-3'>
        @TODO
      </p>
    </section>
  );
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Projects;
