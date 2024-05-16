'use client'

import classnames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ActiveLink = ({ label, href, ...rest }) => {
	const currentRoute = usePathname()
	const isActive = currentRoute === href

	const conditionalClasses = classnames(
		isActive ? 'underline underline-offset-[6px] decoration-[1px] text-sky-400' : 'text-white hover:bg-squiggle'
	)

	return (
		<Link
			{...rest}
			href={href}
			className={`bg-[length:auto_36px] bg-repeat hover:text-sky-400 bg-bottom font-bold whitespace-nowrap cursor-pointer pb-1 ${conditionalClasses}`}
		>
			{label}
		</Link>
	)
}

export default ActiveLink
