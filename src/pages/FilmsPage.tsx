import { useEffect, useRef, useState } from "react";

import * as FilmsApi from "../services/films.api";
import { Row, Col } from 'react-bootstrap';
import ErrorAlert from "../components/ErrorAlert";

import type { FilmsListItem, FilmListResponse } from "../types/SWAPI-types/films.types";
import FilmCard from "../components/cards/FilmCard";
import Pagination from "../components/paginations/Pagination";
import { Link } from "react-router";
import SearchBar from "../components/SearchBar";
import BB8Spinner from "../components/spinners/BB8Spinner";
import LoadingSpinner from "../components/spinners/LoadingSpinner";

import { useSearchAndPagination } from "../hooks/useSearchAndPagination";
import { useGet } from "../hooks/useGet";


const FilmsPage = () => {

	const { page, query, handlePageChange, handleSearch } = useSearchAndPagination();
	
	const {
		data: films,
		fullResponse,
		error,
		isFetching,
		isLoading,
		getData
	} = useGet<FilmsListItem, FilmListResponse>();

	console.log(query, fullResponse);

	const prevQuery = useRef<string | null>(null);
	const [isNewQuery, setIsNewQuery] = useState(false);

	const resourceCategory = "Films"


	useEffect(() => {
		if (prevQuery.current !== query) {
			setIsNewQuery(true);
		}
		getData(page, query);
		prevQuery.current = query
	}, [page, query, getData]);

		useEffect(() => {
		if (!isFetching) {
			setIsNewQuery(false);
		}
	}, [isFetching]);


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

			{!isLoading && isFetching && <BB8Spinner />}

			{error && <ErrorAlert>{error}</ErrorAlert>}

			{isLoading && <LoadingSpinner />}

			{fullResponse && (
				<p className="ms-2 mb-1 text-muted small">
					{isFetching && isNewQuery
						? "Searching the Galaxies..."
						: query
							? <>Showing {fullResponse.total} result{fullResponse.total > 1 ? "s" : ""} for <em>"{query}"</em></>
							: `Showing ${fullResponse.from}-${fullResponse.to} of ${fullResponse.total} results.`}
				</p>
			)}
			
			{films && (
				<Row xs={1} sm={2} md={3} className="g-4 min-height-400">
					{films.map(film => (
					<Col key={film.id}>
						<FilmCard film={film} />
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

export default FilmsPage
