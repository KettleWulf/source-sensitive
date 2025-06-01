import { useNavigate, useParams } from "react-router"
import * as PeopleAPI from "../services/people.api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/spinners/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { Container, Row, Col, Card, ListGroup, Accordion, Button } from "react-bootstrap";
import ResourceAccordion from "../components/ResourceAccordion";
import type { Person } from "../types/SWAPI-types/people.types";
import { getFallbackImage } from "../utils/getFallbackImage";
import { joinStringArray } from "../utils/joinStringArray";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import DetailsPagination from "../components/paginations/DetailsPagination";


const PersonDetailsPage = () => {
	const [person, setPerson] = useState<Person | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);
	const [isNextPerson, setIsNextPerson] = useState(true);

	const navigate = useNavigate()

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

	const getNextPerson = async (id: number) => {
		
		try {
			await PeopleAPI.getPerson(id + 1);
			setIsNextPerson(true);
		} catch {
			setIsNextPerson(false);
		}
	}
	
	useEffect(() => {
		getPerson(personId)
		getNextPerson(personId)
	}, [personId]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}

	return (
		person && (
				<Container className="my-5">
					<Row className="justify-content-center">
						<Col md={8}>
							<Card 
								className="shadow-lightsaber-theme-sensitive">
								<Row className="g-0">
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
											<ListGroup.Item><strong>Affiliations:</strong> {joinStringArray(person.affiliations)}</ListGroup.Item>
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
									
										<Button variant="light" onClick={() => navigate(-1)}>
										<MdKeyboardDoubleArrowLeft />Back
										</Button>
									
								</div>
							</Card>
							<DetailsPagination
								hasNextPage={isNextPerson}
								hasPreviousPage={personId > 1}
								onNextPage={() => navigate(`/people/${personId - 1}`)}
								onPreviousPage={() => navigate(`/people/${personId - 1}`)}
								/>
						</Col>
					</Row>
				</Container>

	)
)}

export default PersonDetailsPage