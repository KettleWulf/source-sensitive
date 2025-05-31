import api from "../lib/api";
import type { Film, FilmsListResponse } from "../types/SWAPI-types/films.types";


export const getFilms = async (page = 1, query: string) => {
	const queryString = query ? `&search=${query}` : "";
	const res = await api.get<FilmsListResponse>(`/films?page=${page}${queryString}`);

	await new Promise(r => setTimeout(r, 1000));

	return res.data
}

export const getSingleFilm = async (id: number) => {
	const res = await api.get<Film>("/films/" + id)

	return res.data
}