import { Suspense } from 'react'

import TimeClient from './TimeClient'

export default function TimesPage() {
	return (
		<Suspense>
			<TimeClient />
		</Suspense>
	)
}
