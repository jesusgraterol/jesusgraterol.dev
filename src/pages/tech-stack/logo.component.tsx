import { ITechStackItem } from '@/shared/services/config/index.service.ts';

/* ************************************************************************************************
 *                                            HELPERS                                             *
 ************************************************************************************************ */

/**
 * Builds the path for the logo based on its variant.
 * @param icon
 * @param light?
 * @returns string
 */
const buildPath = (icon: string, light?: boolean): string => (
  `tech-stack/${icon}${light ? '-light' : ''}.png`
);





/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Image Component
 * Component in charge of building a proper image tag based on the provided parameters.
 * @param path
 * @param name
 * @param className
 */
const Image = ({ path, name, className }: { path: string, name: string, className?: string }) => (
  <img
    src={path}
    alt={name}
    width='16'
    height='16'
    loading='lazy'
    className={`w-4 h-4${typeof className === 'string' ? ` ${className}` : ''}`}
  />
);



/**
 * Logo Component
 * Component in charge of displaying the logo for a tech stack item based on the active theme.
 */
const Logo = ({ item }: { item: ITechStackItem }) => (
  item.hasLightVariant
    ? (
      <>
        <Image
          path={buildPath(item.icon, true)}
          name={item.name}
          className='hidden dark:inline'
        />
        <Image
          path={buildPath(item.icon)}
          name={item.name}
          className='dark:hidden'
        />
      </>
    )
    : (
      <Image
        path={buildPath(item.icon)}
        name={item.name}
      />
    )
);





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Logo;
