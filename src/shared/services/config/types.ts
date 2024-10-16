

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

  // social pages
  githubPage: string;
  linkedinPage: string;
  twitterPage: string;
  kagglePage: string;

  // projects
  projects: IProject[];

  // experience
  positions: IPosition[];
};




/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Project
 * The object containing essential information regarding a project.
 */
type IProject = {
  logo: string;
  name: string;
  description: string;
  url: string;
  githubURL: string;
  tags: string[];
};

/**
 * Position
 * The object containing essential information regarding an individual experience.
 */
type IPosition = {
  logo: string;
  dateRange: string;
  positionName: string;
  companyName: string;
  employmentType: string;
  responsibilities: string[];
};




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  // service
  IConfigService,

  // types
  IProject,
  IPosition,
};
