import { useEffect, useState } from "react";

import * as StarshipsApi from "../services/starships.api";
import LoadingSpinner from "../components/spinners/LoadingSpinner";
import { Row, Col } from 'react-bootstrap';
import ErrorAlert from "../components/ErrorAlert";

import type { StarshipsListItem } from "../types/SWAPI-types/starships.types";
import StarshipCard from "../components/cards/StarShipCard";


const StarshipsPage = () => {
	const [starships, setStarships] = useState<StarshipsListItem[] | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);

	const getStarships = async () => {
		setStarships(null);
		setError(false);
		setIsloading(true);

		try {
			const data = await StarshipsApi.getStarships();
			setStarships(data.data);
			setIsloading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
			setIsloading(false);
		}

	}

	useEffect(() => {
		getStarships()
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
			{starships && starships.map(starship => (
			<Col key={starship.id}>
				<StarshipCard starship={starship} />
			</Col>
			))}
		</Row>
		</div>
);
}

export default StarshipsPage
