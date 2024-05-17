import { PortableText, type PortableTextReactComponents } from '@portabletext/react'

import PostImage from '../portableText/PostImage'
import YoutubeEmbed from '../portableText/YoutubeEmbed'

import styles from './PostBody.module.css'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
	types: {
		image: ({ value }) => {
			return <PostImage {...value} />
		},
		youtube: ({ value }) => {
			const { url } = value
			const match = url.match(/[?&]v=([^&]+)/)
			const videoId = match ? match[1] : null
			return <YoutubeEmbed videoId={videoId} />
		},
		gallery: ({ value }) => {
			return (
				<div className="grid items-center justify-center grid-cols-2 gap-4 md:grid-cols-3">
					{value.images.map(i => (
						<PostImage key={i._key} className="h-auto max-w-full rounded-lg" {...i} />
					))}
				</div>
			)
		},
	},
}

export default function PostBody({ content }) {
	return (
		<div className={`mx-auto max-w-3xl ${styles.portableText}`}>
			<PortableText value={content} components={myPortableTextComponents} />
		</div>
	)
}
