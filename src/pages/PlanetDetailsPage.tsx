import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"

import * as PlanetsAPI from "../services/planets.api";
import type { Planet } from "../types/SWAPI-types/planets.types";

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


const PlanetDetailsPage = () => {
	const [planet, setPlanet] = useState<Planet | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isNextPlanet, setIsNextPlanet] = useState(true);

	const { id } = useParams();
	const planetId = Number(id);
	const navigate = useNavigate();

	const getPlanet = async (id: number) => {
		setError(false);
		setIsLoading(true);

		try {
			const data = await PlanetsAPI.getPlanet(id);
			setPlanet(data);
			setIsLoading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
			setIsLoading(false);
		}
	}

	const getNextPlanet = async (id: number) => {
		
		try {
			await PlanetsAPI.getPlanet(id + 1);
			setIsNextPlanet(true);
		} catch {
			setIsNextPlanet(false);
		}
	}

	useEffect(() => {
		getPlanet(planetId);
		getNextPlanet(planetId);
	}, [planetId])

	if (isLoading && !planet) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}

	return (
		<>
			{isLoading && <BB8Spinner />}

			{planet && (
				<Container className="my-5">
					<Row className="justify-content-center">
						<Col md={8}>
							<Card className="shadow-lightsaber-theme-sensitive">
								<Row className="g-0">
									<Col md={4}>
										<Card.Img
											src={getFallbackImage(planet.name, "Planets")}
											alt={planet.name}
											onError={(e) => {
												(e.target as HTMLImageElement).src = '/images/uknown.png';
											}}
											style={{ height: "100%", objectFit: "cover" }}
										/>
									</Col>
									<Col md={8}>
										<Card.Body className="mb-5">
											<Card.Title as="h1" className="starwars-font">{planet.name}</Card.Title>
											<ListGroup variant="flush" className="mt-3">
												<ListGroup.Item><strong>Climate:</strong> {planet.climate}</ListGroup.Item>
												<ListGroup.Item><strong>Terrain:</strong> {planet.terrain}</ListGroup.Item>
												<ListGroup.Item><strong>Diameter:</strong> {planet.diameter}</ListGroup.Item>
												<ListGroup.Item><strong>Gravity:</strong> {planet.gravity}</ListGroup.Item>
												<ListGroup.Item><strong>Orbital Period:</strong> {planet.orbital_period}</ListGroup.Item>
												<ListGroup.Item><strong>Rotation Period:</strong> {planet.rotation_period}</ListGroup.Item>
											</ListGroup>
											<Accordion className="mt-4">
												<ResourceAccordion title="Films" items={planet.films} basePath="films" eventKey="0" />
												<ResourceAccordion title="Residents" items={planet.residents} basePath="people" eventKey="1" />
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
								hasNextPage={isNextPlanet}
								hasPreviousPage={planetId > 1}
								onNextPage={() => navigate(`/planets/${planetId + 1}`)}
								onPreviousPage={() => navigate(`/planets/${planetId - 1}`)}
								/>
						</Col>
					</Row>
				</Container>
			)}
		</>
	)}

export default PlanetDetailsPage