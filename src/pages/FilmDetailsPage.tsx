import { useParams } from "react-router"
import * as FilmsAPI from "../services/films.api";
import { useEffect, useState } from "react";
import type { Film } from "../types/SWAPI-types/films.types";
import LoadingSpinner from "../components/spinners/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { Container, Row, Col, Card, ListGroup, Accordion } from "react-bootstrap";
import ResourceAccordion from "../components/ResourceAccordion";


const FilmDetailsPage = () => {
	const [film, setFilm] = useState<Film | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);



	const { id } = useParams();
	const filmId = Number(id);


	const getFilm = async (id: number) => {
			setFilm(null);
			setError(false);
			setIsloading(true);
	
			try {
				const data = await FilmsAPI.getSingleFilm(id);
				setFilm(data);
				setIsloading(false);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Can't even get a proper error...");
				setIsloading(false);
			}
	
		}
	
	useEffect(() => {
		getFilm(filmId)
	}, [filmId])

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}

	return (
		film && <Container className="my-5">
			<Row className="justify-content-center">
				<Col md={8}>
					<Card>
						<Card.Img variant="top" src={film.image_url} alt={film.title} />
						<Card.Body>
							<Card.Title as="h1">{film.title}</Card.Title>
							<Card.Subtitle className="mb-3 text-muted">
							Episode {film.episode_id}
							</Card.Subtitle>

							<Card.Text>
							<strong>Opening crawl:</strong><br />
							<em>{film.opening_crawl}</em>
							</Card.Text>

							<ListGroup variant="flush" className="mt-3">
							<ListGroup.Item>
								<strong>Director:</strong> {film.director}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Producer:</strong> {film.producer}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Release date:</strong> {film.release_date}
							</ListGroup.Item>
							</ListGroup>

							<Accordion className="mt-4">
								<ResourceAccordion
									title="Characters"
									items={film.characters}
									basePath="people"
									eventKey="0"
								/>
								<ResourceAccordion
									title="Planets"
									items={film.planets}
									basePath="planets"
									eventKey="1"
								/>
								<ResourceAccordion
									title="Species"
									items={film.species}
									basePath="species"
									eventKey="2"
								/>
								<ResourceAccordion
									title="Starships"
									items={film.starships}
									basePath="starships"
									eventKey="3"
								/>
								<ResourceAccordion
									title="Vehicles"
									items={film.vehicles}
									basePath="vehicles"
									eventKey="4"
								/>
							</Accordion>

						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default FilmDetailsPage