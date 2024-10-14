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
   *                                            ACTIONS                                           *
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
   * Opens the GitHub Page in a new tab.
   */
  const openGitHubPage = (): void => openURL(ConfigService.githubPage);

  /**
   * Opens the LinkedIn Page in a new tab.
   */
  const openLinkedInPage = (): void => openURL(ConfigService.linkedinPage);

  /**
   * Opens the Kaggle Page in a new tab.
   */
  const openKagglePage = (): void => openURL(ConfigService.kagglePage);

  /**
   * Opens the Twitter Page in a new tab.
   */
  const openTwitterPage = (): void => openURL(ConfigService.twitterPage);





  /* **********************************************************************************************
   *                                         MODULE BUILD                                         *
   ********************************************************************************************** */
  return Object.freeze({
    // properties
    // ...

    // actions
    openURL,
    openGitHubPage,
    openLinkedInPage,
    openKagglePage,
    openTwitterPage,
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
