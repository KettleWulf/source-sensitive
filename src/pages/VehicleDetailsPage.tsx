import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"

import * as VehiclesAPI from "../services/vehicles.api";
import type { Vehicle } from "../types/SWAPI-types/vehicles.types";

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
import BB8Spinner from "../components/spinners/BB8Spinner";


const VehicleDetailsPage = () => {
	const [vehicle, setVehicle] = useState<Vehicle | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isNextVehicle, setIsNextVehicle] = useState(true);

	const { id } = useParams();
	const vehicleId = Number(id);
	const navigate = useNavigate();

	const getVehicle = async (id: number) => {
		setError(false);
		setIsLoading(true);

		try {
			const data = await VehiclesAPI.getVehicle(id);
			setVehicle(data);
			setIsLoading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
			setIsLoading(false);
		}
	}

	const getNextVehicle = async (id: number) => {
		
		try {
			await VehiclesAPI.getVehicle(id + 1);
			setIsNextVehicle(true);
		} catch {
			setIsNextVehicle(false);
		}
	}

	useEffect(() => {
		getVehicle(vehicleId);
		getNextVehicle(vehicleId);
	}, [vehicleId])

	if (isLoading && !vehicle) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}

	return (
		<>
			{isLoading && <BB8Spinner />}

			{vehicle && (
				<Container className="my-5">
					<Row className="justify-content-center">
						<Col md={8}>
							<Card className="card-glass-static shadow-lightsaber-theme-sensitive">
								<Row className="g-0">
									<Col md={4}>
										<Card.Img
											src={getFallbackImage(vehicle.name, "Vehicles")}
											alt={vehicle.name}
											onError={(e) => {
												(e.target as HTMLImageElement).src = '/images/uknown.png';
											}}
											style={{ height: "100%", objectFit: "cover" }}
										/>
									</Col>
									<Col md={8}>
										<Card.Body className="mb-5">
											<Card.Title as="h1" className="starwars-font">{vehicle.name}</Card.Title>
											<ListGroup variant="flush" className="mt-3">
												<ListGroup.Item className="transparent"><strong>Model:</strong> {vehicle.model}</ListGroup.Item>
												<ListGroup.Item className="transparent"><strong>Class:</strong> {vehicle.vehicle_class}</ListGroup.Item>
												<ListGroup.Item className="transparent"><strong>Cost:</strong> {vehicle.cost_in_credits}</ListGroup.Item>
												<ListGroup.Item className="transparent"><strong>Cargo Capacity:</strong> {vehicle.cargo_capacity}</ListGroup.Item>
												<ListGroup.Item className="transparent"><strong>Max Atmosphering Speed:</strong> {vehicle.max_atmosphering_speed}</ListGroup.Item>
												<ListGroup.Item className="transparent"><strong>Manufacturer:</strong> {vehicle.manufacturer}</ListGroup.Item>
											</ListGroup>
											<Accordion className="mt-4">
												<ResourceAccordion title="Films" items={vehicle.films} basePath="films" eventKey="0" />
												<ResourceAccordion title="Pilots" items={vehicle.pilots} basePath="people" eventKey="1" />
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
								hasNextPage={isNextVehicle}
								hasPreviousPage={vehicleId > 1}
								onNextPage={() => navigate(`/vehicles/${vehicleId + 1}`)}
								onPreviousPage={() => navigate(`/vehicles/${vehicleId - 1}`)}
								/>
						</Col>
					</Row>
				</Container>
			)}
		</>
	)}

export default VehicleDetailsPage