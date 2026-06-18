'use client'

import classnames from 'classnames'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
	label: string
	href: string
	fuzzy?: boolean
	classes?: string
} & LinkProps &
	Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>

const ActiveLink = ({ label, href, fuzzy, classes, ...rest }: Props) => {
	const currentRoute = usePathname()
	const isActive = fuzzy
		? currentRoute.toLowerCase().startsWith(href) && !currentRoute.toLowerCase().includes('trivia')
		: currentRoute === href

	const conditionalClasses = classnames(
		isActive ? 'bg-shill-accent text-black border-shill-accent' : 'text-cream border-cream hover:bg-white/10'
	)

	return (
		<Link
			{...rest}
			href={href}
			className={`font-display uppercase text-base tracking-wider whitespace-nowrap cursor-pointer rounded border-2 px-[18px] py-1.5 transition-colors hover:rotate-0 ${conditionalClasses} ${classes ?? ''}`}
		>
			{label}
		</Link>
	)
}

export default ActiveLink
