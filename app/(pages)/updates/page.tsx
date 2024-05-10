import { client } from '@/utils/sanity/client'

type Post = {
	_id: string
	title?: string
	slug?: {
		current: string
	}
}

export default async function UpdatesPage() {
	const posts = await client.fetch<Post[]>(`*[_type == "post"]`)

	// console.log(posts)

	return (
		<ul>
			{posts.map(post => {
				if (!post?.slug?.current) return null
				return (
					<li key={post._id}>
						<a href={`/updates/${post?.slug.current}`}>{post?.title}</a>
					</li>
				)
			})}
		</ul>
	)
}
