import type { NamedReference, TitledReference } from "../Common-types/reference.types";
import type { PaginatedResponse } from "../Common-types/paginated-response.types";


export interface Person {
	id: number;
	name: string;
	birth_year: string;
	eye_color: string;
	hair_color: string;
	height: string;
	mass: string;
	skin_color: string;
	wiki_link: string;
	image_url: string;
	affiliations: string[];
	created: string;
	edited: string;
	homeworld: NamedReference;

	films: TitledReference[];
	species: NamedReference[];
	starships: NamedReference[];
	vehicles: NamedReference[];
}

export interface PeopleListItem {
	id: number;
	name: string;
	birth_year: string;
	eye_color: string;
	hair_color: string;
	height: string;
	mass: string;
	skin_color: string;
	wiki_link: string;
	image_url: string;
	affiliations: string[];
	created: string;
	edited: string;
	
	films_count: number;
	species_count: number;
	starships_count: number;
	vehicles_count: number;
	
	homeworld: NamedReference;
}

export type PeopleListResponse = PaginatedResponse<PeopleListItem>;

