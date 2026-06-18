import HalftoneMarker from './HalftoneMarker'

export default function PostTitle({ children }) {
	return (
		<div className="w-full">
			<h1 className="w-full mb-3 text-4xl font-bold leading-tight tracking-tight text-center sm:text-5xl md:text-6xl lg:text-7xl text-cream md:leading-none text-balance">
				{children}
			</h1>
			<HalftoneMarker centered />
		</div>
	)
}
