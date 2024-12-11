import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const TimeClient = dynamic(() => import('./TimeClient'))

export default function TimesPage() {
	return (
		<div className="flex flex-col w-full gap-1">
			<Suspense>
				<TimeClient />
			</Suspense>
		</div>
	)
}
