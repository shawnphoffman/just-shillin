export const applePodcastId = '1726695035'
export const applePodcastUrl = `https://podcasts.apple.com/us/podcast/id${applePodcastId}`
export const appleRatingUrl = `${applePodcastUrl}?see-all=reviews`

const items = [
	{
		title: 'Apple Podcasts',
		href: applePodcastUrl,
		icon: 'fa-solid fa-podcast',
		background: 'var(--applepodcasts)',
	},
	{
		title: 'Spotify',
		href: 'https://open.spotify.com/show/0BM9MOB6jdirna5f1vNcMe',
		icon: 'fa-brands fa-spotify',
		background: 'var(--spotify)',
	},
	{
		title: 'Email',
		href: 'mailto:feedback@justshillin.com',
		icon: 'fa-solid fa-at',
		background: 'var(--email)',
	},
	{
		title: 'Overcast',
		href: 'https://overcast.fm/itunes1726695035/just-shillin',
		icon: 'fak fa-overcast fa-lg',
		background: 'var(--overcast)',
	},
	{
		title: 'YouTube',
		href: 'https://www.youtube.com/@JustShillin',
		icon: 'fa-brands fa-youtube',
		background: 'var(--youtube)',
	},
	{
		title: 'YouTube Music',
		href: 'https://music.youtube.com/playlist?list=PLRxEa7NQRmKFKsoGeQBLb_IGNcFRZoBp1',
		icon: 'fak fa-youtube-music',
		background: 'var(--youtube)',
	},
	{
		title: 'Goodpods',
		href: 'https://goodpods.com/podcasts/just-shillin-303749',
		icon: 'fak fa-goodpods',
		background: 'var(--goodpods)',
		color: 'var(--bg)',
	},
	{
		title: 'Amazon Music',
		href: 'https://music.amazon.com/podcasts/41b5996a-f09d-4657-991f-d495150756f3/just-shillin',
		icon: 'fa-brands fa-amazon',
		background: 'var(--amazonmusic)',
	},
	{
		title: 'Pocket Casts',
		href: 'https://pca.st/74wq5erg',
		icon: 'fak fa-pocket-casts',
		background: 'var(--pocketcasts)',
	},
	{
		title: 'Radio Public',
		href: 'https://radiopublic.com/just-shillin-6pQpmN',
		icon: 'fak fa-radio-public',
		background: 'var(--radiopublic)',
	},
	{
		title: 'Zencastr',
		href: 'https://zencastr.com/Just-Shillin',
		icon: 'fak fa-zencastr',
		background: 'var(--zencastr)',
	},
	{
		title: 'RSS',
		href: 'https://feeds.zencastr.com/f/l5bmy6wm.rss',
		icon: 'fa-solid fa-square-rss',
		background: 'var(--rss)',
	},
	{
		title: 'BlueSky Feed',
		href: 'https://bsky.app/profile/did:plc:q7ul4lz2j3d6qtcjzvz4rrjh/feed/shawnbot-pods',
		icon: 'fa-solid fa-clouds',
		background: 'var(--bluesky)',
	},
]

export default items
