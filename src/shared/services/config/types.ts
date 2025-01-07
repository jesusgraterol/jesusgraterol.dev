

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

  // tech stack
  techStackCategories: ITechStackCategory[];
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

/**
 * Tech Stack
 * The technologies managed by the developer as well as the expertise level
 */
type ITechStackItem = {
  name: string;
  icon: string;
  hasLightVariant?: boolean;
};
type ITechStackCategory = {
  title: string;
  items: ITechStackItem[];
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
  ITechStackItem,
  ITechStackCategory,
};
