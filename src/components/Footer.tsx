import Container from "react-bootstrap/Container";
import { FaReact, FaGithub} from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="footer text-center pb-4">
			<div className="fancy-divider mb-5" />
			<Container fluid="md">
				<p className="mb-2">
					<FaReact className="me-2" />
					Made with React, caffeine & the Force
				</p>
				<p className="mb-2 text-muted small">
					Olle Wistedt, 2025
				</p>
				<a
					className="github-link"
					href="https://github.com/KettleWulf"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaGithub className="me-1" />
				</a>
			</Container>
		</footer>
	);
};

export default Footer;