import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// PROJECTS — self-directed builds. Each gets its own page + writeup.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    status: z.string().optional(),         // e.g. "ongoing", "shipped", "paused"
    links: z
      .object({
        code: z.string().url().optional(),
        paper: z.string().url().optional(),
        demo: z.string().url().optional(),
      })
      .default({}),
    draft: z.boolean().default(false),
  }),
});

// WRITING — your thinking, in your own voice. Essays, notes, explainers.
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writing };
