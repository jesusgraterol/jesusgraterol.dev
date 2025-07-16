import { Button } from '@/shared/shadcn/components/ui/button.tsx';
import { NavService } from '@/shared/services/nav/index.service.ts';
import { ConfigService } from '@/shared/services/config/index.service.ts';
import Project from '@/pages/projects/project.component.tsx';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Projects Component
 * Component in charge of displaying the projects released by the developer.
 */
const Projects = () => (
  <section>
    <header className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold leading-none tracking-tight">Projects</h2>

      <Button
        variant="link"
        className="text-xs sm:text-sm text-muted dark:text-slate-400 p-0"
        onClick={NavService.openGitHubRepos}
      >
        View repositories
      </Button>
    </header>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
      {ConfigService.projects.map((project, i) => (
        <Project key={i} project={project} />
      ))}
    </div>
  </section>
);

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Projects;
