import { useParams } from "react-router"
import * as SpeciesAPI from "../services/species.api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/spinners/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { Container, Row, Col, Card, ListGroup, Accordion } from "react-bootstrap";
import ResourceAccordion from "../components/ResourceAccordion";
import type { Species } from "../types/SWAPI-types/species.types";


const SingleSpeciesPage = () => {
	const [species, setSpecies] = useState<Species | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);

	const { id } = useParams();
	const speciesId = Number(id);


	const getSpecies = async (id: number) => {
			setSpecies(null);
			setError(false);
			setIsloading(true);
	
			try {
				const data = await SpeciesAPI.getSingleSpecies(id);
				console.log("Species:", data);
				setSpecies(data);
				setIsloading(false);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Can't even get a proper error...");
				setIsloading(false);
			}
	
		}
	
	useEffect(() => {
		getSpecies(speciesId)
	}, [speciesId])

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}

	return (
		species && <Container className="my-5">
			<Row className="justify-content-center">
				<Col md={8}>
					<Card>

						<Card.Body>
							<Card.Title as="h1">{species.name}</Card.Title>

							<ListGroup variant="flush" className="mt-3">
							<ListGroup.Item>
								<strong>Homeworld:</strong> {species.homeworld ? species.homeworld.name : 'Unspecified'}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Language:</strong> {species.language}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Designation:</strong> {species.designation}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Classification:</strong> {species.classification}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Average Life Span:</strong> {species.average_lifespan}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Average Height:</strong> {species.average_height}
							</ListGroup.Item>
							</ListGroup>

							<Accordion className="mt-4">
								<ResourceAccordion
									title="Films"
									items={species.films}
									basePath="films"
									eventKey="0"
								/>
								<ResourceAccordion
									title="People"
									items={species.people}
									basePath="people"
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

export default SingleSpeciesPage