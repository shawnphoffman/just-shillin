import { notFound } from 'next/navigation'

import PostBody from '@/components/updates/PostBody'
import { getAllPostsSlugs, getPostBySlug } from '@/utils/sanity/sanity.client'

export default async function PostPage({ params }: { params: { slug: string } }) {
	const post = await getPostBySlug(params.slug)

	// console.log(post)

	if (!post) {
		return notFound()
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
	)
}

export async function generateStaticParams() {
	return await getAllPostsSlugs()
}
