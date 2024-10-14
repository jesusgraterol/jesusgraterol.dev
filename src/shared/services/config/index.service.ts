import {
  name,
  email,
  url,
  socialPages,
} from '../../../../app.config.json';
import { IConfigService } from '@/shared/services/config/types.ts';

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

    // social pages
    githubPage: socialPages.github,
    linkedinPage: socialPages.linkedin,
    twitterPage: socialPages.twitter,
    kagglePage: socialPages.kaggle,
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
  // ...
};
