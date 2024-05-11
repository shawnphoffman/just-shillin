import { getPostBySlug, sanityFetch } from '@/utils/sanity/sanity.client'
import { postsListQuery } from '@/utils/sanity/sanity.queries'

// type Post = {
// 	_id: string
// 	title?: string
// 	slug?: {
// 		current: string
// 	}
// }

export default async function PostPage({ params }: { params: { slug: string } }) {
	const post = await getPostBySlug(params.slug)

	console.log(post)

	return (
		<>
			<h1>{params.slug}</h1>
			<pre>
				<code>{JSON.stringify(post, null, 2)}</code>
			</pre>
		</>
		// <ul>
		// 	{posts.map(post => {
		// 		if (!post?.slug) return null
		// 		return (
		// 			<li key={post._id}>
		// 				<a href={`/updates/${post?.slug}`}>{post?.title}</a>
		// 			</li>
		// 		)
		// 	})}
		// </ul>
	)
}
