import { useEffect, useState } from "react";
import type { FilmListResponse, FilmsListItem } from "../types/SWAPI-types/films.types";
import * as FilmsAPI from "../services/films.api";
import LoadingSpinner from "../components/LoadingSpinner";
import { Row, Col } from 'react-bootstrap';
import ErrorAlert from "../components/ErrorAlert";
import FilmCard from "../components/cards/FilmCard";
import Pagination from "../components/Pagination";


const FilmsPage = () => {
	const [films, setFilms] = useState<FilmsListItem[] | null>(null);
	const [fullResponse, setFullResponse] = useState<FilmListResponse | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);

	// const {searchParams, setSearchParams} = useSearchParams();
	const [page, setPage] = useState(1);

	const getFilms = async (page: number) => {
		setFilms(null);
		setError(false);
		setIsloading(true);

		try {
			const res = await FilmsAPI.getFilms(page);
			setFilms(res.data);
			setFullResponse(res)
			setIsloading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
			setIsloading(false);
		}

	}



	useEffect(() => {
		getFilms(page)
	}, [page])

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}
	

	return (
		
		<div className="container">
			<h1>Films</h1>

			{fullResponse && <p>Showing result {fullResponse.from} to {fullResponse.to} of {fullResponse.total} results. </p>}
			<Row xs={1} sm={2} md={3} className="g-4">
				{films && films.map(film => (
				<Col key={film.id}>
					<FilmCard film={film} />
				</Col>
				))}
			</Row>

			{fullResponse && <Pagination 
				hasNextPage={fullResponse.current_page !== fullResponse.last_page}
				onNextPage={() => setPage(prevValue => prevValue + 1)}
				hasPreviousPage={fullResponse.current_page !== 1}
				onPreviousPage={() => setPage(prevValue => prevValue - 1)}
				onFirstPage={() => setPage(1)}
				onLastPage={() => setPage(fullResponse.last_page)}
				page={page}
				totalPages={fullResponse.last_page}
			/>}
		</div>
		
);
}

export default FilmsPage
