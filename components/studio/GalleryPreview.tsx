import imageUrlBuilder from '@sanity/image-url'
import { Flex, Stack } from '@sanity/ui'

import sanityClient from '@/sanity/sanity.client'

// import { urlFor } from './image-url-builder'

const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
	return builder.image(source)
}

export default function GalleryPreview(props) {
	const { images, schemaType } = props
	const schemaTitle = schemaType.title

	const modifiedProps = {
		...props,
		title: schemaTitle,
	}

	return (
		<Stack space={[1]}>
			<>{props.renderDefault(modifiedProps)}</>
			<Flex
				style={{
					gap: '5px',
					overflowX: 'scroll',
				}}
			>
				{images?.map(image => (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						key={image._ref}
						src={image.asset ? urlFor(image).url() : ''}
						style={{
							width: '400px',
							height: '200px',
							objectFit: 'cover',
						}}
						alt={image.alt}
					/>
				))}
			</Flex>
		</Stack>
	)
}
