import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router';
import type { PeopleListItem } from '../../types/SWAPI-types/people.types';


interface PersonCardProps {
	person: PeopleListItem;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
	return (
	<Card>
		<Card.Body>
			<Card.Title>{person.name}</Card.Title>
			<Card.Text>
				<strong>Homeworld:</strong> {person.homeworld.name}
			</Card.Text>
			<Card.Text>
				<strong>Birthyear:</strong> {person.birth_year}
			</Card.Text>
			<Card.Text>
				<strong>Birthyear:</strong> {person.height}
			</Card.Text>
			<Card.Text>
				<strong>Birthyear:</strong> {person.birth_year}
			</Card.Text>
			<Card.Text>
				<strong>Appearances: </strong>{person.films_count}
			</Card.Text>
			<Link to={`/people/${person.id}`}>
				<Button variant="primary">Read more</Button>
			</Link>
		</Card.Body>
    </Card>
  );
};

export default PersonCard;