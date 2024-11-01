import { Badge } from '@/shared/shadcn/components/ui/badge.tsx';
import { ITechStackCategory } from '@/shared/services/config/index.service.ts';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Category Component
 * Component in charge of displaying a series of technologies that comprise a category.
 */
const Category = ({ data }: { data: ITechStackCategory }) => (
  <div
    className='mt-5'
  >
    <h3
      className='text-lg font-medium leading-none tracking-tight'
    >{data.title}</h3>

    <div className='mt-3 flex justify-start items-center flex-wrap gap-x-4 gap-y-2'>
      {data.items.map((item, i) => (
        <Badge
          key={i}
          variant='secondary'
          className='items-center gap-1 p-2'
        >
          <img
            src={`tech-stack/${item.icon}.png`}
            alt={item.name}
            width='16'
            height='16'
            loading='lazy'
            className='w-4 h-4'
          />
          <p>{item.name}</p>
        </Badge>
      ))}
    </div>
  </div>
);





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Category;
