import { useEffect, useState } from "react";

import * as SpeciesApi from "../services/species.api";
import LoadingSpinner from "../components/LoadingSpinner";
import { Row, Col } from 'react-bootstrap';
import ErrorAlert from "../components/ErrorAlert";

import type { SpeciesListItem } from "../types/SWAPI-types/species.types";
import SpeciesCard from "../components/cards/SpeciesCard";


const SpeciesPage = () => {
	const [species, setSpecies] = useState<SpeciesListItem[] | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);

	const getSpecies = async () => {
		setSpecies(null);
		setError(false);
		setIsloading(true);

		try {
			const data = await SpeciesApi.getSpecies();
			setSpecies(data.data);
			setIsloading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
			setIsloading(false);
		}

	}

	useEffect(() => {
		getSpecies()
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
			{species && species.map(item => (
			<Col key={item.id}>
				<SpeciesCard species={item} />
			</Col>
			))}
		</Row>
		</div>
);
}

export default SpeciesPage
