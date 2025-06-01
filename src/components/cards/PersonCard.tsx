import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router';
import type { PeopleListItem } from '../../types/SWAPI-types/people.types';
import { getFallbackImage } from '../../utils/getFallbackImage';



interface PersonCardProps {
	person: PeopleListItem;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
	return (
	<Link to={`/people/${person.id}`} className="text-decoration-none text-dark">
		<Card className="shadow-lightsaber-theme-sensitive-hover hover-grow-effect h-100">

			<Card.Img
				className="image-ratio"
				variant="top"
				src={person.image_url || getFallbackImage(person.name, "People")}
				alt={person.name}
				onError={(e) => {
						(e.target as HTMLImageElement).src = '/images/unknown.png';
					}}
				/>

			<Card.Body className="card-body-relative d-flex flex-column">
				<Card.Title className="starwars-font card-title-clamp mb-2 fs-4">{person.name}</Card.Title>
				<Card.Text className="mb-1">
					<strong>Homeworld:</strong> {person.homeworld.name}
				</Card.Text>
				<Card.Text className="mb-1">
					<strong>Birthyear:</strong> {person.birth_year}
				</Card.Text>
				<Card.Text className="mb-1">
					<strong>Height:</strong> {person.height} cm
				</Card.Text>
				<Card.Text className="mb-5">
					<strong>Appearances: </strong>{person.films_count}
				</Card.Text>
				
				<div className="card-button-bottom-right mt-3">
					<Button variant="light" size="sm">Read More</Button>
				</div>

			</Card.Body>
		</Card>
	</Link>
  );
};

export default PersonCard;