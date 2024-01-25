'use client'

import { Children, cloneElement } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ActiveLink = ({ children, activeClassName, ...props }) => {
	const currentRoute = usePathname()
	const child = Children.only(children)
	const childClassName = child.props.className || ''

	const linkPathname = props.as || props.href

	const newClassName = linkPathname === currentRoute ? `${childClassName} ${activeClassName}`.trim() : childClassName

	return (
		<Link passHref {...props}>
			{cloneElement(child, {
				className: newClassName || null,
			})}
		</Link>
	)
}

export default ActiveLink
