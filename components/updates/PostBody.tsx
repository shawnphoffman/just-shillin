import { Suspense } from 'react'
import { PortableText, type PortableTextReactComponents, PortableTextTypeComponentProps, toPlainText } from '@portabletext/react'
import { SanityImageCrop, SanityImageSource } from '@sanity/image-url/lib/types/types'
import slugify from 'slugify'

import PostImage from '@/components/updates/portableText/PostImage'
import UrlEmbed from '@/components/updates/portableText/UrlEmbed'
import YoutubeEmbed from '@/components/updates/portableText/YoutubeEmbed'
import { SanityImageHotspot } from '@/sanity/sanity.types'

import styles from './PostBody.module.css'

type ImageAsset = {
	asset: SanityImageSource
	hotspot?: SanityImageHotspot
	crop?: SanityImageCrop
	caption?: string
	_type: 'image'
	_key: string
}

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
	block: {
		h2: props => {
			return <h2 id={slugify(toPlainText(props.value))}>{props.children}</h2>
		},
		h3: props => {
			return <h3 id={slugify(toPlainText(props.value))}>{props.children}</h3>
		},
		h4: props => {
			return <h4 id={slugify(toPlainText(props.value))}>{props.children}</h4>
		},
		h5: props => {
			return <h5 id={slugify(toPlainText(props.value))}>{props.children}</h5>
		},
		h6: props => {
			return <h6 id={slugify(toPlainText(props.value))}>{props.children}</h6>
		},
	},
	marks: {
		textRed: ({ children }) => {
			return <span className="text-red-500">{children}</span>
		},
		textBlue: ({ children }) => {
			return <span className="text-brand-blue">{children}</span>
		},
		textGreen: ({ children }) => {
			return <span className="text-green-500">{children}</span>
		},
		underline: ({ children }) => {
			return <span className="underline underline-offset-2 decoration-brand-red">{children}</span>
		},
		'strike-through': ({ children }) => {
			return <span className="line-through decoration-brand-blue decoration-2">{children}</span>
		},
	},
	types: {
		image: ({ value }: PortableTextTypeComponentProps<ImageAsset>) => {
			return <PostImage {...value} />
		},
		embed: ({ value }) => {
			return <UrlEmbed {...value} />
		},
		youtube: ({ value }) => {
			const { url } = value
			const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+?&v=))([^?&]+)/)
			const videoId = match ? match[1] : null
			return <YoutubeEmbed videoId={videoId} />
		},
		gallery: ({ value }) => {
			return (
				<div className="grid items-center justify-center grid-cols-2 gap-4 md:grid-cols-3">
					{value.images.map(i => (
						<Suspense key={i._key}>
							<PostImage className="h-auto max-w-full rounded-lg" {...i} />
						</Suspense>
					))}
				</div>
			)
		},
	},
}

// const onMissingComponent = (type: any) => {
// 	console.error('Missing component:', type)
// 	return null
// }

export default function PostBody({ content }) {
	return (
		<div className={`mx-auto max-w-3xl ${styles.portableText}`}>
			<PortableText value={content} components={myPortableTextComponents} />
		</div>
	)
}
