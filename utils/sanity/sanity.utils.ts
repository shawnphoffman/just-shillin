import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID // "pv8y60vp"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET // "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'

// TODO Clean this shit up
const sanityUtilsClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false,
})

export const sanityImageBuilder = imageUrlBuilder(sanityUtilsClient)

export function urlForSanityImage(source: SanityImageSource) {
	return sanityImageBuilder.image(source)
}
