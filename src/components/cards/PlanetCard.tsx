import { Link } from 'react-router';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import type { PlanetsListItem } from '../../types/SWAPI-types/planets.types';

import { getFallbackImage } from '../../utils/getFallbackImage';


interface PlanetCardProps {
	planet: PlanetsListItem;
}


const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
	return (
		<Link to={`/planets/${planet.id}`} className="text-decoration-none text-dark">
			<Card className="card-glass shadow-lightsaber-theme-sensitive-hover hover-grow-effect h-100">
				<Card.Img
					className="image-ratio"
					variant="top"
					src={getFallbackImage(planet.name, "Planets")}
					alt={planet.name}
					onError={(e) => {
						(e.target as HTMLImageElement).src = '/images/unknown.png';
					}}
				/>

				<Card.Body className="card-body-relative d-flex flex-column">
					<Card.Title className="starwars-font card-title-clamp mb-2 fs-4">{planet.name}</Card.Title>
					<Card.Text className="mb-1">
						<strong>Climate:</strong> {planet.climate}
					</Card.Text>
					<Card.Text className="mb-1">
						<strong>Terrain:</strong> {planet.terrain}
					</Card.Text>
					<Card.Text className="mb-5">
						<strong>Diameter:</strong> {planet.diameter}
					</Card.Text>

					<div className="card-button-bottom-right mt-3">
						<Button variant="light" size="sm">Read More</Button>
					</div>
				</Card.Body>
			</Card>
		</Link>
	);
};

export default PlanetCard;