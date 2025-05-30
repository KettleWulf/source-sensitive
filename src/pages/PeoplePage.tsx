import { useEffect, useState } from "react";

import * as PeopleApi from "../services/people.api";
import { Row, Col } from 'react-bootstrap';
import ErrorAlert from "../components/ErrorAlert";

import type { PeopleListItem, PeopleListResponse } from "../types/SWAPI-types/people.types";
import PersonCard from "../components/cards/PersonCard";
import Pagination from "../components/paginations/Pagination";
import { Link, useSearchParams } from "react-router";
import SearchBar from "../components/SearchBar";
import BB8Spinner from "../components/spinners/BB8Spinner";
import LoadingSpinner from "../components/spinners/LoadingSpinner";


const PeoplePage = () => {
	const [people, setPeople] = useState<PeopleListItem[] | null>(null);
	const [fullResponse, setFullResponse] = useState<PeopleListResponse | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isFetching, setIsFetching] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	const page = Number(searchParams.get("page")) || 1;
	const query = searchParams.get("query") || "";

	const getPeople = async (page: number, query: string) => {

		setError(false);
		setIsFetching(true);

		try {
			const res = await PeopleApi.getPeople(page, query);
			setPeople(res.data);
			setFullResponse(res);
			setIsFetching(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
			setIsFetching(false);
			setIsLoading(false);
		}

	}

	const handlePageChange = (newPage: number) => {
		setSearchParams({ query, page: newPage.toString()})
	}

	const handleSearch = (newQuery: string) => {
		setSearchParams({ query: newQuery, page: "1" });
	}

	useEffect(() => {
		getPeople(page, query);

	}, [page, query]);

	useEffect(() => {
		setIsLoading(!people);

	}, [people]);

	

	return (
		<div className="container mt-3">
			<Link to="/people" className="discreet-link">
				<h1 className="h2">People</h1>
			</Link>

			<SearchBar 
				onSearch={handleSearch} 
				category="People"
				currentQuery={query}
			/>

			{!isLoading && isFetching && <BB8Spinner />}

			{error && <ErrorAlert>{error}</ErrorAlert>}

			{isLoading && <LoadingSpinner />}

			{fullResponse && (
				<p className="ms-2 mb-1 text-muted small">
					{query
						? <>Showing {fullResponse.total} results for <em>"{query}"</em></>
						: `Showing ${fullResponse.from}-${fullResponse.to} of ${fullResponse.total} results.`}
				</p>
			)}
			
			{people && (
				<Row xs={1} sm={2} md={4} lg={5} className="g-4 min-height-400">
					{people.map(person => (
					<Col key={person.id}>
						<PersonCard person={person} />
					</Col>
					))}
				</Row>
			)}

			{fullResponse && <Pagination 
				hasNextPage={Boolean(fullResponse.next_page_url)}
				hasPreviousPage={Boolean(fullResponse.prev_page_url)}
				onPageChange={handlePageChange}
				page={page}
				totalPages={fullResponse.last_page}
			/>}
		</div>
);
}

export default PeoplePage
