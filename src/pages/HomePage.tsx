import IntroRantAnimation from "../components/IntroRantAnimation"
import MoodVideo from "../components/videos/MoodVideo"


const HomePage = () => {

	return (
		<>
		<div className="text-center">
			<h1 className="starwars-font mt-5 mb-0">Source &bull; Sensitive</h1>
			<p className="starwars-font h3 mt-0">A New Wiki</p>

			<MoodVideo />
		</div>

		<IntroRantAnimation />
		</>
	)
}

export default HomePage
