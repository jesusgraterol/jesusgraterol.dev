import { ITechStackItem } from '@/shared/services/config/index.service.ts';

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
          path={`tech-stack/${item.icon}-light.png`}
          name={item.name}
          className='hidden dark:inline'
        />
        <Image
          path={`tech-stack/${item.icon}.png`}
          name={item.name}
          className='dark:hidden'
        />
      </>
    )
    : (
      <Image
        path={`tech-stack/${item.icon}.png`}
        name={item.name}
      />
    )
);





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export default Logo;
