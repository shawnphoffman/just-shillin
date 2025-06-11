// 'use client'

import Image from 'next/image'
import Link from 'next/link'

// import { usePathname } from 'next/navigation'
import { Modal } from '@/components/core/Modal'

import andyImage from './andy.png'

export default function ChrisRunModal() {
	// const pathname = usePathname()

	return (
		<Modal>
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-5xl text-purple-500">Chris&apos; Race for Life</h1>
				<Image src={andyImage} alt="Andy" width={200} className=" rounded-xl" />
				<p className="text-xl text-center text-zinc-300">
					Our buddy Chris is running the Race for Life on Sunday June 29th in honor of Andy. Please consider visiting his{' '}
					<Link
						href="https://www.online-tribute.com/AndyBell"
						target="_blank"
						rel="noreferrer noopener"
						className="text-brand-blue hover:bg-squiggle"
					>
						online donation page
					</Link>
					.
				</p>
				{/* <p className="text-sm text-zinc-500">Current path: {pathname}</p> */}
			</div>
		</Modal>
	)
}
