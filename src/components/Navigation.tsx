import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router";
import { useTheme } from "../hooks/useTheme";
import { FaEmpire } from "react-icons/fa";
import { FaGalacticRepublic } from "react-icons/fa";


const Navigation = () => {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<Navbar 
			className={`navbar-metal text-shadow-mode-${isDarkMode ? "dark" : "light"}`} 
			expand="lg">
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
							className="round-icon-button ms-5 fs-2"
							aria-label="toggle theme"
							title={isDarkMode ? "Let the Light guide you" : "Join the Dark Side"} 
							onClick={toggleTheme}>
								{isDarkMode ? <FaEmpire className="icon-shadow-mode-dark"/> : <FaGalacticRepublic className="icon-shadow-mode-light"/>}
						</button>
					</Nav>

				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation;