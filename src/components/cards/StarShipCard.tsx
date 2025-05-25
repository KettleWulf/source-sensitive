import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router';
import type { StarshipsListItem } from '../../types/SWAPI-types/starships.types';


interface StarhipCardProps {
	starship: StarshipsListItem;
}

const StarshipCard: React.FC<StarhipCardProps> = ({ starship }) => {
	return (
	<Card>
		<Card.Body>
			<Card.Title>{starship.name}</Card.Title>
			<Card.Text>
				<strong>Manufacturer:</strong> {starship.manufacturer}
			</Card.Text>
			<Card.Text>
				<strong>Model:</strong> {starship.model}
			</Card.Text>
			<Card.Text>
				<strong>Starship Class:</strong> {starship.starship_class}
			</Card.Text>
			
			<Link to={`/starships/${starship.id}`}>
				<Button variant="primary">Read more</Button>
			</Link>
		</Card.Body>
    </Card>
  );
};

export default StarshipCard;