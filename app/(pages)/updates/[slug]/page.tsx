import { notFound } from 'next/navigation'

import AuthorAvatar from '@/components/updates/AuthorAvatar'
import CoverImage from '@/components/updates/CoverImage'
import PostBody from '@/components/updates/PostBody'
import PostTitle from '@/components/updates/PostTitle'
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

	const { title, body = {}, mainImage, slug } = post

	return (
		<>
			<PostTitle>{title}</PostTitle>

			<AuthorAvatar name={post.author?.name} image={post.author?.image} />

			<CoverImage title={title} image={mainImage} priority />

			<article className="text-left w-full">
				<PostBody content={body} />
			</article>

			{!process.env.VERCEL_URL && (
				// <pre style={{ textAlign: 'left', fontSize: 10 }}>
				<pre className="text-left text-xs text-green-500">
					<code>{JSON.stringify({ ...post, body: undefined }, null, 2)}</code>
				</pre>
			)}
		</>
	)
}

export async function generateStaticParams() {
	const slugs = await getAllPostsSlugs()
	// console.log(slugs)
	return slugs
}
