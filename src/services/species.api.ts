import api from "../lib/api";
import type { SpeciesListResponse, Species } from "../types/SWAPI-types/species.types";


export const getSpecies = async (page = 1, query: string) => {
	const queryString = query ? `&search=${query}` : "";
	const res = await api.get<SpeciesListResponse>(`/species?page=${page}${queryString}`);

	await new Promise(r => setTimeout(r, 1000));

	return res.data
}

export const getSingleSpecies = async (id: number) => {
	const res = await api.get<Species>("/species/" + id)

	return res.data
}