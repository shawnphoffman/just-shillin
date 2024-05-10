'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './ActiveLink.module.css'

const ActiveLink = ({ label, href, ...rest }) => {
	const currentRoute = usePathname()
	const isActive = currentRoute === href
	return (
		<Link {...rest} href={href} className={`${styles.link} ${isActive ? styles.active : ''}`}>
			{label}
		</Link>
	)
}

export default ActiveLink
