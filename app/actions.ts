'use server'

import { XMLParser } from 'fast-xml-parser'

import { appleRatingUrl } from './(pages)/(links)/links'

export async function getAppleReviews() {
	try {
		const res = await fetch(`https://api.shawn.party/api/pod-data/apple?url=${appleRatingUrl}`, {
			next: { revalidate: 60 * 60 * 1 },
		})
		const data = await res.json()
		const { rating, ratingsUrl, reviews } = data

		return {
			appleRating: rating,
			appleRatingUrl: ratingsUrl,
			reviews: reviews?.length
				? reviews
				: !process.env.VERCEL_URL
				? [
						{
							title: 'Great Show!',
							author: 'Shawn',
							stars: '4',
							text: 'Wow this is a great show! I love it!',
						},
						{
							title: 'Great Show!!',
							author: 'Shawn',
							stars: '3',
							text: 'Wow this is a great show! I love it!',
						},
						{
							title: 'Great Show!!!',
							author: 'Shawn',
							stars: '5',
							text: 'Wow this is a great show! I love it!',
						},
				  ]
				: [],
		}
	} catch (e) {
		console.error(e)
		return {}
	}
}

function removeChaptersAndTimestamps(text) {
	const regex1 = /(Chapters|^\d{2}:\d{2}:\d{2}.*)[\r\n]?/gm
	text = text.replace(regex1, '')

	const regex2 = /.*(?:https:\/\/justshillin\.com|feedback@justshillin\.com).*/gm
	text = text.replace(regex2, '')

	const regex3 = /\b(https?:\/\/\S+)\s+\[\1\]/g
	text = text.replace(regex3, '$1')

	const regexFinal = /[\r\n]{3,}/g
	text = text.replace(regexFinal, '\n').replace(/[\r\n]+\s*$/g, '')

	return text
}

export async function getEpisodes() {
	try {
		// const tempPromise = new Promise(resolve => setTimeout(resolve, 5000))
		const resPromise = fetch('https://feeds.zencastr.com/f/l5bmy6wm.rss', {
			next: { tags: ['episodes'] },
		})
		const [res] = await Promise.all([resPromise])
		const xml = await res.text()
		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: '@_',
		})
		const parsed = parser.parse(xml)
		const episodes = parsed.rss.channel.item.map(ep => ({
			guid: ep.guid['#text'],
			title: ep.title,
			imgSrc: ep['itunes:image']['@_href'],
			summary: removeChaptersAndTimestamps(ep['itunes:summary']),
			link: ep.link,
			pubDate: ep.pubDate,
		}))
		return {
			episodes,
		}
	} catch (error) {
		return {}
	}
}
