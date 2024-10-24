'use client'

import Clock from 'react-live-clock'
import FitText from '@kennethormandy/react-fittext'

export default function TimeClient() {
	return (
		<>
			{/* Shawn */}
			<div className="w-full p-2 overflow-hidden border rounded-lg border-brand-red bg-zinc-950/75">
				<FitText compressor={0.75}>
					<div className="flex flex-col items-center font-medium leading-none">
						<h2 className="text-6xl font-semibold text-brand-red">Shawn (PST)</h2>
						<h3>
							{/* <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} /> */}
							<Clock format={'h:mm A'} ticking={false} timezone={'US/Pacific'} />
						</h3>
					</div>
				</FitText>
			</div>
			{/* Andy */}
			<div className="w-full p-2 overflow-hidden border rounded-lg border-brand-yellow bg-zinc-950/75">
				<FitText compressor={0.75}>
					<div className="flex flex-col items-center font-medium leading-none">
						<h2 className="text-6xl font-semibold text-brand-yellow">Andy (BST)</h2>
						<h3>
							{/* <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/London'} /> */}
							<Clock format={'h:mm A'} ticking={false} timezone={'Europe/London'} />
						</h3>
					</div>
				</FitText>
			</div>
			{/* Misc */}
			<div className="flex flex-col w-full px-2 overflow-hidden border divide-y rounded-lg divide-brand-blue border-brand-blue bg-zinc-950/75 [&>*]:py-2">
				<FitText compressor={1.5}>
					<div className="flex flex-col items-center font-medium leading-none">
						<h2 className="text-4xl font-semibold text-brand-blue">Eastern US</h2>
						<h3>
							<Clock format={'h:mm A'} ticking={false} timezone={'US/Eastern'} />
						</h3>
					</div>
				</FitText>
				<FitText compressor={1.5}>
					<div className="flex flex-col items-center font-medium leading-none">
						<h2 className="text-4xl font-semibold text-brand-blue">Melbourne</h2>
						<h3>
							<Clock format={'h:mm A'} ticking={false} timezone={'Australia/Melbourne'} />
						</h3>
					</div>
				</FitText>
			</div>
		</>
	)
}
