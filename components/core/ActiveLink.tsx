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
		isActive ? 'underline underline-offset-[6px] decoration-[1px] text-brand-blue' : 'text-white hover:bg-squiggle hover:text-brand-yellow'
	)

	return (
		<Link
			{...rest}
			href={href}
			className={`bg-[length:auto_36px] bg-repeat text-lg bg-bottom font-bold whitespace-nowrap cursor-pointer pb-0.5 ${conditionalClasses} ${classes}`}
		>
			{label}
		</Link>
	)
}

export default ActiveLink
