const items = [
	{
		title: 'Blue Harvest',
		href: 'https://blueharvest.rocks',
	},
	{
		title: 'Canto Bight Dispatch',
		href: 'https://soundcloud.com/user-12011751-343526245',
	},
	{
		title: 'High Potion',
		href: 'https://podcasters.spotify.com/pod/show/highpotion',
	},
	{
		title: 'Rogue Rebels',
		href: 'https://theroguerebels.com/',
	},
	{
		title: 'Scruffy Looking Podcasters',
		href: 'https://scruffypodcasters.podbean.com/',
	},
	{
		title: 'Star Wars Spelt Out',
		href: 'https://starwarsspeltout.podbean.com/',
	},
	{
		title: 'Steele Wars',
		href: 'https://www.youtube.com/@SteeleWars',
	},
	{
		title: 'The Sith List ',
		href: 'https://sithlist.com/',
	},
	{
		title: 'That Geek Pod',
		href: 'https://feed.podbean.com/thatgeekpod',
	},
	{
		title: 'Gunga Beach',
		href: 'https://gungabeachpodcast.podomatic.com',
	},
	{
		title: 'Jammed Transmissions',
		href: 'https://jammedtransmissions.com',
	},
].sort((a, b) => {
	if (a.title < b.title) return -1
	if (a.title > b.title) return 1
	return 0
})

export default items
