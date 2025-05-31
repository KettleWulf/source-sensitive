
import { Button } from "react-bootstrap";


interface PaginationProps {
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	onPageChange: (newPage: number) => void;
	page: number;
	totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
	hasNextPage,
	hasPreviousPage,
	onPageChange,
	page,
	totalPages,
}) => {
  return (
	<div className="d-flex justify-content-between align-items-center mt-3">
			<div className="first">
				<Button
					disabled={!hasPreviousPage}
					onClick={() => onPageChange(1)}
					variant="light"
				>«</Button>

				<Button
					className="ms-1"
					disabled={!hasPreviousPage}
					onClick={() => onPageChange(page - 1)}
					variant="light"
				>Previous Page</Button>
			</div>

			<div className="page ms-2 mb-1 text-muted small">
				Page {page}
				{totalPages && "/" + totalPages}
			</div>

			<div className="next">
				<Button
					disabled={!hasNextPage}
					onClick={() => onPageChange(page + 1)}
					variant="light"
				>Next Page</Button>

				<Button
					className="ms-1"
					disabled={!hasNextPage}
					onClick={() => onPageChange(totalPages)}
					variant="light"
				>»</Button>
			</div>
		</div>
  )
}

export default Pagination