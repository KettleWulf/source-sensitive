import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router';
import type { FilmsListItem } from '../../types/SWAPI-types/films.types';
import { getFallbackImage } from '../../utils/getFallbackImage';

interface FilmCardProps {
	film: FilmsListItem;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
	return (
		<Link to={`/films/${film.id}`} className="text-decoration-none text-dark">
			<Card className="shadow-lightsaber-theme-sensitive-hover hover-grow-effect h-100">
				<Card.Img
					// className="image-ratio"
					variant="top"
					src={film.image_url || getFallbackImage(film.title, "Films")}
					alt={film.title}
					onError={(e) => {
						(e.target as HTMLImageElement).src = '/images/unknown.png';
					}}
				/>

				<Card.Body className="card-body-relative d-flex flex-column">
					<Card.Title className="starwars-font card-title-clamp mb-2 fs-4">{film.title}</Card.Title>
					<Card.Text className="mb-1">
						<strong>Episode:</strong> {film.episode_id}
					</Card.Text>
					<Card.Text className="mb-5">
						<strong>Release Date:</strong> {film.release_date}
					</Card.Text>

					<div className="card-button-bottom-right mt-3">
						<Button variant="light" size="sm">Read More</Button>
					</div>
				</Card.Body>
			</Card>
		</Link>
	);
};

export default FilmCard;