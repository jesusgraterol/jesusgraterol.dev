

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

  // education
  certificationsURL: string,
  certifications: ICertification[];
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
  responsibilities: string[];
};

/**
 * Certification
 * The object containing essential information regarding an individual certificate.
 */
type ICertification = {
  logo: string;
  dateRange: string;
  institution: string;
  degree: string;
  grade: string;
  certificateURL: string;
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
  ICertification,
};
