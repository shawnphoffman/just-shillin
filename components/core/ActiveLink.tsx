'use client'

import classnames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ActiveLink = ({ label, href, ...rest }) => {
	const currentRoute = usePathname()
	const isActive = currentRoute === href

	const conditionalClasses = classnames(
		isActive ? 'underline underline-offset-[6px] decoration-[1px] text-brand-blue' : 'text-white hover:bg-squiggle hover:text-brand-yellow'
	)

	return (
		<Link
			{...rest}
			href={href}
			className={`bg-[length:auto_36px] bg-repeat text-lg bg-bottom font-bold whitespace-nowrap cursor-pointer pb-0.5 ${conditionalClasses}`}
		>
			{label}
		</Link>
	)
}

export default ActiveLink
