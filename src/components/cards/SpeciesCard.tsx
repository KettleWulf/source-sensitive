import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router';
import type { SpeciesListItem } from '../../types/SWAPI-types/species.types';


interface SpeciesCardProps {
	species: SpeciesListItem;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({ species }) => {
	return (
	<Card>
		<Card.Body>
			<Card.Title>{species.name}</Card.Title>
			<Card.Text>
				<strong>Language:</strong> {species.language}
			</Card.Text>
			<Card.Text>
				<strong>Designation:</strong> {species.designation}
			</Card.Text>
			<Card.Text>
				<strong>Classification:</strong> {species.classification}
			</Card.Text>
			
			<Link to={`/species/${species.id}`}>
				<Button variant="primary">Read more</Button>
			</Link>
		</Card.Body>
    </Card>
  );
};

export default SpeciesCard;