import LoginButton from 'components/login'

const Intro = () => {
	return (
		<section className="my-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
			<h1 className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
				Beyond Health
			</h1>
			<h4 className="mt-5 text-center text-lg md:pl-8 md:text-left">
				<LoginButton />
			</h4>
		</section>
	)
}

export default Intro
