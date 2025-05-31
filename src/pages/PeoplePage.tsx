import { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router";

import * as PeopleApi from "../services/people.api";
import type { PeopleListItem, PeopleListResponse } from "../types/SWAPI-types/people.types";

import ErrorAlert from "../components/ErrorAlert";
import PersonCard from "../components/cards/PersonCard";
import Pagination from "../components/paginations/Pagination";
import SearchBar from "../components/SearchBar";
import BB8Spinner from "../components/spinners/BB8Spinner";
import LoadingSpinner from "../components/spinners/LoadingSpinner";

import { useSearchAndPagination } from "../hooks/useSearchAndPagination";



const PeoplePage = () => {
	const [people, setPeople] = useState<PeopleListItem[] | null>(null);
	const [fullResponse, setFullResponse] = useState<PeopleListResponse | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);

	const { page, query, handlePageChange, handleSearch } = useSearchAndPagination();
	const resourceCategory = "People";

	const prevQuery = useRef<string | null>(null);
	const [isNewQuery, setIsNewQuery] = useState(false);

	const getPeople = async (page: number, query: string) => {
		setError(false);
		setIsLoading(true);


		try {
			const res = await PeopleApi.getPeople(page, query);
			setPeople(res.data);
			setFullResponse(res);
			setIsLoading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unexpected error");
			setIsLoading(false);
		}

	};

	useEffect(() => {
		if (prevQuery.current !== query) {
			setIsNewQuery(true);
		}
		
		getPeople(page, query);

		prevQuery.current = query;

	}, [page, query]);

	useEffect(() => {
		if (!isLoading) {
			setIsNewQuery(false);
		}
	}, [isLoading]);

	return (
		<div className="container mt-3">
			<h1 className="mb-3">
				<Link to={"/" + resourceCategory.toLowerCase()} className="discreet-link">
					<span className="h2 ms-3 mb-0">{resourceCategory}</span>
				</Link>
			</h1>

			<SearchBar 
				onSearch={handleSearch} 
				category={resourceCategory}
				currentQuery={query}
			/>

			{isLoading && fullResponse && <BB8Spinner />}

			{error && <ErrorAlert>{error}</ErrorAlert>}

			{isLoading && !fullResponse && <LoadingSpinner />}

			{fullResponse && (
				<p className="ms-2 mb-1 text-muted small">
					{isLoading && isNewQuery
						? "Searching the Galaxies..."
						: query
							? <>Showing {fullResponse.total} result{fullResponse.total > 1 ? "s" : ""} for <em>"{query}"</em></>
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

			{fullResponse && (
				<Pagination 
					hasNextPage={!!fullResponse.next_page_url}
					hasPreviousPage={!!fullResponse.prev_page_url}
					onPageChange={handlePageChange}
					page={page}
					totalPages={fullResponse.last_page}
				/>
			)}
		</div>
	);
};

export default PeoplePage;