/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Truncates a given text based on a max length.
 * @param text
 * @param maxLength
 * @returns string
 */
const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength + 3) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { truncate };
