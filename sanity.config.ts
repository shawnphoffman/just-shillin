/**
 * This configuration is used to for the Sanity Studio
 */

import { RocketIcon } from '@sanity/icons'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { media } from 'sanity-plugin-media'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schema'

// https://www.sanity.io/docs/config-api-reference
export default defineConfig({
	// REQUIRED
	projectId,
	dataset,

	// OPTIONAL FOR SINGLE WORKSPACE
	basePath: '/studio',
	title: `Shawn's Podcast Studio`,
	subtitle: 'Where good content is just out of reach',
	icon: RocketIcon,

	// MISC
	schema,
	plugins: [
		structureTool(),
		...(process.env.VERCEL_ENV !== 'production'
			? [
					// Vision is a tool that lets you query your content with GROQ in the studio
					// https://www.sanity.io/docs/the-vision-plugin
					visionTool({ defaultApiVersion: apiVersion }),
					media(),
				]
			: []),
	],
})
