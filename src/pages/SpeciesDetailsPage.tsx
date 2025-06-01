import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"

import * as SpeciesAPI from "../services/species.api";
import type { Species } from "../types/SWAPI-types/species.types";

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



const SpeciesDetailsPage = () => {
	const [species, setSpecies] = useState<Species | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isNextSpecies, setIsNextSpecies] = useState(true);

	const { id } = useParams();
	const speciesId = Number(id);
	const navigate = useNavigate();

	const getSpecies = async (id: number) => {
		setSpecies(null);
		setError(false);
		setIsLoading(true);

		try {
			const data = await SpeciesAPI.getSingleSpecies(id);
			setSpecies(data);
			setIsLoading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
			setIsLoading(false);
		}
	}

	const getNextSpecies = async (id: number) => {
		
		try {
			await SpeciesAPI.getSingleSpecies(id + 1);
			setIsNextSpecies(true);
		} catch {
			setIsNextSpecies(false);
		}
	}

	useEffect(() => {
		getSpecies(speciesId)
		getNextSpecies(speciesId)
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
					<Card className="shadow-lightsaber-theme-sensitive">
						<Row className="g-0">
							<Col md={4}>
								<Card.Img
									src={getFallbackImage(species.name, "Species")}
									alt={species.name}
									onError={(e) => {
										(e.target as HTMLImageElement).src = '/images/uknown.png';
									}}
									style={{ height: "100%", objectFit: "cover" }}
								/>
							</Col>
							<Col md={8}>
								<Card.Body className="mb-5">
									<Card.Title as="h1" className="starwars-font">{species.name}</Card.Title>
									<ListGroup variant="flush" className="mt-3">
										<ListGroup.Item><strong>Homeworld:</strong> {species.homeworld ? species.homeworld.name : 'Unspecified'}</ListGroup.Item>
										<ListGroup.Item><strong>Language:</strong> {species.language}</ListGroup.Item>
										<ListGroup.Item><strong>Designation:</strong> {species.designation}</ListGroup.Item>
										<ListGroup.Item><strong>Classification:</strong> {species.classification}</ListGroup.Item>
										<ListGroup.Item><strong>Average Life Span:</strong> {species.average_lifespan}</ListGroup.Item>
										<ListGroup.Item><strong>Average Height:</strong> {species.average_height}</ListGroup.Item>
									</ListGroup>
									<Accordion className="mt-4">
										<ResourceAccordion title="Films" items={species.films} basePath="films" eventKey="0" />
										<ResourceAccordion title="People" items={species.people} basePath="people" eventKey="1" />
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
								hasNextPage={isNextSpecies}
								hasPreviousPage={speciesId > 1}
								onNextPage={() => navigate(`/species/${speciesId + 1}`)}
								onPreviousPage={() => navigate(`/species/${speciesId - 1}`)}
								/>
				</Col>
			</Row>
		</Container>
	)
}

export default SpeciesDetailsPage