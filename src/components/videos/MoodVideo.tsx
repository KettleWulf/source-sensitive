import { useState } from "react";
import { Card } from "react-bootstrap";

const MoodVideo = () => {
	const [showStill, setShowStill] = useState(false);

	const handleVideoEnd = () => {
		setShowStill(true);
	};

	return (
		<Card className="shadow m-auto overflow-hidden rounded" style={{ maxWidth: 500 }}>
			{!showStill ? (
				<video
					src="/videos/mood-starwars.mp4"
					autoPlay
					muted
					playsInline
					onEnded={handleVideoEnd}
					className="w-100 d-block"
				/>
			) : (
				<img
					src="/images/mood-starwars-still3.jpg"
					alt="Intro still"
					className="w-100 d-block"
				/>
			)}
		</Card>
	);
};

export default MoodVideo;