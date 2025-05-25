import { useEffect, useState } from "react";

import * as PeopleApi from "../services/people.api";
import LoadingSpinner from "../components/LoadingSpinner";
import { Row, Col } from 'react-bootstrap';
import ErrorAlert from "../components/ErrorAlert";

import type { PeopleListItem } from "../types/SWAPI-types/people.types";
import PersonCard from "../components/cards/PersonCard";


const PeoplePage = () => {
	const [people, setPeople] = useState<PeopleListItem[] | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);

	const getPeople = async () => {
		setPeople(null);
		setError(false);
		setIsloading(true);

		try {
			const data = await PeopleApi.getPeople();
			setPeople(data.data);
			setIsloading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
			setIsloading(false);
		}

	}

	useEffect(() => {
		getPeople()
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
			{people && people.map(person => (
			<Col key={person.id}>
				<PersonCard person={person} />
			</Col>
			))}
		</Row>
		</div>
);
}

export default PeoplePage
