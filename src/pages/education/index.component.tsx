import { Button } from '@/shared/shadcn/components/ui/button.tsx';
import { NavService } from '@/shared/services/nav/index.service.ts';
import { ConfigService } from '@/shared/services/config/index.service';
import Certification from './certification.component';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Education Component
 * Component in charge of displaying all the certifications obtained by the developer.
 */
const Education = () => (
  <section>
    <header
      className='flex justify-between items-center'
    >
      <h2
        className='text-2xl font-semibold leading-none tracking-tight'
      >Education</h2>

      <Button
        variant='link'
        className='text-xs sm:text-sm text-muted p-0'
        onClick={NavService.openCertificates}
      >
        View certificates
      </Button>
    </header>

    <div className='relative ml-4 border-l border-slate-200 mt-5'>
      {
        ConfigService.certifications.map((certification, i) => (
          <Certification key={i} certification={certification} />
        ))
      }
    </div>
  </section>
);





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Education;
