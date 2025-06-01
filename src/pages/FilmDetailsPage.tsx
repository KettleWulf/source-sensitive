import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import * as FilmsAPI from "../services/films.api";
import type { Film } from "../types/SWAPI-types/films.types";

import BB8Spinner from "../components/spinners/BB8Spinner";
import DetailsPagination from "../components/paginations/DetailsPagination";
import ErrorAlert from "../components/ErrorAlert";
import LoadingSpinner from "../components/spinners/LoadingSpinner";
import ResourceAccordion from "../components/ResourceAccordion";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

import { getFallbackImage } from "../utils/getFallbackImage";


const FilmDetailsPage = () => {
	const [film, setFilm] = useState<Film | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isNextFilm, setIsNextFilm] = useState(true);

	const { id } = useParams();
	const filmId = Number(id);
	const navigate = useNavigate();

	const getFilm = async (id: number) => {
		setError(false);
		setIsLoading(true);

		try {
			const data = await FilmsAPI.getSingleFilm(id);
			setFilm(data);
			setIsLoading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
			setIsLoading(false);
		}
	}

		const getNextFilm = async (id: number) => {
			
			try {
				await FilmsAPI.getSingleFilm(id + 1);
				setIsNextFilm(true);
			} catch {
				setIsNextFilm(false);
			}
		}

	useEffect(() => {
		getFilm(filmId)
		getNextFilm(filmId)
	}, [filmId])

	if (isLoading && !film) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}

	return (
		<>
			{isLoading && <BB8Spinner />}

			{film && (
				<Container className="my-5">
					<Row className="justify-content-center">
						<Col md={8}>
							<Card className="card-glass-static shadow-lightsaber-theme-sensitive">
								<Row className="g-0">
									<Col md={4}>
										<Card.Img
											src={film.image_url || getFallbackImage(film.title, "Films")}
											alt={film.title}
											onError={(e) => {
												(e.target as HTMLImageElement).src = '/images/uknown.png';
											}}
											style={{ height: "100%", objectFit: "cover" }}
										/>
									</Col>
									<Col md={8}>
										<Card.Body className="mb-5">
											<Card.Title as="h1" className="starwars-font">{film.title}</Card.Title>
											<Card.Subtitle className="mb-3 text-muted">Episode {film.episode_id}</Card.Subtitle>
											<Card.Text>
												<strong>Opening crawl:</strong><br />
												<em>{film.opening_crawl}</em>
											</Card.Text>
											<ListGroup variant="flush" className="mt-3">
												<ListGroup.Item className="transparent"><strong>Director:</strong> {film.director}</ListGroup.Item>
												<ListGroup.Item className="transparent"><strong>Producer:</strong> {film.producer}</ListGroup.Item>
												<ListGroup.Item className="transparent"><strong>Release date:</strong> {film.release_date}</ListGroup.Item>
											</ListGroup>
											<Accordion className="mt-4">
												<ResourceAccordion title="Characters" items={film.characters} basePath="people" eventKey="0" />
												<ResourceAccordion title="Planets" items={film.planets} basePath="planets" eventKey="1" />
												<ResourceAccordion title="Species" items={film.species} basePath="species" eventKey="2" />
												<ResourceAccordion title="Starships" items={film.starships} basePath="starships" eventKey="3" />
												<ResourceAccordion title="Vehicles" items={film.vehicles} basePath="vehicles" eventKey="4" />
											</Accordion>
										</Card.Body>
									</Col>
								</Row>
								<div className="card-button-bottom-right mt-3">
									<Button variant="light" onClick={() => navigate(-1)}>
										<MdKeyboardDoubleArrowLeft />Back
									</Button>
								</div>
							</Card>
							<DetailsPagination
								hasNextPage={isNextFilm}
								hasPreviousPage={filmId > 1}
								onNextPage={() => navigate(`/films/${filmId + 1}`)}
								onPreviousPage={() => navigate(`/films/${filmId - 1}`)}
								/>
						</Col>
					</Row>
				</Container>
			)}
		</>
)}

export default FilmDetailsPage