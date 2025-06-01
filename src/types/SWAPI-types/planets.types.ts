import type { NamedReference, TitledReference } from "../Common-types/reference.types";
import type { PaginatedResponse } from "../Common-types/paginated-response.types";


export interface Planet {
	id: number;
	name: string;
	rotation_period: string;
	orbital_period: string;
	diameter: string;
	climate: string;
	gravity: string;
	terrain: string;
	surface_water: string;
	created: string;
	edited: string;

	residents: NamedReference[];
	films: TitledReference[];
}

export interface PlanetsListItem {
	id: number;
	name: string;
	rotation_period: string;
	orbital_period: string;
	diameter: string;
	climate: string;
	gravity: string;
	terrain: string;
	surface_water: string;
	created: string;
	edited: string;

	residents_count: number;
	films_count: number;
}

export type PlanetsListResponse = PaginatedResponse<PlanetsListItem>

