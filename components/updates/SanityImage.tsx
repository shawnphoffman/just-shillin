'use client'

import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { sanityUtilsClient } from '@/utils/sanity/sanity.utils'

interface Props {
	asset: SanityImageSource
	alt: string
	caption?: string
}

export const SanityImage = (props: Props) => {
	const { asset, alt, caption } = props

	// console.log('props', props)

	const imageProps = useNextSanityImage(sanityUtilsClient, asset)

	if (!imageProps) return null

	return (
		<figure>
			<Image {...imageProps} alt={alt} sizes="(max-width: 800px) 100vw, 800px" style={{ maxWidth: '100%', height: 'auto' }} />
			{caption && (
				<figcaption className="mt-2 text-center italic text-sm text-gray-500 dark:text-gray-400 text-pretty">{caption}</figcaption>
			)}
		</figure>
	)
}
