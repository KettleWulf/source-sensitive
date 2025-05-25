import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router';
import type { PlanetsListItem } from '../../types/SWAPI-types/planets.types';


interface PlanetCardProps {
	planet: PlanetsListItem;
}

const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
	return (
	<Card>
		<Card.Body>
			<Card.Title>{planet.name}</Card.Title>
			<Card.Text>
				<strong>Climate:</strong> {planet.climate}
			</Card.Text>
			<Card.Text>
				<strong>Terrain:</strong> {planet.terrain}
			</Card.Text>
			<Card.Text>
				<strong>Diameter:</strong> {planet.diameter}
			</Card.Text>
			
			<Link to={`/planets/${planet.id}`}>
				<Button variant="primary">Read more</Button>
			</Link>
		</Card.Body>
    </Card>
  );
};

export default PlanetCard;