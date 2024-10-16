import { ExternalLink } from 'lucide-react';
import { Button } from '@/shared/shadcn/components/ui/button.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/shadcn/components/ui/tooltip.tsx';
import { ICertification } from '@/shared/services/config/types.ts';
import { NavService } from '@/shared/services/nav/index.service';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Certification Component
 * Component in charge of displaying details about an individual certification.
 */
const Certification = ({ certification }: { certification: ICertification }) => (
  <div
    className='mb-8 last:mb-0 ml-5'
  >
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='float-right'
          onClick={() => NavService.openURL(certification.certificateURL)}
        >
          <ExternalLink className='w-5 h-5' />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>View certificate</p>
      </TooltipContent>
    </Tooltip>

    <img
      src={certification.logo}
      alt={`${certification.institution}'s logo`}
      className='absolute w-7 h-7 mt-1.5 -left-3.5'
      width='32'
      height='32'
    />
    <time
      className='text-sm font-semibold leading-none text-muted'>
        {certification.dateRange}
    </time>
    <h3
      className='font-semibold truncate'
    >{certification.degree}</h3>
    <p
      className='text-sm truncate'
    >
      {certification.institution}
    </p>
  </div>
);





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Certification;
