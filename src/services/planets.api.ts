import api from "../lib/api";
import type { PlanetsListResponse, Planet } from "../types/SWAPI-types/planets.types";


export const getPlanets = async (page = 1, query: string) => {
	const queryString = query ? `&search=${query}` : "";
	const res = await api.get<PlanetsListResponse>(`/planets?page=${page}${queryString}`);

	await new Promise(r => setTimeout(r, 600));

	return res.data
}

export const getPlanet = async (id: number) => {
	const res = await api.get<Planet>("/planets/" + id);
	
	await new Promise(r => setTimeout(r, 200));

	return res.data
}