
import { Button } from "react-bootstrap";


interface PaginationProps {
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	onNextPage: () => void;
	onPreviousPage: () => void;
	onFirstPage: () => void;
	onLastPage: () => void;
	page: number;
	totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
	hasNextPage,
	hasPreviousPage,
	onNextPage,
	onPreviousPage,
	onFirstPage,
	onLastPage,
	page,
	totalPages,
}) => {
  return (
	<div className="d-flex justify-content-between align-items-center mt-4">
			<div className="first">
				<Button
					disabled={!hasPreviousPage}
					onClick={onFirstPage}
					variant="primary"
				>«</Button>

				<Button
					className="ms-1"
					disabled={!hasPreviousPage}
					onClick={onPreviousPage}
					variant="primary"
				>Previous Page</Button>
			</div>

			<div className="page">
				Page {page}
				{totalPages && "/" + totalPages}
			</div>

			<div className="next">
				<Button
					disabled={!hasNextPage}
					onClick={onNextPage}
					variant="primary"
				>Next Page</Button>

				<Button
					className="ms-1"
					disabled={!hasNextPage}
					onClick={onLastPage}
					variant="primary"
				>»</Button>
			</div>
		</div>
  )
}

export default Pagination