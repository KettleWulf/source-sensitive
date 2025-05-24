import api from "../lib/api";
import type { FilmListResponse } from "../types/SWAPI-types/films.types";

export const getFilms = async () => {
	const res = await api.get<FilmListResponse>("/films");

	return res.data
}