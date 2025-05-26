import api from "../lib/api";
import type { Film, FilmListResponse } from "../types/SWAPI-types/films.types";

export const getFilms = async (page = 1) => {
	const res = await api.get<FilmListResponse>("/films?page=" + page);

	return res.data
}

export const getSingleFilm = async (id: number) => {
	const res = await api.get<Film>("/films/" + id)

	return res.data
}