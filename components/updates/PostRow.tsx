import Image from 'next/image'

import { urlForSanityImage } from '@/sanity/sanity.image'

import PostAuthor from './PostAuthor'
import PostAuthorAvatar from './PostAuthorAvatar'
import PostDate from './PostDate'

export default function PostRow({ slug, mainImage, title, publishedAt, author }) {
	return (
		<a href={`/updates/${slug}`} className="mx-auto w-fit md:w-full text-white wow group ">
			<div className="rounded-lg transition-all hover:bg-sky-950/50 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 p-4">
				{mainImage && (
					<Image
						className="h-auto w-96 md:w-24"
						width={400}
						height={200}
						alt={mainImage?.alt || ''}
						src={urlForSanityImage(mainImage).height(200).width(400).url()}
						sizes="100vw"
					/>
				)}
				<div className="flex flex-row gap-2 w-full">
					<div className="md:hidden flex justify-center items-center">
						<PostAuthorAvatar name={author?.name} image={author?.image} />
					</div>
					<div className="w-full flex flex-col items-start justify-center flex-1">
						<span className="text-xl font-bold group-hover:text-sky-500 transition-colors">{title}</span>
						<PostDate dateString={publishedAt} />
					</div>
				</div>
				<div className="hidden md:flex">
					<PostAuthor name={author?.name} image={author?.image} />
				</div>
			</div>
		</a>
	)
}
