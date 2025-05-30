import { useEffect, useState } from "react";

import * as PeopleApi from "../services/people.api";
import LoadingSpinner from "../components/spinners/LoadingSpinner";
import { Row, Col } from 'react-bootstrap';
import ErrorAlert from "../components/ErrorAlert";

import type { PeopleListItem, PeopleListResponse } from "../types/SWAPI-types/people.types";
import PersonCard from "../components/cards/PersonCard";
import Pagination from "../components/Pagination";
import { Link, useSearchParams } from "react-router";
import SearchBar from "../components/SearchBar";
import BB8Spinner from "../components/spinners/BB8Spinner";


const PeoplePage = () => {
	const [people, setPeople] = useState<PeopleListItem[] | null>(null);
	const [fullResponse, setFullResponse] = useState<PeopleListResponse | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	const page = Number(searchParams.get("page")) || 1;
	const query = searchParams.get("query") || "";

	const getPeople = async (page: number, query: string) => {
		setPeople(null);
		setError(false);
		setIsloading(true);

		try {
			const res = await PeopleApi.getPeople(page, query);
			setPeople(res.data);
			setFullResponse(res);
			setIsloading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
			setIsloading(false);
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

			{fullResponse && (
				<p className="ms-2 mb-1 text-muted small">
					{query
						? <>Showing {fullResponse.total} results for <em>"{query}"</em></>
						: `Showing ${fullResponse.from}-${fullResponse.to} of ${fullResponse.total} results.`}
				</p>
			)}
			
			<Row xs={1} sm={2} md={5} className="g-4 min-height-400">
				{people && people.map(person => (
				<Col key={person.id}>
					<PersonCard person={person} />
				</Col>
				))}
			</Row>

			{fullResponse && <Pagination 
				hasNextPage={Boolean(fullResponse.next_page_url)}
				hasPreviousPage={Boolean(fullResponse.prev_page_url)}
				onPageChange={handlePageChange}
				page={page}
				totalPages={fullResponse.last_page}
			/>}

			{isLoading && <BB8Spinner />}

			{error && <ErrorAlert>{error}</ErrorAlert>}
		</div>
);
}

export default PeoplePage
