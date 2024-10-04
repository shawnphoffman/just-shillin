import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const TimeClient = dynamic(() => import('./TimeClient'), { ssr: false })

export default function TimesPage() {
	return (
		<Suspense>
			<TimeClient />
		</Suspense>
	)
}
