'use client'

import { PredictionGrid, type Prediction, type PredictionsTheme } from '@shawnphoffman/pod-sites-shared/components'

import { urlForSanityImage } from '@/sanity/sanity.image'

// Just Shillin' brand: yellow primary, blue secondary.
const justShillinPredictionsTheme: PredictionsTheme = {
	accentBar: 'bg-brand-yellow',
	cardTitle: 'text-brand-yellow',
	summaryTitle: 'text-brand-yellow',
	winnerRing: 'ring-brand-yellow/60',
	winnerBg: 'bg-brand-yellow/10',
	winnerText: 'text-brand-yellow',
	winnerIcon: 'text-brand-yellow',
}

// Isolates the shared-package barrel (which re-exports a class-component
// ErrorBoundary) into the client graph. Importing it from a Server Component
// evaluates `class extends Component` against React's react-server build, where
// Component is undefined, and crashes the route. urlForSanityImage is imported
// here rather than passed as a prop so no function crosses the boundary.
export default function PredictionsBlock({ predictions }: { predictions: Prediction[] }) {
	return <PredictionGrid predictions={predictions} theme={justShillinPredictionsTheme} urlForImage={urlForSanityImage} />
}
