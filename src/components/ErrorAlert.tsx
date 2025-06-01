import { Button, Container } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router";

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
