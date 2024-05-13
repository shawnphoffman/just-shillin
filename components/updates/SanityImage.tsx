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

	const imageProps = useNextSanityImage(sanityUtilsClient, asset)

	if (!imageProps) return null

	// {
	// 	imageProps: {
	// 		loader: [Function: loader],
	// 		src: 'https://cdn.sanity.io/images/uc06juhv/production/1fd86d78cb1c946f6cea3e0f58115b7719e7b54a-3438x1448.png?q=75&fit=clip&auto=format',
	// 		width: 3438,
	// 		height: 1448
	// 	}
	// }

	console.log({ imageProps })

	return (
		<figure>
			<Image {...imageProps} alt={alt} sizes="(max-width: 800px) 100vw, 800px" style={{ maxWidth: '100%', height: 'auto' }} />
			{caption && (
				<figcaption className="mt-2 text-center italic text-sm text-gray-500 dark:text-gray-400 text-pretty">{caption}</figcaption>
			)}
		</figure>
	)
}
