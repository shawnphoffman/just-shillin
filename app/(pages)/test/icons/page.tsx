// 'use client'

import { faHouse } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { faFoot } from '@awesome.me/kit-d7ccc5bb1a/icons/kit/custom'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const footIcon = 'fa-kit fa-foot' as IconProp

export default function IconsPage() {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-3xl font-bold">Icons</h1>
			<div className="text-3xl text-red-500">
				<FontAwesomeIcon icon={faHouse} fixedWidth />
				<FontAwesomeIcon icon={faHouse} symbol />
			</div>
			<div className="text-3xl text-sky-500">
				<FontAwesomeIcon icon={faFoot} fixedWidth />
				<FontAwesomeIcon icon={faFoot} />
				<FontAwesomeIcon icon={faFoot} beatFade />
			</div>
			<div className="text-3xl text-lime-500">
				<FontAwesomeIcon icon={footIcon} />
			</div>
		</div>
	)
}
