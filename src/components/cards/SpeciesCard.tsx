import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router';
import type { SpeciesListItem } from '../../types/SWAPI-types/species.types';
import { getFallbackImage } from '../../utils/getFallbackImage';

interface SpeciesCardProps {
	species: SpeciesListItem;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({ species }) => {
	return (
		<Link to={`/species/${species.id}`} className="text-decoration-none text-dark">
			<Card className="shadow-lightsaber-theme-sensitive-hover hover-grow-effect h-100">
				<Card.Img
					className="image-ratio"
					variant="top"
					src={getFallbackImage(species.name, "Species")}
					alt={species.name}
					onError={(e) => {
						(e.target as HTMLImageElement).src = '/images/unknown.png';
					}}
				/>

				<Card.Body className="card-body-relative d-flex flex-column">
					<Card.Title className="starwars-font card-title-clamp mb-2 fs-4">{species.name}</Card.Title>
					<Card.Text className="mb-1">
						<strong>Language:</strong> {species.language}
					</Card.Text>
					<Card.Text className="mb-1">
						<strong>Designation:</strong> {species.designation}
					</Card.Text>
					<Card.Text className="mb-5">
						<strong>Classification:</strong> {species.classification}
					</Card.Text>

					<div className="card-button-bottom-right mt-3">
						<Button variant="light" size="sm">Read More</Button>
					</div>
				</Card.Body>
			</Card>
		</Link>
	);
};

export default SpeciesCard;