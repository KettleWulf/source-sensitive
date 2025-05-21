import type { PaginatedResponse } from "../Common-types/paginated-response.types";
import type { NamedReference, TitledReference } from "../Common-types/reference.types";


export interface Species {
	id: 1;
	name: string;
	classification: string;
	designation: string;
	average_height: string;
	average_lifespan: string;
	eye_colors: string;
	hair_colors: string;
	skin_colors: string;
	language: string;
	created: string;
	edited: string;

	people: NamedReference[];
	homeworld: NamedReference
	films: TitledReference[]
}

export interface SpeciesListItem {
	id: 1;
	name: string;
	classification: string;
	designation: string;
	average_height: string;
	average_lifespan: string;
	eye_colors: string;
	hair_colors: string;
	skin_colors: string;
	language: string;
	created: string;
	edited: string;
	
	people_count: number;
	films_count: number;

	homeworld: NamedReference | null;
}

export type SpeciesListResponse = PaginatedResponse<SpeciesListItem>;