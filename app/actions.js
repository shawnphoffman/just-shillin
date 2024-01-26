'use server'

import { XMLParser } from 'fast-xml-parser'

export async function getReviews() {
	try {
		const res = await fetch('https://api.shawn.party/api/just-shillin/reviews', { next: { revalidate: 60 * 60 * 4 } })
		const data = await res.json()
		const { rating, ratingsUrl } = data

		return {
			appleRating: rating,
			appleRatingUrl: ratingsUrl,
		}
	} catch {
		return {}
	}
}

export async function getSpotifyReviews() {
	try {
		const res = await fetch(`https://api.shawn.party/api/pod-data/spotify?url=${'https://open.spotify.com/show/0BM9MOB6jdirna5f1vNcMe'}`, {
			next: { revalidate: 60 * 60 * 4 },
		})
		return await res.json()
	} catch {
		return {}
	}
}

export async function getEpisodes() {
	try {
		const res = await fetch('https://feeds.zencastr.com/f/l5bmy6wm.rss', {
			next: { revalidate: 60 * 60 * 1 },
		})
		const xml = await res.text()
		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: '@_',
		})
		const parsed = parser.parse(xml)
		let episodes = []
		if (parsed.rss.channel.item instanceof Array) {
			episodes = parsed.rss.channel.item.map(ep => ({
				guid: ep.guid['#text'],
				title: ep.title,
				imgSrc: ep['itunes:image']['@_href'],
				summary: ep['itunes:summary'],
				link: ep.link,
				pubDate: ep.pubDate,
			}))
		} else {
			const ep = parsed.rss.channel.item
			episodes = [
				{
					guid: ep.guid['#text'],
					title: ep.title,
					imgSrc: ep['itunes:image']['@_href'],
					summary: ep['itunes:summary'],
					link: ep.link,
					pubDate: ep.pubDate,
				},
			]
		}
		return {
			episodes,
		}
	} catch (error) {
		return {}
	}
}
