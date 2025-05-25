import type { PaginatedResponse } from "../Common-types/paginated-response.types";
import type { TitledReference } from "../Common-types/reference.types";
import type { Person } from "./people.types";


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

	residents: Resident[];
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

type Resident = Omit<Person, "homeworld" | "films" | "species" | "starships" | "vehicles">;
