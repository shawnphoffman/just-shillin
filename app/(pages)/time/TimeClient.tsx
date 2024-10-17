'use client'

import Clock from 'react-live-clock'
import FitText from '@kennethormandy/react-fittext'

export default function TimeClient() {
	return (
		<>
			{/* Shawn */}
			<div className="w-full p-4 mb-8 overflow-hidden border rounded-lg border-zinc-900 bg-zinc-950/75">
				<FitText compressor={0.5}>
					<div className="flex flex-col items-center font-medium leading-none">
						<h3 className="text-6xl font-semibold text-brand-red">Shawn</h3>
						<h1>
							<Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />
						</h1>
					</div>
				</FitText>
			</div>
			{/* Andy */}
			<div className="w-full p-4 mb-8 overflow-hidden border rounded-lg border-zinc-900 bg-zinc-950/75">
				<FitText compressor={0.5}>
					<div className="flex flex-col items-center font-medium leading-none">
						<h3 className="text-6xl font-semibold text-brand-yellow">Andy</h3>
						<h1>
							<Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/London'} />
						</h1>
					</div>
				</FitText>
			</div>
		</>
	)
}