import { sanityFetch } from '@/utils/sanity/client'
import { postsListQuery } from '@/utils/sanity/sanity.queries'

type Post = {
	_id: string
	title?: string
	slug?: {
		current: string
	}
}

export default async function UpdatesPage() {
	const posts = await sanityFetch<Post[]>({
		query: postsListQuery,
		tags: ['post'],
	})

	console.log(posts)

	return (
		<ul>
			{posts.map(post => {
				if (!post?.slug) return null
				return (
					<li key={post._id}>
						<a href={`/updates/${post?.slug}`}>{post?.title}</a>
					</li>
				)
			})}
		</ul>
	)
}
