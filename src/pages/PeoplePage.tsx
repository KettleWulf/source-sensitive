import { useEffect } from "react";

import * as PeopleApi from "../services/people.api";
import { Row, Col } from 'react-bootstrap';
import ErrorAlert from "../components/ErrorAlert";

import type { PeopleListItem, PeopleListResponse } from "../types/SWAPI-types/people.types";
import PersonCard from "../components/cards/PersonCard";
import Pagination from "../components/paginations/Pagination";
import { Link } from "react-router";
import SearchBar from "../components/SearchBar";
import BB8Spinner from "../components/spinners/BB8Spinner";
import LoadingSpinner from "../components/spinners/LoadingSpinner";

import { useSearchAndPagination } from "../hooks/useSearchAndPagination";
import { useGet } from "../hooks/useGet";


const PeoplePage = () => {

	const { page, query, handlePageChange, handleSearch } = useSearchAndPagination();
	
	const {
	data: people,
	fullResponse,
	error,
	isFetching,
	isLoading,
	getData
} = useGet<PeopleListItem, PeopleListResponse>();

	const resourceCategory = "People"

	useEffect(() => {
		getData(PeopleApi.getPeople, page, query);
	}, [page, query, getData]);



	return (
		<div className="container mt-3">
			<Link to={"/" + resourceCategory.toLowerCase()} className="discreet-link">
				<h1 className="h2">{resourceCategory}</h1>
			</Link>

			<SearchBar 
				onSearch={handleSearch} 
				category={resourceCategory}
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
