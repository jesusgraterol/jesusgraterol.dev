
import { IPosition } from '@/shared/services/config/types.ts';
import { Button } from '@/shared/shadcn/components/ui/button';
import { Ellipsis } from 'lucide-react';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Position Component
 * Component in charge of displaying details about a job as well as the responsibilities.
 */
const Position = ({ position }: { position: IPosition }) => (
  <div
    className='mb-8 last:mb-0 ml-5'
  >
    <Button
      variant='ghost'
      size='icon'
      className='float-right'
    >
      <Ellipsis className='w-5 h-5' />
    </Button>

    <img
      src={position.logo}
      alt={`${position.companyName}'s logo`}
      className='absolute w-7 h-7 mt-1.5 -left-3.5 rounded-sm'
      width='32'
      height='32'
    />
    <time
      className='text-sm font-semibold leading-none text-muted'>
        {position.dateRange}
    </time>
    <h3
      className='font-semibold'
    >{position.positionName}</h3>
    <p
      className='text-sm truncate'
    >
      {position.companyName} · {position.employmentType}
    </p>
  </div>
);





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Position;
