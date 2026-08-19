import { z } from 'astro/zod';

// closed portfolio content contract validated during every build
export const PortfolioSchema = z.strictObject({
  name: z.string().min(1),
  email: z.email(),
  url: z.url(),
  avatar: z.strictObject({
    path: z.string().min(1),
    width: z.int().positive(),
    height: z.int().positive(),
  }),
  socialPages: z.strictObject({
    github: z.url(),
    linkedin: z.url(),
    twitter: z.url(),
    kaggle: z.url(),
  }),
  bio: z.strictObject({
    title: z.string().min(1),
    content: z.array(z.string().min(1)).min(1),
  }),
  projects: z
    .array(
      z.strictObject({
        logo: z.string().min(1),
        name: z.string().min(1),
        description: z.string().min(1),
        url: z.url(),
        githubURL: z.url(),
        tags: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(1),
  positions: z
    .array(
      z.strictObject({
        logo: z.string().min(1),
        dateRange: z.string().min(1),
        positionName: z.string().min(1),
        companyName: z.string().min(1),
        responsibilities: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(1),
  education: z.strictObject({
    certificationsURL: z.url(),
    certifications: z
      .array(
        z.strictObject({
          logo: z.string().min(1),
          dateRange: z.string().min(1),
          institution: z.string().min(1),
          degree: z.string().min(1),
          grade: z.string().min(1),
          certificateURL: z.url().optional(),
        }),
      )
      .min(1),
  }),
  techStack: z
    .array(
      z.strictObject({
        title: z.string().min(1),
        items: z
          .array(
            z.strictObject({
              name: z.string().min(1),
              icon: z.string().min(1),
              hasLightVariant: z.boolean().optional(),
            }),
          )
          .min(1),
      }),
    )
    .min(1),
});

export type IPortfolio = z.infer<typeof PortfolioSchema>;
export type IProject = IPortfolio['projects'][number];
export type IPosition = IPortfolio['positions'][number];
export type ICertification = IPortfolio['education']['certifications'][number];
export type ITechStackCategory = IPortfolio['techStack'][number];
export type ITechStackItem = ITechStackCategory['items'][number];
