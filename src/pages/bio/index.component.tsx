import { ConfigService } from '@/shared/services/config/index.service.ts';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Bio
 * Component in charge of quickly showing a brief description of the developer.
 */
const Bio = () => (
  <section>
    <header>
      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        {ConfigService.bio.title}
      </h1>
    </header>

    {ConfigService.bio.content.map((paragraph, i) => (
      <p
        key={i}
        className="my-3"
      >
        {paragraph}
      </p>
    ))}
  </section>
);

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Bio;
