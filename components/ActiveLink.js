'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from 'app/Global.module.css'

const ActiveLink = ({ label, href }) => {
	const currentRoute = usePathname()
	const isActive = currentRoute === href
	return (
		<Link href={href} className={`${styles.styledLink} ${isActive ? styles.active : ''}`}>
			{label}
		</Link>
	)
}

export default ActiveLink
