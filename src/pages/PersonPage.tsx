import { Link, useParams } from "react-router"
import * as PeopleAPI from "../services/people.api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { Container, Row, Col, Card, ListGroup, Accordion, Button } from "react-bootstrap";
import ResourceAccordion from "../components/ResourceAccordion";
import type { Person } from "../types/SWAPI-types/people.types";
import { getFallbackImage } from "../utils/getFallbackImage";


const PersonPage = () => {
	const [person, setPerson] = useState<Person | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);

	const { id } = useParams();
	const personId = Number(id);


	const getPerson = async (id: number) => {
			setPerson(null);
			setError(false);
			setIsloading(true);
	
			try {
				const data = await PeopleAPI.getPerson(id);
				setPerson(data);
				setIsloading(false);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Can't even get a proper error...");
				setIsloading(false);
			}
	
		}
	
	useEffect(() => {
		getPerson(personId)
	}, [personId])

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}

	return (
		person && (
			// <Link to={`/people`} className="text-decoration-none text-dark">
				<Container className="my-5">
					<Row className="justify-content-center">
						<Col md={8}>
							<Card className="shadow">
								<Row className="g-0"> {/* g-0 för att ta bort extra gutters mellan kolumner */}
								<Col md={4}>
									<Card.Img 
									src={person.image_url || getFallbackImage(person.name, "People")} 
									alt={person.name}
									style={{ height: "100%", objectFit: "cover" }}
									/>
								</Col>
								<Col md={8}>
									<Card.Body>
										<Card.Title as="h1" className="starwars-font">{person.name}</Card.Title>

										<ListGroup variant="flush" className="mt-3">
											<ListGroup.Item><strong>Birth Year:</strong> {person.birth_year}</ListGroup.Item>
											<ListGroup.Item><strong>Home World:</strong> {person.homeworld.name}</ListGroup.Item>
											<ListGroup.Item><strong>Eye Color:</strong> {person.eye_color}</ListGroup.Item>
											<ListGroup.Item><strong>Hair Color:</strong> {person.hair_color}</ListGroup.Item>
											<ListGroup.Item><strong>Height:</strong> {person.height}</ListGroup.Item>
											<ListGroup.Item><strong>Mass:</strong> {person.mass}</ListGroup.Item>
										</ListGroup>

										<Accordion className="mt-4 mb-5">
											<ResourceAccordion title="Films" items={person.films} basePath="films" eventKey="0" />
											<ResourceAccordion title="Species" items={person.species} basePath="species" eventKey="1" />
											<ResourceAccordion title="Starships" items={person.starships} basePath="starships" eventKey="2" />
											<ResourceAccordion title="Vehicles" items={person.vehicles} basePath="vehicles" eventKey="3" />
										</Accordion>
									</Card.Body>
								</Col>
								</Row>
									<div className="card-button-bottom-right mt-3">
										<Link to={`/people`}>
											<Button variant="light">Back</Button>
										</Link>
									</div>
								</Card>
						</Col>
					</Row>

				</Container>
			// </Link>
	)
)}

export default PersonPage