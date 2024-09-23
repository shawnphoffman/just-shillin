import type { MetadataRoute } from 'next'

import { getAllPostsMetadata, getAllPostsSlugs } from '@/sanity/sanity.requests'

const root = 'https://justshillin.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const core = [
		{
			url: `${root}`,
			lastModified: new Date(),
			priority: 1,
		},
		{
			url: `${root}/episodes`,
			lastModified: new Date(),
			priority: 0.8,
		},
		{
			url: `${root}/listen-now`,
			lastModified: new Date(),
			priority: 0.2,
		},
		{
			url: `${root}/updates`,
			lastModified: new Date(),
			priority: 0.9,
		},
	]

	const postsMeta = await getAllPostsMetadata()

	postsMeta.map(post => {
		core.push({
			url: `${root}/updates/${post.slug}`,
			lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
			priority: 0.7,
		})
	})

	return core
}
