import { type IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'

export default function LinkCard({ link, bg, icon, title, color = 'text-white' }) {
	const classes = classnames([color, bg])
	return (
		<a
			className={`min-w-[250px] flex-[1_1_250px] max-w-[350px] flex flex-row justify-center items-center text-3xl h-[3.25rem] gap-2 pb-0 border-4 rounded-2xl animate-fadeInUp transition-all border-gray-300 hover:scale-105 ${classes}`}
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			// style={{ backgroundColor: `var(--${bg})`, color: `var(--${color})` }}
			// style={{ backgroundColor: `var(--${bg})` }}
		>
			<FontAwesomeIcon icon={icon as IconProp} />
			<h2 className="m-0 text-xl font-bold">{title}</h2>
		</a>
	)
}
