// ./src/utils/sanity/client.ts
import 'server-only'

import { createClient, type QueryParams, type SanityClient } from 'next-sanity'

import {
	// indexQuery,
	type Post,
	// postAndMoreStoriesQuery,
	postBySlugQuery,
	// postSlugsQuery,
	// type Settings,
	// settingsQuery,
} from './sanity.queries'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID // "pv8y60vp"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET // "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'

const client = createClient({
	projectId,
	dataset,
	apiVersion, // https://www.sanity.io/docs/api-versioning
	useCdn: false,
})

type SanityFetchProps = {
	query: string
	params?: QueryParams
	tags?: string[]
}

export async function sanityFetch<QueryResponse>({ query, params = {}, tags }: SanityFetchProps) {
	return client.fetch<QueryResponse>(query, params, {
		next: {
			// revalidate: 3600, // for simple, time-based revalidation
			tags, // for tag-based revalidation
		},
	})
}

export async function getPostBySlug(slug: string): Promise<Post> {
	return (
		(await sanityFetch({
			query: postBySlugQuery,
			params: { slug },
			tags: ['post'],
		})) || ({} as any)
	)
}
