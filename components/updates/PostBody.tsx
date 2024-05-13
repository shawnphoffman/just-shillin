import { PortableText, type PortableTextReactComponents } from '@portabletext/react'

import YoutubeLazyRender from '../sanity/YoutubeLazyRender'

import styles from './PostBody.module.css'
import { SanityImage } from './SanityImage'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
	types: {
		image: ({ value }) => {
			return <SanityImage {...value} />
		},
		youtube: ({ value }) => {
			const { url } = value
			const match = url.match(/[?&]v=([^&]+)/)
			const videoId = match ? match[1] : null
			return <YoutubeLazyRender videoId={videoId} />
		},
	},
}

export default function PostBody({ content }) {
	return (
		<div className={`mx-auto max-w-2xl ${styles.portableText}`}>
			<PortableText value={content} components={myPortableTextComponents} />
		</div>
	)
}
