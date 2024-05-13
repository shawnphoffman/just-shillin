import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import PostAuthor from '@/components/updates/PostAuthor'
import PostBody from '@/components/updates/PostBody'
import PostCoverImage from '@/components/updates/PostCoverImage'
import PostTitle from '@/components/updates/PostTitle'
import { getAllPostsSlugs, getPostBySlug } from '@/sanity/sanity.requests'

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
		<div className="flex flex-col justify-center items-center gap-4">
			<PostTitle>{title}</PostTitle>

			<PostAuthor name={post.author?.name} image={post.author?.image} />

			<PostCoverImage title={title} image={mainImage} priority />

			<article className="text-left w-full bg-zinc-950/90 rounded-lg">
				<PostBody content={body} />
			</article>
		</div>
	)
}

export async function generateStaticParams() {
	const slugs = await getAllPostsSlugs()
	return slugs
}

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
	const post = await getPostBySlug(params?.slug || '')
	if (!post) return {}
	return {
		title: `${post.title} | Just Shillin'`,
		description: post.excerpt,
	}
}
