import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router";
import { useTheme } from "../hooks/useTheme";
import { FaEmpire } from "react-icons/fa";
import { FaJedi } from "react-icons/fa";

const Navigation = () => {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<Navbar 
			className={`navbar-metal text-shadow-mode-${isDarkMode ? "dark" : "light"}`} 
			expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/" className="home-link starwars-font fs-3">Source &bull; Sensitive</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} to="/films">Films</Nav.Link>
						<Nav.Link as={NavLink} to="/people">People</Nav.Link>
						<Nav.Link as={NavLink} to="/planets">Planets</Nav.Link>
						<Nav.Link as={NavLink} to="/species">Species</Nav.Link>
						<Nav.Link as={NavLink} to="/starships">Starships</Nav.Link>
						<Nav.Link as={NavLink} to="/vehicles">Vehicles</Nav.Link>
						<button 
							className="hidden-background ms-5"
							aria-label="toggle theme"
							title={isDarkMode ? "Let the light guide you" : "Join the Dark Side"} 
							onClick={toggleTheme}>
								{isDarkMode ? <FaEmpire /> : <FaJedi />}
						</button>
					</Nav>

				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation;