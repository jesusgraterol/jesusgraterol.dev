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
   * Scrolls the user to the top of the application.
   */
  const scrollToTop = (): void => window.scrollTo(0, 0);

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
   * Opens the GitHub Repositories Page in a new tab.
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

  /**
   * Opens the GitHub Page in a new tab.
   */
  const openGitHubRepos = (): void => openURL(`${ConfigService.githubPage}?tab=repositories`);

  /**
   * Opens the Certifications Page in a new tab.
   */
  const openCertificates = (): void => openURL(ConfigService.certificationsURL);

  /* **********************************************************************************************
   *                                         MODULE BUILD                                         *
   ********************************************************************************************** */
  return Object.freeze({
    // properties
    // ...

    // actions
    scrollToTop,
    openURL,
    openGitHubPage,
    openLinkedInPage,
    openKagglePage,
    openTwitterPage,
    openGitHubRepos,
    openCertificates,
  });
};

/* ************************************************************************************************
 *                                        GLOBAL INSTANCE                                         *
 ************************************************************************************************ */
const NavService = navServiceFactory();

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { NavService };
