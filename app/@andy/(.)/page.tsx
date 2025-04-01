// 'use client'

import Image from 'next/image'
import Link from 'next/link'

// import { usePathname } from 'next/navigation'
import { Modal } from '@/components/core/Modal'

import andyImage from './andy.png'

export default function AndyModal() {
	// const pathname = usePathname()

	return (
		<Modal>
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-5xl text-purple-500">Remembering Andy</h1>
				<Image src={andyImage} alt="Andy" width={200} className=" rounded-xl" />
				<p className="text-xl text-center text-zinc-300">
					Please consider visiting the{' '}
					<Link
						href="https://www.online-tribute.com/AndyBell"
						target="_blank"
						rel="noreferrer noopener"
						className="text-brand-blue hover:bg-squiggle"
					>
						online tribute to Andy
					</Link>{' '}
					and making a donation to Sue Ryder and Kidney Cancer UK.
				</p>
				{/* <p className="text-sm text-zinc-500">Current path: {pathname}</p> */}
			</div>
		</Modal>
	)
}
