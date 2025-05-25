import api from "../lib/api";
import type { StarshipsListResponse, Starship } from "../types/SWAPI-types/starships.types";


export const getStarships = async () => {
	const res = await api.get<StarshipsListResponse>("/starships");

	return res.data
}

export const getStarship = async (id: number) => {
	const res = await api.get<Starship>("/starships/" + id)

	return res.data
}