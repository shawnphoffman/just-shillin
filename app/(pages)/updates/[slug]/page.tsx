import PostBody from '@/components/updates/PostBody'
import {
	getPostBySlug,
	// sanityFetch
} from '@/utils/sanity/sanity.client'
// import { postsListQuery } from '@/utils/sanity/sanity.queries'

// type Post = {
// 	_id: string
// 	title?: string
// 	slug?: {
// 		current: string
// 	}
// }

export default async function PostPage({ params }: { params: { slug: string } }) {
	const post = await getPostBySlug(params.slug)

	// console.log(post)

	if (!post) {
		// TODO
		return <div>Post not found</div>
	}

	const { title } = post

	return (
		<>
			<h1>{title}</h1>
			<article style={{ textAlign: 'left', width: '100%' }}>
				<PostBody content={post.body} />
			</article>

			<hr />
			<pre style={{ textAlign: 'left', fontSize: 10 }}>
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
