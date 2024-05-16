import { faHouse } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { faAndy2, faFoot, faShawn2 } from '@awesome.me/kit-d7ccc5bb1a/icons/kit/custom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function IconsPage() {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-3xl font-bold">Icons</h1>
			<div className="text-3xl text-red-500">
				<FontAwesomeIcon icon={faHouse} fixedWidth />
				<FontAwesomeIcon icon={faHouse} symbol />
			</div>
			<div className="flex flex-row justify-center gap-4 text-3xl text-sky-500">
				{/* <FontAwesomeIcon icon={faFoot} fixedWidth /> */}
				<FontAwesomeIcon icon={faFoot} beatFade />
				<span className="text-3xl text-lime-500">
					<FontAwesomeIcon icon={faFoot} />
				</span>
			</div>
			<div className="text-red-500 text-[12rem] flex flex-row gap-4 justify-center">
				{/* <FontAwesomeIcon icon={faAndy1} /> */}
				<FontAwesomeIcon icon={faAndy2} />
				{/* <FontAwesomeIcon icon={faShawn1} /> */}
				<FontAwesomeIcon icon={faShawn2} />
			</div>
		</div>
	)
}
