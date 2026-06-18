import Image from 'next/image'

import { urlForSanityImage } from '@/sanity/sanity.image'

interface CoverImageProps {
	title: string
	slug?: string
	image: any
	priority?: boolean
}

// Sanity asset refs encode the source dimensions: image-<hash>-1200x630-jpg.
// We read them (and any editorial crop) so next/image gets the real aspect
// ratio and the cover renders uncropped instead of being forced into a banner.
function getAspect(image: any): { width: number; height: number } {
	const ref: string | undefined = image?.asset?._ref
	const match = ref?.match(/-(\d+)x(\d+)-/)
	let width = match ? Number(match[1]) : 1600
	let height = match ? Number(match[2]) : 900

	const crop = image?.crop
	if (crop) {
		width = Math.round(width * (1 - (crop.left || 0) - (crop.right || 0)))
		height = Math.round(height * (1 - (crop.top || 0) - (crop.bottom || 0)))
	}

	return { width, height }
}

export default function PostCoverImage(props: CoverImageProps) {
	const { image, priority } = props

	if (!image) return null

	const { width, height } = getAspect(image)

	return (
		<Image
			className="w-full h-auto rounded-xl"
			width={width}
			height={height}
			alt={image.alt || ''}
			src={urlForSanityImage(image).width(Math.min(width, 1600)).url()}
			sizes="100vw"
			priority={priority}
		/>
	)
}
