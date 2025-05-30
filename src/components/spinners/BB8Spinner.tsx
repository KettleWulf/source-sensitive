import { useEffect, useState } from "react";

const BB8Spinner = () => {

		const [scrolled, setScrolled] = useState(false);

		useEffect(() => {
			const handleScroll = () => {
				setScrolled(window.scrollY > 100);
			};

			// Kör direkt vid mount
			handleScroll();

			// Lägg till scroll-lyssnare
			window.addEventListener("scroll", handleScroll);
			return () => window.removeEventListener("scroll", handleScroll);
		}, []);

	return (
		<div 
			id="bb8-spinner-wrapper"
			style={{ top: scrolled ? "1rem" : "5rem" }}>
			<img
				src="/bb8-spinner.gif"
				alt="Loading BB-8"
				id="bb8-spinner"
			/>
			<span className="visually-hidden">Fetching latest data...</span>
		</div>
	);
};

export default BB8Spinner;