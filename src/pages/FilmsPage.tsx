import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router"
import type { FilmListItem } from "../types/SWAPI-types/films.types";
import * as FilmsAPI from "../services/films.api";
import LoadingSpinner from "../components/LoadingSpinner";
import { Card, Row, Col } from 'react-bootstrap';
import ErrorAlert from "../components/ErrorAlert";


const FilmsPage = () => {
	const [films, setFilms] = useState<FilmListItem[] | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);

	const getFilms = async () => {
		setFilms(null);
		setError(false);
		setIsloading(true);

		try {
			const data = await FilmsAPI.getFilms();
			setFilms(data.data);
			setIsloading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
			setIsloading(false);
		}

	}

	useEffect(() => {
		getFilms()
	}, [])

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}
	

	return (
		<div className="container">
		<h1>Films</h1>
		<Row xs={1} sm={2} md={3} className="g-4">
			{films && films.map((film) => (
				<Col key={film.id}>
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
					</Card.Body>
				</Card>
		</Col>
	))}
	</Row>
	</div>
	)
}

export default FilmsPage
