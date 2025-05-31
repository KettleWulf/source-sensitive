import api from "../lib/api";
import type { StarshipsListResponse, Starship } from "../types/SWAPI-types/starships.types";


export const getStarships = async (page = 1, query: string) => {
	const queryString = query ? `&search=${query}` : "";
	const res = await api.get<StarshipsListResponse>(`/starships?page=${page}${queryString}`);

	await new Promise(r => setTimeout(r, 1000));

	return res.data
}

export const getStarship = async (id: number) => {
	const res = await api.get<Starship>("/starships/" + id)

	return res.data
}