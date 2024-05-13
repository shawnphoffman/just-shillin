export default function PostTitle({ children }) {
	return (
		// <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl text-balance">
		<h1 className="mb-6 text-sky-500 text-center text-6xl font-bold leading-tight tracking-tighter md:text-7xl md:leading-none lg:text-8xl text-balance">
			{children}
		</h1>
	)
}
