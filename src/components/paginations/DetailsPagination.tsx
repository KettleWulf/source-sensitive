
import { Button } from "react-bootstrap";


interface DetailsPaginationProps {
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	onNextPage: () => void,
	onPreviousPage: () => void,
}

const DetailsPagination: React.FC<DetailsPaginationProps> = ({
	hasNextPage,
	hasPreviousPage,
	onNextPage,
	onPreviousPage,
}) => {
  return (
	<div className="d-flex justify-content-between align-items-center mt-4">
			<div className="first">
				<Button
					disabled={!hasPreviousPage}
					onClick={onPreviousPage}
					variant="light"
				>«</Button>
			</div>

			<div className="next">
				<Button
					className="ms-1"
					disabled={!hasNextPage}
					onClick={onNextPage}
					variant="light"
				>»</Button>
			</div>
		</div>
  )
}

export default DetailsPagination