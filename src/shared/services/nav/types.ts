

/* ************************************************************************************************
 *                                            SERVICE                                             *
 ************************************************************************************************ */

/**
 * Nav Service
 * Object in charge of managing in-app and external navigation.
 */
type INavService = {
  // properties
  // ...

  // actions
  scrollToTop: () => void;
  openURL:(url: string, newTab?: boolean, noReferrer?: boolean) => void;
  openGitHubPage:() => void;
  openLinkedInPage:() => void;
  openKagglePage:() => void;
  openTwitterPage:() => void;
  openGitHubRepos:() => void;
};




/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

// ...





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  // service
  INavService,

  // types
  // ...
};
