export default function HalftoneDivider({ className = '' }: { className?: string }) {
	return <div className={`halftone-divider ${className}`} role="separator" aria-hidden="true" />
}
