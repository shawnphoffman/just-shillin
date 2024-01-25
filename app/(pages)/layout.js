import { Suspense } from 'react'

async function PageLayout({ children }) {
	return <Suspense fallback={<div className="fa-solid fa-space-station-moon-construction fa-beat-fade" />}>{children}</Suspense>
}

export default PageLayout
