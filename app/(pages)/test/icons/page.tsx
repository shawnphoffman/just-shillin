// 'use client'

// import { foot } from '@awesome.me/kit-d7ccc5bb1a/icons'
import { faHouse } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { faFoot } from '@awesome.me/kit-d7ccc5bb1a/icons/kit/custom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function IconsPage() {
	return (
		<div>
			<h1 className="text-3xl font-bold">Icons</h1>
			<div className="text-2xl text-red-500">
				<FontAwesomeIcon icon={faHouse} fixedWidth />
				<FontAwesomeIcon icon={faHouse} symbol />
			</div>
			<div className="text-3xl">
				<FontAwesomeIcon icon={faFoot} fixedWidth />
				<FontAwesomeIcon icon={faFoot} />
				<FontAwesomeIcon icon={faFoot} beatFade />
			</div>
		</div>
	)
}
