import type { NamedReference, TitledReference } from "../Common-types/reference.types";
import type { PaginatedResponse } from "../Common-types/paginated-response.types";


export interface Vehicle {
	id: number;
	name: string;
	model: string;
	vehicle_class: string;
	manufacturer: string;
	length: string;
	cost_in_credits: string;
	crew: string;
	passengers: string;
	max_atmosphering_speed: string;
	hyperdrive_rating: string;
	MGLT: string;
	cargo_capacity: string;
	consumables: string;
	created: string;
	edited: string;

	pilots: NamedReference[];
	films: TitledReference[];
}

export interface VehiclesListItem {
	id: number;
	name: string;
	model: string;
	vehicle_class: string;
	manufacturer: string;
	length: string;
	cost_in_credits: string;
	crew: string;
	passengers: string;
	max_atmosphering_speed: string;
	hyperdrive_rating: string;
	MGLT: string;
	cargo_capacity: string;
	consumables: string;
	created: string;
	edited: string;

	pilots_count: number;
	films_count: number;
}

export type VehiclesListResponse = PaginatedResponse<VehiclesListItem>;