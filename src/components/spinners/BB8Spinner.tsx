const BB8Spinner = () => {
	return (
		<div id="bb8-spinner-wrapper">
			<img
				src="/bb8-spinner.gif"
				alt="Loading BB-8"
				id="bb8-spinner"
			/>
			<span className="visually-hidden">Loading...</span>
		</div>
	);
};

export default BB8Spinner;