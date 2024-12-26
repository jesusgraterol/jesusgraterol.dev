import { useState } from 'react';
import { Button } from '@/shared/shadcn/components/ui/button.tsx';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Bio
 * Component in charge of quickly showing what Jesus Graterol does.
 */
const Bio = () => {
  /* **********************************************************************************************
   *                                             STATE                                            *
   ********************************************************************************************** */
  const [readMore, setReadMore] = useState<boolean>(false);





  /* **********************************************************************************************
   *                                           COMPONENT                                          *
   ********************************************************************************************** */
  return (
    <section>
      <header>
        <h1
          className='text-2xl font-semibold leading-none tracking-tight'
        >Hi! My name is Jesus Graterol</h1>
      </header>

      <p className='my-3'>
        I am a Web Developer with 10+ years of experience building scalable web applications and
         REST-based APIs.
      </p>

      {
        readMore
          ? (
            <>
              <p>
                My proficiency extends to data science, allowing me to train and serve complex
                 machine learning models over the Internet.
              </p>
              <p className='mt-3'>
                As a problem solver with meticulous attention to detail, I'm adept at identifying
                 and resolving intricate challenges quickly and efficiently.
              </p>
            </>
          )
          : (
            <>
              <p className='inline'>
                My proficiency extends to data science, allowing...
              </p>
              <Button
                variant='link'
                className='text-xs sm:text-sm text-muted dark:text-slate-400 inline p-0 ml-2'
                onClick={() => setReadMore(true)}
              >
                see more
              </Button>
            </>
          )
      }
    </section>
  );
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Bio;
