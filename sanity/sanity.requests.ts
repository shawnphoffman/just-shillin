import 'server-only'

import { type QueryParams } from 'next-sanity'

import sanityClient from '@/sanity/sanity.client'
// TODO Merge this into the same file
import { AWARDS_QUERY, postBySlugQuery, postsListQuery, postSlugsQuery, postsMetadataQuery } from '@/sanity/sanity.queries'
import { AWARDS_QUERYResult } from '@/sanity/sanity.types'
import { type Post } from '@/sanity/sanity.types-old'

type SanityFetchProps = {
	query: string
	params?: QueryParams
	tags?: string[]
}

async function sanityFetch<QueryResponse>({ query, params = {}, tags }: SanityFetchProps) {
	return sanityClient.fetch<QueryResponse>(query, params, {
		next: {
			tags,
		},
	})
}

export async function getAllPosts(): Promise<Post[]> {
	return await sanityFetch<Post[]>({
		query: postsListQuery,
		tags: ['post'],
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

export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
	const slugs =
		(await sanityFetch<string[]>({
			query: postSlugsQuery,
			tags: ['post'],
		})) || []
	return slugs.map(slug => ({ slug }))
}

export type PostMetadataQueryResult = Array<{
	_updatedAt: string
	slug: string
}>

export async function getAllPostsMetadata(): Promise<Pick<Post, 'slug' | '_updatedAt'>[]> {
	const posts =
		(await sanityFetch<PostMetadataQueryResult>({
			query: postsMetadataQuery,
			tags: ['post'],
		})) || []
	return posts.map(post => ({ slug: post.slug, _updatedAt: post._updatedAt }))
}

// GET AWARDS FOR DISPLAY
export async function getAwards(): Promise<AWARDS_QUERYResult> {
	return await sanityFetch<AWARDS_QUERYResult>({
		query: AWARDS_QUERY,
		tags: ['award'],
	})
}
