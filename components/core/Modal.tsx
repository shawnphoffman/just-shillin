'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface ModalProps {
	children: React.ReactNode
}

export function Modal({ children }: ModalProps) {
	const router = useRouter()
	const [isVisible, setIsVisible] = useState(true)

	const handleClose = useCallback(() => {
		setIsVisible(false)
	}, [])

	const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setIsVisible(false)
		}
	}, [])

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsVisible(false)
			}
		}

		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [router])

	if (!isVisible) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75" onClick={handleClick}>
			<div className="relative w-full max-w-2xl p-8 border-4 border-purple-900 rounded-lg shadow-xl bg-zinc-950">
				<button onClick={handleClose} className="absolute right-4 top-4 text-zinc-400 hover:text-white">
					✕
				</button>
				{children}
			</div>
		</div>
	)
}
