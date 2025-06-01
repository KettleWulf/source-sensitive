import { useParams } from "react-router"
import * as PlanetsAPI from "../services/planets.api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/spinners/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { Container, Row, Col, Card, ListGroup, Accordion } from "react-bootstrap";
import ResourceAccordion from "../components/ResourceAccordion";
import type { Planet } from "../types/SWAPI-types/planets.types";


const PlanetDetailsPage = () => {
	const [planet, setPlanet] = useState<Planet | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);

	const { id } = useParams();
	const planetId = Number(id);


	const getPlanet = async (id: number) => {
			setPlanet(null);
			setError(false);
			setIsloading(true);
	
			try {
				const data = await PlanetsAPI.getPlanet(id);
				setPlanet(data);
				setIsloading(false);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Can't even get a proper error...");
				setIsloading(false);
			}
	
		}
	
	useEffect(() => {
		getPlanet(planetId)
	}, [planetId])

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}

	return (
		planet && <Container className="my-5">
			<Row className="justify-content-center">
				<Col md={8}>
					<Card>
						<Card.Body>
							<Card.Title as="h1">{planet.name}</Card.Title>

							<ListGroup variant="flush" className="mt-3">
							<ListGroup.Item>
								<strong>Climate:</strong> {planet.climate}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Terrain:</strong> {planet.terrain}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Diameter:</strong> {planet.diameter}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Gravity:</strong> {planet.gravity}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Orbital Period:</strong> {planet.orbital_period}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Rotation Period</strong> {planet.rotation_period}
							</ListGroup.Item>
							</ListGroup>

							<Accordion className="mt-4">
								<ResourceAccordion
									title="Films"
									items={planet.films}
									basePath="films"
									eventKey="0"
								/>
								<ResourceAccordion
									title="residents"
									items={planet.residents}
									basePath="residents"
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

export default PlanetDetailsPage