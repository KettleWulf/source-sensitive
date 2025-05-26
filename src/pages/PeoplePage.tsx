import { useEffect, useState } from "react";

import * as PeopleApi from "../services/people.api";
import LoadingSpinner from "../components/LoadingSpinner";
import { Row, Col } from 'react-bootstrap';
import ErrorAlert from "../components/ErrorAlert";

import type { PeopleListItem, PeopleListResponse } from "../types/SWAPI-types/people.types";
import PersonCard from "../components/cards/PersonCard";
import Pagination from "../components/Pagination";


const PeoplePage = () => {
	const [people, setPeople] = useState<PeopleListItem[] | null>(null);
	const [fullResponse, setFullResponse] = useState<PeopleListResponse | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);

	const [page, setPage] = useState(1);

	const getPeople = async (page: number) => {
		setPeople(null);
		setError(false);
		setIsloading(true);

		try {
			const res = await PeopleApi.getPeople(page);
			setPeople(res.data);
			setFullResponse(res);
			setIsloading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
			setIsloading(false);
		}

	}

	useEffect(() => {
		getPeople(page)
	}, [page])

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}
	

	return (
		<div className="container">
			<h1>People</h1>

			{fullResponse && <p>Showing {fullResponse.from}-{fullResponse.to} of {fullResponse.total} results. </p>}
			<Row xs={1} sm={2} md={3} className="g-4">
				{people && people.map(person => (
				<Col key={person.id}>
					<PersonCard person={person} />
				</Col>
				))}
			</Row>

			{fullResponse && <Pagination 
				hasNextPage={Boolean(fullResponse.next_page_url)}
				onNextPage={() => setPage(prevValue => prevValue + 1)}
				hasPreviousPage={Boolean(fullResponse.prev_page_url)}
				onPreviousPage={() => setPage(prevValue => prevValue - 1)}
				onFirstPage={() => setPage(1)}
				onLastPage={() => setPage(fullResponse.last_page)}
				page={page}
				totalPages={fullResponse.last_page}
			/>}
		</div>
);
}

export default PeoplePage
