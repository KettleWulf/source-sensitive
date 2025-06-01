import { useEffect, useRef, useState } from "react";

import * as PlanetsApi from "../services/planets.api";
import { Row, Col } from 'react-bootstrap';
import ErrorAlert from "../components/ErrorAlert";

import type { PlanetsListItem, PlanetsListResponse } from "../types/SWAPI-types/planets.types";
import PlanetCard from "../components/cards/PlanetCard";
import Pagination from "../components/paginations/Pagination";
import { Link } from "react-router";
import SearchBar from "../components/SearchBar";
import BB8Spinner from "../components/spinners/BB8Spinner";
import LoadingSpinner from "../components/spinners/LoadingSpinner";

import { useSearchAndPagination } from "../hooks/useSearchAndPagination";
import { useGet } from "../hooks/useGet";


const PlanetsPage = () => {

	const { page, query, handlePageChange, handleSearch } = useSearchAndPagination();
	
	const {
		data: planets,
		fullResponse,
		error,
		isFetching,
		isLoading,
		getData
	} = useGet<PlanetsListItem, PlanetsListResponse>();

	const prevQuery = useRef<string | null>(null);
	const [isNewQuery, setIsNewQuery] = useState(false);

	const resourceCategory = "Planets"

	useEffect(() => {
		if (prevQuery.current !== query) {
			setIsNewQuery(true);
		}
		getData(PlanetsApi.getPlanets, page, query);
		prevQuery.current = query
	}, [page, query, getData]);

	useEffect(() => {
		if (!isFetching) {
			setIsNewQuery(false);
		}
	}, [isFetching]);

	return (
		<div className="container mt-3 mb-5">
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
			
			{planets && (
				<Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4 min-height-400">
					{planets.map(planet => (
						<Col key={planet.id}>
							<PlanetCard planet={planet} />
						</Col>
					))}
				</Row>
			)}

			{fullResponse && <Pagination 
				hasNextPage={!!fullResponse.next_page_url}
				hasPreviousPage={!!fullResponse.prev_page_url}
				onPageChange={handlePageChange}
				page={page}
				totalPages={fullResponse.last_page}
			/>}
		</div>
	);
}

export default PlanetsPage;