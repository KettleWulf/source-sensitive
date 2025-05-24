import { useEffect, useState } from "react";
import type { FilmListItem } from "../types/SWAPI-types/films.types";
import * as FilmsAPI from "../services/films.api";
import LoadingSpinner from "../components/LoadingSpinner";
import { Row, Col } from 'react-bootstrap';
import ErrorAlert from "../components/ErrorAlert";
import FilmCard from "../components/cards/FilmCard";


const FilmsPage = () => {
	const [films, setFilms] = useState<FilmListItem[] | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsloading] = useState(false);

	const getFilms = async () => {
		setFilms(null);
		setError(false);
		setIsloading(true);

		try {
			const data = await FilmsAPI.getFilms();
			setFilms(data.data);
			setIsloading(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
			setIsloading(false);
		}

	}

	useEffect(() => {
		getFilms()
	}, [])

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>
	}
	

	return (
		<div className="container">
		<h1>Films</h1>
		<Row xs={1} sm={2} md={3} className="g-4">
			{films && films.map(film => (
			<Col key={film.id}>
				<FilmCard film={film} />
			</Col>
			))}
		</Row>
		</div>
);
}

export default FilmsPage
