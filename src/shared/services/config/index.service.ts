import {
  name,
  email,
  url,
  avatarPath,
  socialPages,
  projects,
  positions,
  education,
  techStack,
} from '../../../../app.config.json';
import {
  IConfigService,
  IProject,
  IPosition,
  ICertification,
  IExpertiseLevel,
  ITechStackItem,
  ITechStackCategory,
} from '@/shared/services/config/types.ts';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Config Service Factory
 * Generates the object in charge of reading and processing the app's configuration.
 * @returns INavService
 */
// eslint-disable-next-line arrow-body-style
const configServiceFactory = (): IConfigService => {
  /* **********************************************************************************************
   *                                           HELPERS                                            *
   ********************************************************************************************** */





  /* **********************************************************************************************
   *                                         MODULE BUILD                                         *
   ********************************************************************************************** */
  return Object.freeze({
    // general properties
    name,
    email,
    url,
    urlName: new URL(url).hostname.replace('www.', ''),
    avatarPath,

    // social pages
    githubPage: socialPages.github,
    linkedinPage: socialPages.linkedin,
    twitterPage: socialPages.twitter,
    kagglePage: socialPages.kaggle,

    // projects
    projects,

    // experience
    positions,

    // education
    certificationsURL: education.certificationsURL,
    certifications: education.certifications,

    // tech stack
    techStackCategories: techStack as ITechStackCategory[],
  });
};





/* ************************************************************************************************
 *                                        GLOBAL INSTANCE                                         *
 ************************************************************************************************ */
const ConfigService = configServiceFactory();





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // service
  ConfigService,

  // types
  type IProject,
  type IPosition,
  type ICertification,
  type IExpertiseLevel,
  type ITechStackItem,
  type ITechStackCategory,
};
