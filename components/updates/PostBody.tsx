import { PortableText, type PortableTextReactComponents } from '@portabletext/react'

// import { PortableText } from '@portabletext/react'
import styles from './PostBody.module.css'
import { SanityImage } from './SanityImage'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
	types: {
		image: ({ value }) => {
			return <SanityImage {...value} />
		},
	},
}

// const myPortableTextComponents = {
// 	types: {
// 		image: ({ value }) => {
// 			console.log({ value })
// 			return (
// 				<>
// 					<img src={value.imageUrl} />
// 				</>
// 			)
// 		},
// 		// callToAction: ({ value, isInline }) =>
// 		// 	isInline ? <a href={value.url}>{value.text}</a> : <div className="callToAction">{value.text}</div>,
// 	},
// 	// marks: {
// 	//   link: ({children, value}) => {
// 	//     const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
// 	//     return (
// 	//       <a href={value.href} rel={rel}>
// 	//         {children}
// 	//       </a>
// 	//     )
// 	//   },
// 	// },
// }

export default function PostBody({ content }) {
	return (
		<div className={`mx-auto max-w-2xl ${styles.portableText}`}>
			<PortableText value={content} components={myPortableTextComponents} />
			{/* <PortableText value={content} /> */}
		</div>
	)
}
