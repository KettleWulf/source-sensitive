import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import type { FilmListItem } from '../../types/SWAPI-types/films.types';
import { Link } from 'react-router';


interface FilmCardProps {
	film: FilmListItem;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
	return (
	<Card>
		<Card.Img variant="top" src={film.image_url} alt={film.title} />
		<Card.Body>
			<Card.Title>{film.title}</Card.Title>
			<Card.Subtitle className="mb-2 text-muted">
				Episode {film.episode_id}
			</Card.Subtitle>
			<Card.Text>
				<strong>Released:</strong> {film.release_date}
			</Card.Text>
			<Link to={`/films/${film.id}`}>
				<Button variant="primary">Read more</Button>
			</Link>
		</Card.Body>
    </Card>
  );
};

export default FilmCard;