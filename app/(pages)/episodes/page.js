import { Suspense } from 'react'
import { XMLParser } from 'fast-xml-parser'

import styles from 'app/Global.module.css'
import Episode from 'components/Episodes/Episode'

const dataUrl = 'https://feeds.zencastr.com/f/l5bmy6wm.rss'
const xmlOptions = {
	ignoreAttributes: false,
	attributeNamePrefix: '@_',
}

// export const runtime = 'edge'
export const revalidate = 60 * 60 * 2

async function getData() {
	try {
		var res = await fetch(dataUrl, { next: { revalidate } })
		var xml = await res.text()

		const parser = new XMLParser(xmlOptions)
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

const EpisodesClient = async () => {
	const data = await getData()

	return (
		<div className={styles.episodesContainer}>
			{data.episodes.map(ep => (
				<Episode episode={ep} key={ep.guid} />
			))}
		</div>
	)
}

export default async function EpisodesPage() {
	return (
		<Suspense fallback={<div className={styles.pageDescription}>Loading...</div>}>
			<EpisodesClient />
		</Suspense>
	)
}
