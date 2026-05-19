'use server'

import { fetchWithRetry } from '@shawnphoffman/pod-sites-shared/fetch'
import { XMLParser } from 'fast-xml-parser'

import { appleRatingUrl, spotifyUrl } from './(pages)/(links)/links'

export async function getAppleReviews() {
	try {
		const res = await fetchWithRetry(`https://api.shawn.party/api/podcast-data/apple?url=${appleRatingUrl}`, {
			next: { revalidate: 60 * 60 * 1 },
			timeout: 5000,
			retries: 1,
		})

		if (!res.ok) {
			console.warn(`Apple API error: ${res.status} ${res.statusText}`)
			return {}
		}

		const text = await res.text()
		if (!text || text.trim() === '') {
			console.warn('Apple API returned empty response')
			return {}
		}

		if (text.toLowerCase().startsWith('an error') || text.toLowerCase().includes('error')) {
			console.warn('Apple API returned error message:', text)
			return {}
		}

		const data = JSON.parse(text)
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
		console.warn('Apple API fetch error:', e)
		return {}
	}
}

export async function getSpotifyReviews() {
	try {
		const res = await fetchWithRetry(`https://api.shawn.party/api/podcast-data/spotify-scrape?url=${spotifyUrl}`, {
			next: { revalidate: 60 * 60 * 6 },
			timeout: 5000,
			retries: 1,
		})

		if (!res.ok) {
			console.warn(`Spotify API error: ${res.status} ${res.statusText}`)
			return {}
		}

		const text = await res.text()
		if (!text || text.trim() === '') {
			console.warn('Spotify API returned empty response')
			return {}
		}

		if (text.toLowerCase().startsWith('an error') || text.toLowerCase().includes('error')) {
			console.warn('Spotify API returned error message:', text)
			return {}
		}

		const data = JSON.parse(text)
		return {
			url: data?.url,
			rating: data?.vals?.rating ? Number(data?.vals?.rating) : undefined,
		}
	} catch (error) {
		console.warn('Failed to fetch Spotify data', error)
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

function formatEpisodeDuration(seconds: number) {
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	const secs = seconds % 60
	const pad = (num: number) => String(num).padStart(2, '0')
	return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
}

export async function getEpisodes() {
	try {
		// const tempPromise = new Promise(resolve => setTimeout(resolve, 5000))
		const resPromise = fetchWithRetry('https://feeds.zencastr.com/f/l5bmy6wm.rss', {
			next: { tags: ['episodes'] },
			timeout: 8000,
			retries: 1,
		})
		const [res] = await Promise.all([resPromise])
		const xml = await res.text()
		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: '@_',
		})
		const parsed = parser.parse(xml)
		const episodes = parsed.rss.channel.item.map(ep => {
			// console.log({ ep })
			return {
				guid: ep.guid['#text'],
				title: ep.title,
				imgSrc: ep['itunes:image']['@_href'],
				summary: removeChaptersAndTimestamps(ep['itunes:summary']),
				link: ep.link,
				pubDate: ep.pubDate,
				keywords: ep['itunes:keywords']?.split() || [],
				duration: formatEpisodeDuration(ep['itunes:duration']),
				season: ep['itunes:season'],
				episode: ep['itunes:episode'],
			}
		})
		return {
			episodes,
		}
	} catch (error) {
		return {}
	}
}
