

/* ************************************************************************************************
 *                                            SERVICE                                             *
 ************************************************************************************************ */

/**
 * Config Service
 * Object in charge of reading and processing the app's configuration.
 */
type IConfigService = {
  // general properties
  name: string;
  email: string;
  url: string;
  urlName: string;
  avatarPath: string;
  resumePath: string;

  // social pages
  githubPage: string;
  linkedinPage: string;
  twitterPage: string;
  kagglePage: string;
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
  IConfigService,

  // types
  // ...
};
