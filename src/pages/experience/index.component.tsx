import { ConfigService } from '@/shared/services/config/index.service.ts';
import Position from '@/pages/experience/position.component.tsx';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Experience Component
 * Component in charge of showing the list of positions that have been covered by the developer.
 */
const Experience = () => (
  <section>
    <header>
      <h2
        className='text-2xl font-semibold leading-none tracking-tight'
      >Experience</h2>
    </header>

    <div className='relative ml-4 border-l border-slate-200 mt-5'>
      {ConfigService.positions.map((position, i) => <Position key={i} position={position} />)}
    </div>
  </section>
);





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Experience;
