import { useEffect, useState } from "react";

import * as VehiclesApi from "../services/vehicles.api";
import LoadingSpinner from "../components/spinners/LoadingSpinner";
import { Row, Col } from 'react-bootstrap';
import ErrorAlert from "../components/ErrorAlert";

import type { VehiclesListItem } from "../types/SWAPI-types/vehicles.types";
import VehicleCard from "../components/cards/VehicleCard";


const VehiclesPage = () => {
	const [vehicles, setVehicles] = useState<VehiclesListItem[] | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);

	const getVehicles = async () => {
		setVehicles(null);
		setError(false);
		setIsloading(true);

		try {
			const data = await VehiclesApi.getVehicles();
			setVehicles(data.data);
			setIsloading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
			setIsloading(false);
		}

	}

	useEffect(() => {
		getVehicles()
	}, [])

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}
	

	return (
		<div className="container">
		<h1>Species</h1>
		<Row xs={1} sm={2} md={3} className="g-4">
			{vehicles && vehicles.map(vehicle => (
			<Col key={vehicle.id}>
				<VehicleCard vehicle={vehicle} />
			</Col>
			))}
		</Row>
		</div>
);
}

export default VehiclesPage
