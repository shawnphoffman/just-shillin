import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSSProperties } from 'react'

type Props = {
	link: string
	title: string
	icon: IconDefinition
	accent: string
	subtitle?: string
}

export default function LinkCard({ link, title, icon, accent, subtitle }: Props) {
	return (
		<a
			className="link-card flex items-center gap-4 rounded-2xl border-[3px] border-cream bg-shill-bg p-4 shadow-[0_9px_18px_rgba(0,0,0,0.5)]"
			style={{ '--pc': accent } as CSSProperties}
			href={link}
			target="_blank"
			rel="noopener noreferrer"
		>
			<span
				className="grid h-11 w-11 flex-none place-items-center rounded-[11px] bg-black/40"
				style={{ boxShadow: `inset 0 0 0 1.5px color-mix(in srgb, ${accent} 55%, transparent)` }}
			>
				<FontAwesomeIcon icon={icon} className="text-2xl" style={{ color: accent }} />
			</span>
			<span className="flex flex-col text-left">
				<span className="font-display text-2xl uppercase leading-none tracking-wide text-white [text-shadow:0_2px_0_rgba(0,0,0,0.55)]">
					{title}
				</span>
				{subtitle && (
					<span className="mt-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>
						{subtitle}
					</span>
				)}
			</span>
		</a>
	)
}
