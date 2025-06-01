import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"

import * as StarshipsAPI from "../services/starships.api";
import type { Starship } from "../types/SWAPI-types/starships.types";

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


const StarshipDetailsPage = () => {
	const [starship, setStarship] = useState<Starship | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isNextStarship, setIsNextStarship] = useState(true);

	const { id } = useParams();
	const starshipId = Number(id);
	const navigate = useNavigate();

	const getStarship = async (id: number) => {
		setError(false);
		setIsLoading(true);

		try {
			const data = await StarshipsAPI.getStarship(id);
			setStarship(data);
			setIsLoading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
			setIsLoading(false);
		}
	}

	const getNextStarship = async (id: number) => {
		
		try {
			await StarshipsAPI.getStarship(id + 1);
			setIsNextStarship(true);
		} catch {
			setIsNextStarship(false);
		}
	}

	useEffect(() => {
		getStarship(starshipId);
		getNextStarship(starshipId);
	}, [starshipId])

	if (isLoading && !starship) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}

	return (
		<>
			{isLoading && <BB8Spinner />}

			{starship && (
				<Container className="my-5">
					<Row className="justify-content-center">
						<Col md={8}>
							<Card className="card-glass-static shadow-lightsaber-theme-sensitive">
								<Row className="g-0">
									<Col md={4}>
										<Card.Img
											src={getFallbackImage(starship.name, "Starships")}
											alt={starship.name}
											onError={(e) => {
												(e.target as HTMLImageElement).src = '/images/uknown.png';
											}}
											style={{ height: "100%", objectFit: "cover" }}
										/>
									</Col>
									<Col md={8}>
										<Card.Body className="mb-5">
											<Card.Title as="h1" className="starwars-font">{starship.name}</Card.Title>
											<ListGroup variant="flush" className="mt-3">
												<ListGroup.Item className="transparent"><strong>Model:</strong> {starship.model}</ListGroup.Item>
												<ListGroup.Item className="transparent"><strong>Class:</strong> {starship.starship_class}</ListGroup.Item>
												<ListGroup.Item className="transparent"><strong>Cost:</strong> {starship.cost_in_credits}</ListGroup.Item>
												<ListGroup.Item className="transparent"><strong>Cargo Capacity:</strong> {starship.cargo_capacity}</ListGroup.Item>
												<ListGroup.Item className="transparent"><strong>Max Atmosphering Speed:</strong> {starship.max_atmosphering_speed}</ListGroup.Item>
												<ListGroup.Item className="transparent"><strong>Manufacturer:</strong> {starship.manufacturer}</ListGroup.Item>
											</ListGroup>
											<Accordion className="mt-4">
												<ResourceAccordion title="Films" items={starship.films} basePath="films" eventKey="0" />
												<ResourceAccordion title="Pilots" items={starship.pilots} basePath="people" eventKey="1" />
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
								hasNextPage={isNextStarship}
								hasPreviousPage={starshipId > 1}
								onNextPage={() => navigate(`/starships/${starshipId + 1}`)}
								onPreviousPage={() => navigate(`/starships/${starshipId - 1}`)}
								/>
						</Col>
					</Row>
				</Container>
			)}
		</>
	)}

export default StarshipDetailsPage