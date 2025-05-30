import { useEffect, useState } from "react";

import * as PlanetsApi from "../services/planets.api";
import LoadingSpinner from "../components/spinners/LoadingSpinner";
import { Row, Col } from 'react-bootstrap';
import ErrorAlert from "../components/ErrorAlert";

import PlanetCard from "../components/cards/PlanetCard";
import type { PlanetsListItem } from "../types/SWAPI-types/planets.types";


const PlanetsPage = () => {
	const [planets, setPlanets] = useState<PlanetsListItem[] | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);

	const getPlanets = async () => {
		setPlanets(null);
		setError(false);
		setIsloading(true);

		try {
			const data = await PlanetsApi.getPlanets();
			setPlanets(data.data);
			setIsloading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
			setIsloading(false);
		}

	}

	useEffect(() => {
		getPlanets()
	}, [])

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}
	

	return (
		<div className="container">
		<h1>People</h1>
		<Row xs={1} sm={2} md={3} className="g-4">
			{planets && planets.map(planet => (
			<Col key={planet.id}>
				<PlanetCard planet={planet} />
			</Col>
			))}
		</Row>
		</div>
);
}

export default PlanetsPage
