import { TooltipProvider } from '@/shared/shadcn/components/ui/tooltip.tsx';
import Header from '@/pages/header/index.component.tsx';
import Bio from '@/pages/bio/index.component.tsx';
import Projects from '@/pages/projects/index.component.tsx';
import Experience from '@/pages/experience/index.component.tsx';
import Education from '@/pages/education/index.component.tsx';
import TechStack from '@/pages/tech-stack/index.component.tsx';
import ScrollToTop from '@/shared/components/scroll-to-top/index.component.tsx';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * App Component
 * Component in charge of putting together all the pieces that comprise the application.
 */
const App = () => (
  <TooltipProvider delayDuration={200}>
    <div
      className='w-full flex justify-center items-start bg-white animate-in slide-in-from-bottom-5 duration-500'
    >
      <div
        className='w-full md:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12'
      >
        {/* ********
          * HEADER *
          ******** */}
        <Header />

        <main
          className='px-5'
        >
          {/* *****
            * BIO *
            ***** */}
          <Bio />



          {/* **********
            * PROJECTS *
            ********** */}
          <Projects />



          {/* ************
            * EXPERIENCE *
            ************ */}
          <Experience />



          {/* ***********
            * EDUCATION *
            *********** */}
          <Education />



          {/* ************
            * TECH STACK *
            ************ */}
          <TechStack />



          {/* ***************
            * SCROLL TO TOP *
            *************** */}
          <ScrollToTop />
        </main>
      </div>
    </div>
  </TooltipProvider>
);





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default App;
