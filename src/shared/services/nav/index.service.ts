import { ConfigService } from '../config/index.service.ts';
import { INavService } from '@/shared/services/nav/types.ts';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Nav Service Factory
 * Generates the object in charge of managing in-app and external navigation.
 * @returns INavService
 */
const navServiceFactory = (): INavService => {
  /* **********************************************************************************************
   *                                          PROPERTIES                                          *
   ********************************************************************************************** */

  // ...





  /* **********************************************************************************************
   *                                      EXTERNAL NAVIGATION                                     *
   ********************************************************************************************** */

  /**
   * Opens an URL in the current or a new tab.
   * @param url
   * @param newTab?
   * @param noReferrer?
   */
  const openURL = (url: string, newTab: boolean = true, noReferrer: boolean = true): void => {
    if (newTab) {
      if (noReferrer) {
        window.open(url, '_blank', 'noopener noreferrer');
      } else {
        window.open(url, '_blank');
      }
    } else {
      window.open(url);
    }
  };

  /**
   * Opens Balancer's GitHub Page in a new tab.
   */
  const openGitHubPage = (): void => openURL(ConfigService.githubPage);





  /* **********************************************************************************************
   *                                         MODULE BUILD                                         *
   ********************************************************************************************** */
  return Object.freeze({
    // properties
    // ...

    // external navigation
    openURL,
    openGitHubPage,
  });
};





/* ************************************************************************************************
 *                                        GLOBAL INSTANCE                                         *
 ************************************************************************************************ */
const NavService = navServiceFactory();





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  NavService,
};
