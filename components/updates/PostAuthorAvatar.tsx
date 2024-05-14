import Image from 'next/image'

import { urlForSanityImage } from '@/sanity/sanity.image'
import { type Author } from '@/sanity/sanity.types'

export default function PostAuthorAvatar(props: Author) {
	const { name, image } = props
	const src = image?.asset?._ref
		? urlForSanityImage(image).height(48).width(48).fit('crop').url()
		: 'https://source.unsplash.com/48x48/?face'
	return <Image src={src} className="rounded-full" height={48} width={48} alt={image?.alt ?? name} title={name} />
}
