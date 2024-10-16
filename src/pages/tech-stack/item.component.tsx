import { Badge } from '@/shared/shadcn/components/ui/badge.tsx';
import { Progress } from '@/shared/shadcn/components/ui/progress.tsx';
import { IExpertiseLevel, ITechStackItem } from '@/shared/services/config/index.service.ts';

/* ************************************************************************************************
 *                                            HELPERS                                             *
 ************************************************************************************************ */

/**
 * Calculates the value that should be set on the progress bar based on the expertise level.
 * @param expertiseLevel
 * @returns number
 */
const calculateProgressValue = (expertiseLevel: IExpertiseLevel): number => {
  switch (expertiseLevel) {
    case 2:
      return 100;
    case 1:
      return 60;
    case 0:
      return 25;
    default:
      throw new Error(`The expertise level ${expertiseLevel} is invalid.`);
  }
};





/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Item Component
 * Component in charge of displaying a technology as well as the experience the developer has.
 */
const Item = ({ data }: { data: ITechStackItem }) => (
  <Badge
    variant='outline'
    className='flex justify-start items-center p-2'
  >
    <Progress
      value={calculateProgressValue(data.level)}
      className='w-5 h-2 -rotate-90'
    />
    <p>{data.name}</p>
  </Badge>
);





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Item;
