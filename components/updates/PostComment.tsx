import { AppBskyFeedDefs, AppBskyFeedPost, RichText } from '@atproto/api'
import { faArrowsRepeat, faHeart, faMessage, faUpRightFromSquare } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export const Comment = ({ comment }: { comment: AppBskyFeedDefs.ThreadViewPost }) => {
	const author = comment.post.author
	const avatarClassName = 'h-8 w-8 shrink-0 rounded-full bg-brand-blue'

	if (!AppBskyFeedPost.isRecord(comment.post.record)) return null

	const rt = new RichText({
		text: comment.post.record.text,
		facets: comment.post.record.facets,
	})

	const richText: any[] = []

	let counter = 0
	for (const segment of rt.segments()) {
		if (segment.isLink() && segment.link) {
			richText.push(
				<Link key={counter} href={segment.link.uri} target="_blank" rel="noreferrer noopener" className="text-brand-blue hover:bg-squiggle">
					{segment.text}
				</Link>
			)
		} else if (segment.isMention() && segment.mention) {
			richText.push(
				<Link
					key={counter}
					href={`https://bsky.app/profile/${segment.mention.did}`}
					target="_blank"
					rel="noreferrer noopener"
					className="text-brand-blue hover:bg-squiggle"
				>
					{segment.text}
				</Link>
			)
		} else {
			richText.push(segment.text)
		}

		counter++
	}

	const actionsUrl = `https://bsky.app/profile/${author.did}/post/${comment.post.uri.split('/').pop()}`

	return (
		<div className="my-4 text-base">
			<div className="flex flex-col max-w-xl gap-2">
				{/* AUTHOR */}
				<Link
					className="flex flex-row items-center gap-2 group w-fit"
					href={`https://bsky.app/profile/${author.did}`}
					target="_blank"
					rel="noreferrer noopener"
				>
					{author.avatar ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img src={comment.post.author.avatar} alt="avatar" className={avatarClassName} />
					) : (
						<div className={avatarClassName} />
					)}
					<p className="line-clamp-1 group-hover:bg-squiggle">
						{author.displayName ?? author.handle} <span className="text-gray-500">@{author.handle}</span>
					</p>
				</Link>
				{/* CONTENT */}
				{/* <Link
					href={`https://bsky.app/profile/${author.did}/post/${comment.post.uri.split('/').pop()}`}
					target="_blank"
					rel="noreferrer noopener"
				> */}
				<p>{richText}</p>
				{/* STATS */}
				<Actions post={comment.post} url={actionsUrl} />
				{/* </Link> */}
			</div>
			{comment.replies && comment.replies.length > 0 && (
				<div className="pl-2 ml-2 border-l border-brand-red">
					{comment.replies.sort(sortByLikes).map(reply => {
						if (!AppBskyFeedDefs.isThreadViewPost(reply)) return null
						return <Comment key={reply.post.uri} comment={reply} />
					})}
				</div>
			)}
		</div>
	)
}

const sortByLikes = (a: unknown, b: unknown) => {
	if (!AppBskyFeedDefs.isThreadViewPost(a) || !AppBskyFeedDefs.isThreadViewPost(b)) {
		// blocked/deleted posts are just ignored, so don't sort
		return 0
	}
	return (b.post.likeCount ?? 0) - (a.post.likeCount ?? 0)
}

export const Actions = ({ post, url }: { post: AppBskyFeedDefs.PostView; url: string }) => (
	<div className="flex flex-row items-center justify-between w-full max-w-44 text-white/60">
		<div className="flex flex-row items-center gap-1.5">
			<FontAwesomeIcon icon={faMessage} />
			<p className="text-sm">{post.replyCount ?? 0}</p>
		</div>
		<div className="flex flex-row items-center gap-1.5">
			<FontAwesomeIcon icon={faArrowsRepeat} />
			<p className="text-sm">{post.repostCount ?? 0}</p>
		</div>
		<div className="flex flex-row items-center gap-1.5">
			<FontAwesomeIcon icon={faHeart} />
			<p className="text-sm">{post.likeCount ?? 0}</p>
		</div>
		<Link href={url} target="_blank" rel="noreferrer noopener" className="flex flex-row items-center gap-1.5 hover:text-brand-blue">
			<FontAwesomeIcon icon={faUpRightFromSquare} />
		</Link>
	</div>
)
