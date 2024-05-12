import { notFound } from 'next/navigation'

import PostBody from '@/components/updates/PostBody'
import { getAllPostsSlugs, getPostBySlug } from '@/utils/sanity/sanity.client'

type PageProps = {
	params: {
		slug: string
	}
}

export default async function PostPage({ params }: PageProps) {
	const post = await getPostBySlug(params?.slug || '')

	// console.log(post)

	if (!post) {
		return notFound()
	}

	const { title, body = {} } = post

	return (
		<>
			<h1>{title}</h1>
			<article style={{ textAlign: 'left', width: '100%' }}>
				<PostBody content={body} />
			</article>

			<hr />
			<pre style={{ textAlign: 'left', fontSize: 10 }}>
				<code>{JSON.stringify(post, null, 2)}</code>
			</pre>
		</>
	)
}

export async function generateStaticParams() {
	const slugs = await getAllPostsSlugs()
	console.log(slugs)
	return slugs
}
