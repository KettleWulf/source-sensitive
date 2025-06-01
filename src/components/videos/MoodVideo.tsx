import { useState } from "react";
import { Card } from "react-bootstrap";


const MoodVideo = () => {
	const [showStill, setShowStill] = useState(false);

	const handleVideoEnd = () => {
		setShowStill(true);
	};

	return (
		<Card className="video-floating position-relative m-auto overflow-hidden rounded">
	<video
		src="/videos/mood-starwars.mp4"
		autoPlay
		muted
		playsInline
		onEnded={handleVideoEnd}
		className="w-100 d-block"
	/>

	<img
		src="/images/mood-starwars-still3.jpg"
		alt="Intro still"
		className={`video-still w-100 d-block ${showStill ? "fade-in" : ""}`}
	/>
</Card>
	);
};

export default MoodVideo;