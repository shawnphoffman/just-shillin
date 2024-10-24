import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const TimeClient = dynamic(() => import('./TimeClient'))

export default function TimesPage() {
	return (
		<Suspense>
			<TimeClient />
		</Suspense>
	)
}
