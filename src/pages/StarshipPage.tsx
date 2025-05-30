import { useParams } from "react-router"
import * as StarshipAPI from "../services/starships.api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/spinners/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { Container, Row, Col, Card, ListGroup, Accordion } from "react-bootstrap";
import ResourceAccordion from "../components/ResourceAccordion";
import type { Starship } from "../types/SWAPI-types/starships.types";


const StarshipPage = () => {
	const [starship, setStarship] = useState<Starship | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);

	const { id } = useParams();
	const starshipId = Number(id);


	const getStarship = async (id: number) => {
			setStarship(null);
			setError(false);
			setIsloading(true);
	
			try {
				const data = await StarshipAPI.getStarship(id);
				setStarship(data);
				setIsloading(false);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Can't even get a proper error...");
				setIsloading(false);
			}
	
		}
	
	useEffect(() => {
		getStarship(starshipId)
	}, [starshipId])

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}

	return (
		starship && <Container className="my-5">
			<Row className="justify-content-center">
				<Col md={8}>
					<Card>

						<Card.Body>
							<Card.Title as="h1">{starship.name}</Card.Title>

							<ListGroup variant="flush" className="mt-3">
							<ListGroup.Item>
								<strong>Manufacturer:</strong> {starship.manufacturer}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Model:</strong> {starship.model}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Class:</strong> {starship.starship_class}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Cost:</strong> {starship.cost_in_credits}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Cargo Capacity:</strong> {starship.cargo_capacity}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Max Atmosphering Speed:</strong> {starship.max_atmosphering_speed}
							</ListGroup.Item>
							</ListGroup>

							<Accordion className="mt-4">
								<ResourceAccordion
									title="Films"
									items={starship.films}
									basePath="films"
									eventKey="0"
								/>
								<ResourceAccordion
									title="Pilots"
									items={starship.pilots}
									basePath="pilots"
									eventKey="1"
								/>

							</Accordion>

						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default StarshipPage