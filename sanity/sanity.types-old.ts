import type { ProjectedAuthor, ProjectedPost, ProjectedSettings } from '@shawnphoffman/pod-sites-shared/sanity'

export type Author = ProjectedAuthor
export type Post = ProjectedPost
export type Settings = ProjectedSettings

// just-shillin specific: shape used by the table-of-contents renderer.
export type OutlineProps = {
	_key: string
	style: string
	subheadings: OutlineProps[]
	slug: string
}
