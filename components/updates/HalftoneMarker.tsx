type Props = {
	centered?: boolean
	fullWidth?: boolean
	className?: string
}

export default function HalftoneMarker({ centered = false, fullWidth = false, className = '' }: Props) {
	const dots = (
		<span className="flex gap-1">
			<span className="block w-1.5 h-1.5 rounded-full bg-brand-blue" />
			<span className="block w-1.5 h-1.5 rounded-full bg-brand-red" />
			<span className="block w-1.5 h-1.5 rounded-full bg-brand-yellow" />
			<span className="block w-1.5 h-1.5 rounded-full bg-cream" />
		</span>
	)

	if (centered) {
		const rule = fullWidth ? 'flex-1' : 'w-10'
		return (
			<div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
				<span className={`${rule} h-px bg-cream-edge/20`} />
				{dots}
				<span className={`${rule} h-px bg-cream-edge/20`} />
			</div>
		)
	}

	return (
		<div className={`flex items-center gap-2.5 ${className}`} aria-hidden="true">
			{dots}
			<span className="flex-1 h-px bg-cream-edge/20" />
		</div>
	)
}
