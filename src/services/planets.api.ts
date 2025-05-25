import api from "../lib/api";
import type { PlanetsListResponse, Planet } from "../types/SWAPI-types/planets.types";


export const getPlanets = async () => {
	const res = await api.get<PlanetsListResponse>("/planets");

	return res.data
}

export const getPlanet = async (id: number) => {
	const res = await api.get<Planet>("/planets/" + id)

	return res.data
}