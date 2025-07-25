import { useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/shadcn/components/ui/dialog.tsx';
import { Button } from '@/shared/shadcn/components/ui/button';
import { ConfigService, IPosition } from '@/shared/services/config/index.service.ts';
import Position from '@/pages/experience/position.component.tsx';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Experience Component
 * Component in charge of showing the list of positions that have been covered by the developer.
 */
const Experience = () => {
  /* **********************************************************************************************
   *                                             REFS                                             *
   ********************************************************************************************** */
  const activePosition = useRef<IPosition>();

  /* **********************************************************************************************
   *                                             STATE                                            *
   ********************************************************************************************** */
  const [visibleRecords, setVisibleRecords] = useState<number>(5);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  /* **********************************************************************************************
   *                                        EVENT HANDLERS                                        *
   ********************************************************************************************** */

  /**
   * Displays a position's dialog.
   * @param pos
   */
  const openDialog = (pos: IPosition) => {
    activePosition.current = pos;
    setIsDialogOpen(true);
  };

  /* **********************************************************************************************
   *                                           COMPONENT                                          *
   ********************************************************************************************** */
  return (
    <>
      <section>
        <header>
          <h2 className="text-2xl font-semibold leading-none tracking-tight">Experience</h2>
        </header>

        <div className="relative ml-4 border-l border-slate-200 mt-5">
          {ConfigService.positions.slice(0, visibleRecords).map((position, i) => (
            <Position
              key={i}
              position={position}
              openDialog={openDialog}
            />
          ))}
        </div>

        {visibleRecords < 100 && (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setVisibleRecords(100)}
          >
            View all
          </Button>
        )}
      </section>

      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent className="dark:text-white">
          <DialogHeader className="text-left">
            <DialogTitle>{activePosition.current?.positionName}</DialogTitle>
            <DialogDescription>{activePosition.current?.companyName}</DialogDescription>
          </DialogHeader>

          <ul className="list-disc">
            {activePosition.current?.responsibilities.map((responsibility, i) => (
              <li
                key={i}
                className="mt-3 first:mt-0"
              >
                {responsibility}
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
};

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Experience;
