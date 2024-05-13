import styles from './page.module.css'

import AuthorAvatar from '@/components/updates/AuthorAvatar'
import { sanityFetch } from '@/utils/sanity/sanity.client'
import { Post, postsListQuery } from '@/utils/sanity/sanity.queries'

// type Post = {
// 	_id: string
// 	title?: string
// 	slug?: {
// 		current: string
// 	}
// }

export default async function UpdatesPage() {
	const posts = await sanityFetch<Post[]>({
		query: postsListQuery,
		tags: ['post'],
	})

	// console.log(posts)

	return (
		<div className={styles.listContainer}>
			{posts.map(post => {
				if (!post?.slug) return null
				return (
					<div key={post._id} className={styles.listItem}>
						<a href={`/updates/${post?.slug}`}>{post?.title}</a>
						<AuthorAvatar name={post?.author?.name} image={post?.author?.image} />
					</div>
				)
			})}
		</div>
	)
}
