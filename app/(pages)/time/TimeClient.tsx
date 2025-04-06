'use client'

import { useEffect, useState } from 'react'
import Clock from 'react-live-clock'
import FitText from '@kennethormandy/react-fittext'

export default function TimeClient() {
	const now = Date.now()
	const today = new Date()
	today.setHours(0, 0, 0, 0)
	const todayMillis = today.getTime()
	const maxMillis = todayMillis + 86399999

	const [time, setTime] = useState(now)
	const [formattedTime, setFormattedTime] = useState<number>()

	useEffect(() => {
		setFormattedTime(time)
	}, [time])

	if (!formattedTime) {
		return null
	}

	// console.log('millis', {
	// 	todayMillis,
	// 	maxMillis,
	// 	time,
	// })

	return (
		<>
			<div className="w-full p-2 overflow-hidden border rounded-lg border-brand-blue bg-zinc-950/75">
				<Clock key={formattedTime} date={formattedTime} format={'h:mm A'} ticking={false} /> local
				<input
					className="w-full"
					type="range"
					min={todayMillis}
					max={maxMillis}
					value={time}
					step={1000 * 60 * 5}
					onChange={e => setTime(Number(e.target.value))}
				/>
				<div className="flex justify-between w-full px-1 mt-1 text-xs text-gray-400">
					{Array.from({ length: 25 }, (_, i) => (
						<span key={i} className="flex-1 text-center">
							{i % 2 === 0 ? i : ''}
						</span>
					))}
				</div>
			</div>
			{/* Shawn */}
			<div className="w-full p-2 overflow-hidden border rounded-lg border-brand-red bg-zinc-950/75">
				<FitText compressor={0.85}>
					<div className="flex flex-col items-center font-medium leading-none">
						<h2 className="text-5xl font-semibold text-brand-red">US Pacific</h2>
						<h3 suppressHydrationWarning>
							<Clock date={time} format={'h:mm A'} ticking={false} timezone={'US/Pacific'} />
						</h3>
					</div>
				</FitText>
			</div>
			{/* Andy */}
			<div className="w-full p-2 overflow-hidden border rounded-lg border-brand-yellow bg-zinc-950/75">
				<FitText compressor={0.85}>
					<div className="flex flex-col items-center font-medium leading-none">
						<h2 className="text-5xl font-semibold text-brand-yellow">UK</h2>
						<h3 suppressHydrationWarning>
							<Clock key={formattedTime} date={formattedTime} format={'h:mm A'} ticking={false} timezone={'Europe/London'} />
						</h3>
					</div>
				</FitText>
			</div>
			{/* Misc */}
			<div className="flex flex-col w-full px-2 overflow-hidden border divide-y rounded-lg divide-brand-blue border-brand-blue bg-zinc-950/75 [&>*]:py-2">
				<FitText compressor={1}>
					<div className="flex flex-col items-center font-medium leading-none">
						<h2 className="text-3xl font-semibold text-brand-blue">US Central</h2>
						<h3 suppressHydrationWarning>
							<Clock key={formattedTime} date={formattedTime} format={'h:mm A'} ticking={false} timezone={'US/Central'} />
						</h3>
					</div>
				</FitText>
				<FitText compressor={1}>
					<div className="flex flex-col items-center font-medium leading-none">
						<h2 className="text-3xl font-semibold text-brand-blue">US East</h2>
						<h3 suppressHydrationWarning>
							<Clock key={formattedTime} date={formattedTime} format={'h:mm A'} ticking={false} timezone={'US/Eastern'} />
						</h3>
					</div>
				</FitText>
				<FitText compressor={1}>
					<div className="flex flex-col items-center font-medium leading-none">
						<h2 className="text-3xl font-semibold text-brand-blue">AUS East</h2>
						<h3 suppressHydrationWarning>
							<Clock key={formattedTime} date={formattedTime} format={'h:mm A'} ticking={false} timezone={'Australia/Melbourne'} />
						</h3>
					</div>
				</FitText>
			</div>
		</>
	)
}
