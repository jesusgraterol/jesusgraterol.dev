import { ConfigService } from '@/shared/services/config/index.service.ts';
import Category from '@/pages/tech-stack/category.component.tsx';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Tech Stack Component
 * Component in charge of displaying all the technologies managed by the developer.
 */
const TechStack = () => (
  <section>
    <header className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold leading-none tracking-tight">Tech Stack</h2>
    </header>

    {ConfigService.techStackCategories.map((category, i) => (
      <div
        key={i}
        className="mt-8 first-of-type:mt-0"
      >
        <Category data={category} />
      </div>
    ))}
  </section>
);

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default TechStack;
