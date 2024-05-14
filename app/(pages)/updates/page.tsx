import PostRow from '@/components/updates/PostRow'
import { getAllPosts } from '@/sanity/sanity.requests'

export default async function UpdatesPage() {
	const posts = await getAllPosts()

	return (
		<div className="flex flex-col justify-center w-full divide-y bg-zinc-950/90 rounded-lg">
			{posts.map(post => {
				const { author, mainImage, publishedAt, slug, _id, title } = post
				return <PostRow key={_id} author={author} mainImage={mainImage} publishedAt={publishedAt} slug={slug} title={title} />
			})}
		</div>
	)
}
