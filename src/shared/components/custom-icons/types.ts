import { ReactSVG, SVGProps, RefAttributes } from 'react';

/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Custom Icon Props
 * The properties that can be passed to a custom icon.
 */
export type IconNode = [elementName: keyof ReactSVG, attrs: Record<string, string>][];
export type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ElementAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;
type ICustomIconProps = {
  // ...
} & ElementAttributes;

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type { ICustomIconProps };
