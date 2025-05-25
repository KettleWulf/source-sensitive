import api from "../lib/api";
import type { SpeciesListResponse, Species } from "../types/SWAPI-types/species.types";


export const getSpecies = async () => {
	const res = await api.get<SpeciesListResponse>("/planets");

	return res.data
}

export const getSingleSpecies = async (id: number) => {
	const res = await api.get<Species>("/species/" + id)

	return res.data
}