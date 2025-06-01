import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router';
import type { StarshipsListItem } from '../../types/SWAPI-types/starships.types';
import { getFallbackImage } from '../../utils/getFallbackImage';

interface StarshipCardProps {
	starship: StarshipsListItem;
}

const StarshipCard: React.FC<StarshipCardProps> = ({ starship }) => {
	return (
		<Link to={`/starships/${starship.id}`} className="text-decoration-none text-dark">
			<Card className="card-glass shadow-lightsaber-theme-sensitive-hover hover-grow-effect h-100">
				<Card.Img
					className="image-ratio"
					variant="top"
					src={getFallbackImage(starship.name, "Starships")}
					alt={starship.name}
					onError={(e) => {
						(e.target as HTMLImageElement).src = '/images/unknown.png';
					}}
				/>

				<Card.Body className="card-body-relative d-flex flex-column">
					<Card.Title className="starwars-font card-title-clamp mb-2 fs-4">{starship.name}</Card.Title>
					<Card.Text className="mb-1">
						<strong>Model:</strong> {starship.model}
					</Card.Text>
					<Card.Text className="mb-1">
						<strong>Class:</strong> {starship.starship_class}
					</Card.Text>
					<Card.Text className="mb-5">
						<strong>Manufacturer:</strong> {starship.manufacturer}
					</Card.Text>

					<div className="card-button-bottom-right mt-3">
						<Button variant="light" size="sm">Read More</Button>
					</div>
				</Card.Body>
			</Card>
		</Link>
	);
};

export default StarshipCard;