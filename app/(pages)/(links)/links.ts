import { faBluesky, faInstagram, faSpotify, faYoutube } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/brands'
import { faAt, faRssSquare, faShirt } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { faPodcast } from '@awesome.me/kit-d7ccc5bb1a/icons/duotone/solid'
import { faGoodpods, faOvercast, faYoutubeMusic } from '@awesome.me/kit-d7ccc5bb1a/icons/kit/custom'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export const applePodcastId = '1726695035'
export const applePodcastUrl = `https://podcasts.apple.com/us/podcast/id${applePodcastId}`
export const appleRatingUrl = `${applePodcastUrl}?see-all=reviews`
export const goodpodsUrl = 'https://goodpods.com/podcasts/just-shillin-303749'
export const rssFeedUrl = 'https://anchor.fm/s/5dc2916c/podcast/rss'
export const spotifyId = '0BM9MOB6jdirna5f1vNcMe'
export const spotifyUrl = `https://open.spotify.com/show/${spotifyId}`

export type LinkKind = 'listen' | 'watch' | 'follow' | 'subscribe' | 'shop' | 'contact'

const kindLabels: Record<LinkKind, string> = {
	listen: 'Listen',
	watch: 'Watch',
	follow: 'Follow',
	subscribe: 'Subscribe',
	shop: 'Shop',
	contact: 'Say hi',
}

type LinkItem = {
	title: string
	href: string
	icon: IconDefinition
	accent: string
	kind?: LinkKind
	subtitle?: string
}

export function resolveSubtitle(item: LinkItem): string | undefined {
	return item.subtitle ?? (item.kind ? kindLabels[item.kind] : undefined)
}

const items: LinkItem[] = [
	{
		title: 'Apple Podcasts',
		href: applePodcastUrl,
		icon: faPodcast,
		accent: '#b06bff',
		kind: 'listen',
	},
	{
		title: 'Spotify',
		href: spotifyUrl,
		icon: faSpotify,
		accent: '#2ee06a',
		kind: 'listen',
	},
	{
		title: 'Email',
		href: 'mailto:feedback@justshillin.com',
		icon: faAt,
		accent: '#b9c1d0',
		kind: 'contact',
	},
	{
		title: 'Merch Store',
		href: 'https://shop.justshillin.com',
		icon: faShirt,
		accent: '#6b82ff',
		kind: 'shop',
	},
	{
		title: 'Overcast',
		href: 'https://overcast.fm/itunes1726695035/just-shillin',
		icon: faOvercast,
		accent: '#ff9a3d',
		kind: 'listen',
	},
	{
		title: 'YouTube',
		href: 'https://www.youtube.com/@JustShillin',
		icon: faYoutube,
		accent: '#ff5a52',
		kind: 'watch',
	},
	{
		title: 'YouTube Music',
		href: 'https://music.youtube.com/playlist?list=PLRxEa7NQRmKFKsoGeQBLb_IGNcFRZoBp1',
		icon: faYoutubeMusic,
		accent: '#ff5a52',
		kind: 'listen',
	},
	{
		title: 'Goodpods',
		href: goodpodsUrl,
		icon: faGoodpods,
		accent: '#ffe04d',
		kind: 'listen',
	},
	{
		title: 'RSS',
		href: 'https://feeds.zencastr.com/f/l5bmy6wm.rss',
		icon: faRssSquare,
		accent: '#ff7a3d',
		kind: 'subscribe',
	},
	{
		title: 'Instagram',
		href: 'https://www.instagram.com/justshillinpod',
		icon: faInstagram,
		accent: '#ff6fc1',
		kind: 'follow',
	},
	{
		title: 'Just Craftin',
		href: 'https://www.instagram.com/justcraftinpod',
		icon: faInstagram,
		accent: '#ff6fc1',
		kind: 'follow',
	},
	{
		title: 'BlueSky Feed',
		href: 'https://bsky.app/profile/dev.shawn.party/feed/star-wars',
		icon: faBluesky,
		accent: '#3aa8ff',
		kind: 'follow',
	},
] as const

export default items
