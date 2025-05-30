
const LoadingSpinner = () => {
  return (
	<div className="d-flex justify-content-center mt-5">
			<img
				src="/loading-spinner.gif"
				className="w-25"
			/>
			<span className="visually-hidden">Loading...</span>
		</div>
  )
}

export default LoadingSpinner