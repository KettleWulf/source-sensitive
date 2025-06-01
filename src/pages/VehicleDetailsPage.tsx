import { useParams } from "react-router"
import * as VehiclesAPI from "../services/vehicles.api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/spinners/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { Container, Row, Col, Card, ListGroup, Accordion } from "react-bootstrap";
import ResourceAccordion from "../components/ResourceAccordion";
import type { Vehicle } from "../types/SWAPI-types/vehicles.types";


const VehicleDetailsPage = () => {
	const [vehicle, setVehicle] = useState<Vehicle | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);

	const { id } = useParams();
	const vehicleId = Number(id);


	const getVehicle = async (id: number) => {
			setVehicle(null);
			setError(false);
			setIsloading(true);
	
			try {
				const data = await VehiclesAPI.getVehicle(id);
				setVehicle(data);
				setIsloading(false);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Can't even get a proper error...");
				setIsloading(false);
			}
	
		}
	
	useEffect(() => {
		getVehicle(vehicleId)
	}, [vehicleId])

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}

	return (
		vehicle && <Container className="my-5">
			<Row className="justify-content-center">
				<Col md={8}>
					<Card>

						<Card.Body>
							<Card.Title as="h1">{vehicle.name}</Card.Title>

							<ListGroup variant="flush" className="mt-3">
							<ListGroup.Item>
								<strong>Manufacturer:</strong> {vehicle.manufacturer}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Model:</strong> {vehicle.model}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Class:</strong> {vehicle.vehicle_class}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Cost:</strong> {vehicle.cost_in_credits}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Cargo Capacity:</strong> {vehicle.cargo_capacity}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Max Atmosphering Speed:</strong> {vehicle.max_atmosphering_speed}
							</ListGroup.Item>
							</ListGroup>

							<Accordion className="mt-4">
								<ResourceAccordion
									title="Films"
									items={vehicle.films}
									basePath="films"
									eventKey="0"
								/>
								<ResourceAccordion
									title="Pilots"
									items={vehicle.pilots}
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

export default VehicleDetailsPage