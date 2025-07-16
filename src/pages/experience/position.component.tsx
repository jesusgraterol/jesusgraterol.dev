import { Ellipsis } from 'lucide-react';
import { Button } from '@/shared/shadcn/components/ui/button.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/shadcn/components/ui/tooltip.tsx';
import { IPosition } from '@/shared/services/config/types.ts';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Position Component
 * Component in charge of displaying details about a job as well as the responsibilities.
 */
const Position = ({
  position,
  openDialog,
}: {
  position: IPosition;
  openDialog: (pos: IPosition) => void;
}) => (
  <div className="mb-8 last:mb-0 ml-5">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="float-right"
          onClick={() => openDialog(position)}
        >
          <Ellipsis className="w-5 h-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>View responsibilities</p>
      </TooltipContent>
    </Tooltip>

    <img
      src={position.logo}
      alt={`${position.companyName}'s logo`}
      className="absolute w-7 h-7 mt-1.5 -left-3.5"
      width="32"
      height="32"
    />
    <time className="text-sm font-semibold leading-none text-muted dark:text-slate-400">
      {position.dateRange}
    </time>
    <h3 className="font-semibold">{position.positionName}</h3>
    <p className="text-sm truncate">{position.companyName}</p>
  </div>
);

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Position;
