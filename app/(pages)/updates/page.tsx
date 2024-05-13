import Image from 'next/image'

import PostAuthor from '@/components/updates/PostAuthor'
import PostDate from '@/components/updates/PostDate'
import { urlForSanityImage } from '@/sanity/sanity.image'
import { getAllPosts } from '@/sanity/sanity.requests'

export default async function UpdatesPage() {
	const posts = await getAllPosts()

	return (
		<div className="flex flex-col justify-center w-full divide-y">
			{posts.map(post => {
				return (
					<a href={`/updates/${post?.slug}`} key={post._id} className="flex flex-row justify-between items-center p-4 text-white wow group">
						<div className="flex flex-row gap-4">
							{post.mainImage && (
								<div className="shadow-small">
									<Image
										className="h-auto w-full"
										width={200}
										height={100}
										alt={post.mainImage?.alt || ''}
										src={urlForSanityImage(post.mainImage).height(100).width(200).url()}
										sizes="100vw"
										// priority={priority}
									/>
								</div>
							)}
							<div className="flex flex-col items-start justify-center">
								<span className="text-xl font-bold group-hover:text-sky-500 transition-colors">{post.title}</span>
								<PostDate dateString={post.publishedAt} />
							</div>
						</div>
						<PostAuthor name={post?.author?.name} image={post?.author?.image} />
					</a>
				)
			})}
		</div>
	)
}
