import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router"
import type { FilmListItem } from "../types/SWAPI-types/films.types";
import * as FilmsAPI from "../services/films.api";


const FilmsPage = () => {
	const [films, setFilms] = useState<FilmListItem[] | null>(null);
	const [error, setError] = useState<string | false>(false);

	const getFilms = async () => {

		try {
			const data = await FilmsAPI.getFilms();
			setFilms(data.data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Can't even get a proper error...");
		}

	}

	useEffect(() => {
		getFilms()
	}, [])
	

	return (
		<div className="container">
			<h1>Films</h1>
			{films && (<ul>
				{films.map(film => (
					<li key={film.id}>
						{film.title} ({film.release_date})
					</li>
				))}
			</ul>)}
    	</div>
	)
}

export default FilmsPage
