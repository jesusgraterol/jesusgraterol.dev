import { Button } from '@/shared/shadcn/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/shadcn/components/ui/card.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/shadcn/components/ui/tooltip.tsx';
import { Badge } from '@/shared/shadcn/components/ui/badge.tsx';
import { truncate } from '@/shared/services/utils/index.service.ts';
import { NavService } from '@/shared/services/nav/index.service.ts';
import { IProject } from '@/shared/services/config/index.service.ts';
import { GitHubIcon } from '@/shared/components/custom-icons/index.component.tsx';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Projects Component
 * Component in charge of displaying essential information about a project.
 */
const Project = ({ project }: { project: IProject }) => (
  <Card>
    <CardHeader className='pt-3 px-3 pb-0'>
      <CardTitle
        className='flex justify-center items-center gap-2'
      >
        <img
          src={project.logo}
          alt={`${project.name}‘s logo`}
          className='w-6 h-6 rounded-sm'
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='link'
              className='p-0 text-base max-w-28 lg:max-w-44 xl:max-w-52'
              onClick={() => NavService.openURL(project.url)}
            >
              <p className='truncate'>{project.name}</p>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open {project.name}</p>
          </TooltipContent>
        </Tooltip>

        <span className='flex-1'></span>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => NavService.openURL(project.githubURL)}
            >
              <GitHubIcon className='w-6 h-6' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View on GitHub</p>
          </TooltipContent>
        </Tooltip>
      </CardTitle>
      <CardDescription>{truncate(project.description, 120)}</CardDescription>
    </CardHeader>
    <CardContent className='p-3 truncate'>
      {
        project.tags.map((tag, i) => (
          <Badge
            key={i}
            variant='secondary'
            className='mx-0.5'
          >{tag}</Badge>
        ))
      }
    </CardContent>
  </Card>
);





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Project;
