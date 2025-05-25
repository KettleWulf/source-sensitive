import api from "../lib/api";
import type { VehiclesListResponse, Vehicle } from "../types/SWAPI-types/vehicles.types";


export const getVehicles = async () => {
	const res = await api.get<VehiclesListResponse>("/vehicles");

	return res.data
}

export const getVehicle = async (id: number) => {
	const res = await api.get<Vehicle>("/vehicles/" + id)

	return res.data
}