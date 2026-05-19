import { groq } from 'next-sanity'

import {
	buildAwardsQuery,
	buildBannerQuery,
	buildPostSlugsQuery,
	buildPostsListQuery,
	postBySlugQuery,
} from '@shawnphoffman/pod-sites-shared/sanity'

const podId = '2e803c28-4870-46c7-90d3-70520ec90af8'

export const postsListQuery = buildPostsListQuery(podId)
export const postSlugsQuery = buildPostSlugsQuery(podId)
export { postBySlugQuery }
export const BANNER_QUERY = buildBannerQuery(podId)
export const AWARDS_QUERY = buildAwardsQuery(podId)

// just-shillin specific: lightweight metadata-only query used for sitemap/etc.
export const postsMetadataQuery = groq`
*[_type == "post" && "Just Shillin'" in categories[]->.title]{
  "slug": slug.current,
	_updatedAt
}`
