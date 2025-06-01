import { useNavigate } from "react-router";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";


interface ErrorAlertProps {
	children: React.ReactNode;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ children }) => {
	const navigate = useNavigate()
	return (
		<Container className="mt-5">
			<Alert variant="danger">
				{children}
			</Alert>

			<div className="d-flex justify-content-end">
				<Button 
					className="shadow-sm"
					variant="light" 
					onClick={() => navigate(-1)}>
					<MdKeyboardDoubleArrowLeft /> Lousy API... Take me back!
				</Button>
			</div>
		</Container>
	)
}

export default ErrorAlert;
