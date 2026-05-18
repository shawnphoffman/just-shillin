'use server'

import { XMLParser } from 'fast-xml-parser'

import { appleRatingUrl } from './(pages)/(links)/links'

// Utility function to add a hard timeout to fetch calls. Uses Promise.race so
// we stop waiting at `timeout`ms even if the fetch implementation ignores the
// AbortSignal (which can happen with some runtimes / Next.js fetch wrappers).
async function fetchWithTimeout(url: string, options: RequestInit & { timeout?: number } = {}) {
	const { timeout = 10000, ...fetchOptions } = options

	const controller = new AbortController()

	let timeoutId: ReturnType<typeof setTimeout> | undefined
	const timeoutPromise = new Promise<never>((_, reject) => {
		timeoutId = setTimeout(() => {
			controller.abort()
			reject(new Error(`Request timeout after ${timeout}ms`))
		}, timeout)
	})

	const fetchPromise = fetch(url, {
		...fetchOptions,
		signal: controller.signal,
	})
	// Swallow any late rejection (e.g. AbortError that fires after the race has
	// already been won by timeoutPromise) so it doesn't surface as an unhandled
	// promise rejection and crash the Node process.
	fetchPromise.catch(() => {})

	try {
		const response = await Promise.race([fetchPromise, timeoutPromise])
		return response
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			throw new Error(`Request timeout after ${timeout}ms`)
		}
		throw error
	} finally {
		if (timeoutId) clearTimeout(timeoutId)
	}
}

async function fetchWithRetry(url: string, options: RequestInit & { timeout?: number; retries?: number } = {}) {
	const { retries = 2, ...fetchOptions } = options
	let lastError: Error | null = null

	for (let attempt = 0; attempt <= retries; attempt++) {
		try {
			return await fetchWithTimeout(url, fetchOptions)
		} catch (error) {
			lastError = error instanceof Error ? error : new Error(String(error))

			if (attempt === retries) {
				break
			}

			const delay = Math.min(1000 * Math.pow(2, attempt), 5000)
			await new Promise(resolve => setTimeout(resolve, delay))
		}
	}

	throw lastError || new Error('Request failed after all retries')
}

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
