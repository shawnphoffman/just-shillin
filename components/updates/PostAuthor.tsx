import Image from 'next/image'

import { urlForSanityImage } from '@/sanity/sanity.image'
import { type Author } from '@/sanity/sanity.types'

export default function PostAuthor(props: Author) {
	const { name, image } = props
	const src = image?.asset?._ref
		? urlForSanityImage(image).height(96).width(96).fit('crop').url()
		: 'https://source.unsplash.com/96x96/?face'
	return (
		<div className="flex items-center">
			<div className="relative mr-4 h-12 w-12">
				<Image src={src} className="rounded-full" height={96} width={96} alt={image?.alt ?? name} />
			</div>
			<div className="text-xl font-bold text-balance">{name}</div>
		</div>
	)
}
