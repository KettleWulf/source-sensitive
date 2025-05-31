import api from "../lib/api";
import type { VehiclesListResponse, Vehicle } from "../types/SWAPI-types/vehicles.types";


export const getVehicles = async (page = 1, query: string) => {
	const queryString = query ? `&search=${query}` : "";
	const res = await api.get<VehiclesListResponse>(`/starships?page=${page}${queryString}`);

	await new Promise(r => setTimeout(r, 1000));

	return res.data
}

export const getVehicle = async (id: number) => {
	const res = await api.get<Vehicle>("/vehicles/" + id)

	return res.data
}