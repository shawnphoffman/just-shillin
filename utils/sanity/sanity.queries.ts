import { groq } from 'next-sanity'

const postFields = groq`
  _id,
  _updatedAt,
  title,
  date,
	publishedAt,
  // excerpt,
  mainImage,
  "slug": slug.current,
  "author": author->{name, image},
	"categories": categories[]->title,
`

// export const settingsQuery = groq`*[_type == "settings"][0]`

export const postsListQuery = groq`
// *[_type == "post" ] | order(date desc, publishedAt desc) {
*[_type == "post" && "Just Shillin'" in categories[]->.title] | order(date desc, publishedAt desc) {
  ${postFields}
}`

// export const postAndMoreStoriesQuery = groq`
// {
//   "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
//     content,
//     ${postFields}
//   },
//   "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
//     content,
//     ${postFields}
//   }
// }`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
	body,
  ${postFields}
}
`

export interface Author {
	name?: string
	image?: any
}

export interface Post {
	_id: string
	_updatedAt?: string
	title: string
	slug: string
	mainImage?: any
	publishedAt: string
	author?: Author
	body?: any
	excerpt?: string
}

export interface Settings {
	title?: string
	description?: any[]
	ogImage?: {
		title?: string
	}
}
