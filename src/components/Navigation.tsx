// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router";

interface NavigationProps {
	onNavigate: (destination: string) => void
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {

	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">A New Wiki</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/films" onClick={() => onNavigate("films")}>Films</Nav.Link>
						<Nav.Link as={NavLink} end to="/people" onClick={() => onNavigate("people")}>People</Nav.Link>
						<Nav.Link as={NavLink} end to="/planets" onClick={() => onNavigate("planets")}>Planets</Nav.Link>
						<Nav.Link as={NavLink} end to="/species" onClick={() => onNavigate("species")}>Species</Nav.Link>
						<Nav.Link as={NavLink} end to="/starships" onClick={() => onNavigate("starships")}>Starships</Nav.Link>
						<Nav.Link as={NavLink} end to="/vehicles" onClick={() => onNavigate("vehicles")}>Vehicles</Nav.Link>
					</Nav>

				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation;