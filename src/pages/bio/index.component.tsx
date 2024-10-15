import { Button } from '@/shared/shadcn/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/shadcn/components/ui/dialog.tsx';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Bio
 * Component in charge of quickly showing what Jesus Graterol does.
 */
const Bio = () => (
  <section>
    <header>
      <h1
        className='text-2xl font-semibold leading-none tracking-tight'
      >Hi! My name is Jesus Graterol</h1>
    </header>

    <p className='my-3'>
      I am a skilled Full-Stack Web Developer with 10+ years of experience in building scalable
        web applications and REST-based APIs.
    </p>
    <p className='inline'>
      My proficiency extends to data science, allowing...
    </p>

    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='link'
          className='text-xs sm:text-sm text-muted inline p-0 ml-2'
        >
          Read more
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='truncate max-w-[85%] text-left'>
            Hi! My name is Jesus Graterol
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <p>
          I am a skilled Full-Stack Web Developer with 10+ years of experience in building scalable
            web applications and REST-based APIs.
        </p>
        <p className='mt-1'>
          My proficiency extends to data science, allowing me to create and serve complex machine
            learning models over the Internet.
        </p>
        <p className='mt-1'>
          I am a problem-solver with keen attention to detail, adept at identifying and resolving
          complex issues promptly and professionally.
        </p>
      </DialogContent>
    </Dialog>
  </section>
);





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Bio;
